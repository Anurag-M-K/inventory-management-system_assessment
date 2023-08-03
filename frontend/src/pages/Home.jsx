import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/inv-img.png";
import { useSelector } from "react-redux";

const Home = () => {
  const { userDetails } = useSelector((state)=>state.user)
  const navigate = useNavigate()
  return (
    <div className="bg-[#030b6b] min-h-[100vh]  ">
    <div className="flex w-full justify-around h-24 items-center ">
      <div>
        <RiProductHuntLine color="white" size={40}/>
      </div>
      <div>
        {userDetails?.user?.username ?  <button onClick={()=>navigate('/dashboard')} className="text-white font-medium hover:scale-95 transition duration-300 ">Dashboard</button> : 
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
}
      </div>
    </div>
    <div className="flex w-full justify-around items-center   mt-16">
      <div className="flex  flex-col">
        <h2 className="text-white text-2xl font-medium">INVENTORY MANAGEMENT</h2>
        <p className="text-white max-w-md overflow-hidden overflow-ellipsis line-clamp-3">
          Inventory system to control and manage products in the warehouse in real-time and integrated to make it easier to develop your business.
        </p>
        <button className="text-start text-white my-4 text-xl hover:scale-95 hover:text-gray-400">Free trial one month</button>
        <div className="flex font-medium gap-x-10 text-white">
            <NumberText  num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
      </div>
      <div className="">
        <img src={heroImg} alt="" />
      </div>
    </div>
  </div>
  
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
