import { Request, Response } from "express";
import Product from "../models/product";
import SalesData from "../models/sale";
import { getAllProduct } from "../services/productService";
// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  console.log("getAllProducts");
  try {
    const products = await getAllProduct();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get trending products (top-selling products)
export const getTrendingProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ total_sales: -1 }).limit(5);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending products" });
  }
};

// Get sales data by category
export const getSalesByCategory = async (req: Request, res: Response) => {
  try {
    const salesData = await SalesData.aggregate([
      {
        $group: {
          _id: "$category",
          total_sales: { $sum: "$sales" }
        }
      }
    ]);
    res.json(salesData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales by category" });
  }
};
