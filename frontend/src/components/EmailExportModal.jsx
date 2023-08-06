import React, { useState } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function EmailExportModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    subject: Yup.string()
      .max(100, "Subject must be 100 characters or less")
      .required("Subject is required"),
    recipientemail: Yup.string()
      .email("Invalid email format")
      .required("Recipient email is required"),
    body: Yup.string().required("Body is required"),
    file: Yup.mixed().required("File attachment is required"),
  });

  const [recipientemail, setRecipientEmail] = useState('');
  const [file, setFile] = useState(null);
const [body , setBody] = useState("")
const [subject , setSubject ] = useState("")

  const handleEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };
  const handleBodyChange = (e)=>{
    setBody(e.target.value)
  }
  const handleSubjectChange = (e)=>{
    setSubject(e.target.value)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("dfdf",recipientemail)
    const formData = new FormData();
    formData.append('email', recipientemail);
    formData.append('file', file);
    formData.append('body', body);
    formData.append('text', subject);

    console.log("form data ",formData)
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/sales/sendemail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onClose()
      toast.success('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
    setLoading(false);
  };

 

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
                <h3 className="mb-4  text-center   text-xl font-medium text-gray-900 dark:text-white">
                  Send Email
                </h3>

           
                  <form onSubmit={handleSubmit} className="space-y-6 pb-5" action="#">
                    <div>
               
                  
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block  text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Subject
                      </label>
                      <input
                      onChange={handleSubjectChange}
                        type="text"
                        id="subject"
                        name="subject"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="subject"
                      />
                      
                    </div>
                    <div>
                      <label
                        htmlFor="recipientemail"
                        className="block  text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reccipient Email
                      </label>
                      <input
                      onChange={handleEmailChange}
                        type="email"
                        id="recipientemail"
                        name="recipientemail"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="recipientemail"
                      />
                    
                    </div>
                    <div>
                      <label
                        htmlFor="body"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Body
                      </label>
                      <input
                      onChange={handleBodyChange}
                        type="text"
                        id="body"
                        name="body"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="body"
                      />
                 
                    </div>
                    <div>
                      <label
                        htmlFor="file"
                        className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        File
                      </label>
                      <input
                      onChange={handleFileChange}
                        type="file"
                        id="file"
                        name="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="file"
                      />
                     
                    </div>
{
  loading ?  <button
  type="submit"
  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Sending...
</button> :

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Send
                    </button>}
                  </form>
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

export default EmailExportModal;
