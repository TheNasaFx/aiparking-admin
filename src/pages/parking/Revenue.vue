<template>
  <div class="dashboard-main-body">
    <!-- Page Title -->
    <div
      class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"
    >
      <h6 class="fw-semibold mb-0">Орлогын тайлан</h6>
      <ul class="d-flex align-items-center gap-2">
        <li class="fw-medium">
          <router-link
            to="/"
            class="d-flex align-items-center gap-1 hover-text-primary"
          >
            <iconify-icon
              icon="solar:home-smile-angle-outline"
              class="icon text-lg"
            />
            Нүүр
          </router-link>
        </li>
        <li>-</li>
        <li class="fw-medium">Орлогын тайлан</li>
      </ul>
    </div>

    <!-- Revenue Cards -->
    <div class="row gy-4">
      <!-- Total Revenue -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-48-px h-48-px bg-primary-600 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:wallet" class="text-xl" />
                </span>
              </div>
              <div class="d-flex align-items-center gap-1">
                <span
                  class="text-success-600 d-flex align-items-center gap-1 text-sm fw-medium"
                >
                  <iconify-icon icon="bxs:up-arrow" class="text-xs" />
                  {{ revenueGrowth }}%
                </span>
              </div>
            </div>
            <div class="mb-12">
              <h6 class="fw-semibold text-primary-light mb-1">Нийт орлого</h6>
              <h4 class="mb-0 text-primary-600">
                {{ formatCurrency(totalRevenue) }}
              </h4>
            </div>
            <span class="text-sm text-secondary-light">Сүүлийн 60 хоног</span>
          </div>
        </div>
      </div>

      <!-- Monthly Revenue -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-48-px h-48-px bg-success-main text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:calendar-month" class="text-xl" />
                </span>
              </div>
            </div>
            <div class="mb-12">
              <h6 class="fw-semibold text-primary-light mb-1">Сарын орлого</h6>
              <h4 class="mb-0 text-success-600">
                {{ formatCurrency(last30DaysRevenue) }}
              </h4>
            </div>
            <span class="text-sm text-secondary-light">Сүүлийн 30 хоног</span>
          </div>
        </div>
      </div>

      <!-- Today Revenue -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-48-px h-48-px bg-warning-main text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:cash" class="text-xl" />
                </span>
              </div>
              <div class="d-flex align-items-center gap-1">
                <span
                  :class="
                    todayGrowth >= 0 ? 'text-success-600' : 'text-danger-600'
                  "
                  class="d-flex align-items-center gap-1 text-sm fw-medium"
                >
                  <iconify-icon
                    :icon="todayGrowth >= 0 ? 'bxs:up-arrow' : 'bxs:down-arrow'"
                    class="text-xs"
                  />
                  {{ Math.abs(todayGrowth) }}%
                </span>
              </div>
            </div>
            <div class="mb-12">
              <h6 class="fw-semibold text-primary-light mb-1">
                Өнөөдрийн орлого
              </h6>
              <h4 class="mb-0 text-warning-600">
                {{ formatCurrency(todayRevenue) }}
              </h4>
            </div>
            <span class="text-sm text-secondary-light">Өчигдрөөс хойш</span>
          </div>
        </div>
      </div>

      <!-- Average Daily -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-48-px h-48-px bg-info-main text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:chart-line" class="text-xl" />
                </span>
              </div>
            </div>
            <div class="mb-12">
              <h6 class="fw-semibold text-primary-light mb-1">Өдрийн дундаж</h6>
              <h4 class="mb-0 text-info-600">
                {{ formatCurrency(averageDailyRevenue) }}
              </h4>
            </div>
            <span class="text-sm text-secondary-light">Дундаж орлого</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row gy-4 mt-1">
      <!-- Revenue Chart -->
      <div class="col-xxl-8">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <div>
                <h6 class="mb-2 fw-bold text-lg">Орлогын график</h6>
                <span class="text-sm fw-medium text-secondary-light"
                  >Сүүлийн 30 хоногийн орлого</span
                >
              </div>
              <div class="d-flex gap-12">
                <button
                  @click="chartPeriod = '7'"
                  :class="
                    chartPeriod === '7'
                      ? 'btn-primary-600'
                      : 'btn-outline-primary-600'
                  "
                  class="btn radius-8 px-16 py-8"
                >
                  7 хоног
                </button>
                <button
                  @click="chartPeriod = '30'"
                  :class="
                    chartPeriod === '30'
                      ? 'btn-primary-600'
                      : 'btn-outline-primary-600'
                  "
                  class="btn radius-8 px-16 py-8"
                >
                  30 хоног
                </button>
              </div>
            </div>
            <div ref="revenueChartRef" id="revenueChart" class="mt-20"></div>
          </div>
        </div>
      </div>

      <!-- Statistics Card -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-20 fw-bold text-lg">Статистик</h6>

            <!-- Total Parkings Used -->
            <div
              class="d-flex align-items-center justify-content-between gap-16 mb-20 pb-20 border-bottom"
            >
              <div class="d-flex align-items-center gap-12">
                <span
                  class="w-44-px h-44-px bg-primary-light text-primary-600 d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:car" class="text-xl" />
                </span>
                <div>
                  <h6 class="text-md fw-semibold mb-1">Ашигласан зогсоол</h6>
                  <span class="text-sm text-secondary-light"
                    >Нийт хэрэглээ</span
                  >
                </div>
              </div>
              <h5 class="text-primary-600 fw-semibold mb-0">
                {{ totalParkingsUsed }}
              </h5>
            </div>

            <!-- Average per Parking -->
            <div
              class="d-flex align-items-center justify-content-between gap-16 mb-20 pb-20 border-bottom"
            >
              <div class="d-flex align-items-center gap-12">
                <span
                  class="w-44-px h-44-px bg-success-focus text-success-600 d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:calculator" class="text-xl" />
                </span>
                <div>
                  <h6 class="text-md fw-semibold mb-1">Нэг зогсоолын дундаж</h6>
                  <span class="text-sm text-secondary-light">Орлого</span>
                </div>
              </div>
              <h5 class="text-success-600 fw-semibold mb-0">
                {{ formatCurrency(averagePerParking) }}
              </h5>
            </div>

            <!-- Busiest Day -->
            <div
              class="d-flex align-items-center justify-content-between gap-16 mb-20 pb-20 border-bottom"
            >
              <div class="d-flex align-items-center gap-12">
                <span
                  class="w-44-px h-44-px bg-warning-focus text-warning-600 d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:calendar-star" class="text-xl" />
                </span>
                <div>
                  <h6 class="text-md fw-semibold mb-1">Хамгийн өндөр орлого</h6>
                  <span class="text-sm text-secondary-light">{{
                    busiestDay.date
                  }}</span>
                </div>
              </div>
              <h5 class="text-warning-600 fw-semibold mb-0">
                {{ formatCurrency(busiestDay.income) }}
              </h5>
            </div>

            <!-- Performance Indicator -->
            <div
              class="d-flex align-items-center justify-content-between gap-16"
            >
              <div class="d-flex align-items-center gap-12">
                <span
                  class="w-44-px h-44-px bg-info-focus text-info-600 d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:trending-up" class="text-xl" />
                </span>
                <div>
                  <h6 class="text-md fw-semibold mb-1">Гүйцэтгэл</h6>
                  <span class="text-sm text-secondary-light"
                    >Зорилготой харьцуулсан</span
                  >
                </div>
              </div>
              <h5 class="text-info-600 fw-semibold mb-0">
                {{ performancePercentage }}%
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="row gy-4 mt-1">
      <div class="col-12">
        <div class="card radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">Орлогын түүх</h6>
              <div class="d-flex gap-12">
                <button
                  @click="exportData"
                  class="btn btn-outline-primary-600 radius-8 px-16 py-8"
                >
                  <iconify-icon icon="mdi:download" class="text-lg me-1" />
                  Экспорт
                </button>
              </div>
            </div>
            <div class="table-responsive scroll-sm">
              <table class="table bordered-table sm-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Огноо</th>
                    <th scope="col">Гараг</th>
                    <th scope="col">Орлого</th>
                    <th scope="col">Ашигласан зогсоол</th>
                    <th scope="col">Нэгж дундаж</th>
                    <th scope="col">Өсөлт</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in displayedRevenueData"
                    :key="item.date"
                  >
                    <td>{{ displayedRevenueData.length - index }}</td>
                    <td class="fw-semibold text-primary-light">
                      {{ formatDate(item.date) }}
                    </td>
                    <td>{{ getDayOfWeek(item.date) }}</td>
                    <td class="fw-semibold text-success-600">
                      {{ formatCurrency(item.income) }}
                    </td>
                    <td>{{ item.parkingsUsed }}</td>
                    <td>
                      {{
                        formatCurrency(
                          Math.round(item.income / item.parkingsUsed),
                        )
                      }}
                    </td>
                    <td>
                      <span
                        v-if="index < displayedRevenueData.length - 1"
                        :class="
                          getGrowthClass(item, displayedRevenueData[index + 1])
                        "
                        class="d-flex align-items-center gap-1 text-sm fw-medium"
                      >
                        <iconify-icon
                          :icon="
                            getGrowthIcon(item, displayedRevenueData[index + 1])
                          "
                          class="text-xs"
                        />
                        {{
                          getGrowthValue(item, displayedRevenueData[index + 1])
                        }}%
                      </span>
                      <span v-else class="text-secondary-light">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24"
            >
              <span class="text-sm text-secondary-light">
                {{ (currentPage - 1) * itemsPerPage + 1 }} -
                {{ Math.min(currentPage * itemsPerPage, revenueData.length) }} /
                {{ revenueData.length }} мөр
              </span>
              <ul
                class="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center"
              >
                <li class="page-item">
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                  >
                    <iconify-icon icon="ep:d-arrow-left" />
                  </button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item">
                  <button
                    @click="currentPage = page"
                    :class="
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-200 text-secondary-light'
                    "
                    class="page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                  >
                    {{ page }}
                  </button>
                </li>
                <li class="page-item">
                  <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                  >
                    <iconify-icon icon="ep:d-arrow-right" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRevenueStore } from "@/stores/revenue";
