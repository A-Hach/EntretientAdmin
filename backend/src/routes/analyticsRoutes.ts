import { Router } from "express";
import { getTotalSalesController, getTrendingProductsController, getCategorySalesController } from "../controllers/analyticsController";
import { getSales } from "../services/analyticsService";

const router = Router();

router.get("/total_sales", getTotalSalesController);
router.get("/trending_products", getTrendingProductsController);
router.get("/category_sales", getCategorySalesController);

export default router;
