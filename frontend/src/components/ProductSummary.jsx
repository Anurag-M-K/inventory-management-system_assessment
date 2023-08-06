import React from "react";
import InventoryStatusBox from "./InventoryStatusBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";

function ProductSummary() {
  // Icons
  const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
  const productIcon = <BsCart4 size={40} color="#fff" />;
  const categoryIcon = <BiCategory size={40} color="#fff" />;
  const outOfStockIcon = <BsCartX size={40} color="#fff" />;

  const { inventoryDetails } = useSelector((state) => state.inventory);

  function calculateTotalPrice(inventoryDetails) {
    let totalPrice = 0;

    inventoryDetails?.forEach((item) => {
      totalPrice += item?.price * item?.quantity;
    });

    return totalPrice;
  }

  const totalZeroQuantityItems = inventoryDetails?.filter(
    (item) => item?.quantity === 0
  ).length;

  let totalvalue = calculateTotalPrice(inventoryDetails);

  const statusData = [
    {
      bgColor: "cornflowerblue", // Replace with the desired color for the first box
      title: "Total Products",
      count: inventoryDetails?.length,
      icon: productIcon,
    },
    {
      bgColor: "darkkhaki", // Replace with the desired color for the second box
      title: "Total Store Value",
      count: totalvalue,
      icon: earningIcon,
    },
    {
      bgColor: "turquoise", // Replace with the desired color for the second box
      title: "Out of Stock",
      count: totalZeroQuantityItems,
      icon: outOfStockIcon,
    },
    {
      bgColor: "salmon", // Replace with the desired color for the second box
      title: "All Categories",
      count: 5,
      icon: categoryIcon,
    },
  ];
  return (
    <div className="w-full ">
      <h3 className="text-2xl font-medium m-2">Inventory Status</h3>
      <div className="  grid lg:grid-cols-4 gap-x-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {statusData.map((status, index) => {
          return (
            <div className="me-6">
              <InventoryStatusBox
                key={index}
                bgColor={status?.bgColor}
                title={status?.title}
                count={status?.count}
                icon={status?.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSummary;