import ApexCharts from "apexcharts";

const revenueStore = useRevenueStore();

const revenueChartRef = ref(null);
let revenueChart = null;

const chartPeriod = ref("30");
const currentPage = ref(1);
const itemsPerPage = 10;

const revenueData = computed(() => revenueStore.revenueData);
const totalRevenue = computed(() => revenueStore.totalRevenue);
const last30DaysRevenue = computed(() => revenueStore.last30DaysRevenue);
const todayRevenue = computed(() => revenueStore.todayRevenue);
const averageDailyRevenue = computed(() => revenueStore.averageDailyRevenue);
const totalParkingsUsed = computed(() => revenueStore.totalParkingsUsed);
const revenueGrowth = computed(() => revenueStore.revenueGrowth);

const todayGrowth = computed(() => {
  return parseFloat(revenueStore.revenueGrowth) || 0;
});

const averagePerParking = computed(() => {
  if (totalParkingsUsed.value === 0) return 0;
  return Math.round(totalRevenue.value / totalParkingsUsed.value);
});

const busiestDay = computed(() => {
  if (revenueData.value.length === 0) return { date: "-", income: 0 };
  const busiest = revenueData.value.reduce(
    (max, item) => (item.income > max.income ? item : max),
    revenueData.value[0],
  );
  return {
    date: formatDate(busiest.date),
    income: busiest.income,
  };
});

