const sales = require("../model/salesSchema");
const inventory = require("../model/inventoryItemsSchema");
const customer = require("../model/costumerSchema");
const nodemailer = require('nodemailer');

const addSale = async (req, res) => {
  try {
    const { productname, date, quantity, customername, cash } = req.body;

    // Find the corresponding customer in the database based on the customername
    const cust = await customer.findOne({ name: customername });

    if (!cust) {
      // Customer not found in the database
      return res.status(401).json({ error: "Customer not found, Please add customer first" });
    }

    // Find the corresponding product in the inventory based on the productname
    const productInInventory = await inventory.findOne({ productname });

    if (!productInInventory) {
      // Product not found in inventory
      return res.status(404).json({ error: "Product not found in inventory" });
    }

    if (productInInventory.quantity < quantity) {
      // Insufficient quantity in inventory
      return res.status(400).json({ error: "Insufficient quantity in inventory" });
    }

    // Update the inventory count by subtracting the sold quantity
    productInInventory.quantity -= quantity;
    await productInInventory.save();

    // Create a new sale document in the database
    const newSale = new sales({
      productname,
      date,
      quantity,
      customername,
      customerId: cust._id, // Assign the customerId field with the customer's _id
      cash,
    });

    // Save the new sale document to the database
    const savedSale = await newSale.save();

    // Send a success response
    res.status(201).json(savedSale);
  } catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).json({ error: "Failed to add sale record" });
  }
};

const getAllSalesDetails = async (req, res) => {
  console.log("sales backend")
  try {
    let allsalesdetails = await sales.find();
    res.status(201).json(allsalesdetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch sales details" });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { recipientemail, subject, body, attachment } = req.body;
    console.log("atachsent ",req.body)

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user : "anuragmk10@gmail.com",
        pass : "nuofbwxshkmukqbc" 
      },
    });

    // Send email with attachment
    await transporter.sendMail({
      from: 'anuragmk10@gmail.com',
      to: recipientemail,
      subject: subject,
      text: body,
      attachments: [
        {
          filename: 'report.pdf', // Replace with your attachment file name
          content: attachment, // This should be the PDF file content as a base64 string
        },
      ],
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
module.exports = {
  addSale,
  getAllSalesDetails,
  sendEmail
};
