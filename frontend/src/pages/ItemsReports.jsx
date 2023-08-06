import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { setInventoryDetails } from '../redux/features/inventorySlice';
import axios from 'axios';
import { CiRead } from "react-icons/ci";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { useReactToPrint } from "react-to-print";
import {CSVLink} from 'react-csv';
import Dropdown from "react-dropdown-select";


function ItemsReports() {
  const [selectedOption, setSelectedOption] = useState("");

  const { userDetails } = useSelector((state) => state.user);
  const { inventoryDetails } = useSelector((state) => state.inventory);

  const [records, setRecords] = useState(inventoryDetails);
  const [selectedRow, setSelectedRow] = useState(null);
  const userToken = userDetails.token;
  const dispatch = useDispatch();
  const componentRef = useRef();

   //printing function of Items report 
   const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })
  
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
          `${import.meta.env.VITE_APP_BACKEND_URL}/inventoryitem/getallinventory`,
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
          `${import.meta.env.VITE_APP_BACKEND_URL}/inventoryitem/deleteinventory/${row._id}`,
          config
        );
        const inventory = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/inventoryitem/getallinventory`,
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
   
  ];

  const customStyles = {
    headCells: {
      style: {
        background: '#293585',
        color: 'white',
      },
    },
  };

  const generatePDF= useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "ItemsReport",
    onAfterPrint:()=>alert("Report saved in PDF")
  });

  const dropdownOptions = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "excel" },
    { label: "Print", value: "print" },
  ];

  const handleDropdownChange = (selectedItems) => {
    setSelectedOption(selectedItems[0].value);
  };
  
  return (
    <div className='mt-5 m-3'>
      <h2 className='text-center mb-10 text-2xl font-medium'>ITEMS DETAILS </h2>
      <div className='text-end m-5'>
<div className='md:hidden my-3'>

  <Dropdown
    options={dropdownOptions}
    values={[selectedOption]}
    onChange={handleDropdownChange}
    placeholder="Select an option"
    />
    </div>
    <div className='hidden md:flex'>
    <button className='bg-red-500 text-white rounded px-2 py-1 hover:scale-90 transition duration-300 mx-2 ' onClick={generatePDF}>PDF</button>
      <CSVLink filename='Sales Report' data={inventoryDetails} className='hover:scale-90 transition duration-300 bg-green-600 rounded px-2 py-1 text-white '>Export data in Excel</CSVLink>

      <button className='bg-gray-500 px-2 rounded py-1 hover:scale-90 transition duration-300 mx-2 n text-white' onClick={handlePrint}>Print</button>

    </div>
  {selectedOption === "pdf" && (
    <button
      className="bg-red-500 text-white rounded px-2 py-1 hover:scale-90 transition duration-300 mx-2"
      onClick={generatePDF}
    >
      PDF
    </button>
  )}
  {selectedOption === "excel" && (
    <CSVLink
      filename="Sales Report"
      data={inventoryDetails}
      className="hover:scale-90 transition duration-300 bg-green-600 rounded px-2 py-1 text-white"
    >
      Export data in Excel
    </CSVLink>
  )}
  {selectedOption === "print" && (
    <button
      className="bg-gray-500 px-2 rounded py-1 hover:scale-90 transition duration-300 mx-2 n text-white"
      onClick={handlePrint}
    >
      Print
    </button>
  )}


        <input className='border-2 border-black rounded' onChange={handleFilter} type='text' />
      </div>
      <div className='table-container overflow-x-auto'>

      <DataTable  id="table-to-xls" // Set an id for the table
  className='table' pagination   persistTableHead // Add this property to persist the table head and include it in the export
   columns={columns} data={records}  fixedHeader customStyles={customStyles} noDataComponent="No data found" />
      </div>

     
    </div>
  );
}

export default ItemsReports;
