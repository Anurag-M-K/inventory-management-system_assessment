import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { setInventoryDetails } from '../redux/features/inventorySlice';
import { setBlur } from '../redux/features/blurSlice';

function AddProductModal({ setIsModalOpen, isModalOpen }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const validate = Yup.object({
    productname: Yup.string()
      .max(100, 'Product name must be 100 characters or less')
      .required('Product name is required'),
    quantity: Yup.number().required('Quantity must be 50 or less'),
    price: Yup.number().required(),
    description: Yup.string().max(200, 'Description must be 200 or less'),
  });

  const { userDetails  } = useSelector(state=>state.user) 

 
  const handleSubmit = async (values) => {
    try {
    
      setLoading(true); // Set loading state to true while the form is being submitted

      // Your API endpoint to submit the form data
      const apiUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/inventoryitem/addproduct`;
      const userToken = userDetails.token;

      // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };


      // Make a POST request to the server to submit the form data
      const response = await axios.post(apiUrl, values,config );
      const inventory = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/inventoryitem/getallinventory`,
        config
      );
      dispatch(setInventoryDetails(inventory.data.inventoryItems));
      dispatch(setBlur(false))
      // Handle the response, for example, show a success message
      console.log('Form submitted successfully:', response.data);
      toast.success('Product added successfully!');
      setIsModalOpen(false);

      setLoading(false); // Set loading state back to false after form submission
      // closeModal(); // Close the modal after successful form submission
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product. Please try again later.');
      setLoading(false); // Set loading state back to false if there's an error
    }
  };

  const handleClose = () =>{
    setIsModalOpen(!isModalOpen ) ;
    dispatch(setBlur(false))
  }

  return (
    <>
      {/* Your Toggle modal button here... */}

      {isModalOpen ? (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] flex justify-center items-center max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={handleClose    }
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
                  Add Product
                </h3>

                <Formik
                  initialValues={{
                    productname: '',
                    quantity: '',
                    price: '',
                    description: '',
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
                        type="text"
                        id="productname"
                        name="productname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Product name"
                      />
                      <ErrorMessage
                        name="productname"
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
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <Field
                        type="number"
                        id="price"
                        name="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Price"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Description"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
{
  loading ?   <button
  type="submit"
  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Saving...
</button>
:
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
          <Toaster/>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default AddProductModal;
