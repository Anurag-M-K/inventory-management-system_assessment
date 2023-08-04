const Customer = require("../model/costumerSchema");

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
module.exports = {
  addCustomer,
  getAllCustomers
};
