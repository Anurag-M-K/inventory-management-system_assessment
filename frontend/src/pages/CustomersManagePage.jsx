import React, { useState, useEffect } from "react";
import CustomerAddingModal from "../components/CustomerAddingModal";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../redux/features/customerSlice";
import axios from "axios";
import DataTable from "react-data-table-component";
import { setBlur } from "../redux/features/blurSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function CustomersManagePage() {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const { customersDetils } = useSelector((state) => state.customer);
  const { userDetails } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState(customersDetils);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsCustomerModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsCustomerModalOpen(false);
    dispatch(setBlur(false))

  };

  const fetchCustomers = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/customer/getallcustomers`;
      const userToken = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      dispatch(setCustomers(response?.data));
      setCustomers(response?.data);
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === "") {
      setFilteredCustomers([]); // Reset the filtered data when the input is empty
    } else {
      const newData = customers?.filter((row) =>
        row?.name?.toLowerCase().includes(value)
      );
      setFilteredCustomers(newData);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    {
      name: "Customer name",
      selector: (row) => row?.name,
      sortable: true,
      cell: (row) => (
        <div
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate(`/customer-ledger/${row?._id}`)}
        >
          {row?.name}
        </div>
      ),
    },
    {
      name: "Address",
      selector: (row) => row?.address,
    },
    {
      name: "Mobile",
      selector: (row) => row?.mobile,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        background: "#293585",
        color: "white",
      },
    },
  };

  return (
    
    <>
      
      <h1 className="text-2xl font-medium text-center mt-5">All Customers</h1>
      <button
        className="bg-orange-400 hover:scale-90 transition duration-300 p-1 text-white rounded mt-5 mx-5 px-2"
        onClick={handleOpenModal}
      >
        Add Customer
      </button>

      <CustomerAddingModal
        setCustomers={setCustomers}
        isOpen={isCustomerModalOpen}
        onClose={handleCloseModal}
        />
      <div className="text-end m-5 ">
        <input
          className="border-2 border-black rounded"
          onChange={handleFilter}
          type="text"
        />
      </div>
      <div className="m-5">
        <DataTable
          pagination
          columns={columns}
          data={filteredCustomers.length > 0 ? filteredCustomers : customers}
          selectableRows
          fixedHeader
          customStyles={customStyles}
        />
      <Toaster/>

      </div>
    </>
  );
}

export default CustomersManagePage;
