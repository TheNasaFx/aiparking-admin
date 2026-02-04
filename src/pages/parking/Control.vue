<template>
  <div class="dashboard-main-body">
    <!-- Page Title -->
    <div
      class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"
    >
      <h6 class="fw-semibold mb-0">Зогсоолын хяналт</h6>
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
        <li class="fw-medium">Зогсоолын хяналт</li>
      </ul>
    </div>

    <!-- Status Cards -->
    <div class="row gy-4">
      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0"
            >
              <div class="d-flex align-items-center gap-2 mb-12">
                <span
                  class="w-44-px h-44-px bg-success-600 text-white d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:check-circle" class="text-xl" />
                </span>
                <span class="text-secondary-light text-md">Сул зогсоол</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-success-600">{{ statistics.free }}</h3>
              <span class="text-secondary-light text-sm"
                >/ {{ statistics.total }}</span
              >
            </div>
            <div class="mt-12">
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-success-600"
                  :style="{ width: freePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0"
            >
              <div class="d-flex align-items-center gap-2 mb-12">
                <span
                  class="w-44-px h-44-px bg-warning-600 text-white d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:car" class="text-xl" />
                </span>
                <span class="text-secondary-light text-md"
                  >Ашиглагдаж байгаа</span
                >
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-warning-600">{{ statistics.occupied }}</h3>
              <span class="text-secondary-light text-sm"
                >/ {{ statistics.total }}</span
              >
            </div>
            <div class="mt-12">
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-warning-600"
                  :style="{ width: occupiedPercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0"
            >
              <div class="d-flex align-items-center gap-2 mb-12">
                <span
                  class="w-44-px h-44-px bg-info-600 text-white d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:calendar-clock" class="text-xl" />
                </span>
                <span class="text-secondary-light text-md">Захиалсан</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-info-600">{{ statistics.reserved }}</h3>
              <span class="text-secondary-light text-sm"
                >/ {{ statistics.total }}</span
              >
            </div>
            <div class="mt-12">
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-info-600"
                  :style="{ width: reservedPercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0"
            >
              <div class="d-flex align-items-center gap-2 mb-12">
                <span
                  class="w-44-px h-44-px bg-neutral-500 text-white d-flex justify-content-center align-items-center rounded-circle"
                >
                  <iconify-icon icon="mdi:close-circle" class="text-xl" />
                </span>
                <span class="text-secondary-light text-md">Идэвхгүй</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-neutral-500">{{ statistics.inactive }}</h3>
              <span class="text-secondary-light text-sm"
                >/ {{ statistics.total }}</span
              >
            </div>
            <div class="mt-12">
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-neutral-500"
                  :style="{ width: inactivePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map and Parking Grid -->
    <div class="row gy-4 mt-1">
      <!-- Map -->
      <div class="col-xxl-8">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">Зогсоолын байршил</h6>
              <div class="d-flex gap-12">
                <button
                  @click="centerMap"
                  class="btn btn-outline-primary-600 radius-8 px-16 py-8"
                >
                  <iconify-icon
                    icon="mdi:crosshairs-gps"
                    class="text-lg me-1"
                  />
                  Төвлөрүүлэх
                </button>
              </div>
            </div>
            <div ref="mapContainer" class="map-container radius-8"></div>
          </div>
        </div>
      </div>

      <!-- Parking Grid -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <h6 class="mb-20 fw-bold text-lg">Зогсоолын төлөв</h6>
            <div class="parking-grid">
              <div
                v-for="parking in parkingSpots"
                :key="parking.id"
                class="parking-slot"
                :class="getSlotClass(parking.status)"
                @click="selectParking(parking)"
              >
                <iconify-icon
                  :icon="getSlotIcon(parking.status)"
                  class="slot-icon"
                />
                <span class="slot-id">{{
                  parking.id.replace("PKG-", "")
                }}</span>
              </div>
            </div>
            <div class="mt-20">
              <h6 class="text-sm fw-semibold mb-12">Тайлбар:</h6>
              <div class="d-flex flex-wrap gap-16">
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded bg-success-100 border border-success-600"
                  ></span>
                  <span class="text-sm text-secondary-light">Сул</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded bg-warning-100 border border-warning-600"
                  ></span>
                  <span class="text-sm text-secondary-light"
                    >Ашиглагдаж байгаа</span
                  >
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded bg-info-100 border border-info-600"
                  ></span>
                  <span class="text-sm text-secondary-light">Захиалсан</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded bg-neutral-200 border border-neutral-400"
                  ></span>
                  <span class="text-sm text-secondary-light">Идэвхгүй</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parking Table -->
    <div class="row gy-4 mt-1">
      <div class="col-12">
        <div class="card radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">
                Зогсоолын дэлгэрэнгүй жагсаалт
              </h6>
              <div class="d-flex gap-12">
                <select v-model="statusFilter" class="form-select w-auto">
                  <option value="ALL">Бүгд</option>
                  <option value="FREE">Сул</option>
                  <option value="OCCUPIED">Ашиглагдаж байгаа</option>
                  <option value="RESERVED">Захиалсан</option>
                  <option value="INACTIVE">Идэвхгүй</option>
                </select>
              </div>
            </div>
            <div class="table-responsive scroll-sm">
              <table class="table bordered-table sm-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Байршил</th>
                    <th scope="col">Бүс</th>
                    <th scope="col">Төхөөрөмжийн ID</th>
                    <th scope="col">Төлөв</th>
                    <th scope="col">Сүүлд шинэчлэгдсэн</th>
                    <th scope="col" class="text-center">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="parking in filteredParkings" :key="parking.id">
                    <td>
                      <span class="fw-semibold text-primary-light">{{
                        parking.id
                      }}</span>
                    </td>
                    <td>{{ parking.location }}</td>
                    <td>
                      <span class="badge bg-light text-dark">{{
                        parking.zone
                      }}</span>
                    </td>
                    <td>{{ parking.deviceId }}</td>
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
                      <div
                        class="d-flex align-items-center gap-10 justify-content-center"
                      >
                        <button
                          @click="viewParking(parking)"
                          class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <iconify-icon icon="iconamoon:eye-light" />
                        </button>
                        <button
                          @click="editParking(parking)"
                          class="w-32-px h-32-px bg-success-focus text-success-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <iconify-icon icon="lucide:edit" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parking Detail Modal -->
    <div
      class="modal fade"
      id="parkingDetailModal"
      tabindex="-1"
      ref="parkingModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content radius-16">
          <div class="modal-header">
            <h5 class="modal-title">Зогсоолын дэлгэрэнгүй</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedParking">
            <div class="d-flex flex-column gap-16">
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">ID:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedParking.id
                }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Байршил:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedParking.location
                }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Бүс:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedParking.zone
                }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Төхөөрөмжийн ID:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedParking.deviceId
                }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Төлөв:</span>
                <span
                  class="px-12 py-6 radius-4 text-white text-sm fw-semibold"
                  :class="getStatusClass(selectedParking.status)"
                >
                  {{ getStatusText(selectedParking.status) }}
                </span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Координат:</span>
                <span class="fw-semibold text-primary-light"
                  >{{ selectedParking.coordinates?.lat?.toFixed(6) }},
                  {{ selectedParking.coordinates?.lng?.toFixed(6) }}</span
                >
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Сүүлд шинэчлэгдсэн:</span>
                <span class="fw-semibold text-primary-light">{{
                  formatTime(selectedParking.lastUpdated)
                }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary-600 radius-8"
              data-bs-dismiss="modal"
            >
              Хаах
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useParkingStore, PARKING_STATUS } from "@/stores/parking";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Modal } from "bootstrap";

