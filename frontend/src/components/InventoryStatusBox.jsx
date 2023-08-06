import React from 'react';

function InventoryStatusBox({ bgColor, title, count, icon }) {
  return (
    <div style={{ backgroundColor: bgColor }} className={`w-[100%] h-[7rem] rounded sm:max-w-[17rem] mr-4 mb-4 flex justify-start items-center align-middle flex-wrap ms-3 `}>
      <span className='px-8 text-black'>{icon}</span>
      <span className='text-white'>
        <p>{title}</p>
        <h1>{count}</h1>
      </span>
    </div>
  );
}

export default InventoryStatusBox;
