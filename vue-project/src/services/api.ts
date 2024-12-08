import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Replace with your backend API URL

export const fetchTotalSales = async (
  start_date: string,
  end_date: string
): Promise<number> => {
  const response = await axios.get(`${API_URL}/analytics/total_sales`, {
    params: { start_date, end_date },
  });
  return response.data.total_sales;
};

export const fetchTrendingProducts = async (
  start_date: string,
  end_date: string
): Promise<any[]> => {
  const response = await axios.get(`${API_URL}/analytics/trending_products`, {
    params: { start_date, end_date },
  });
  return response.data;
};

export const fetchCategorySales = async (
  start_date: string,
  end_date: string
): Promise<any[]> => {
  const response = await axios.get(`${API_URL}/analytics/category_sales`, {
    params: { start_date, end_date },
  });
  return response.data;
};

export const fetchProducts = async (
): Promise<any[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};