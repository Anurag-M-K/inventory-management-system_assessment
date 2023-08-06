import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("secrete");
    toast.success("Logout successfully");
    navigate("/login");
  };
  return (
    <div className="flex  flex-row w-full justify-between px-10 py-5 border-b-2">
      <div>
        <h1 className="text-2xl md:text-4xl font-medium ">
          Welcome,{" "}
          <span className="text-orange-500 ">
            {userDetails?.user?.username}
          </span>
        </h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-orange-400 text-white p-2 rounded hover:scale-90 transition duration-300"
        >
          Logout
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Header;
