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
            <div class="d-flex align-items-center gap-2 mb-12">
              <span
                class="w-44-px h-44-px bg-primary-600 text-white d-flex justify-content-center align-items-center rounded-circle"
              >
                <iconify-icon icon="mdi:devices" class="text-xl" />
              </span>
              <span class="text-secondary-light text-md">Нийт төхөөрөмж</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-primary-600">{{ statistics.total }}</h3>
              <span class="text-secondary-light text-sm"
                >({{ devicesWithCoordinates.length }} газрын зурагт)</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-3 col-sm-6">
        <div class="card p-3 shadow-2 radius-8 h-100">
          <div class="card-body p-0">
            <div class="d-flex align-items-center gap-2 mb-12">
              <span
                class="w-44-px h-44-px bg-success-600 text-white d-flex justify-content-center align-items-center rounded-circle"
              >
                <iconify-icon icon="mdi:check-circle" class="text-xl" />
              </span>
              <span class="text-secondary-light text-md">Сул зогсоол</span>
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
            <div class="d-flex align-items-center gap-2 mb-12">
              <span
                class="w-44-px h-44-px bg-danger-600 text-white d-flex justify-content-center align-items-center rounded-circle"
              >
                <iconify-icon icon="mdi:wifi-off" class="text-xl" />
              </span>
              <span class="text-secondary-light text-md">Офлайн</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <h3 class="mb-0 text-danger-600">{{ statistics.offline }}</h3>
              <span class="text-secondary-light text-sm"
                >/ {{ statistics.total }}</span
              >
            </div>
            <div class="mt-12">
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar bg-danger-600"
                  :style="{ width: offlinePercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map and Device List -->
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
                  v-if="registerMode"
                  @click="cancelRegisterMode"
                  class="btn btn-outline-danger-600 radius-8 px-16 py-8"
                >
                  <iconify-icon icon="mdi:close" class="text-lg me-1" />
                  Цуцлах
                </button>
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

            <!-- Register Mode Alert -->
            <div v-if="registerMode" class="alert alert-warning mb-16">
              <iconify-icon icon="mdi:map-marker-plus" class="me-2" />
              <strong>{{ registerDevice?.deviceId }}</strong> -ийн байршлыг
              бүртгэхийн тулд газрын зураг дээр дарна уу
            </div>

            <!-- No devices with coordinates warning -->
            <div
              v-if="devicesWithCoordinates.length === 0 && !registerMode"
              class="alert alert-info mb-16"
            >
              <iconify-icon icon="mdi:information" class="me-2" />
              Газрын зураг дээр харуулах төхөөрөмж байхгүй байна. Эхлээд
              төхөөрөмжүүдийг бүртгэнэ үү.
            </div>

            <div ref="mapContainer" class="map-container radius-8"></div>

            <div class="mt-16">
              <h6 class="text-sm fw-semibold mb-12">Тайлбар:</h6>
              <div class="d-flex flex-wrap gap-16">
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded-circle bg-success-600"
                  ></span>
                  <span class="text-sm text-secondary-light">Сул</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded-circle bg-warning-600"
                  ></span>
                  <span class="text-sm text-secondary-light"
                    >Ашиглагдаж байгаа</span
                  >
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="w-16-px h-16-px rounded-circle bg-danger-600"
                  ></span>
                  <span class="text-sm text-secondary-light">Офлайн</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Device List -->
      <div class="col-xxl-4">
        <div class="card h-100 radius-8 border-0">
          <div class="card-body p-24">
            <div
              class="d-flex align-items-center justify-content-between mb-20"
            >
              <h6 class="mb-0 fw-bold text-lg">Төхөөрөмжүүд</h6>
              <button
                @click="refreshDevices"
                class="btn btn-outline-primary-600 btn-sm radius-8"
                :disabled="isLoading"
              >
                <iconify-icon
                  :icon="isLoading ? 'mdi:loading' : 'mdi:refresh'"
                  :class="{ 'animate-spin': isLoading }"
                />
              </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-20">
              <div class="spinner-border text-primary spinner-border-sm"></div>
              <p class="mt-8 text-secondary-light text-sm mb-0">
                Уншиж байна...
              </p>
            </div>

            <!-- Device Cards -->
            <div v-else class="device-list">
              <div
                v-for="device in devices"
                :key="device.id"
                class="device-card p-12 mb-12 radius-8"
                :class="getDeviceCardClass(device)"
                @click="selectDevice(device)"
              >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center gap-8">
                    <span
                      class="w-10-px h-10-px rounded-circle"
                      :class="getDeviceDotClass(device)"
                    ></span>
                    <span class="fw-semibold text-sm">{{
                      device.deviceId
                    }}</span>
                  </div>
                  <span
                    class="px-8 py-2 radius-4 text-white text-xs"
                    :class="getStatusClass(device.status)"
                  >
                    {{ getStatusText(device.status) }}
                  </span>
                </div>
                <div class="mt-8 d-flex align-items-center gap-8">
                  <iconify-icon
                    :icon="device.isOnline ? 'mdi:wifi' : 'mdi:wifi-off'"
                    :class="
                      device.isOnline ? 'text-success-600' : 'text-danger-600'
                    "
                    class="text-sm"
                  />
                  <span class="text-xs text-secondary-light">
                    {{ device.isOnline ? "Онлайн" : "Офлайн" }}
                  </span>
                  <iconify-icon
                    icon="mdi:map-marker"
                    :class="
                      device.hasCoordinates
                        ? 'text-success-600'
                        : 'text-warning-600'
                    "
                    class="text-sm ms-auto"
                  />
                  <span
                    class="text-xs"
                    :class="
                      device.hasCoordinates
                        ? 'text-success-600'
                        : 'text-warning-600'
                    "
                  >
                    {{ device.hasCoordinates ? "Бүртгэлтэй" : "Бүртгэгүй" }}
                  </span>
                </div>
                <div
                  v-if="!device.hasCoordinates"
                  class="mt-8 d-flex justify-content-end"
                >
                  <button
                    @click.stop="startRegisterMode(device)"
                    class="btn btn-sm btn-outline-warning-600 radius-4 px-8 py-2"
                  >
                    <iconify-icon icon="mdi:map-marker-plus" class="me-1" />
                    Бүртгэх
                  </button>
                </div>
                <div v-else class="mt-8 d-flex justify-content-end">
                  <button
                    @click.stop="startRegisterMode(device)"
                    class="btn btn-sm btn-outline-primary-600 radius-4 px-8 py-2"
                  >
                    <iconify-icon icon="mdi:map-marker-radius" class="me-1" />
                    Шинэчлэх
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="!isLoading && devices.length === 0"
              class="text-center py-20"
            >
              <iconify-icon
                icon="mdi:devices"
                class="text-4xl text-secondary-light mb-8"
              />
              <p class="text-secondary-light text-sm mb-0">
                Төхөөрөмж олдсонгүй
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Device Detail Modal -->
    <div
      class="modal fade"
      id="deviceDetailModal"
      tabindex="-1"
      ref="deviceModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content radius-16">
          <div class="modal-header">
            <h5 class="modal-title">
              Төхөөрөмжийн дэлгэрэнгүй - {{ selectedDevice?.deviceId }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedDevice">
            <div class="d-flex flex-column gap-16">
              <div class="d-flex justify-content-between border-bottom pb-8">
                <span class="text-primary-light">ID:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedDevice.id
                }}</span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-8">
                <span class="text-primary-light">Төхөөрөмжийн ID:</span>
                <span class="fw-semibold text-primary-light">{{
                  selectedDevice.deviceId
                }}</span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-8">
                <span class="text-primary-light">Төлөв:</span>
                <span
                  class="px-12 py-4 radius-4 text-white text-xs fw-semibold"
                  :class="getStatusClass(selectedDevice.status)"
                >
                  {{ getStatusText(selectedDevice.status) }}
                </span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-8">
                <span class="text-primary-light">Түгжээ:</span>
                <span class="fw-semibold text-primary-light">
                  {{
                    selectedDevice.lockState === "raised"
                      ? "Дээш (Сул)"
                      : "Доош (Эзэмшигдсэн)"
                  }}
                </span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-8">
                <span class="text-primary-light">Холболт:</span>
                <span
                  class="fw-semibold"
                  :class="
                    selectedDevice.isOnline
                      ? 'text-success-600'
                      : 'text-danger-600'
                  "
                >
                  {{ selectedDevice.isOnline ? "Онлайн" : "Офлайн" }}
                </span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-primary-light">Координат:</span>
                <span
                  v-if="selectedDevice.hasCoordinates"
                  class="fw-semibold text-primary-light"
                >
                  {{ selectedDevice.coordinates?.lat?.toFixed(6) }},
                  {{ selectedDevice.coordinates?.lng?.toFixed(6) }}
                </span>
                <span v-else class="text-warning-600">Бүртгэгдээгүй</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-if="selectedDevice && selectedDevice.isOnline"
              type="button"
              class="btn btn-success-600 radius-8"
              :disabled="controlLoading"
              @click="raiseLock"
            >
              <iconify-icon icon="mdi:arrow-up-bold" class="me-1" />
              Дээш өргөх
            </button>
            <button
              v-if="selectedDevice && selectedDevice.isOnline"
              type="button"
              class="btn btn-warning-600 radius-8"
              :disabled="controlLoading"
              @click="lowerLock"
            >
              <iconify-icon icon="mdi:arrow-down-bold" class="me-1" />
              Доош буулгах
            </button>
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
import { useRoute } from "vue-router";
import { useParkingStore, PARKING_STATUS } from "@/stores/parking";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Modal } from "bootstrap";

