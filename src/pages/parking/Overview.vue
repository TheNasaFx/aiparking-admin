<template>
  <div class="dashboard-main-body">
    <!-- Page Title -->
    <div
      class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"
    >
      <h6 class="fw-semibold mb-0">Ерөнхий мэдээлэл</h6>
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
        <li class="fw-medium">Ерөнхий мэдээлэл</li>
      </ul>
    </div>

    <!-- Statistics Cards Row -->
    <div class="row gy-4">
      <!-- Total Parking Spots -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100 bg-gradient-start-1">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:parking" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Нийт зогсоол
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-8"
            >
              <h5 class="fw-semibold text-primary-light mb-0">
                {{ statistics.total }}
              </h5>
              <span
                class="text-sm fw-medium px-16 py-6 bg-white rounded-pill text-primary-600"
                >Идэвхтэй: {{ statistics.active }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Free Spots -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100 bg-gradient-start-2">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="mb-0 w-48-px h-48-px bg-success-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:check-circle" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Сул зогсоол
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-8"
            >
              <h5 class="fw-semibold text-primary-light mb-0">
                {{ statistics.free }}
              </h5>
              <span
                class="text-sm fw-medium px-16 py-6 bg-white rounded-pill text-success-600"
                >{{ freePercentage }}%</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Occupied Spots -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100 bg-gradient-start-3">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="mb-0 w-48-px h-48-px bg-warning-main flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:car" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Ашиглагдаж байгаа
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-8"
            >
              <h5 class="fw-semibold text-primary-light mb-0">
                {{ statistics.occupied }}
              </h5>
              <span
                class="text-sm fw-medium px-16 py-6 bg-white rounded-pill text-warning-600"
                >{{ occupiedPercentage }}%</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Today Revenue -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100 bg-gradient-start-4">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="mb-0 w-48-px h-48-px bg-purple flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:cash" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Өнөөдрийн орлого
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-8"
            >
              <h5 class="fw-semibold text-primary-light mb-0">
                {{ formatCurrency(todayRevenue) }}
              </h5>
              <span
                class="text-sm fw-medium px-16 py-6 bg-white rounded-pill"
                :class="
                  revenueGrowth >= 0 ? 'text-success-600' : 'text-danger-600'
                "
              >
                {{ revenueGrowth >= 0 ? "+" : "" }}{{ revenueGrowth }}%
              </span>
            </div>
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
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between"
            >
              <div>
                <h6 class="mb-2 fw-bold text-lg">Сүүлийн 7 хоногийн орлого</h6>
                <span class="text-sm fw-medium text-secondary-light"
                  >Өдөр тутмын орлогын график</span
                >
              </div>
              <div class="text-end">
                <h5 class="fw-semibold text-primary-600 mb-0">
                  {{ formatCurrency(last7DaysTotal) }}
                </h5>
                <span class="text-sm text-secondary-light">Нийт</span>
              </div>
            </div>
            <div ref="revenueChartRef" id="revenueChart" class="mt-28"></div>
          </div>
        </div>
      </div>

      <!-- Parking Status Pie Chart -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-2 fw-bold text-lg">Зогсоолын төлөв</h6>
            <span class="text-sm fw-medium text-secondary-light"
              >Одоогийн төлөв байдал</span
            >
            <div ref="statusChartRef" id="statusChart" class="mt-20"></div>
            <div class="d-flex flex-wrap justify-content-center gap-16 mt-20">
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-12-px h-12-px rounded-circle bg-success-600"
                ></span>
                <span class="text-secondary-light text-sm fw-normal"
                  >Сул ({{ statistics.free }})</span
                >
              </div>
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-12-px h-12-px rounded-circle bg-warning-600"
                ></span>
                <span class="text-secondary-light text-sm fw-normal"
                  >Ашиглагдаж байгаа ({{ statistics.occupied }})</span
                >
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="w-12-px h-12-px rounded-circle bg-info-600"></span>
                <span class="text-secondary-light text-sm fw-normal"
                  >Захиалсан ({{ statistics.reserved }})</span
                >
              </div>
              <div class="d-flex align-items-center gap-2">
                <span
                  class="w-12-px h-12-px rounded-circle bg-neutral-400"
                ></span>
                <span class="text-secondary-light text-sm fw-normal"
                  >Идэвхгүй ({{ statistics.inactive }})</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parking List and Activity Row -->
    <div class="row gy-4 mt-1">
      <!-- Parking Spots Table -->
      <div class="col-xxl-8">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">Зогсоолын жагсаалт</h6>
              <router-link
                to="/parking-list"
                class="btn btn-primary-600 radius-8 px-20 py-11"
              >
                Бүгдийг харах
              </router-link>
            </div>
            <div class="table-responsive scroll-sm">
              <table class="table bordered-table sm-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Байршил</th>
                    <th scope="col">Төлөв</th>
                    <th scope="col">Сүүлд шинэчлэгдсэн</th>
                    <th scope="col" class="text-center">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="parking in displayedParkings" :key="parking.id">
                    <td>
                      <span class="fw-semibold text-primary-light">{{
                        parking.id
                      }}</span>
                    </td>
                    <td>{{ parking.location }}</td>
                    <td>
                      <span
                        class="px-12 py-6 radius-4 text-white text-sm fw-semibold"
                        :class="getStatusClass(parking.status)"
                      >
                        {{ getStatusText(parking.status) }}
                      </span>
                    </td>
                    <td>{{ formatTime(parking.lastUpdated) }}</td>
                    <td class="text-center">
                      <router-link
                        :to="`/parking/${parking.id}`"
                        class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <iconify-icon icon="iconamoon:eye-light" />
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-20 fw-bold text-lg">Сүүлийн үйл ажиллагаа</h6>
            <div class="d-flex flex-column gap-16">
              <div
                v-for="(activity, index) in recentActivity"
                :key="index"
                class="d-flex align-items-start gap-16 pb-16"
                :class="{ 'border-bottom': index < recentActivity.length - 1 }"
              >
                <div
                  class="w-40-px h-40-px rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
                  :class="activity.bgClass"
                >
                  <iconify-icon
                    :icon="activity.icon"
                    class="text-white text-xl"
                  />
                </div>
                <div>
                  <p class="text-sm fw-semibold text-primary-light mb-1">
                    {{ activity.title }}
                  </p>
                  <span class="text-xs text-secondary-light">{{
                    activity.time
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useParkingStore, PARKING_STATUS } from "@/stores/parking";
import { useRevenueStore } from "@/stores/revenue";
import ApexCharts from "apexcharts";

const parkingStore = useParkingStore();
const revenueStore = useRevenueStore();

const revenueChartRef = ref(null);
const statusChartRef = ref(null);
let revenueChart = null;
let statusChart = null;

const statistics = computed(() => parkingStore.statistics);
const todayRevenue = computed(() => revenueStore.todayRevenue);
const revenueGrowth = computed(() => revenueStore.revenueGrowth);

const freePercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.free / statistics.value.total) * 100);
});

const occupiedPercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.occupied / statistics.value.total) * 100);
});

const displayedParkings = computed(() => {
  return parkingStore.parkingSpots.slice(0, 5);
});

const last7DaysTotal = computed(() => {
  return revenueStore.last7DaysData.reduce((sum, item) => sum + item.income, 0);
});

const recentActivity = ref([
  {
    title: "PKG-001 зогсоол ашиглагдаж эхэлсэн",
    time: "2 минутын өмнө",
    icon: "mdi:car",
    bgClass: "bg-warning-main",
  },
  {
    title: "PKG-003 зогсоол чөлөөлөгдсөн",
    time: "15 минутын өмнө",
    icon: "mdi:car-off",
    bgClass: "bg-success-main",
  },
  {
    title: "Төлбөр хийгдсэн - ₮5,000",
    time: "32 минутын өмнө",
    icon: "mdi:cash",
    bgClass: "bg-info-main",
  },
  {
    title: "PKG-005 захиалга хийгдсэн",
    time: "1 цагийн өмнө",
    icon: "mdi:calendar-clock",
    bgClass: "bg-purple",
  },
  {
    title: "Систем шинэчлэгдсэн",
    time: "2 цагийн өмнө",
    icon: "mdi:refresh",
    bgClass: "bg-primary-600",
  },
]);

function formatCurrency(value) {
  return new Intl.NumberFormat("mn-MN").format(value) + "₮";
}

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Дөнгөж сая";
  if (minutes < 60) return `${minutes} минутын өмнө`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} цагийн өмнө`;

  return date.toLocaleDateString("mn-MN");
}

function getStatusClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "bg-success-main";
    case PARKING_STATUS.RESERVED:
      return "bg-info-main";
    case PARKING_STATUS.OCCUPIED:
      return "bg-warning-main";
    case PARKING_STATUS.INACTIVE:
      return "bg-neutral-400";
    default:
      return "bg-neutral-400";
  }
}

function getStatusText(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "Сул";
    case PARKING_STATUS.RESERVED:
      return "Захиалсан";
    case PARKING_STATUS.OCCUPIED:
      return "Ашиглагдаж байгаа";
    case PARKING_STATUS.INACTIVE:
      return "Идэвхгүй";
    default:
      return status;
  }
}

function initRevenueChart() {
  const chartData = revenueStore.last7DaysData;
  const categories = chartData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("mn-MN", { weekday: "short" });
  });
  const values = chartData.map((item) => item.income);

  const options = {
    series: [
      {
        name: "Орлого",
        data: values,
      },
    ],
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    colors: ["#487FFF"],
    fill: {
      type: "gradient",
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
      width: 3,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: { colors: "#6B7280" },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val / 1000 + "к";
        },
        style: { colors: "#6B7280" },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return new Intl.NumberFormat("mn-MN").format(val) + "₮";
        },
      },
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

function initStatusChart() {
  const options = {
    series: [
      statistics.value.free,
      statistics.value.occupied,
      statistics.value.reserved,
      statistics.value.inactive,
    ],
    chart: {
      type: "donut",
      height: 260,
    },
    labels: ["Сул", "Ашиглагдаж байгаа", "Захиалсан", "Идэвхгүй"],
    colors: ["#22C55E", "#F59E0B", "#3B82F6", "#9CA3AF"],
    legend: { show: false },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: { show: true },
            value: {
              show: true,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: "Нийт",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 200 },
        },
      },
    ],
  };

  if (statusChart) {
    statusChart.destroy();
  }

  statusChart = new ApexCharts(document.querySelector("#statusChart"), options);
  statusChart.render();
}

onMounted(async () => {
  await Promise.all([
    parkingStore.fetchParkingSpots(),
    revenueStore.fetchRevenueData(),
  ]);

  initRevenueChart();
  initStatusChart();

  // Start real-time updates
  parkingStore.simulateRealTimeUpdates();
});

// Update charts when data changes
watch(
  () => statistics.value,
  () => {
    if (statusChart) {
      statusChart.updateSeries([
        statistics.value.free,
        statistics.value.occupied,
        statistics.value.reserved,
        statistics.value.inactive,
      ]);
    }
  },
  { deep: true },
);
</script>

<style scoped>
.bg-gradient-start-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-start-2 {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.bg-gradient-start-3 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-gradient-start-4 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.bg-purple {
  background-color: #8b5cf6;
}
</style>
