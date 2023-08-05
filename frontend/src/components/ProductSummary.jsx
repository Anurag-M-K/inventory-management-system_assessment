import React from 'react'
import InventoryStatusBox from './InventoryStatusBox'
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
function ProductSummary() {
    // Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

  return (
    <div className='w-full '>
        <h3 className='text-2xl font-medium m-2'>Inventory Status</h3>
        <div className=' grid lg:grid-cols-4 gap-x-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            <InventoryStatusBox
            icon={productIcon}
            title={"Total Products"}
            count={5}
            bgColor="blue"
            />
            <InventoryStatusBox
            icon={earningIcon}
            title={"Total Store Value"}
            count={5}
            bgColor="blue"
            />
            <InventoryStatusBox
            icon={outOfStockIcon}
            title={"Out of Stock"}
            count={5}
            bgColor="blue"
            />
            <InventoryStatusBox
            icon={categoryIcon}
            title={"All Categories"}
            count={5}
            bgColor="blue"
            />
        </div>
    
    </div>
  )
}

export default ProductSummary