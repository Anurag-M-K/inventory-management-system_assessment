import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children, onAddProductClick }) => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard"); // State variable to track active tab
  const Menus = [
    { title: "Dashboard", src: "../assets/Chart_fill.png" },
    { title: "Add Products", src: "../assets/Folder.png" },
    { title: "Costumers", src: "../assets/User.png", gap: true },
    { title: "Sales", src: "../assets/Calendar.png" },
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
    } else {
      console.log("Navigating to Sales page...");
      navigate("/sales");
    }
  };
  

  return (
    <div className={`flex  h-screen ${bluring ? "blur-sm" : "blur-none"}`}>
      <div
        className={`  ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple   h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${index === 0 && ""} ${
                activeTab === Menu.title ? "bg-light-white" : "" // Add this condition to apply the background for the active tab
              }`}
              onClick={() => handleMenuClick(Menu.title)}
            >
              <img src={`./src/assets/${Menu.src}.png`} alt={Menu.title} />
              <span
                className={`${!open && "hidden"} origin-left duration-200`}
              >
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
