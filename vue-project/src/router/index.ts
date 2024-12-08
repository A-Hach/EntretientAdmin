import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TotalSales from "../components/Analytics/TotalSales.vue";
import TrendingProducts from "../components/Analytics/TrendingProducts.vue";
import CategorySales from "../components/Analytics/CategorySales.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/analytics/total_sales", component: TotalSales },
  { path: "/analytics/trending_products", component: TrendingProducts },
  { path: "/analytics/category_sales", component: CategorySales },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
