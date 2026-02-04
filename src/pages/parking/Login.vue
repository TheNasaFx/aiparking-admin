<template>
  <section class="auth bg-base d-flex flex-wrap">
    <div class="auth-left d-lg-block d-none">
      <div
        class="d-flex align-items-center flex-column h-100 justify-content-center"
      >
        <div class="text-center">
          <img
            src="@/assets/images/auth/auth-img.png"
            alt="Parking"
            class="auth-img"
          />
        </div>
      </div>
    </div>
    <div
      class="auth-right py-32 px-24 d-flex flex-column justify-content-center"
    >
      <div class="max-w-464-px mx-auto w-100">
        <div class="text-center mb-40">
          <h4 class="mb-12">Зогсоолын удирдлагын систем</h4>
          <p class="mb-0 text-secondary-light text-lg">
            Системд нэвтрэхийн тулд нэвтрэх нэр, нууц үгээ оруулна уу
          </p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="icon-field mb-16">
            <span class="icon top-50 translate-middle-y">
              <iconify-icon icon="mage:user" />
            </span>
            <input
              v-model="username"
              type="text"
              class="form-control h-56-px bg-neutral-50 radius-12"
              placeholder="Нэвтрэх нэр"
              :class="{ 'is-invalid': errors.username }"
            />
            <div v-if="errors.username" class="invalid-feedback">
              {{ errors.username }}
            </div>
          </div>

          <div class="position-relative mb-20">
            <div class="icon-field">
              <span class="icon top-50 translate-middle-y">
                <iconify-icon icon="solar:lock-password-outline" />
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Нууц үг"
                :class="{ 'is-invalid': errors.password }"
              />
            </div>
            <span
              @click="showPassword = !showPassword"
              class="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
            >
              <iconify-icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" />
            </span>
            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>
          </div>

          <div
            v-if="loginError"
            class="alert alert-danger py-12 radius-8 mb-16"
          >
            <div class="d-flex align-items-center gap-8">
              <iconify-icon icon="mdi:alert-circle" class="text-xl" />
              <span>{{ loginError }}</span>
            </div>
          </div>

          <div class="d-flex justify-content-between gap-2 mb-24">
            <div class="form-check style-check d-flex align-items-center">
              <input
                class="form-check-input border border-neutral-300"
                type="checkbox"
                v-model="rememberMe"
                id="rememberMe"
              />
              <label class="form-check-label" for="rememberMe"
                >Намайг сана</label
              >
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-12"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm me-8"
            ></span>
            {{ isLoading ? "Нэвтэрж байна..." : "Нэвтрэх" }}
          </button>

          <div class="mt-24 text-center">
            <div class="bg-neutral-100 p-16 radius-8">
              <p class="text-secondary-light text-sm mb-8">
                Туршилтын нэвтрэх мэдээлэл:
              </p>
              <p class="mb-0 text-sm">
                <strong>Нэвтрэх нэр:</strong> admin<br />
                <strong>Нууц үг:</strong> admin123
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);
const loginError = ref("");
const errors = ref({
  username: "",
  password: "",
});

function validateForm() {
  errors.value = { username: "", password: "" };
  let isValid = true;

  if (!username.value.trim()) {
    errors.value.username = "Нэвтрэх нэрээ оруулна уу";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "Нууц үгээ оруулна уу";
    isValid = false;
  }

  return isValid;
}

async function handleLogin() {
  loginError.value = "";

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await authStore.login(username.value, password.value);

    if (rememberMe.value) {
      localStorage.setItem("remembered_username", username.value);
    } else {
      localStorage.removeItem("remembered_username");
    }

    router.push("/");
  } catch (error) {
    if (error.message === "invalid_credentials") {
      loginError.value = "Нэвтрэх нэр эсвэл нууц үг буруу байна";
    } else {
      loginError.value = "Алдаа гарлаа. Дахин оролдоно уу.";
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  // Check if user is already logged in
  if (authStore.isAuthenticated) {
    router.push("/");
    return;
  }

  // Load remembered username
  const rememberedUsername = localStorage.getItem("remembered_username");
  if (rememberedUsername) {
    username.value = rememberedUsername;
    rememberMe.value = true;
  }
});
</script>

<style scoped>
.auth {
  min-height: 100vh;
}

.auth-left {
  width: 50%;
  background: linear-gradient(135deg, #487fff 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-right {
  width: 50%;
  background: var(--bg-color);
}

@media (max-width: 991.98px) {
  .auth-right {
    width: 100%;
  }
}

.auth-img {
  max-width: 400px;
  width: 100%;
}

.icon-field {
  position: relative;
}

.icon-field .icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary-light);
}

.icon-field input {
  padding-left: 48px;
}

.toggle-password {
  cursor: pointer;
}

.max-w-464-px {
  max-width: 464px;
}

.h-56-px {
  height: 56px;
}
</style>