const route = useRoute();
const parkingStore = useParkingStore();

const mapContainer = ref(null);
const deviceModal = ref(null);
let map = null;
let markers = [];
let modalInstance = null;
let registerMarker = null;

const selectedDevice = ref(null);
const registerMode = ref(false);
const registerDevice = ref(null);
const controlLoading = ref(false);

const devices = computed(() => parkingStore.devices);
const statistics = computed(() => parkingStore.statistics);
const isLoading = computed(() => parkingStore.isLoading);

const devicesWithCoordinates = computed(() => {
  return devices.value.filter((d) => d.hasCoordinates);
});

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

function getDeviceCardClass(device) {
  if (device.status === PARKING_STATUS.FREE) return "border-success-600";
  if (device.status === PARKING_STATUS.OCCUPIED) return "border-warning-600";
  if (device.status === PARKING_STATUS.OFFLINE) return "border-danger-600";
  return "";
}

function getDeviceDotClass(device) {
  if (device.status === PARKING_STATUS.FREE) return "bg-success-600";
  if (device.status === PARKING_STATUS.OCCUPIED) return "bg-warning-600";
  if (device.status === PARKING_STATUS.OFFLINE) return "bg-danger-600";
  return "bg-neutral-400";
}

function getMarkerColor(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "#22C55E";
    case PARKING_STATUS.OCCUPIED:
      return "#F59E0B";
    case PARKING_STATUS.OFFLINE:
      return "#EF4444";
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

  const center = [47.918082, 106.917];

  map = L.map(mapContainer.value).setView(center, 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Click handler for registration mode
  map.on("click", (e) => {
    if (registerMode.value && registerDevice.value) {
      const { lat, lng } = e.latlng;

      // Save coordinates to API using numeric device ID
      parkingStore.saveDeviceCoordinates(registerDevice.value.id, lat, lng);

      // Exit register mode
      cancelRegisterMode();

      // Update markers
      updateMarkers();
    }
  });

  updateMarkers();
}

function updateMarkers() {
  if (!map) return;

  // Clear existing markers
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  // Add markers for devices with coordinates
  devicesWithCoordinates.value.forEach((device) => {
    const marker = L.marker([device.coordinates.lat, device.coordinates.lng], {
      icon: createMarkerIcon(device.status),
    }).addTo(map);

    marker.bindPopup(`
      <div style="min-width: 150px;">
        <strong>${device.deviceId}</strong><br>
        <span style="color: ${getMarkerColor(
          device.status,
        )}; font-weight: 600;">
          ${getStatusText(device.status)}
        </span><br>
        <span>${device.isOnline ? "🟢 Онлайн" : "🔴 Офлайн"}</span>
      </div>
    `);

    marker.on("click", () => {
      selectDevice(device);
    });

    markers.push(marker);
  });

  // If there's a focused device from query params, center on it
  const focusId = route.query.focus;
  if (focusId) {
    const focusedDevice = devicesWithCoordinates.value.find(
      (d) => d.deviceId === focusId,
    );
    if (focusedDevice) {
      map.setView(
        [focusedDevice.coordinates.lat, focusedDevice.coordinates.lng],
        18,
      );
      selectDevice(focusedDevice);
    }
  }
}

function centerMap() {
  if (map) {
    if (devicesWithCoordinates.value.length > 0) {
      // Center on first device with coordinates
      const device = devicesWithCoordinates.value[0];
      map.setView([device.coordinates.lat, device.coordinates.lng], 16);
    } else {
      // Default center: Ulaanbaatar
      map.setView([47.918082, 106.917], 16);
    }
  }
}

function selectDevice(device) {
  selectedDevice.value = device;
  if (!modalInstance && deviceModal.value) {
    modalInstance = new Modal(deviceModal.value);
  }
  modalInstance?.show();
}

function startRegisterMode(device) {
  registerMode.value = true;
  registerDevice.value = device;

  // Add a temporary marker that follows the cursor
  if (registerMarker) {
    map.removeLayer(registerMarker);
  }
}

function cancelRegisterMode() {
  registerMode.value = false;
  registerDevice.value = null;

  if (registerMarker) {
    map.removeLayer(registerMarker);
    registerMarker = null;
  }
}

async function refreshDevices() {
  await parkingStore.fetchDevices();
  updateMarkers();
}

async function raiseLock() {
  if (!selectedDevice.value) return;
  controlLoading.value = true;
  try {
    await parkingStore.raiseLock(selectedDevice.value.id);
    await refreshDevices();
  } catch (error) {
    console.error("Failed to raise lock:", error);
  } finally {
    controlLoading.value = false;
  }
}

async function lowerLock() {
  if (!selectedDevice.value) return;
  controlLoading.value = true;
  try {
    await parkingStore.lowerLock(selectedDevice.value.id);
    await refreshDevices();
  } catch (error) {
    console.error("Failed to lower lock:", error);
  } finally {
    controlLoading.value = false;
  }
}

onMounted(async () => {
  await parkingStore.fetchDevices();
  await parkingStore.fetchDashboardStats();

  setTimeout(() => {
    initMap();
  }, 100);
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
  modalInstance?.dispose();
});

// Update markers when devices change
watch(
  devices,
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

.device-list {
  max-height: 400px;
  overflow-y: auto;
}

.device-card {
  border: 1px solid var(--bs-border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.device-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.device-card.border-success-600 {
  border-left: 3px solid #22c55e;
}

.device-card.border-warning-600 {
  border-left: 3px solid #f59e0b;
}

.device-card.border-danger-600 {
  border-left: 3px solid #ef4444;
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

:deep(.custom-marker) {
  background: transparent;
  border: none;
}
</style>
