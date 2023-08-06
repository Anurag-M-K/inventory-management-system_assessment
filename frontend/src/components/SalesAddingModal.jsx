import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryDetails } from "../redux/features/inventorySlice";
import { setBlur } from "../redux/features/blurSlice";
import { setCustomers } from "../redux/features/customerSlice";
import { setSalesData } from "../redux/features/salesSlice";

function SalesAddingModal({ isOpen, onClose }) {
  const [ items ,setItem ] = useState([])
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validate = Yup.object({
    productname: Yup.string()
      .max(100, "Product name must be 100 characters or less")
      .required("Product name is required"),
    date: Yup.date().required("Date must be valid"),
    quantity: Yup.number().required("Product quantity required"),
    customername: Yup.string()
      .max(50, "Customer name must be 50 or less")
      .required("Please enter customer name"),
    cash: Yup.number().required("Please enter cash"),
  });

  const { userDetails } = useSelector((state) => state.user);
  const { inventoryDetails } = useSelector((state) => state.inventory);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/sales/addsale`;
      const userToken = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.post(apiUrl, values, config);
      setLoading(false);

      if (response.status === 201) {
        // Show a success toast if the form submission is successful
        toast.success("Sale record added successfully");

  
        onClose();
      } 
       else {
        // Show an error toast if there's an issue with the form submission
        toast.error("Failed to add sale record. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/sales/getallsalesdetails`;
      const userToken = userDetails.token;

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
  useEffect(()=>{
    fetchSales()
  },[])
 
  return (
    <>
      {isOpen ? (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] flex justify-center items-center max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => onClose()}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add Sales details
                </h3>

                <Formik
                  initialValues={{
                    productname: "",
                    date: "",
                    quantity: "",
                    customername: "",
                    cash: "",
                  }}
                  validationSchema={validate}
                  onSubmit={handleSubmit}
                >
                  <Form className="space-y-6 pb-5" action="#">
                    <div>
                      <label
                        htmlFor="productname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Name
                      </label>
                      <Field
                        as="select" // Use a dropdown (select) instead of input
                        id="productname"
                        name="productname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // onChange={handleProductSelection}
                      >
                        <option value="" disabled>
                          Select a product
                        </option>
                        {/* Populate options from inventoryDetails */}
                        {inventoryDetails.map((product) => (
                          <option
                            className="text-black"
                            key={product.id}
                            value={product.name}
                          >
                            {product.productname}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="productname"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <Field
                        type="date"
                        id="date"
                        name="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Date"
                      />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <Field
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Quantity"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="customername"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Customer Name
                      </label>
                      <Field
                        type="text"
                        id="customername"
                        name="customername"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Customer Name"
                      />
                      <ErrorMessage
                        name="customername"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cash"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Cash
                      </label>
                      <Field
                        type="number"
                        id="cash"
                        name="cash"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Cash"
                      />
                      <ErrorMessage
                        name="cash"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
{
  loading  ?  <button
  type="submit"
  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Saving...
</button>: 

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    }
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SalesAddingModal;
