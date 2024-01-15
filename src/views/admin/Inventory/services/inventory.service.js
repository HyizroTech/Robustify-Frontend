import axios from "axios";

export const InventoryServices = {
  listPurchases: async () => {
    const res = await axios.get("/purchases?status=Booked");
    return res?.data?.purchases.map((purchase) => {
      return {
        id: purchase.id,
        item: purchase.item.itemName,
        quantity: purchase.quantity,
        purchaseDate: purchase.purchaseDate.split("T")[0],
        bookInDate: purchase.bookInDate
          ? purchase.bookInDate.split("T")[0]
          : "NA",
        supplierName: purchase.Supplier.name,
        phone: purchase.Supplier.phone,
      };
    });
  },
};
