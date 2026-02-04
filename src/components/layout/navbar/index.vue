<template>
  <div class="navbar-header">
    <div class="row align-items-center justify-content-between">
      <div class="col-auto">
        <div class="d-flex flex-wrap align-items-center gap-4">
          <button
            type="button"
            class="sidebar-toggle"
            @click="toggleSidebarDesktop"
          >
            <iconify-icon
              :icon="
                isSidebarActive
                  ? 'iconoir:arrow-right'
                  : 'heroicons:bars-3-solid'
              "
              class="icon text-2xl"
            ></iconify-icon>
          </button>

          <button
            type="button"
            @click="toggleSidebarMobile"
            class="sidebar-mobile-toggle"
          >
            <iconify-icon
              icon="heroicons:bars-3-solid"
              class="icon"
            ></iconify-icon>
          </button>

          <form class="navbar-search">
            <input type="text" name="search" placeholder="Хайх..." />
            <iconify-icon icon="ion:search-outline" class="icon"></iconify-icon>
          </form>
        </div>
      </div>
      <div class="col-auto">
        <div class="d-flex flex-wrap align-items-center gap-3">
          <!-- Theme Toggle Button -->
          <button
            type="button"
            @click="toggleTheme"
            class="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
          >
            <iconify-icon
              :icon="theme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'"
              class="icon text-xl"
            ></iconify-icon>
          </button>

          <!-- Profile dropdown -->
          <div class="dropdown">
            <button
              class="d-flex justify-content-center align-items-center rounded-circle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="@/assets/images/user.png"
                alt="image"
                class="w-40-px h-40-px object-fit-cover rounded-circle"
              />
            </button>
            <div class="dropdown-menu to-top dropdown-menu-sm">
              <div
                class="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2"
              >
                <div>
                  <h6 class="text-lg text-primary-light fw-semibold mb-2">
                    Админ
                  </h6>
                  <span class="text-secondary-light fw-medium text-sm"
                    >Системийн админ</span
                  >
                </div>
                <button
                  type="button"
                  class="hover-text-danger"
                  data-bs-dismiss="dropdown"
                >
                  <iconify-icon
                    icon="radix-icons:cross-1"
                    class="icon text-xl"
                  ></iconify-icon>
                </button>
              </div>
              <ul class="to-top-list">
                <li>
                  <router-link
                    class="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                    to="/"
                  >
                    <iconify-icon
                      icon="solar:user-linear"
                      class="icon text-xl"
                    ></iconify-icon>
                    Профайл
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                    to="/settings"
                  >
                    <iconify-icon
                      icon="icon-park-outline:setting-two"
                      class="icon text-xl"
                    ></iconify-icon>
                    Тохиргоо
                  </router-link>
                </li>
                <li>
                  <a
                    class="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                    href="javascript:void(0)"
                    @click="handleLogout"
                  >
                    <iconify-icon
                      icon="lucide:power"
                      class="icon text-xl"
                    ></iconify-icon>
                    Гарах
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- Profile dropdown end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "@/composables/useTheme.js";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { theme, toggleTheme } = useTheme();
const isSidebarActive = ref(false);

function toggleSidebarDesktop() {
  isSidebarActive.value = !isSidebarActive.value;
  document.querySelector(".sidebar")?.classList.toggle("active");
  document.querySelector(".dashboard-main")?.classList.toggle("active");
}

function toggleSidebarMobile() {
  document.querySelector(".sidebar")?.classList.add("sidebar-open");
  document.body.classList.add("overlay-active");
}

function handleLogout() {
  authStore.logout();
  router.push("/sign-in");
}
</script>

<style>
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}
</style>
