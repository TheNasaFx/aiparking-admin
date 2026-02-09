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
      <!-- Total Devices -->
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
                  <iconify-icon icon="mdi:devices" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Нийт төхөөрөмж
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
                >Онлайн: {{ statistics.online }}</span
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

      <!-- Offline -->
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100 bg-gradient-start-4">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="mb-0 w-48-px h-48-px bg-danger flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0"
                >
                  <iconify-icon icon="mdi:wifi-off" class="icon" />
                </span>
                <div>
                  <h6 class="fw-semibold mb-0 text-primary-light text-md">
                    Офлайн
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-8"
            >
              <h5 class="fw-semibold text-primary-light mb-0">
                {{ statistics.offline }}
              </h5>
              <span
                class="text-sm fw-medium px-16 py-6 bg-white rounded-pill text-danger-600"
                >{{ offlinePercentage }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row gy-4 mt-1">
      <!-- Device Status Pie Chart -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-2 fw-bold text-lg">Төхөөрөмжийн төлөв</h6>
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
                <span
                  class="w-12-px h-12-px rounded-circle bg-danger-600"
                ></span>
                <span class="text-secondary-light text-sm fw-normal"
                  >Офлайн ({{ statistics.offline }})</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Device List Table -->
      <div class="col-xxl-8">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">Төхөөрөмжүүдийн жагсаалт</h6>
              <div class="d-flex gap-12">
                <button
                  @click="refreshDevices"
                  class="btn btn-outline-primary-600 radius-8 px-16 py-8"
                  :disabled="isLoading"
                >
                  <iconify-icon
                    :icon="isLoading ? 'mdi:loading' : 'mdi:refresh'"
                    :class="{ 'animate-spin': isLoading }"
                    class="me-1"
                  />
                  Шинэчлэх
                </button>
                <router-link
                  to="/parking-list"
                  class="btn btn-primary-600 radius-8 px-20 py-11"
                >
                  Бүгдийг харах
                </router-link>
              </div>
            </div>
            <div class="table-responsive scroll-sm">
              <table class="table bordered-table sm-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Төхөөрөмжийн ID</th>
                    <th scope="col">Төлөв</th>
                    <th scope="col">Түгжээ</th>
                    <th scope="col">Холболт</th>
                    <th scope="col">Координат</th>
                    <th scope="col" class="text-center">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="device in displayedDevices" :key="device.id">
                    <td>
                      <span class="fw-semibold text-primary-light">{{
                        device.deviceId
                      }}</span>
                    </td>
                    <td>
                      <span
                        class="px-12 py-6 radius-4 text-white text-sm fw-semibold"
                        :class="getStatusClass(device.status)"
                      >
                        {{ getStatusText(device.status) }}
                      </span>
                    </td>
                    <td>
                      <span class="text-primary-light">
                        {{ device.lockState === "raised" ? "Дээш" : "Доош" }}
                      </span>
                    </td>
                    <td>
                      <span
                        :class="
                          device.isOnline
                            ? 'text-success-600'
                            : 'text-danger-600'
                        "
                      >
                        <iconify-icon
                          :icon="device.isOnline ? 'mdi:wifi' : 'mdi:wifi-off'"
                          class="me-1"
                        />
                        {{ device.isOnline ? "Онлайн" : "Офлайн" }}
                      </span>
                    </td>
                    <td>
                      <span
                        :class="
                          device.hasCoordinates
                            ? 'text-success-600'
                            : 'text-warning-600'
                        "
                      >
                        {{ device.hasCoordinates ? "Бүртгэлтэй" : "Бүртгэгүй" }}
                      </span>
                    </td>
                    <td class="text-center">
                      <router-link
                        :to="{
                          path: '/parking-control',
                          query: { focus: device.deviceId },
                        }"
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
    </div>

    <!-- Recent Activity Row -->
    <div class="row gy-4 mt-1">
      <div class="col-12">
        <div class="card radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-20 fw-bold text-lg">Системийн мэдээлэл</h6>
            <div class="row gy-4">
              <div class="col-md-4">
                <div class="p-16 bg-light radius-8">
                  <div class="d-flex align-items-center gap-12 mb-12">
                    <span
                      class="w-40-px h-40-px bg-success-600 rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <iconify-icon
                        icon="mdi:server"
                        class="text-white text-xl"
                      />
                    </span>
                    <span class="fw-semibold text-primary-light"
                      >API Холболт</span
                    >
                  </div>
                  <p class="text-success-600 mb-0">
                    <iconify-icon icon="mdi:check-circle" class="me-1" />
                    Холбогдсон
                  </p>
                  <span class="text-secondary-light text-sm">{{
                    apiBaseUrl
                  }}</span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-16 bg-light radius-8">
                  <div class="d-flex align-items-center gap-12 mb-12">
                    <span
                      class="w-40-px h-40-px bg-primary-600 rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <iconify-icon
                        icon="mdi:map-marker"
                        class="text-white text-xl"
                      />
                    </span>
                    <span class="fw-semibold text-primary-light"
                      >Газрын зурагт бүртгэлтэй</span
                    >
                  </div>
                  <p class="text-primary-600 mb-0">
                    {{ devicesWithCoordinates }} / {{ statistics.total }}
                  </p>
                  <span class="text-secondary-light text-sm"
                    >төхөөрөмж бүртгэлтэй</span
                  >
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-16 bg-light radius-8">
                  <div class="d-flex align-items-center gap-12 mb-12">
                    <span
                      class="w-40-px h-40-px bg-info-600 rounded-circle d-flex align-items-center justify-content-center"
                    >
                      <iconify-icon
                        icon="mdi:clock"
                        class="text-white text-xl"
                      />
                    </span>
                    <span class="fw-semibold text-primary-light"
                      >Сүүлд шинэчлэгдсэн</span
                    >
                  </div>
                  <p class="text-info-600 mb-0">{{ lastUpdated }}</p>
                  <span class="text-secondary-light text-sm"
                    >Өгөгдөл шинэчлэгдсэн</span
                  >
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
import { API_BASE_URL } from "@/stores/auth";
import ApexCharts from "apexcharts";

