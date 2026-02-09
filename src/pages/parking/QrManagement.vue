<template>
  <div class="dashboard-main-body">
    <!-- Page Title -->
    <div
      class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24"
    >
      <h6 class="fw-semibold mb-0">QR код удирдлага</h6>
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
        <li class="fw-medium">QR код удирдлага</li>
      </ul>
    </div>

    <!-- Action Bar -->
    <div class="card p-3 shadow-2 radius-8 mb-24">
      <div
        class="card-body p-0 d-flex flex-wrap align-items-center justify-content-between gap-3"
      >
        <div>
          <h6 class="mb-1 text-primary-600">
            <iconify-icon icon="mdi:qrcode" class="me-2" />
            Зогсоолын QR кодууд
          </h6>
          <p class="text-secondary-light text-sm mb-0">
            Зогсоолын төхөөрөмж бүрийн QR код үүсгэх, хэвлэх
          </p>
        </div>
        <div class="d-flex gap-2">
          <button
            class="btn btn-outline-primary-600 radius-8 px-20 py-10"
            @click="refreshDevices"
            :disabled="isLoading"
          >
            <iconify-icon icon="mdi:refresh" class="me-1" />
            Шинэчлэх
          </button>
          <button
            class="btn btn-primary-600 radius-8 px-20 py-10"
            @click="generateAll"
            :disabled="isGeneratingAll"
          >
            <span
              v-if="isGeneratingAll"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            <iconify-icon v-else icon="mdi:qrcode-plus" class="me-1" />
            Бүх QR үүсгэх
          </button>
        </div>
      </div>
    </div>

    <!-- Alert -->
    <div v-if="alertMessage" class="alert radius-8 mb-24" :class="alertClass">
      {{ alertMessage }}
      <button
        type="button"
        class="btn-close"
        @click="alertMessage = null"
      ></button>
    </div>

    <!-- Devices Grid -->
    <div v-if="isLoading && devices.length === 0" class="text-center py-5">
      <div class="spinner-border text-primary-600" role="status"></div>
      <p class="mt-3 text-secondary-light">Ачааллаж байна...</p>
    </div>

    <div v-else-if="devices.length === 0" class="text-center py-5">
      <iconify-icon icon="mdi:devices" class="text-6xl text-secondary-light" />
      <p class="mt-3 text-secondary-light">Төхөөрөмж олдсонгүй</p>
    </div>

    <div v-else class="row gy-4">
      <div
        v-for="device in devices"
        :key="device.id"
        class="col-xxl-3 col-xl-4 col-sm-6"
      >
        <div class="card shadow-2 radius-8 h-100">
          <div class="card-body p-3">
            <!-- Device Header -->
            <div class="d-flex align-items-center gap-2 mb-16">
              <span
                class="w-44-px h-44-px d-flex justify-content-center align-items-center rounded-circle"
                :class="statusBgClass(device)"
              >
                <iconify-icon icon="mdi:parking" class="text-xl text-white" />
              </span>
              <div>
                <h6 class="mb-0 text-md">{{ device.name }}</h6>
                <span class="text-secondary-light text-xs"
                  >ID: {{ device.deviceId }}</span
                >
              </div>
              <span
                class="ms-auto badge rounded-pill px-8 py-4 text-xs"
                :class="statusBadgeClass(device)"
              >
                {{ statusText(device) }}
              </span>
            </div>

            <!-- QR Code Display -->
            <div class="text-center mb-16">
              <div
                v-if="qrData[device.id]?.qr_image"
                class="border radius-8 p-2 d-inline-block bg-white"
              >
                <img
                  :src="'data:image/png;base64,' + qrData[device.id].qr_image"
                  alt="QR Code"
                  class="img-fluid"
                  style="max-width: 160px; max-height: 160px"
                />
              </div>
              <div
                v-else
                class="border radius-8 p-4 d-inline-block bg-neutral-50"
                style="width: 160px; height: 160px"
              >
                <div
                  class="d-flex flex-column align-items-center justify-content-center h-100"
                >
                  <iconify-icon
                    icon="mdi:qrcode"
                    class="text-4xl text-secondary-light mb-2"
                  />
                  <span class="text-secondary-light text-xs"
                    >QR үүсгэгдээгүй</span
                  >
                </div>
              </div>
            </div>

            <!-- QR Info -->
            <div v-if="qrData[device.id]?.qr_content" class="mb-16">
              <div class="bg-neutral-50 radius-8 p-2">
                <p class="text-xs text-secondary-light mb-1">QR агуулга:</p>
                <code class="text-xs text-primary-600">{{
                  qrData[device.id].qr_content
                }}</code>
              </div>
            </div>

            <!-- Actions -->
            <div class="d-flex gap-2">
              <button
                class="btn btn-outline-primary-600 radius-8 flex-fill py-8 text-sm"
                @click="generateQr(device)"
                :disabled="generatingDeviceId === device.id"
              >
                <span
                  v-if="generatingDeviceId === device.id"
                  class="spinner-border spinner-border-sm me-1"
                ></span>
                <iconify-icon v-else icon="mdi:qrcode-plus" class="me-1" />
                {{ qrData[device.id] ? "Дахин үүсгэх" : "QR үүсгэх" }}
              </button>
              <button
                v-if="qrData[device.id]?.qr_image"
                class="btn btn-outline-success-600 radius-8 py-8 text-sm"
                @click="printQr(device)"
                title="Хэвлэх"
              >
                <iconify-icon icon="mdi:printer" />
              </button>
              <button
                v-if="qrData[device.id]?.qr_image"
                class="btn btn-outline-info-600 radius-8 py-8 text-sm"
                @click="downloadQr(device)"
                title="Татах"
              >
                <iconify-icon icon="mdi:download" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Print Dialog (hidden) -->
    <div ref="printFrame" style="display: none"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useParkingStore } from "@/stores/parking";
