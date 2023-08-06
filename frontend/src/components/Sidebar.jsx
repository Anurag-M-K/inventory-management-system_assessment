import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import controlImage from "../assets/control.png";
import logoImage from "../assets/logo.png";
import { FaUser, FaCalendar, FaSearch, FaTachometerAlt } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";

const Sidebar = ({ children, onAddProductClick }) => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const Menus = [
    { title: "Dashboard", icon: <FaTachometerAlt size={20} /> },
    { title: "Add Products", icon: <MdOutlineInventory size={20} /> },
    { title: "Costumers", icon: <FaUser size={20} />, gap: true },
    { title: "Sales", icon: <FaCalendar size={20} /> },
    { title: "Items", icon: <FaSearch size={20} /> },
  ];

  const { bluring } = useSelector((state) => state.blur);

  const navigate = useNavigate();

  const handleMenuClick = (title) => {
    console.log("Clicked menu item:", title);
    setActiveTab(title);
    if (title === "Add Products") {
      onAddProductClick();
    } else if (title === "Costumers") {
      navigate("/customers");
    } else if (title === "Dashboard") {
      navigate("/dashboard");
    } else if (title === "Items") {
      navigate("/itemspage");
    } else {
      console.log("Navigating to Sales page...");
      navigate("/sales");
    }
  };

  return (
    <div className={`flex   h-screen ${bluring ? "blur-sm" : "blur-none"}`}>
      <div
        className={`  ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple   h-[200%] md:h-[140%] p-5   pt-8 relative duration-300`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logoImage}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Inventory
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && ""} ${
                activeTab === Menu.title ? "bg-light-white" : "" // Add this condition to apply the background for the active tab
              }`}
              onClick={() => handleMenuClick(Menu.title)}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
