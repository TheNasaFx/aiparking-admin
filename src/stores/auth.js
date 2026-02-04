import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("auth_token") || null);

  // Mock credentials
  const MOCK_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const isAuthenticated = computed(() => !!token.value);

  function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          username === MOCK_CREDENTIALS.username &&
          password === MOCK_CREDENTIALS.password
        ) {
          const mockToken = "mock_jwt_token_" + Date.now();
          const mockUser = {
            id: 1,
            username: "admin",
            name: "Админ",
            role: "Системийн админ",
            avatar: null,
          };

          token.value = mockToken;
          user.value = mockUser;
          localStorage.setItem("auth_token", mockToken);
          localStorage.setItem("auth_user", JSON.stringify(mockUser));

          resolve({ user: mockUser, token: mockToken });
        } else {
          reject(new Error("invalid_credentials"));
        }
      }, 500);
    });
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

  initAuth();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
});
