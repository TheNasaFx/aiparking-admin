import { createRouter, createWebHistory } from "vue-router";

// Parking System Pages
import Overview from "./pages/parking/Overview.vue";
import Control from "./pages/parking/Control.vue";
import Revenue from "./pages/parking/Revenue.vue";
import ParkingList from "./pages/parking/ParkingList.vue";
import Login from "./pages/parking/Login.vue";

// Settings page from original template
import Company from "./pages/settings/company.vue";

// Original template dashboard pages (for reference)
import Analytics from "./pages/dashboard/analytics.vue";
import PosInventory from "./pages/dashboard/PosInventory.vue";
import FinanceBanking from "./pages/dashboard/financeBanking.vue";

const routes = [
  // ==========================================
  // PARKING SYSTEM ROUTES
  // ==========================================

  // Main Dashboard - Ерөнхий мэдээлэл
  { path: "/", component: Overview, meta: { requiresAuth: true } },

  // Parking Control - Зогсоолын хяналт
  {
    path: "/parking-control",
    component: Control,
    meta: { requiresAuth: true },
  },

  // Parking List - Зогсоолын жагсаалт
  {
    path: "/parking-list",
    component: ParkingList,
    meta: { requiresAuth: true },
  },

  // Parking Map (redirect to control)
  { path: "/parking-map", redirect: "/parking-control" },

  // Revenue - Орлогын тайлан
  { path: "/revenue", component: Revenue, meta: { requiresAuth: true } },

  // Statistics (redirect to overview for now)
  { path: "/statistics", redirect: "/" },

  // Settings
  { path: "/settings", component: Company, meta: { requiresAuth: true } },

  // Auth - Login
  { path: "/sign-in", component: Login, meta: { layout: false } },

  // Original template routes (for reference if needed)
  { path: "/analytics", component: Analytics },
  { path: "/pos-inventory", component: PosInventory },
  { path: "/finance-banking", component: FinanceBanking },

  // Catch all - redirect to home
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      next("/sign-in");
      return;
    }
  }

  // If going to sign-in and already authenticated, redirect to home
  if (to.path === "/sign-in") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      next("/");
      return;
    }
  }

  next();
});

export default router;
