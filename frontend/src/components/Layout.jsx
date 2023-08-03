import React from "react";
// import Footer from "../footer/Footer";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <div style={{ minHeight: "80vh" }} className="">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
