<template>
  <div class="total-sales">
    <h2>Total Sales</h2>
    <p v-if="isLoading">Loading...</p>
    <p v-else>${{ totalSales }}</p>
    <form @submit.prevent="updateTotalSales" class="date-form">
      <label for="from">From: </label>
      <input type="date" v-model="from" id="from" />
      <label for="to">To: </label>
      <input type="date" v-model="to" id="to" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchTotalSales } from "../../services/api";

export default defineComponent({
  name: "TotalSales",
  setup() {
    const totalSales = ref<number>(0);
    const isLoading = ref<boolean>(true);
    const from = ref<string>("2022-01-01");
    const to = ref<string>("2024-12-31");

    onMounted(async () => {
      totalSales.value = await fetchTotalSales(from.value, to.value);
      isLoading.value = false;
    });

    const updateTotalSales = async () => {
      isLoading.value = true;
      totalSales.value = await fetchTotalSales(from.value, to.value);
      isLoading.value = false;
    };

    return { totalSales, isLoading, from, to, updateTotalSales };
  },
});
</script>

<style scoped>
.total-sales {
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.date-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #369a6e;
}
</style>
