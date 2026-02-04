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
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-success-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-success-100 text-success-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:check-circle" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Сул</span>
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
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-info-600"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-info-100 text-info-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:calendar-clock" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Захиалсан</span>
              <h5 class="mb-0 text-info-600">{{ statistics.reserved }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div
          class="card p-3 shadow-2 radius-8 h-100 border-start border-4 border-neutral-400"
        >
          <div class="card-body p-0 d-flex align-items-center gap-16">
            <span
              class="w-48-px h-48-px bg-neutral-200 text-neutral-600 d-flex justify-content-center align-items-center rounded-circle"
            >
              <iconify-icon icon="mdi:close-circle" class="text-2xl" />
            </span>
            <div>
              <span class="text-secondary-light text-sm">Идэвхгүй</span>
              <h5 class="mb-0 text-neutral-600">{{ statistics.inactive }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parking Grid -->
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
              <option value="RESERVED">Захиалсан</option>
              <option value="INACTIVE">Идэвхгүй</option>
            </select>
            <select v-model="zoneFilter" class="form-select w-auto">
              <option value="ALL">Бүх бүс</option>
              <option v-for="zone in availableZones" :key="zone" :value="zone">
                Бүс {{ zone }}
              </option>
            </select>
          </div>
        </div>

        <div class="row gy-4">
          <div
            v-for="parking in filteredParkings"
            :key="parking.id"
            class="col-xxl-3 col-lg-4 col-sm-6"
          >
            <div
              class="card radius-8 overflow-hidden h-100"
              :class="getCardBorderClass(parking.status)"
            >
              <div class="card-body p-16">
                <div
                  class="d-flex align-items-center justify-content-between mb-12"
                >
                  <h6 class="fw-semibold mb-0">{{ parking.id }}</h6>
                  <span
                    class="px-12 py-4 radius-4 text-white text-xs fw-semibold"
                    :class="getStatusClass(parking.status)"
                  >
                    {{ getStatusText(parking.status) }}
                  </span>
                </div>

                <div class="d-flex flex-column gap-8">
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:map-marker"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light">{{
                      parking.location
                    }}</span>
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:grid"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light"
                      >Бүс {{ parking.zone }}</span
                    >
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:chip"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light">{{
                      parking.deviceId
                    }}</span>
                  </div>
                  <div class="d-flex align-items-center gap-8">
                    <iconify-icon
                      icon="mdi:clock-outline"
                      class="text-secondary-light"
                    />
                    <span class="text-sm text-secondary-light">{{
                      formatTime(parking.lastUpdated)
                    }}</span>
                  </div>
                </div>

                <div class="mt-16 d-flex gap-8">
                  <button
                    @click="viewDetails(parking)"
                    class="btn btn-sm btn-primary-600 flex-grow-1 radius-8"
                  >
                    <iconify-icon icon="mdi:eye" class="me-1" />
                    Дэлгэрэнгүй
                  </button>
                  <button
                    @click="openOnMap(parking)"
                    class="btn btn-sm btn-outline-primary-600 radius-8"
                  >
                    <iconify-icon icon="mdi:map" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredParkings.length === 0" class="text-center py-40">
          <iconify-icon
            icon="mdi:parking"
            class="text-6xl text-secondary-light mb-16"
          />
          <p class="text-secondary-light">Зогсоол олдсонгүй</p>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div
      class="modal fade"
      id="parkingDetailModal"
      tabindex="-1"
      ref="parkingModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content radius-16">
          <div class="modal-header">
            <h5 class="modal-title">
              Зогсоолын дэлгэрэнгүй - {{ selectedParking?.id }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedParking">
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
                      selectedParking.id
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Байршил:</span>
                    <span class="fw-semibold text-primary-light">{{
                      selectedParking.location
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Бүс:</span>
                    <span class="fw-semibold text-primary-light">{{
                      selectedParking.zone
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Төхөөрөмжийн ID:</span>
                    <span class="fw-semibold text-primary-light">{{
                      selectedParking.deviceId
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
                    <span class="text-primary-light">Төлөв:</span>
                    <span
                      class="px-12 py-4 radius-4 text-white text-xs fw-semibold"
                      :class="getStatusClass(selectedParking.status)"
                    >
                      {{ getStatusText(selectedParking.status) }}
                    </span>
                  </div>
                  <div
                    class="d-flex justify-content-between border-bottom pb-8"
                  >
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
              <div class="col-md-6">
                <h6 class="mb-16 fw-semibold text-primary-light">
                  Төлөвийн түүх
                </h6>
                <div class="status-history-list">
                  <div
                    v-for="(
                      history, index
                    ) in selectedParking.statusHistory?.slice(0, 5)"
                    :key="index"
                    class="d-flex align-items-center gap-12 pb-12 mb-12"
                    :class="{ 'border-bottom': index < 4 }"
                  >
                    <span
                      class="w-8-px h-8-px rounded-circle"
                      :class="getStatusDotClass(history.status)"
                    ></span>
                    <div class="flex-grow-1">
                      <span class="text-sm fw-medium text-primary-light">{{
                        getStatusText(history.status)
                      }}</span>
                      <p class="text-xs text-primary-light mb-0">
                        {{ formatDateTime(history.timestamp) }}
                      </p>
                    </div>
                    <span class="text-xs text-primary-light"
                      >{{ history.duration }} мин</span
                    >
                  </div>
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
              type="button"
              class="btn btn-primary-600 radius-8"
              @click="goToMap"
            >
              <iconify-icon icon="mdi:map" class="me-1" />
              Газрын зураг дээр харах
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useParkingStore, PARKING_STATUS } from "@/stores/parking";
import { Modal } from "bootstrap";

const router = useRouter();
const parkingStore = useParkingStore();

const parkingModal = ref(null);
let modalInstance = null;

const statusFilter = ref("ALL");
const zoneFilter = ref("ALL");
const selectedParking = ref(null);

const parkingSpots = computed(() => parkingStore.parkingSpots);
const statistics = computed(() => parkingStore.statistics);

const availableZones = computed(() => {
  const zones = [...new Set(parkingSpots.value.map((p) => p.zone))];
  return zones.sort();
});

const filteredParkings = computed(() => {
  return parkingSpots.value.filter((p) => {
    const statusMatch =
      statusFilter.value === "ALL" || p.status === statusFilter.value;
    const zoneMatch = zoneFilter.value === "ALL" || p.zone === zoneFilter.value;
    return statusMatch && zoneMatch;
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

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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

function getStatusDotClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "bg-success-600";
    case PARKING_STATUS.RESERVED:
      return "bg-info-600";
    case PARKING_STATUS.OCCUPIED:
      return "bg-warning-600";
    case PARKING_STATUS.INACTIVE:
      return "bg-neutral-400";
    default:
      return "bg-neutral-400";
  }
}

function getCardBorderClass(status) {
  switch (status) {
    case PARKING_STATUS.FREE:
      return "border-start border-4 border-success-600";
    case PARKING_STATUS.RESERVED:
      return "border-start border-4 border-info-600";
    case PARKING_STATUS.OCCUPIED:
      return "border-start border-4 border-warning-600";
    case PARKING_STATUS.INACTIVE:
      return "border-start border-4 border-neutral-400";
    default:
      return "";
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

async function viewDetails(parking) {
  await parkingStore.fetchParkingById(parking.id);
  selectedParking.value = parkingStore.selectedParking;

  if (!modalInstance && parkingModal.value) {
    modalInstance = new Modal(parkingModal.value);
  }
  modalInstance?.show();
}

function openOnMap(parking) {
  router.push({ path: "/parking-control", query: { focus: parking.id } });
}

function goToMap() {
  modalInstance?.hide();
  if (selectedParking.value) {
    router.push({
      path: "/parking-control",
      query: { focus: selectedParking.value.id },
    });
  }
}

onMounted(async () => {
  await parkingStore.fetchParkingSpots();
});
</script>

<style scoped>
.status-history-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