const performancePercentage = computed(() => {
  const targetDaily = 150000; // Daily target
  const actualAverage = averageDailyRevenue.value;
  return Math.round((actualAverage / targetDaily) * 100);
});

const totalPages = computed(() => {
  return Math.ceil(revenueData.value.length / itemsPerPage);
});

const displayedRevenueData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return [...revenueData.value].reverse().slice(start, end);
});

const chartData = computed(() => {
  const days =
    chartPeriod.value === "7"
      ? revenueStore.last7DaysData
      : revenueStore.last30DaysData;
  return days;
});

function formatCurrency(value) {
  return new Intl.NumberFormat("mn-MN").format(value) + "₮";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const days = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
  return days[date.getDay()];
}

function getGrowthClass(current, previous) {
  if (!previous) return "text-secondary-light";
  return current.income >= previous.income
    ? "text-success-600"
    : "text-danger-600";
}

function getGrowthIcon(current, previous) {
  if (!previous) return "mdi:minus";
  return current.income >= previous.income ? "bxs:up-arrow" : "bxs:down-arrow";
}

function getGrowthValue(current, previous) {
  if (!previous || previous.income === 0) return 0;
  const growth = ((current.income - previous.income) / previous.income) * 100;
  return Math.abs(growth).toFixed(1);
}

function initRevenueChart() {
  const data = chartData.value;
  const categories = data.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("mn-MN", { month: "short", day: "numeric" });
  });
  const incomeValues = data.map((item) => item.income);
  const parkingValues = data.map((item) => item.parkingsUsed);

  const options = {
    series: [
      {
        name: "Орлого",
        type: "area",
        data: incomeValues,
      },
      {
        name: "Зогсоол",
        type: "line",
        data: parkingValues,
      },
    ],
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    colors: ["#487FFF", "#F59E0B"],
    fill: {
      type: ["gradient", "solid"],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: [2, 3],
    },
    xaxis: {
      categories: categories,
      labels: {
        style: { colors: "#6B7280" },
        rotate: -45,
        rotateAlways: chartPeriod.value === "30",
      },
    },
    yaxis: [
      {
        title: { text: "Орлого (₮)" },
        labels: {
          formatter: function (val) {
            return val / 1000 + "к";
          },
          style: { colors: "#6B7280" },
        },
      },
      {
        opposite: true,
        title: { text: "Зогсоол" },
        labels: {
          style: { colors: "#6B7280" },
        },
      },
    ],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (val) {
            return new Intl.NumberFormat("mn-MN").format(val) + "₮";
          },
        },
        {
          formatter: function (val) {
            return val + " удаа";
          },
        },
      ],
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new ApexCharts(
    document.querySelector("#revenueChart"),
    options,
  );
  revenueChart.render();
}

function exportData() {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Огноо,Орлого,Ашигласан зогсоол\n" +
    revenueData.value
      .map((item) => `${item.date},${item.income},${item.parkingsUsed}`)
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `revenue_report_${new Date().toISOString().split("T")[0]}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(async () => {
  await revenueStore.fetchRevenueData();
  initRevenueChart();
});

watch(chartPeriod, () => {
  initRevenueChart();
});
</script>

<style scoped>
.page-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
