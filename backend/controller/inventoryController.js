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

  const deleteInventory = async (req, res) => {
    try {
      // Get the id of the inventory item to be deleted from the request parameters
      const inventoryItemId = req.params.id;
      console.log("id check ",inventoryItemId)
  
      // Find the inventory item by id in the database
      const inventoryItem = await inventory.findById(inventoryItemId);
  
      // If the inventory item is not found, return an error response
      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
  
      // Delete the inventory item from the database
      await inventory.deleteOne({ _id: inventoryItemId });
  
      // Return a success response
      res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
      // If there is an error, return an error response
      console.error(error);
      res.status(500).json({ message: 'Failed to delete inventory item' });
    }
  };
  
  
  const updateInventory = async (req, res) => {
    try {
      const { productname, quantity, price, description } = req.body;
      const inventoryItemId = req.params.id;
  
      // Check if the inventory item exists
      const inventoryItem = await inventory.findById(inventoryItemId);
  
      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
  
      // Update the inventory item with the new data
      inventoryItem.productname = productname;
      inventoryItem.quantity = quantity;
      inventoryItem.price = price;
      inventoryItem.description = description;
  
      // Save the updated inventory item
      await inventoryItem.save();
  
      // You can send the updated inventory item in the response if needed
      res.json({ message: 'Inventory item updated successfully', updatedInventoryItem: inventoryItem });
    } catch (error) {
      console.log(error)
      // Handle any errors that occurred during the update process
      res.status(500).json({ message: 'An error occurred while updating the inventory item', error: error.message });
    }
  };
  
module.exports = {
    addProduct,
    getAllInventory,
    deleteInventory,
    updateInventory
}