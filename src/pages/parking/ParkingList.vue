<template>
  <div class="dashboard-main-body">
    <!-- Page Title -->
    <div
      class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"
    >
      <h6 class="fw-semibold mb-0">Зогсоолын жагсаалт</h6>
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
        <li class="fw-medium">Зогсоолын жагсаалт</li>
      </ul>
    </div>

    <!-- Stats Cards -->
    <div class="row gy-4 mb-4">
      <div class="col-lg-3 col-sm-6">
        <div
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-primary-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-primary-100 text-primary-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:devices" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Нийт төхөөрөмж</span>
              <h5 class="mb-0 text-primary-600">{{ statistics.total }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-success-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-success-100 text-success-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:check-circle" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Сул (Онлайн)</span>
              <h5 class="mb-0 text-success-600">{{ statistics.free }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-warning-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-warning-100 text-warning-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:car" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm"
                >Ашиглагдаж байгаа</span
              >
              <h5 class="mb-0 text-warning-600">{{ statistics.occupied }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-danger-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-danger-100 text-danger-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:wifi-off" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Офлайн</span>
              <h5 class="mb-0 text-danger-600">{{ statistics.offline }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Device List -->
    <div class="card radius-8 border-0">
      <div class="card-body p-24">
        <div
          class="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20"
        >
          <h6 class="mb-0 fw-bold text-lg">Бүх зогсоолууд</h6>
          <div class="d-flex gap-12 align-items-center">
            <select v-model="statusFilter" class="form-select w-auto">
              <option value="ALL">Бүгд</option>
              <option value="FREE">Сул</option>
              <option value="OCCUPIED">Ашиглагдаж байгаа</option>
              <option value="OFFLINE">Офлайн</option>
            </select>
            <button
              @click="refreshDevices"
              class="btn btn-outline-primary-600 btn-sm radius-8"
              :disabled="isLoading"
            >
              <iconify-icon
                :icon="isLoading ? 'mdi:loading' : 'mdi:refresh'"
                :class="{ 'animate-spin': isLoading }"
              />
              Шинэчлэх
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-40">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-12 text-secondary-light">Уншиж байна...</p>
        </div>

        <!-- Device Grid -->
        <div v-else class="row gy-4">
          <div
            v-for="device in filteredDevices"
            :key="device.id"
            class="col-xxl-3 col-lg-4 col-sm-6"
          >
            <div
              class="card radius-8 overflow-hidden h-100"
              :class="getCardBorderClass(device.status)"
            >
              <div class="card-body p-16">
                <div
                  class="d-flex align-items-center justify-content-between mb-12"
                >
                  <h6 class="fw-semibold mb-0">{{ device.deviceId }}</h6>
                  <span
                    class="px-12 py-4 radius-4 text-white text-xs fw-semibold"
                    :class="getStatusClass(device.status)"
                  >
                    {{ getStatusText(device.status) }}
                  </span>
                </div>

                <div class="d-flex flex-column gap-8">
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:lock"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light">
                      Түгжээ:
                      {{ device.lockState === "raised" ? "Дээш" : "Доош" }}
                    </span>
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      :icon="device.isOnline ? 'mdi:wifi' : 'mdi:wifi-off'"
                      :class="
                        device.isOnline ? 'text-success-600' : 'text-danger-600'
                      "
                    />
                    <span
                      class="text-sm"
                      :class="
                        device.isOnline ? 'text-success-600' : 'text-danger-600'
                      "
                    >
                      {{ device.isOnline ? "Онлайн" : "Офлайн" }}
                    </span>
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:map-marker"
                      :class="
                        device.hasCoordinates
                          ? 'text-success-600'
                          : 'text-warning-600'
                      "
                    />
                    <span
                      class="text-sm"
                      :class="
                        device.hasCoordinates
                          ? 'text-success-600'
                          : 'text-warning-600'
                      "
                    >
                      {{
                        device.hasCoordinates
                          ? "Координат бүртгэгдсэн"
                          : "Координат бүртгэгдээгүй"
                      }}
                    </span>
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:clock-outline"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light">{{
                      formatTime(device.lastUpdated)
                    }}</span>
                  </div>
                </div>

                <div class="mt-16 d-flex gap-8">
                  <button
                    @click="viewDetails(device)"
                    class="btn btn-sm btn-primary-600 flex-grow-1 radius-8"
                  >
                    <iconify-icon icon="mdi:eye" class="me-1" />
                    Дэлгэрэнгүй
                  </button>
                  <button
                    v-if="device.hasCoordinates"
                    @click="openOnMap(device)"
                    class="btn btn-sm btn-outline-primary-600 radius-8"
                    title="Газрын зураг дээр харах"
                  >
                    <iconify-icon icon="mdi:map" />
                  </button>
                  <button
                    @click="openCoordinateModal(device)"
                    class="btn btn-sm radius-8"
                    :class="
                      device.hasCoordinates
                        ? 'btn-outline-secondary-600'
                        : 'btn-outline-warning-600'
                    "
                    :title="
                      device.hasCoordinates
                        ? 'Координат шинэчлэх'
                        : 'Газрын зураг дээр бүртгэх'
                    "
                  >
                    <iconify-icon
                      :icon="
                        device.hasCoordinates
                          ? 'mdi:map-marker-radius'
                          : 'mdi:map-marker-plus'
                      "
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!isLoading && filteredDevices.length === 0"
          class="text-center py-40"
        >
          <iconify-icon
            icon="mdi:parking"
            class="text-6xl text-secondary-light mb-16"
          />
          <p class="text-secondary-light">Төхөөрөмж олдсонгүй</p>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div
      class="modal fade"
      id="deviceDetailModal"
      tabindex="-1"
      ref="deviceModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
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
            <div class="row gy-4">
              <div class="col-md-6">
                <h6 class="mb-16 fw-semibold text-primary-light">
                  Ерөнхий мэдээлэл
                </h6>
                <div class="d-flex flex-column gap-12">
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">ID:</span>
                    <span class="fw-semibold text-primary-light">{{
                      selectedDevice.id
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Төхөөрөмжийн ID:</span>
                    <span class="fw-semibold text-primary-light">{{
                      selectedDevice.deviceId
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Төлөв:</span>
                    <span
                      class="px-12 py-4 radius-4 text-white text-xs fw-semibold"
                      :class="getStatusClass(selectedDevice.status)"
                    >
                      {{ getStatusText(selectedDevice.status) }}
                    </span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Түгжээний төлөв:</span>
                    <span class="fw-semibold text-primary-light">
                      {{
                        selectedDevice.lockState === "raised"
                          ? "Дээш (Сул)"
                          : "Доош (Эзэмшигдсэн)"
                      }}
                    </span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
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
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Координат:</span>
                    <span
                      class="fw-semibold text-primary-light"
                      v-if="selectedDevice.hasCoordinates"
                    >
                      {{ selectedDevice.coordinates?.lat?.toFixed(6) }},
                      {{ selectedDevice.coordinates?.lng?.toFixed(6) }}
                    </span>
                    <span class="text-warning-600" v-else>Бүртгэгдээгүй</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-primary-light">Сүүлд шинэчлэгдсэн:</span>
                    <span class="fw-semibold text-primary-light">{{
                      formatTime(selectedDevice.lastUpdated)
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h6 class="mb-16 fw-semibold text-primary-light">
                  Төлөвийн түүх
                </h6>
                <div class="text-center py-20 text-secondary-light">
                  <iconify-icon icon="mdi:history" class="text-4xl mb-8" />
                  <p class="mb-0">Түүхийн мэдээлэл одоогоор байхгүй байна</p>
                </div>
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
            <button
              v-if="selectedDevice?.hasCoordinates"
              type="button"
              class="btn btn-primary-600 radius-8"
              @click="goToMap"
            >
              <iconify-icon icon="mdi:map" class="me-1" />
              Газрын зураг дээр харах
            </button>
            <button
              v-else
              type="button"
              class="btn btn-warning-600 radius-8"
              @click="openCoordinateModalFromDetail"
            >
              <iconify-icon icon="mdi:map-marker-plus" class="me-1" />
              Газрын зураг дээр бүртгэх
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Coordinate Registration Modal -->
    <div
      class="modal fade"
      id="coordinateModal"
      tabindex="-1"
      ref="coordinateModalRef"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content radius-16">
          <div class="modal-header">
            <h5 class="modal-title">
              Газрын зураг дээр бүртгэх - {{ coordinateDevice?.deviceId }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-info mb-16">
              <iconify-icon icon="mdi:information" class="me-2" />
              Газрын зураг дээр дарж төхөөрөмжийн байршлыг сонгоно уу
            </div>
            <div
              ref="coordinateMapContainer"
              class="coordinate-map-container"
              style="height: 400px; border-radius: 8px"
            ></div>
            <div v-if="tempCoordinates" class="mt-16 p-12 bg-light radius-8">
              <div class="d-flex align-items-center gap-2">
                <iconify-icon
                  icon="mdi:map-marker"
                  class="text-success-600 text-xl"
                />
                <span class="fw-semibold">Сонгосон координат:</span>
                <span class="text-primary-light">
                  {{ tempCoordinates.lat.toFixed(6) }},
                  {{ tempCoordinates.lng.toFixed(6) }}
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary-600 radius-8"
              data-bs-dismiss="modal"
            >
              Болих
            </button>
            <button
              type="button"
              class="btn btn-success-600 radius-8"
              :disabled="!tempCoordinates"
              @click="saveCoordinates"
            >
              <iconify-icon icon="mdi:check" class="me-1" />
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useParkingStore, PARKING_STATUS } from "@/stores/parking";
import { Modal } from "bootstrap";
import L from "leaflet";

const router = useRouter();
const parkingStore = useParkingStore();

const deviceModal = ref(null);
const coordinateModalRef = ref(null);
const coordinateMapContainer = ref(null);

let deviceModalInstance = null;
let coordinateModalInstance = null;
let coordinateMap = null;
let tempMarker = null;

const statusFilter = ref("ALL");
const selectedDevice = ref(null);
const coordinateDevice = ref(null);
const tempCoordinates = ref(null);

const devices = computed(() => parkingStore.devices);
const statistics = computed(() => parkingStore.statistics);
const isLoading = computed(() => parkingStore.isLoading);

const filteredDevices = computed(() => {
  return devices.value.filter((d) => {
    if (statusFilter.value === "ALL") return true;
    return d.status === statusFilter.value;
  });
});

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Дөнгөж сая";
  if (minutes < 60) return `${minutes} мин өмнө`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} цагийн өмнө`;

  return date.toLocaleDateString("mn-MN");
}

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

function getCardBorderClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "border-start border-4 border-success-600";
    case PARKING_STATUS.OCCUPIED:
      return "border-start border-4 border-warning-600";
    case PARKING_STATUS.OFFLINE:
      return "border-start border-4 border-danger-600";
    default:
      return "";
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
}

async function viewDetails(device) {
  selectedDevice.value = device;

  if (!deviceModalInstance && deviceModal.value) {
    deviceModalInstance = new Modal(deviceModal.value);
  }
  deviceModalInstance?.show();
}

function openOnMap(device) {
  router.push({ path: "/parking-control", query: { focus: device.deviceId } });
}

function goToMap() {
  deviceModalInstance?.hide();
  if (selectedDevice.value) {
    router.push({
      path: "/parking-control",
      query: { focus: selectedDevice.value.deviceId },
    });
  }
}

function openCoordinateModal(device) {
  coordinateDevice.value = device;
  tempCoordinates.value = null;

  if (!coordinateModalInstance && coordinateModalRef.value) {
    coordinateModalInstance = new Modal(coordinateModalRef.value);
  }

  coordinateModalInstance?.show();

  // Initialize map after modal is shown
  nextTick(() => {
    setTimeout(() => {
      initCoordinateMap();
    }, 300);
  });
}

function openCoordinateModalFromDetail() {
  deviceModalInstance?.hide();
  setTimeout(() => {
    openCoordinateModal(selectedDevice.value);
  }, 300);
}

function initCoordinateMap() {
  if (coordinateMap) {
    coordinateMap.remove();
    coordinateMap = null;
  }

  if (!coordinateMapContainer.value) return;

  // Use existing coordinates or default to Ulaanbaatar center
  const existingCoords = coordinateDevice.value?.coordinates;
  const defaultCenter = existingCoords
    ? [existingCoords.lat, existingCoords.lng]
    : [47.9184, 106.9177];
  const defaultZoom = existingCoords ? 17 : 15;

  coordinateMap = L.map(coordinateMapContainer.value).setView(
    defaultCenter,
    defaultZoom,
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(coordinateMap);

  // Click handler to set marker
  coordinateMap.on("click", (e) => {
    const { lat, lng } = e.latlng;
    tempCoordinates.value = { lat, lng };

    // Remove existing marker
    if (tempMarker) {
      coordinateMap.removeLayer(tempMarker);
    }

    // Add new marker
    tempMarker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "custom-marker",
        html: `<div style="
          background: #10B981;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
        ">📍</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    }).addTo(coordinateMap);
  });

  // Force map to refresh size
  setTimeout(() => {
    coordinateMap.invalidateSize();

    // Show existing marker if device already has coordinates
    if (existingCoords) {
      tempCoordinates.value = {
        lat: existingCoords.lat,
        lng: existingCoords.lng,
      };
      tempMarker = L.marker([existingCoords.lat, existingCoords.lng], {
        icon: L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background: #10B981;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
          ">📍</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      }).addTo(coordinateMap);
    }
  }, 100);
}

function saveCoordinates() {
  if (!coordinateDevice.value || !tempCoordinates.value) return;

  parkingStore.saveDeviceCoordinates(
    coordinateDevice.value.id,
    tempCoordinates.value.lat,
    tempCoordinates.value.lng,
  );

  coordinateModalInstance?.hide();
  tempCoordinates.value = null;
  coordinateDevice.value = null;

  // Clean up marker
  if (tempMarker && coordinateMap) {
    coordinateMap.removeLayer(tempMarker);
    tempMarker = null;
  }
}

onMounted(async () => {
  await parkingStore.fetchDevices();
  await parkingStore.fetchDashboardStats();
});
</script>

<style scoped>
.status-history-list {
  max-height: 300px;
  overflow-y: auto;
}

.coordinate-map-container {
  border: 1px solid var(--bs-border-color);
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
