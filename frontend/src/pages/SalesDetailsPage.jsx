import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import SalesAddingModal from '../components/SalesAddingModal';
import { setSalesData } from '../redux/features/salesSlice'
import { Toaster, toast } from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";
import {CSVLink} from 'react-csv';
import EmailExportModal from '../components/EmailExportModal';


function SalesDetailsPage() {
  const { userDetails } = useSelector(state => state.user);
  const [isSalesModalOpen , setIsSalesModalOpen] = useState(false)
  const [isEmailModalOpen , setIsEmailModalOpen] = useState(false)
  const [filteredSales, setfilteredSales] = useState([]);
  const [sales , setSales] = useState([])
  const dispatch = useDispatch();
  const componentRef = useRef();
  const { salesData } = useSelector(state => state.sales)

  
  //printing function of sales report 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true)
  }
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
  }
  
  const handleOpenModal = () => {
    setIsSalesModalOpen(true)
  };
  
  const handleCloseModal = () => {
    setIsSalesModalOpen(false)
  };
  
  useEffect(()=>{
  fetchSales()
  },[])

  const fetchSales = async () => {
    try {
      const apiUrl = 'http://localhost:8000/api/sales/getallsalesdetails';
      const userToken = userDetails?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      dispatch(setSalesData(response.data));
      setSales(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === '') {
      setfilteredSales([]); // Reset the filtered data when the input is empty
    } else {
      const newData = customers.filter((row) => row.name.toLowerCase().includes(value));
      setfilteredSales(newData);
    }
  };

 

  const columns = [
    {
      name: 'Product name',
      selector: (row) => row?.productname,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) =>new Date(row?.date).toLocaleString("en-US") ,
    },
    {
      name: 'Quantity',
      selector: (row) => row?.quantity,
    },
    {
      name:"Customer name",
      selector: (row)=> row?.customername
    },
    {
      name:"Total Amount",
      selector:(row) => row?.cash
    }
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
    documentTitle: "SalesReport",
    onAfterPrint:()=>alert("Report saved in PDF")
  });

  return (
    <div>
      <button
        className="bg-orange-400 hover:scale-90 transition duration-300 p-1 text-white rounded mt-5 mx-5 px-2"
        onClick={handleOpenModal}
      >
        Add Sale
      </button>
      <SalesAddingModal   isOpen={isSalesModalOpen} onClose={handleCloseModal} />
      <div>
        <h1 className='mx-5 font-medium text-3xl mt-4'>Sales Details</h1>
      </div>
      <div className="text-end m-5  "> 
      <EmailExportModal  isOpen={isEmailModalOpen} onClose={handleCloseEmailModal} />
      <button onClick={handleOpenEmailModal}  className='bg-red-500 text-white rounded px-2 py-1 hover:scale-90 transition duration-300 mx-2 '>Send Email</button>
      <button className='bg-red-500 text-white rounded px-2 py-1 hover:scale-90 transition duration-300 mx-2 ' onClick={generatePDF}>PDF</button>
      <CSVLink filename='Sales Report' data={filteredSales.length > 0 ? filteredSales : sales } className='hover:scale-90 transition duration-300 bg-green-600 rounded px-2 py-1 text-white '>Export data in Excel</CSVLink>

      <button className='bg-gray-500 px-2 rounded py-1 hover:scale-90 transition duration-300 mx-2 n text-white' onClick={handlePrint}>Print</button>

        <input className="border-2 border-black rounded" onChange={handleFilter} type="text" />
      </div> 
     <div className="m-5 w-auto" ref={componentRef}>
      <div ref={componentRef} className='w-auto' >
     <DataTable
  id="table-to-xls" // Set an id for the table
  className='table'
  persistTableHead // Add this property to persist the table head and include it in the export
  pagination
  columns={columns}
  data={filteredSales.length > 0 ? filteredSales : salesData}
  selectableRows
  fixedHeader
  customStyles={customStyles}
  noDataComponent="No data found"
/></div>
      </div>
      <Toaster/>
    </div>
  );
}

export default SalesDetailsPage;