const parkingStore = useParkingStore();

const statusChartRef = ref(null);
let statusChart = null;
const lastUpdated = ref("Дөнгөж сая");

const statistics = computed(() => parkingStore.statistics);
const devices = computed(() => parkingStore.devices);
const isLoading = computed(() => parkingStore.isLoading);
const apiBaseUrl = API_BASE_URL;

const freePercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.free / statistics.value.total) * 100);
});

const occupiedPercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.occupied / statistics.value.total) * 100);
});

const offlinePercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.offline / statistics.value.total) * 100);
});

const displayedDevices = computed(() => {
  return devices.value.slice(0, 5);
});

const devicesWithCoordinates = computed(() => {
  return devices.value.filter((d) => d.hasCoordinates).length;
});

function getStatusClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "bg-success-main";
    case PARKING_STATUS.OCCUPIED:
      return "bg-warning-main";
    case PARKING_STATUS.OFFLINE:
      return "bg-danger-main";
    default:
      return "bg-neutral-400";
  }
}

function getStatusText(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "Сул";
    case PARKING_STATUS.OCCUPIED:
      return "Ашиглагдаж байгаа";
    case PARKING_STATUS.OFFLINE:
      return "Офлайн";
    default:
      return status;
  }
}

async function refreshDevices() {
  await parkingStore.fetchDevices();
  await parkingStore.fetchDashboardStats();
  lastUpdated.value = new Date().toLocaleTimeString("mn-MN");
}

function initStatusChart() {
  const options = {
    series: [
      statistics.value.free,
      statistics.value.occupied,
      statistics.value.offline,
    ],
    chart: {
      type: "donut",
      height: 260,
    },
    labels: ["Сул", "Ашиглагдаж байгаа", "Офлайн"],
    colors: ["#22C55E", "#F59E0B", "#EF4444"],
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
  await parkingStore.fetchDevices();
  await parkingStore.fetchDashboardStats();
  lastUpdated.value = new Date().toLocaleTimeString("mn-MN");

  // Wait a bit for the DOM to be ready
  setTimeout(() => {
    initStatusChart();
  }, 100);
});

// Update chart when data changes
watch(
  () => statistics.value,
  () => {
    if (statusChart) {
      statusChart.updateSeries([
        statistics.value.free,
        statistics.value.occupied,
        statistics.value.offline,
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
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.bg-danger {
  background-color: #ef4444;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