const parkingStore = useParkingStore();

const mapContainer = ref(null);
const parkingModal = ref(null);
let map = null;
let markers = [];
let modalInstance = null;

const statusFilter = ref("ALL");
const selectedParking = ref(null);

const parkingSpots = computed(() => parkingStore.parkingSpots);
const statistics = computed(() => parkingStore.statistics);

const freePercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.free / statistics.value.total) * 100);
});

const occupiedPercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.occupied / statistics.value.total) * 100);
});

const reservedPercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.reserved / statistics.value.total) * 100);
});

const inactivePercentage = computed(() => {
  if (statistics.value.total === 0) return 0;
  return Math.round((statistics.value.inactive / statistics.value.total) * 100);
});

const filteredParkings = computed(() => {
  if (statusFilter.value === "ALL") {
    return parkingSpots.value;
  }
  return parkingSpots.value.filter((p) => p.status === statusFilter.value);
});

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

function getSlotClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "slot-free";
    case PARKING_STATUS.RESERVED:
      return "slot-reserved";
    case PARKING_STATUS.OCCUPIED:
      return "slot-occupied";
    case PARKING_STATUS.INACTIVE:
      return "slot-inactive";
    default:
      return "slot-inactive";
  }
}

function getSlotIcon(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "mdi:parking";
    case PARKING_STATUS.RESERVED:
      return "mdi:calendar-clock";
    case PARKING_STATUS.OCCUPIED:
      return "mdi:car";
    case PARKING_STATUS.INACTIVE:
      return "mdi:close-circle";
    default:
      return "mdi:help-circle";
  }
}

