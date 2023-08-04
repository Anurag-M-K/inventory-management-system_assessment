import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import SalesAddingModal from '../components/SalesAddingModal';
import { setSalesData } from '../redux/features/salesSlice'
import { Toaster, toast } from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";


function SalesDetailsPage() {
  const { userDetails } = useSelector(state => state.user);
  const [isSalesModalOpen , setIsSalesModalOpen] = useState(false)
  const [filteredSales, setfilteredSales] = useState([]);
  const [sales , setSales] = useState([])
  const dispatch = useDispatch();
  const componentRef = useRef();


  //printing function of sales report 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const handleOpenModal = () => {
    setIsSalesModalOpen(true)
  };

  const handleCloseModal = () => {
    setIsSalesModalOpen(false)
  };

  useEffect(()=>{
try {
  fetchSales()
} catch (error) {
  toast.error("something went wrong")
}
  },[])


  const fetchSales = async () => {
    try {
      const apiUrl = 'http://localhost:8000/api/sales/getallsalesdetails';
      const userToken = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      console.log("sales response ",response.data)
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

  return (
    <div>
      <button
        className="bg-orange-400 hover:scale-90 transition duration-300 p-1 text-white rounded mt-5 mx-5 px-2"
        onClick={handleOpenModal}
      >
        Add Sale
      </button>
      <SalesAddingModal  isOpen={isSalesModalOpen} onClose={handleCloseModal} />
      <div>
        <h1 className='mx-5 font-medium text-3xl mt-4'>Sales Details</h1>
      </div>
      <div className="text-end m-5 "> 
      <button className='bg-gray-500 px-2 rounded py-1 hover:scale-90 transition duration-300 mx-2 n text-white' onClick={handlePrint}>Print</button>

        <input className="border-2 border-black rounded" onChange={handleFilter} type="text" />
      </div> 
     <div className="m-5" ref={componentRef}>
        <DataTable
          pagination
          columns={columns}
          data={filteredSales.length > 0 ? filteredSales : sales}
          selectableRows
          fixedHeader
          customStyles={customStyles}
          
        />
      </div>
      <Toaster/>
    </div>
  );
}

export default SalesDetailsPage;
