const Customer = require("../model/costumerSchema");
const Sale = require("../model/salesSchema");

const addCustomer = async (req, res) => {
  try {
    const { name,  mobile, address } = req.body;

    // Create a new customer instance using the Customer model
    const newCustomer = new Customer({
      name,
      mobile,
      address,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();

    res.status(201).json({ message: "Customer added successfully", customer: savedCustomer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add customer" });
  }
};


const getAllCustomers = async (req, res) => {
  try {
    // Use the find method to get all customers from the database
    const customers = await Customer.find();

    // Return the customers as a response
    res.status(200).json(customers);
  } catch (error) {
    // Handle errors if any
    console.log(error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};


const getCustomerLedger = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Fetch customer details using the customer ID
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Fetch sales records for the customer using the customer ID
    const sales = await Sale.find({ customerId });

    // Prepare the customer ledger object with customer details and sales records
    const customerLedger = {
      customer: {
        id: customer._id,
        name: customer.name,
        address: customer.address,
        mobile: customer.mobile,
      },
      sales,
    };

    // Send the customer ledger as the response
    res.status(200).json(customerLedger);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerLedger
};
