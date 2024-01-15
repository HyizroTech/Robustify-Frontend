import React, { useState, useEffect } from "react";

// Services
import { InventoryServices } from "../services/inventory.service";

// Components
import GeneralTable from "../../../../components/GeneralTable";

// Contstans
import { PurchaseHistoryColumns } from "../../../../constants/tableColumns.const";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const getPurchases = async () => {
      try {
        const result = await InventoryServices.listPurchases();
        setPurchases(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    getPurchases();
  }, []);
  return (
    <div>
      <h2>Purchase History</h2>
      <GeneralTable columns={PurchaseHistoryColumns} rows={purchases} />
    </div>
  );
};

export default PurchaseHistory;
