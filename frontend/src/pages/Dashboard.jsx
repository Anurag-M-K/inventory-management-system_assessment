import React from "react";
import ProductSummary from "../components/ProductSummary";
import InventoryTable from "../components/InventoryTable";

function Dashboard() {
  return (
    <>
      <ProductSummary />
      <InventoryTable />
    </>
  );
}

export default Dashboard;
