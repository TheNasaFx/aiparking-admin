import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "./auth";

const API_BASE_URL = "https://aiparking.mindsymbol.com";

// Status mapping from API to UI
export const PARKING_STATUS = {
  FREE: "FREE", // lock_state: raised, status: online
  OCCUPIED: "OCCUPIED", // lock_state: lowered, status: online
  OFFLINE: "OFFLINE", // status: offline
};

// Coordinate cache in localStorage (fallback when list API omits coords)
const COORD_CACHE_KEY = "device_coordinates_cache";

function getCachedCoordinates() {
  try {
    const stored = localStorage.getItem(COORD_CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function cacheCoordinates(deviceId, lat, lng) {
  const cache = getCachedCoordinates();
  cache[deviceId] = { lat, lng };
  localStorage.setItem(COORD_CACHE_KEY, JSON.stringify(cache));
}

// Map API device to parking spot format
function mapDeviceToParking(device) {
  // Try API coordinates first, fall back to localStorage cache
  let lat = device.location_lat ? parseFloat(device.location_lat) : null;
  let lng = device.location_lng ? parseFloat(device.location_lng) : null;

  if (!lat || !lng) {
    const cached = getCachedCoordinates();
    const c = cached[device.device_id];
    if (c) {
      lat = c.lat;
      lng = c.lng;
    }
  } else {
    // API returned coords — update cache
    cacheCoordinates(device.device_id, lat, lng);
  }

  const coordinates = lat && lng ? { lat, lng } : null;

  // Determine status based on lock_state and online status
  let status = PARKING_STATUS.OFFLINE;
  if (device.status === "online") {
    status =
      device.lock_state === "raised"
        ? PARKING_STATUS.FREE
        : PARKING_STATUS.OCCUPIED;
  }

  return {
    id: device.id,
    deviceId: device.device_id,
    name: device.name || device.device_id,
    address: device.address || "",
    status: status,
    lockState: device.lock_state,
    isOnline: device.status === "online",
    isPaid: device.is_paid || false,
    timer: device.timer || 0,
    coordinates: coordinates,
    hasCoordinates: !!coordinates,
    location: coordinates ? "Бүртгэгдсэн" : "Бүртгэгдээгүй",
    lastUpdated: new Date().toISOString(),
  };
}

export const useParkingStore = defineStore("parking", () => {
  const authStore = useAuthStore();

  const devices = ref([]);
  const dashboardStats = ref(null);
  const selectedDevice = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed statistics
  const totalDevices = computed(() => devices.value.length);
  const onlineDevices = computed(
    () => devices.value.filter((d) => d.isOnline).length,
  );
  const offlineDevices = computed(
    () => devices.value.filter((d) => !d.isOnline).length,
  );
  const freeSpots = computed(
    () => devices.value.filter((d) => d.status === PARKING_STATUS.FREE).length,
  );
  const occupiedSpots = computed(
    () =>
      devices.value.filter((d) => d.status === PARKING_STATUS.OCCUPIED).length,
  );
  const devicesWithCoordinates = computed(() =>
    devices.value.filter((d) => d.hasCoordinates),
  );

  const statistics = computed(() => ({
    total: totalDevices.value,
    online: onlineDevices.value,
    offline: offlineDevices.value,
    free: freeSpots.value,
    occupied: occupiedSpots.value,
    ...(dashboardStats.value || {}),
  }));

  // Fetch all devices from API
  async function fetchDevices() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/devices`, {
        method: "GET",
        headers: {
          ...authStore.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (data.success && data.data?.devices) {
        const rawDevices = data.data.devices;
        devices.value = rawDevices.map(mapDeviceToParking);

        // For devices without coords in cache, fetch individually to get coordinates
        const devicesNeedingCoords = devices.value.filter(
          (d) => !d.hasCoordinates,
        );
        if (devicesNeedingCoords.length > 0) {
          await Promise.allSettled(
            devicesNeedingCoords.map(async (device) => {
              try {
                const detailRes = await fetch(
                  `${API_BASE_URL}/admin/devices/${device.id}`,
                  { headers: { ...authStore.getAuthHeader() } },
                );
                const detailData = await detailRes.json();
                if (detailData.success && detailData.data) {
                  const d = detailData.data;
                  const lat = d.location_lat
                    ? parseFloat(d.location_lat)
                    : null;
                  const lng = d.location_lng
                    ? parseFloat(d.location_lng)
                    : null;
                  if (lat && lng && d.device_id) {
                    cacheCoordinates(d.device_id, lat, lng);
                  }
                }
              } catch (_) {}
            }),
          );
          // Re-map devices with updated cache
          devices.value = rawDevices.map(mapDeviceToParking);
        }
      } else {
        throw new Error(data.message || "Failed to fetch devices");
      }
    } catch (e) {
      console.error("Fetch devices error:", e);
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  // Fetch dashboard statistics
  async function fetchDashboardStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
          ...authStore.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        dashboardStats.value = {
          availableSpots: data.data.available_spots,
          occupiedSpots: data.data.occupied_spots,
          totalDevices: data.data.total_devices,
          onlineDevices: data.data.online_devices,
          offlineDevices: data.data.offline_devices,
          devicesWithErrors: data.data.devices_with_errors,
        };
      }
    } catch (e) {
      console.error("Fetch dashboard stats error:", e);
    }
  }

  // Fetch single device by ID
  async function fetchDeviceById(deviceId) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}`,
        {
          method: "GET",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );

      const data = await response.json();

      if (data.success && data.data) {
        selectedDevice.value = mapDeviceToParking(data.data);
        // Status history is not available from API, set empty array
        selectedDevice.value.statusHistory = [];
      } else {
        throw new Error(data.message || "Device not found");
      }
    } catch (e) {
      console.error("Fetch device error:", e);
      error.value = e.message;
      selectedDevice.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  // Save coordinates for a device via API
  async function saveDeviceCoordinates(deviceNumericId, lat, lng) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceNumericId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...authStore.getAuthHeader(),
          },
          body: JSON.stringify({
            location_lat: lat,
            location_lng: lng,
          }),
        },
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Координат хадгалах амжилтгүй");
      }

      // Cache coordinates locally (list API doesn't return coords)
      const deviceId = data.data?.device_id;
      if (deviceId) {
        cacheCoordinates(deviceId, lat, lng);
      }

      // Update local state directly instead of re-fetching
      const coordinates = { lat, lng };
      const index = devices.value.findIndex((d) => d.id === deviceNumericId);
      if (index !== -1) {
        devices.value[index] = {
          ...devices.value[index],
          coordinates: coordinates,
          hasCoordinates: true,
          location: "Бүртгэгдсэн",
        };
      }
      if (selectedDevice.value && selectedDevice.value.id === deviceNumericId) {
        selectedDevice.value = {
          ...selectedDevice.value,
          coordinates: coordinates,
          hasCoordinates: true,
          location: "Бүртгэгдсэн",
        };
      }

      return true;
    } catch (e) {
      console.error("Save coordinates error:", e);
      error.value = e.message;
      return false;
    }
  }

  // Control device - Raise lock
  async function raiseLock(deviceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}/raise`,
        {
          method: "POST",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        // Refresh devices after command
        await fetchDevices();
        return true;
      }
      throw new Error(data.message || "Failed to raise lock");
    } catch (e) {
      console.error("Raise lock error:", e);
      error.value = e.message;
      return false;
    }
  }

  // Control device - Lower lock
  async function lowerLock(deviceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}/lower`,
        {
          method: "POST",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        await fetchDevices();
        return true;
      }
      throw new Error(data.message || "Failed to lower lock");
    } catch (e) {
      console.error("Lower lock error:", e);
      error.value = e.message;
      return false;
    }
  }

  // Query device status
  async function queryDeviceStatus(deviceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}/query`,
        {
          method: "POST",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );

      const data = await response.json();
      if (data.success) {
        await fetchDevices();
        return data.data;
      }
      throw new Error(data.message || "Failed to query status");
    } catch (e) {
      console.error("Query status error:", e);
      error.value = e.message;
      return null;
    }
  }

  function clearSelectedDevice() {
    selectedDevice.value = null;
  }

  // ─── QR Code Management ─────────────────────
  async function generateDeviceQr(deviceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}/qr/generate`,
        {
          method: "POST",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        return data.data || data;
      }
      throw new Error(data.message || "QR код үүсгэхэд алдаа гарлаа");
    } catch (e) {
      console.error("Generate QR error:", e);
      error.value = e.message;
      return null;
    }
  }

  async function generateAllQrs() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/qr/generate-all`,
        {
          method: "POST",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        return data.data || data;
      }
      throw new Error(data.message || "Бүх QR код үүсгэхэд алдаа гарлаа");
    } catch (e) {
      console.error("Generate all QRs error:", e);
      error.value = e.message;
      return null;
    }
  }

  async function getDeviceQrInfo(deviceId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/devices/${deviceId}/qr`,
        {
          method: "GET",
          headers: {
            ...authStore.getAuthHeader(),
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        return data.data || data;
      }
      return null;
    } catch (e) {
      console.error("Get QR info error:", e);
      return null;
    }
  }

  // Compatibility aliases for existing code
  const parkingSpots = computed(() => devices.value);
  const selectedParking = computed(() => selectedDevice.value);
  const totalSpots = totalDevices;
  const inactiveSpots = offlineDevices;

  return {
    // State
    devices,
    parkingSpots,
    selectedDevice,
    selectedParking,
    dashboardStats,
    isLoading,
    error,

    // Computed
    totalDevices,
    totalSpots,
    onlineDevices,
    offlineDevices,
    inactiveSpots,
    freeSpots,
    occupiedSpots,
    devicesWithCoordinates,
    statistics,

    // Actions
    fetchDevices,
    fetchParkingSpots: fetchDevices,
    fetchDashboardStats,
    fetchDeviceById,
    fetchParkingById: fetchDeviceById,
    saveDeviceCoordinates,
    raiseLock,
    lowerLock,
    queryDeviceStatus,
    clearSelectedDevice,
    clearSelectedParking: clearSelectedDevice,
    generateDeviceQr,
    generateAllQrs,
    getDeviceQrInfo,
  };
});
