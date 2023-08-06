import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/features/userSlice";
import { Toaster, toast } from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Reset any previous error messages
      setEmailError("");
      setPasswordError("");
  
      // Perform validation
      if (!email.trim()) {
        setEmailError("Email is required");
        return;
      }
  
      if (!password.trim()) {
        setPasswordError("Password is required");
        return;
      }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
        email,
        password,
      });
      dispatch(setUserDetails(response.data))
      setLoading(false)
      // Save the token and user details in local storage or state
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successfully")
      // Redirect to the desired page
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <>
      <div className="md:px-44 px-5 flex flex-col justify-center gap-y-4 items-center">
      </div>
      <div className="py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r hidden sm:flex from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl m-5 sm:m-0 sm:p-20">
            <div className="max-w-md mx-auto min-w-[300px]">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
                  </div>
                  <div className="relative flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 hover:scale-95 duration-500 text-white rounded-md px-2 py-1"
                      onClick={handleSubmit}
                    >
                     {loading === true ? "Login..." : "Login"}
                    </button>
                    <Link to={"/signup"}>
                      <small className="text-blue-700 hover:text-blue-400 cursor-pointer">
                        Don't have an account?
                      </small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster/>  
      </div>
    </>
  );
}

export default LoginForm;
