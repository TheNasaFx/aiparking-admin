import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const PARKING_STATUS = {
  FREE: "FREE",
  RESERVED: "RESERVED",
  OCCUPIED: "OCCUPIED",
  INACTIVE: "INACTIVE",
};

const BASE_LAT = 47.918082;
const BASE_LNG = 106.930982;

function getOffset(index) {
  const offsets = [
    { lat: 0, lng: 0 },
    { lat: 0.0005, lng: 0.0008 },
    { lat: -0.0004, lng: 0.0006 },
    { lat: 0.0007, lng: -0.0003 },
    { lat: -0.0006, lng: -0.0007 },
    { lat: 0.0003, lng: 0.001 },
    { lat: -0.0008, lng: 0.0002 },
    { lat: 0.0009, lng: 0.0005 },
  ];
  return offsets[index % offsets.length];
}

function generateMockParkingData() {
  const statuses = [
    PARKING_STATUS.FREE,
    PARKING_STATUS.RESERVED,
    PARKING_STATUS.OCCUPIED,
    PARKING_STATUS.FREE,
    PARKING_STATUS.OCCUPIED,
    PARKING_STATUS.FREE,
    PARKING_STATUS.RESERVED,
    PARKING_STATUS.INACTIVE,
  ];

  const locations = [
    "A-1 Зүүн",
    "A-2 Баруун",
    "B-1 Урд",
    "B-2 Хойд",
    "C-1 Төв",
    "C-2 Гадна",
    "D-1 Дотор",
    "D-2 Нэмэлт",
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const offset = getOffset(i);
    const now = new Date();
    const lastUpdated = new Date(now.getTime() - Math.random() * 3600000);

    return {
      id: `PKG-${String(i + 1).padStart(3, "0")}`,
      status: statuses[i],
      location: locations[i],
      coordinates: {
        lat: BASE_LAT + offset.lat,
        lng: BASE_LNG + offset.lng,
      },
      lastUpdated: lastUpdated.toISOString(),
      createdAt: "2024-01-15T08:00:00Z",
      deviceId: `DEV-${1000 + i}`,
      zone: String.fromCharCode(65 + Math.floor(i / 2)),
    };
  });
}

function generateStatusHistory(parkingId) {
  const statuses = [
    PARKING_STATUS.FREE,
    PARKING_STATUS.RESERVED,
    PARKING_STATUS.OCCUPIED,
    PARKING_STATUS.FREE,
  ];

  const now = new Date();

  return Array.from({ length: 10 }, (_, i) => {
    const timestamp = new Date(now.getTime() - (i + 1) * 1800000);
    return {
      id: `${parkingId}-H${i + 1}`,
      status: statuses[i % statuses.length],
      timestamp: timestamp.toISOString(),
      duration: Math.floor(Math.random() * 120) + 10,
    };
  });
}

export const useParkingStore = defineStore("parking", () => {
  const parkingSpots = ref([]);
  const selectedParking = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const totalSpots = computed(() => parkingSpots.value.length);
  const freeSpots = computed(
    () =>
      parkingSpots.value.filter((p) => p.status === PARKING_STATUS.FREE).length,
  );
  const reservedSpots = computed(
    () =>
      parkingSpots.value.filter((p) => p.status === PARKING_STATUS.RESERVED)
        .length,
  );
  const occupiedSpots = computed(
    () =>
      parkingSpots.value.filter((p) => p.status === PARKING_STATUS.OCCUPIED)
        .length,
  );
  const inactiveSpots = computed(
    () =>
      parkingSpots.value.filter((p) => p.status === PARKING_STATUS.INACTIVE)
        .length,
  );
  const activeSpots = computed(() => totalSpots.value - inactiveSpots.value);

  const statistics = computed(() => ({
    total: totalSpots.value,
    free: freeSpots.value,
    reserved: reservedSpots.value,
    occupied: occupiedSpots.value,
    inactive: inactiveSpots.value,
    active: activeSpots.value,
  }));

  async function fetchParkingSpots() {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      parkingSpots.value = generateMockParkingData();
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchParkingById(id) {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const parking = parkingSpots.value.find((p) => p.id === id);

      if (parking) {
        selectedParking.value = {
          ...parking,
          statusHistory: generateStatusHistory(parking.id),
        };
      } else {
        throw new Error("Parking not found");
      }
    } catch (e) {
      error.value = e.message;
      selectedParking.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  function updateParkingStatus(id, newStatus) {
    const index = parkingSpots.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      parkingSpots.value[index] = {
        ...parkingSpots.value[index],
        status: newStatus,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  function clearSelectedParking() {
    selectedParking.value = null;
  }

  function simulateRealTimeUpdates() {
    setInterval(() => {
      if (parkingSpots.value.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * parkingSpots.value.length,
        );
        const statuses = [
          PARKING_STATUS.FREE,
          PARKING_STATUS.RESERVED,
          PARKING_STATUS.OCCUPIED,
        ];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        if (
          parkingSpots.value[randomIndex].status !== PARKING_STATUS.INACTIVE
        ) {
          updateParkingStatus(parkingSpots.value[randomIndex].id, randomStatus);
        }
      }
    }, 10000);
  }

  return {
    parkingSpots,
    selectedParking,
    isLoading,
    error,
    totalSpots,
    freeSpots,
    reservedSpots,
    occupiedSpots,
    inactiveSpots,
    activeSpots,
    statistics,
    fetchParkingSpots,
    fetchParkingById,
    updateParkingStatus,
    clearSelectedParking,
    simulateRealTimeUpdates,
  };
});
