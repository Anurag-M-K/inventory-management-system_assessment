import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInventoryDetails } from "../redux/features/inventorySlice";
import { setBlur } from "../redux/features/blurSlice";
import { setCustomers } from "../redux/features/customerSlice";

function CustomerAddingModal({ setCustomers, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validate = Yup.object({
    name: Yup.string()
      .max(100, " name must be 100 characters or less")
      .required("Customer name is required"),
    address: Yup.string().required("address must be 150 or less"),
    mobile: Yup.number().required("Mobile must be 10 digits"),
  });

  const { userDetails } = useSelector((state) => state.user);

  
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/customer/addcustomer`;
      const apiUrl2 = `${import.meta.env.VITE_APP_BACKEND_URL}/customer/getallcustomers`;
      const userToken = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.post(apiUrl, values, config);
      const customers = await axios.get(apiUrl2, config);
      dispatch(setCustomers(customers.data));
      setCustomers(customers.data);
      setLoading(false);

      if (response.status === 201) {
        // Show a success toast if the form submission is successful
        toast.success("Customer added successfully");
        // Update the inventory details in Redux store
        dispatch(setInventoryDetails(response.data.customer));
        // Close the modal after successful form submission
        onClose();
      } else {
        // Show an error toast if there's an issue with the form submission
        toast.error("Failed to add Customer details. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Customer details. Please try again later.");
      setLoading(false);
      onClose();
    }
  };
  const handleClose = () => {
    dispatch(setBlur(false))
    onClose()
  }

  return (
    <>
      {isOpen ? (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] flex justify-center items-center max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={handleClose}
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
                  Add Customer details
                </h3>

                <Formik
                  initialValues={{
                    name: "",
                    address: "",
                    mobile: "",
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
                        Customer Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Customer name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <Field
                        type="text"
                        id="address"
                        name="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile
                      </label>
                      <Field
                        type="tele"
                        id="mobile"
                        name="mobile"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Mobile number"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
{
  loading ? <button
  type="submit"
  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Saving...
</button> : 

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>}
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

export default CustomerAddingModal;
