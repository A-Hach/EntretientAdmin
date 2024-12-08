<style scoped>
  #categorySalesChart, #categorySalesPercentageChart {
    width: 100%;
    max-width: 600px;
    height: 400px;
    border: none;
    border-radius: 8px;
    margin: 20px auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 600px;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fafafa;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    text-align: center;
    font-size: 1.2rem;
    color: #777;
  }
</style>
<template>
  <div>
    <h2>Category Sales</h2>
    <form @submit.prevent="updateCategorySales" class="date-form">
      <label for="from">From: </label>
      <input type="date" v-model="from" id="from" />
      <label for="to">To: </label>
      <input type="date" v-model="to" id="to" />
      <button type="submit">Update</button>
    </form>
    <ul v-if="categorySales.length">
      <li v-for="category in categorySales" :key="category.category">
        <span>{{ category.category }}</span>
        <span>${{ category.sale_count }}</span>
        <span>{{ category.sales_percentage }}%</span>
      </li>
    </ul>
    <p v-else>Loading...</p>
    <div v-if="categorySales.length">
      <canvas id="categorySalesChart"></canvas>
      <canvas id="categorySalesPercentageChart"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchCategorySales } from "../../services/api";
import Chart from "chart.js/auto";
import { nextTick } from 'vue';

export default defineComponent({
  name: "CategorySales",
  setup() {
    const categorySales = ref<any[]>([]);
    const from = ref("2022-01-01");
    const to = ref("2024-12-31");

    const renderCharts = () => {
      const salesCtx = (document.getElementById("categorySalesChart") as HTMLCanvasElement).getContext("2d");
      const percentageCtx = (document.getElementById("categorySalesPercentageChart") as HTMLCanvasElement).getContext("2d");

      if (salesCtx) {
        new Chart(salesCtx, {
          type: "bar",
          data: {
            labels: categorySales.value.map((c) => c.category),
            datasets: [{
              label: "Sales Count",
              data: categorySales.value.map((c) => c.sale_count),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }

      if (percentageCtx) {
        new Chart(percentageCtx, {
          type: "pie",
          data: {
            labels: categorySales.value.map((c) => c.category),
            datasets: [{
              label: "Sales Percentage",
              data: categorySales.value.map((c) => c.sales_percentage),
              backgroundColor: categorySales.value.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
              borderColor: "rgba(255, 255, 255, 1)",
              borderWidth: 1
            }]
          }
        });
      }
    };

    const updateCategorySales = async () => {
      const response = await fetchCategorySales(from.value, to.value);
      categorySales.value = response.category_sales;
      await nextTick();
      renderCharts();
    }

    onMounted(async () => {
      await updateCategorySales();
    });

    return { categorySales, from, to, updateCategorySales };
  },
});
</script>

