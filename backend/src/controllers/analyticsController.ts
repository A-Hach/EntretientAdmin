import { Request, Response } from "express";
import { getTotalSales, getTrendingProducts, getCategorySales, getSales } from "../services/analyticsService";

export const getTotalSalesController = async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;
  try {
    const totalSales = await getTotalSales(start_date as string, end_date as string);
    res.json({ total_sales: totalSales });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total sales." });
  }
};

export const getTrendingProductsController = async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;
  try {
    const trendingProducts = await getTrendingProducts(start_date as string, end_date as string);
    res.json({ trending_products: trendingProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending products." });
  }
};

export const getCategorySalesController = async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;
  try {
    const categorySales = await getCategorySales(start_date as string, end_date as string);
    res.json({ category_sales: categorySales });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category sales." });
  }
};

