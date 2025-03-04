import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import InventoryHeader from "./Inventory/InventoryHeader";
import InventoryTable from "./Inventory/InventoryTable";

import { useInventory } from "./Inventory/InventoryContext/InventoryContext";

const InventoryPage = () => {
  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="inventory" />

      <div
        className="container d-flex flex-column gap-4"
        style={{ paddingTop: "80px" }}
      >
        <h3>Inventory</h3>

        <InventoryHeader />
        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryPage;