function getMarkerColor(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "#22C55E";
    case PARKING_STATUS.RESERVED:
      return "#3B82F6";
    case PARKING_STATUS.OCCUPIED:
      return "#F59E0B";
    case PARKING_STATUS.INACTIVE:
      return "#9CA3AF";
    default:
      return "#9CA3AF";
  }
}

function createMarkerIcon(status) {
  const color = getMarkerColor(status);
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M13.5 3H5v18h2v-7h5.5L14 18h2V3h-2.5zm0 6H7V5h6v4z"/></svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function initMap() {
  if (!mapContainer.value) return;

  const center = [47.918082, 106.930982];

  map = L.map(mapContainer.value).setView(center, 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  updateMarkers();
}

function updateMarkers() {
  // Clear existing markers
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  // Add markers for each parking spot
  parkingSpots.value.forEach((parking) => {
    if (parking.coordinates) {
      const marker = L.marker(
        [parking.coordinates.lat, parking.coordinates.lng],
        { icon: createMarkerIcon(parking.status) },
      ).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 150px;">
          <strong>${parking.id}</strong><br>
          <span>${parking.location}</span><br>
          <span style="color: ${getMarkerColor(
            parking.status,
          )}; font-weight: 600;">
            ${getStatusText(parking.status)}
          </span>
        </div>
      `);

      marker.on("click", () => {
        selectParking(parking);
      });

      markers.push(marker);
    }
  });
}

function centerMap() {
  if (map) {
    map.setView([47.918082, 106.930982], 16);
  }
}

function selectParking(parking) {
  selectedParking.value = parking;
  if (!modalInstance && parkingModal.value) {
    modalInstance = new Modal(parkingModal.value);
  }
  modalInstance?.show();
}

function viewParking(parking) {
  selectParking(parking);
}

function editParking(parking) {
  console.log("Edit parking:", parking.id);
}

onMounted(async () => {
  await parkingStore.fetchParkingSpots();

  setTimeout(() => {
    initMap();
  }, 100);

  parkingStore.simulateRealTimeUpdates();
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
  modalInstance?.dispose();
});

// Update markers when parking data changes
watch(
  parkingSpots,
  () => {
    if (map) {
      updateMarkers();
    }
  },
  { deep: true },
);
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  z-index: 1;
}

.parking-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.parking-slot {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}

.parking-slot:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.slot-free {
  background-color: #dcfce7;
  border-color: #22c55e;
  color: #22c55e;
}

.slot-occupied {
  background-color: #fef3c7;
  border-color: #f59e0b;
  color: #f59e0b;
}

.slot-reserved {
  background-color: #dbeafe;
  border-color: #3b82f6;
  color: #3b82f6;
}

.slot-inactive {
  background-color: #f3f4f6;
  border-color: #9ca3af;
  color: #9ca3af;
}

.slot-icon {
  font-size: 24px;
}

.slot-id {
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}
</style>
