import { Model, Document } from "mongoose";
import Product from "../models/product";
import Sale from "../models/sale";

// Example service to calculate total sales
export const getTotalSales = async (start_date: string, end_date: string) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const sales = await Sale.aggregate([
    { $match: { Date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: null, total_sales: { $sum: "$TotalAmount" } } },
  ]);

  const sale = await Sale.aggregate([
    { $group: { _id: null, total_sales: { $sum: "$TotalAmount" } } },
  ]);

  return sales[0]?.total_sales || sale;
};
export const getSales = async () => {
  const sales = await Sale.find();
  return sales;
};
// Example service to calculate trending products
export const getTrendingProducts = async (
  start_date: string,
  end_date: string
) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const sales = await Sale.aggregate([
    { $match: { Date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$ProductID", quantity: { $sum: "$Quantity" }, totalAmount: { $sum: "$TotalAmount" } } },
    { $sort: { quantity: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "product",
        localField: "_id",
        foreignField: "ProductID",
        as: "productDetails"
      }
    },
    { $unwind: "$productDetails" },
    { $project: { _id: 0, productName: "$productDetails.ProductName", quantity: 1, totalAmount: 1 } }
  ]);
  return sales;
};

// Example service to calculate category sales
export const getCategorySales = async (
  start_date: string,
  end_date: string
) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const sales = await Sale.aggregate([
    { $match: { Date: { $gte: startDate, $lte: endDate } } },
    {
      $lookup: {
        from: "product",
        localField: "ProductID",
        foreignField: "ProductID",
        as: "product",
      },
    },
    { $unwind: "$product" },
    { $group: { _id: "$product.Category", sale_count: { $sum: 1 } } },
    { $sort: { sale_count: -1 } },
    {
      $group: {
        _id: null,
        total_sales_count: { $sum: "$sale_count" },
        categories: { $push: { category: "$_id", sale_count: "$sale_count" } },
      },
    },
    { $unwind: "$categories" },
    {
      $project: {
        category: "$categories.category",
        sale_count: "$categories.sale_count",
        sales_percentage: {
          $multiply: [
            { $divide: ["$categories.sale_count", "$total_sales_count"] },
            100,
          ],
        },
      },
    },
  ]);
  return sales;
};
