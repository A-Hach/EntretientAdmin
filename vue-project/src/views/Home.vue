<style scoped>
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    border-bottom: none;
  }

  li > span:first-child {
    font-weight: bold;
  }

  li > span:last-child {
    font-size: 1.2rem;
    color: #666;
  }
</style>

<template>
  <div>
    <h2>Product List</h2>
    <ul v-if="products.length">
      <li v-for="product in products" :key="product.ProductID">
        <span>{{ product.ProductName }} - {{ product.Category }}</span>
        <span>${{ product.Price }} - Total Sales: {{ product.total_sales }}</span>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { fetchCategorySales, fetchProducts } from "../services/api";
  
  export default defineComponent({
    name: "Home",
    setup() {
      const products = ref<any[]>([]);
  
      onMounted(async () => {
        const response = await fetchProducts();
        products.value = response; 
      });
  
      return { products };
    },
  });
  </script>
  

