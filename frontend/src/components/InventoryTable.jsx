import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { setInventoryDetails } from '../redux/features/inventorySlice';
import axios from 'axios';
import { CiRead } from "react-icons/ci";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import UpdateInventoryModal from './UpdateInventoryModal';

function InventoryTable() {
  const { userDetails } = useSelector((state) => state.user);
  const { inventoryDetails } = useSelector((state) => state.inventory);
  const [records, setRecords] = useState(inventoryDetails);
  const [selectedRow, setSelectedRow] = useState(null);
  const userToken = userDetails.token;
  const dispatch = useDispatch();

  useEffect(() => {
    setRecords(inventoryDetails);
  }, [inventoryDetails]);

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
      (async () => {
        const inventory = await axios.get(
          'http://localhost:8000/api/inventoryitem/getallinventory',
          config
        );
        dispatch(setInventoryDetails(inventory.data.inventoryItems));
      })();
    
  }, []);

  const handleFilter = (event) => {
    const newData = inventoryDetails.filter((row) => {
      return row.productname.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleDelete = async (row) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this inventory item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8000/api/inventoryitem/deleteinventory/${row._id}`,
          config
        );
        const inventory = await axios.get(
          'http://localhost:8000/api/inventoryitem/getallinventory',
          config
        );
        dispatch(setInventoryDetails(inventory.data.inventoryItems));

        // Show a success message using SweetAlert
        Swal.fire('Deleted!', 'The inventory item has been deleted.', 'success');
      }
    } catch (error) {
      console.log('Error deleting:', error);
    }
  };

  const columns = [
    {
      name: 'Product Name',
      selector: (row) => row?.productname,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row?.quantity,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row?.price,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row?.description,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className='flex gap-x-2'>
          <CiRead className='cursor-pointer' />
          <BiSolidEdit
            className='cursor-pointer'
            onClick={() => setSelectedRow(row)} // Set the selected row when the edit icon is clicked
          />
          <RiDeleteBin6Line
            className='cursor-pointer'
            color='red'
            onClick={() => handleDelete(row)} // Call the delete function when the button is clicked
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        background: '#293585',
        color: 'white',
      },
    },
  };

  return (
    <div className='mt-5 m-3'>
      <div className='text-end m-5'>
        <input className='border-2 border-black rounded' onChange={handleFilter} type='text' />
      </div>
      <div className=''>

      <DataTable pagination columns={columns} data={records} selectableRows fixedHeader customStyles={customStyles} />
      </div>

      {selectedRow && (
        <UpdateInventoryModal row={selectedRow} closeModal={() => setSelectedRow(null)} />
      )}
    </div>
  );
}

export default InventoryTable;
