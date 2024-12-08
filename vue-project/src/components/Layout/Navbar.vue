<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/analytics/total_sales">Total Sales</router-link></li>
        <li><router-link to="/analytics/trending_products">Trending Products</router-link></li>
        <li><router-link to="/analytics/category_sales">Category Sales</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts">
  export default {
    name: "Navbar",
  };
  </script>
  