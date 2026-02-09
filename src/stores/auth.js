import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const API_BASE_URL = "https://aiparking.mindsymbol.com";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("auth_token") || null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        const authToken = data.data.token;
        const authUser = {
          id: data.data.admin?.id || 1,
          username: username,
          name: "Админ",
          role: "Системийн админ",
          avatar: null,
        };

        token.value = authToken;
        user.value = authUser;
        localStorage.setItem("auth_token", authToken);
        localStorage.setItem("auth_user", JSON.stringify(authUser));

        return { user: authUser, token: authToken };
      } else {
        throw new Error(data.message || "invalid_credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("invalid_credentials");
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }

  function initAuth() {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser && token.value) {
      user.value = JSON.parse(savedUser);
    }
  }

  function getAuthHeader() {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {};
  }

  initAuth();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initAuth,
    getAuthHeader,
  };
});
