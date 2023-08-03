import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { setInventoryDetails } from '../redux/features/inventorySlice';
import axios from 'axios';

function InventoryTable() {
  const { userDetails } = useSelector((state) => state.user);
  const { inventoryDetails } = useSelector((state) => state.inventory);
  const [records, setRecords] = useState(inventoryDetails);
  const userToken = userDetails.token;
  const dispatch = useDispatch();

  useEffect(() => {
    setRecords(inventoryDetails); // Update records when inventoryDetails changes
  }, [inventoryDetails]);

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    try {
      (async () => {
        const inventory = await axios.get(
          'http://localhost:8000/api/inventoryitem/getallinventory',
          config
        );
        dispatch(setInventoryDetails(inventory.data.inventoryItems));
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFilter = (event) => {
    const newData = inventoryDetails.filter((row) => {
      return row.productname.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const column = [
    {
      name: 'Product Name',
      selector: (row) => row.productname,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
  ];

  return (
    <div className='mt-5'>
      <div className='text-end'>
        <input className='border-2 border-black rounded' onChange={handleFilter} type='text' />
      </div>
      <DataTable columns={column} data={records} selectableRows fixedHeader pagination />
    </div>
  );
}

export default InventoryTable;
