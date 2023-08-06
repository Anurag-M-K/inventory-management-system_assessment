import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/inv-img.png";
import { useSelector } from "react-redux";

const Home = () => {
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="bg-[#030b6b] min-h-[100vh]  ">
      <div className="flex w-full md:ps-28 md:pe-28 ps-5 pe-5  h-24 justify-between items-center ">
        <div>
          <RiProductHuntLine color="white" size={40} />
        </div>
        <div>
          {userDetails?.user?.username ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white font-medium hover:scale-95 transition duration-300 "
            >
              Dashboard
            </button>
          ) : (
            <ul className="flex gap-2">
              <li className="text-white hover:scale-95 transition duration-300">
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <button className="bg-blue-500 hover:scale-95 transition duration-300 text-white rounded p-1">
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2    mt-16">
        <div className="flex mt-20 items-center flex-col ">
          <div className="p-5 md:ms-10">
            <h2 className="text-white my-3 text-4xl tracking-widest font-bold">
              INVENTORY MANAGEMENT
            </h2>
            <p className="text-white my-3 max-w-md overflow-hidden overflow-ellipsis line-clamp-3">
              Inventory system to control and manage products in the warehouse
              in real-time and integrated to make it easier to develop your
              business.
            </p>
            <button className="text-start border rounded px-2 py-1 text-white my-4 text-xl hover:scale-95 transition duration-300 hover:text-gray-400">
              Free trial one month
            </button>
          </div>
        </div>
        <div className="w-auto h-auto p-5">
          <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};



export default Home;
