import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setInventoryDetails } from '../redux/features/inventorySlice';

function UpdateInventoryModal({ row, closeModal }) {
    const { userDetails } = useSelector((state) => state.user);
  const [updatedData, setUpdatedData] = useState({
    productname: row.productname,
    quantity: row.quantity,
    price: row.price,
    description: row.description,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const userToken = userDetails.token;
  const handleSubmit = async (e) => {
console.log("rowm ",row)
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.put(
        `http://localhost:8000/api/inventoryitem/updateinventory/${row._id}`,
        updatedData,
        config
      );
      const inventory = await axios.get(
        'http://localhost:8000/api/inventoryitem/getallinventory',
        config
      );


      // Update the inventory details in Redux state
      dispatch(setInventoryDetails(inventory.data.inventoryItems));

      // Close the modal after successful update
      closeModal();
    } catch (error) {
      console.log('Error updating:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Update Inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='productname'>Product Name</label>
            <input
              type='text'
              name='productname'
              value={updatedData.productname}
              onChange={handleChange}
              className='border border-gray-400 rounded px-2 py-1 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              name='quantity'
              value={updatedData.quantity}
              onChange={handleChange}
              className='border border-gray-400 rounded px-2 py-1 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              value={updatedData.price}
              onChange={handleChange}
              className='border border-gray-400 rounded px-2 py-1 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              value={updatedData.description}
              onChange={handleChange}
              className='border border-gray-400 rounded px-2 py-1 w-full'
            />
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
              Save
            </button>
            <button type='button' className='ml-2 bg-red-500 text-white px-4 py-2 rounded' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateInventoryModal;
