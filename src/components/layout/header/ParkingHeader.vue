<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isMobileOpen }">
    <!-- Mobile Close -->
    <button type="button" class="sidebar-close-btn" @click="closeSidebar">
      <iconify-icon icon="radix-icons:cross-2" />
    </button>

    <!-- Logo -->
    <router-link to="/" class="sidebar-logo">
      <img src="@/assets/images/logo.png" alt="Logo" class="light-logo" />
      <img src="@/assets/images/logo-light.png" alt="Logo" class="dark-logo" />
      <img src="@/assets/images/logo-icon.png" alt="Logo" class="logo-icon" />
    </router-link>

    <!-- Menu -->
    <div class="sidebar-menu-area">
      <ul class="sidebar-menu">
        <!-- Dashboard Section -->
        <li :class="{ dropdown: true, open: activeDropdown === 'dashboard' }">
          <a
            href="javascript:void(0)"
            @click="toggleDropdown('dashboard')"
            :class="{ active: isDashboardActive }"
          >
            <iconify-icon
              icon="solar:home-smile-angle-outline"
              class="menu-icon"
            />
            <span>Хяналтын самбар</span>
            <span
              class="dropdown-arrow"
              :class="{ rotated: activeDropdown === 'dashboard' }"
            ></span>
          </a>

          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <ul
              v-show="activeDropdown === 'dashboard'"
              ref="dashboardMenu"
              class="sidebar-submenu"
            >
              <li
                v-for="item in dashboardItems"
                :key="item.path"
                :class="['nav-link', { 'active-page': isActive(item.path) }]"
              >
                <router-link :to="item.path">
                  <i
                    class="ri-circle-fill circle-icon"
                    :class="item.colorClass"
                  />
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </transition>
        </li>

        <!-- Parking Management Section -->
        <li class="sidebar-menu-group-title">Зогсоол удирдлага</li>

        <li>
          <router-link
            to="/parking-list"
            @click="() => goToRoute('/parking-list')"
            :class="{ 'active-page': isActive('/parking-list') }"
          >
            <iconify-icon
              icon="mdi:car-multiple"
              class="menu-icon"
            ></iconify-icon>
            <span>Зогсоолын жагсаалт</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/parking-map"
            @click="() => goToRoute('/parking-map')"
            :class="{ 'active-page': isActive('/parking-map') }"
          >
            <iconify-icon
              icon="mdi:map-marker-radius"
              class="menu-icon"
            ></iconify-icon>
            <span>Газрын зураг</span>
          </router-link>
        </li>

        <!-- Reports Section -->
        <li class="sidebar-menu-group-title">Тайлан</li>

        <li>
          <router-link
            to="/revenue"
            @click="() => goToRoute('/revenue')"
            :class="{ 'active-page': isActive('/revenue') }"
          >
            <iconify-icon
              icon="mdi:cash-multiple"
              class="menu-icon"
            ></iconify-icon>
            <span>Орлогын тайлан</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/statistics"
            @click="() => goToRoute('/statistics')"
            :class="{ 'active-page': isActive('/statistics') }"
          >
            <iconify-icon icon="mdi:chart-bar" class="menu-icon"></iconify-icon>
            <span>Статистик</span>
          </router-link>
        </li>

        <!-- Settings Section -->
        <li class="sidebar-menu-group-title">Систем</li>

        <li>
          <router-link
            to="/settings"
            @click="() => goToRoute('/settings')"
            :class="{ 'active-page': isActive('/settings') }"
          >
            <iconify-icon
              icon="icon-park-outline:setting-two"
              class="menu-icon"
            ></iconify-icon>
            <span>Тохиргоо</span>
          </router-link>
        </li>

        <li>
          <a
            href="javascript:void(0)"
            @click="handleLogout"
            class="text-danger-main"
          >
            <iconify-icon icon="lucide:power" class="menu-icon"></iconify-icon>
            <span>Гарах</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isMobileOpen = ref(false);
const activeDropdown = ref(null);

const dashboardItems = [
  { path: "/", label: "Ерөнхий мэдээлэл", colorClass: "text-info" },
  {
    path: "/parking-control",
    label: "Зогсоолын хяналт",
    colorClass: "text-success",
  },
  { path: "/revenue", label: "Орлогын тайлан", colorClass: "text-warning" },
];

const isDashboardActive = computed(() => {
  return dashboardItems.some((item) => item.path === route.path);
});

function isActive(path) {
  return route.path === path;
}

function goToRoute(path) {
  closeSidebar();
  router.push(path);
}

function toggleDropdown(menu) {
  if (activeDropdown.value === menu) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = menu;
  }
}

function closeSidebar() {
  isMobileOpen.value = false;
}

function handleLogout() {
  authStore.logout();
  router.push("/sign-in");
}

// Transition hooks
function beforeEnter(el) {
  el.style.height = "0";
  el.style.overflow = "hidden";
}

function enter(el) {
  el.style.height = el.scrollHeight + "px";
}

function afterEnter(el) {
  el.style.height = "auto";
  el.style.overflow = "";
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + "px";
  el.style.overflow = "hidden";
}

function leave(el) {
  el.style.height = "0";
}

function afterLeave(el) {
  el.style.height = "";
  el.style.overflow = "";
}

onMounted(() => {
  // Auto-open dashboard dropdown if on a dashboard page
  if (isDashboardActive.value) {
    activeDropdown.value = "dashboard";
  }
});
</script>

<style scoped>
.sidebar-submenu {
  transition: height 0.3s ease;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.text-danger-main:hover {
  color: #dc3545 !important;
}
</style>