import { storeToRefs } from "pinia";

const parkingStore = useParkingStore();
const { devices, isLoading } = storeToRefs(parkingStore);

const qrData = reactive({});
const generatingDeviceId = ref(null);
const isGeneratingAll = ref(false);
const alertMessage = ref(null);
const alertClass = ref("alert-success-600");
const printFrame = ref(null);

onMounted(async () => {
  await parkingStore.fetchDevices();
  // Load existing QR data for each device
  await loadAllQrInfo();
});

async function loadAllQrInfo() {
  for (const device of devices.value) {
    try {
      const info = await parkingStore.getDeviceQrInfo(device.id);
      if (info) {
        qrData[device.id] = info;
      }
    } catch (_) {}
  }
}

async function refreshDevices() {
  await parkingStore.fetchDevices();
  await loadAllQrInfo();
}

async function generateQr(device) {
  generatingDeviceId.value = device.id;
  try {
    const result = await parkingStore.generateDeviceQr(device.id);
    if (result) {
      qrData[device.id] = result;
      alertMessage.value = `${device.name} QR код амжилттай үүслээ!`;
      alertClass.value = "alert-success-600 bg-success-50 text-success-600";
    } else {
      alertMessage.value = `${device.name} QR код үүсгэхэд алдаа гарлаа`;
      alertClass.value = "alert-danger-600 bg-danger-50 text-danger-600";
    }
  } catch (e) {
    alertMessage.value = e.message;
    alertClass.value = "alert-danger-600 bg-danger-50 text-danger-600";
  } finally {
    generatingDeviceId.value = null;
    setTimeout(() => (alertMessage.value = null), 5000);
  }
}

async function generateAll() {
  isGeneratingAll.value = true;
  try {
    const result = await parkingStore.generateAllQrs();
    if (result) {
      alertMessage.value = "Бүх QR код амжилттай үүслээ!";
      alertClass.value = "alert-success-600 bg-success-50 text-success-600";
      // Reload QR data
      await loadAllQrInfo();
    } else {
      alertMessage.value = "QR код үүсгэхэд алдаа гарлаа";
      alertClass.value = "alert-danger-600 bg-danger-50 text-danger-600";
    }
  } catch (e) {
    alertMessage.value = e.message;
    alertClass.value = "alert-danger-600 bg-danger-50 text-danger-600";
  } finally {
    isGeneratingAll.value = false;
    setTimeout(() => (alertMessage.value = null), 5000);
  }
}

function downloadQr(device) {
  const data = qrData[device.id];
  if (!data?.qr_image) return;

  const link = document.createElement("a");
  link.href = `data:image/png;base64,${data.qr_image}`;
  link.download = `qr_device_${device.deviceId}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function printQr(device) {
  const data = qrData[device.id];
  if (!data?.qr_image) return;

  const printWindow = window.open("", "_blank", "width=400,height=500");
  printWindow.document.write(`
    <html>
      <head>
        <title>QR - ${device.name}</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          .container {
            text-align: center;
            padding: 20px;
          }
          h2 { margin-bottom: 8px; font-size: 24px; }
          p { color: #666; margin-bottom: 16px; font-size: 14px; }
          img { max-width: 250px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${device.name}</h2>
          <p>Device ID: ${device.deviceId}</p>
          <img src="data:image/png;base64,${data.qr_image}" />
          <p style="margin-top: 16px;">AI Park - Ухаалаг зогсоол</p>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function statusBgClass(device) {
  if (device.status === "FREE") return "bg-success-600";
  if (device.status === "OCCUPIED") return "bg-warning-600";
  return "bg-neutral-400";
}

function statusBadgeClass(device) {
  if (device.status === "FREE") return "bg-success-50 text-success-600";
  if (device.status === "OCCUPIED") return "bg-warning-50 text-warning-600";
  return "bg-neutral-50 text-neutral-600";
}

function statusText(device) {
  if (device.status === "FREE") return "Сул";
  if (device.status === "OCCUPIED") return "Эзэлсэн";
  return "Офлайн";
}
</script>
