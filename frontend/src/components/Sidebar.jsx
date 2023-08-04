import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
const Sidebar = ({ children , onAddProductClick  }) => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Add Products", src: "Folder" },
    { title: "Costumers", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  
  const { bluring } = useSelector(state => state.blur)

  const navigate = useNavigate(); // Get the history object from React Router

  const handleMenuClick = (title) => {
    if (title === "Add Products") {
      onAddProductClick();
    } else if (title === "Costumers") {
      navigate("/customers"); // Navigate to '/customers' page when clicking 'Costumers' tab
    } else if (title === "Dashboard"){
      navigate("/dashboard")
    }
  };

  return (
    <div className={`flex  h-screen ${bluring ? "blur-sm" : ""}`}>
      <div
        className={`fixed  ${
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
              } ${index === 0 && "bg-light-white"}`}
              onClick={() => handleMenuClick(Menu.title)} // Call handleMenuClick function on click
            >
              <img src={`./src/assets/${Menu.src}.png`} alt={Menu.title} />
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
