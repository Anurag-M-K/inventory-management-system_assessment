import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function CustomerLedger() {
  const location = useLocation();
  const { userDetails } = useSelector(state => state.user);
  const [customerLedger, setCustomerLedger] = useState([]);
  const [filteredCustomerLedger, setFilteredCustomerLedger] = useState([]);

  const pathname = location.pathname;
  const id = pathname.split("/").pop();

  const fetchCustomerLedger = async () => {
    try {
      const apiUrl = `http://localhost:8000/api/customer/customerledger/${id}`;
      const userToken = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      setCustomerLedger(response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerLedger();
  }, [filteredCustomerLedger]);
 
  const columns = [
    { name: 'Date', selector: (row) =>  new Date(row?.date).toLocaleString("en-US"), sortable: true },
    { name: "Product", selector: (row) => row?.productname },
    { name: "Quantity", selector: (row) => row?.quantity },
    { name: "Total Amount", selector: (row) => row?.cash }
  ];
  const columns2 = [
    { name: ' ', selector: (row) => row?.date, sortable: true },
    { name: " ", selector: (row) => row?.productname },
    { name: " ", selector: (row) => row?.quantity },
    { name: "Total Amount", selector: (row) => row?.cash }
  ];

  const customStyles = {
    headCells: {
      style: {
        background: '#293585',
        color: 'white',
      },
    },
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === '') {
      setFilteredCustomerLedger([]);
    } else {
      const newData = customerLedger?.sales?.filter((row) => row.productname.toLowerCase().includes(value));
      setFilteredCustomerLedger(newData);
    }
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    customerLedger?.sales?.forEach((sale) => {
      totalAmount += sale.cash;
    });
    return totalAmount;
  };

  // Create an array with the total amount row
  const totalAmountRow = [
    {
      date: "Total Amount Spent:",
      productname: "",
      quantity: "",
      cash: calculateTotalAmount(), // Calculate and include the total amount in the row
    },
  ];

  return (
    <div>
      <div>
      <h1 className="text-center font-bold mt-5">CUSTOMER LEDGER DETAILS</h1>
        <div className="m-5">
          <h1 className="m-2">Customer name : <span className="font-medium ">{customerLedger?.customer?.name}</span></h1>
          <h1 className="m-2">Mobile : <span className="font-medium ">{customerLedger?.customer?.mobile}</span></h1>
          <h1 className="m-2">Address : <span className="font-medium ">{customerLedger?.customer?.address}</span></h1>
        </div>
      </div>
      <div className="m-5">
        <DataTable
          noHeader
          columns={columns}
          data={filteredCustomerLedger?.length > 0 ? filteredCustomerLedger : customerLedger?.sales}
          selectableRows
          fixedHeader
          customStyles={customStyles}
        />
      </div>
      <div className="m-5">
        <DataTable
          noHeader
          columns={columns2}
          data={totalAmountRow} // Use the totalAmountRow array here
          noDataComponent=""
          customStyles={{
            rows: {
              style: {
                backgroundColor: '#f3f4f6',
                fontSize: '1rem',
                fontWeight: '500',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default CustomerLedger;
