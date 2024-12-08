<style scoped>
.trending-products {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trending-products h2 {
  margin-bottom: 1rem;
}

.trending-products form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.trending-products label {
  margin-right: 0.5rem;
}

.trending-products input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.trending-products button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.trending-products button:hover {
  background-color: #3e8e41;
}

.trending-products ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.trending-products li {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.trending-products li:last-child {
  border-bottom: none;
}

.trending-products p {
  margin-top: 1rem;
}
</style>

<template>
  <div class="trending-products">
    <h2>Trending Products</h2>
    <form @submit.prevent="updateList">
      <label for="from">From:</label>
      <input type="date" id="from" v-model="fromDate" />
      <label for="to">To:</label>
      <input type="date" id="to" v-model="toDate" />
      <label for="quantity">Minimum Quantity:</label>
      <input type="number" id="quantity" v-model="minQuantity" />
      <button type="submit">Update</button>
    </form>
    <ul v-if="filteredProducts.length">
      <li v-for="product in filteredProducts" :key="product._id">
        {{ product.productName }} - {{ product.quantity }} - ${{ product.totalAmount }}
      </li>
    </ul>
    <p v-else-if="products.length">No products with quantity of {{ minQuantity }} or more</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { fetchTrendingProducts } from "../../services/api";

export default defineComponent({
  name: "TrendingProducts",
  setup() {
    const products = ref<any[]>([]);
    const minQuantity = ref(0);
    const fromDate = ref("2022-01-01");
    const toDate = ref("2024-12-31");

    const filteredProducts = computed(() =>
      products.value.filter((product) => product.quantity >= minQuantity.value)
    );

    const updateList = async () => {
      try {
        const response = await fetchTrendingProducts(fromDate.value, toDate.value);
        products.value = response.trending_products;
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
      }
    };

    onMounted(async () => {
      await updateList();
    });

    return { products, minQuantity, fromDate, toDate, filteredProducts, updateList };
  },
});
</script>

