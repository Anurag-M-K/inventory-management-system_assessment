const inventory = require("../model/inventoryItemsSchema");

const addProduct = async (req,res) => {
    try {
        const {productname , quantity,price,description } = req.body;

        //check if required fields are provided
        if(!productname || !quantity || !price || !description ) {
            return res.status(400).json({error:"Please provide all required fields."});
        }

        //create new inventory item 
        const newItem = new inventory({
            productname,
            quantity,
            price,
            description,
        })
        //save the new item to the database
        await newItem.save();
        return res.status(201).json(newItem)
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal server error."})
    }
}

const getAllInventory = async (req, res) => {
    try {
      // Fetch all inventory items from the database
      const inventoryItems = await inventory.find();
  
      // Check if there are any inventory items
      if (inventoryItems.length === 0) {
        return res.status(404).json({ message: "No inventory items found" });
      }
  
      // Send the inventory items as a response
      res.json({ inventoryItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = {
    addProduct,
    getAllInventory
}