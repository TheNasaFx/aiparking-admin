import { defineStore } from "pinia";
import { ref, computed } from "vue";

function generateMockRevenueData() {
  const data = [];
  const now = new Date();

  for (let i = 59; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseIncome = isWeekend ? 150000 : 100000;
    const variance = Math.random() * 50000;

    data.push({
      date: date.toISOString().split("T")[0],
      income: Math.round(baseIncome + variance),
      parkingsUsed: Math.floor(Math.random() * 50) + (isWeekend ? 80 : 50),
    });
  }

  return data;
}

export const useRevenueStore = defineStore("revenue", () => {
  const revenueData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const totalRevenue = computed(() =>
    revenueData.value.reduce((sum, item) => sum + item.income, 0),
  );

  const last30DaysRevenue = computed(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return revenueData.value
      .filter((item) => new Date(item.date) >= thirtyDaysAgo)
      .reduce((sum, item) => sum + item.income, 0);
  });

  const averageDailyRevenue = computed(() => {
    if (revenueData.value.length === 0) return 0;
    return Math.round(totalRevenue.value / revenueData.value.length);
  });

  const totalParkingsUsed = computed(() =>
    revenueData.value.reduce((sum, item) => sum + item.parkingsUsed, 0),
  );

  const last7DaysData = computed(() => {
    return revenueData.value.slice(-7);
  });

  const last30DaysData = computed(() => {
    return revenueData.value.slice(-30);
  });

  // Өнөөдрийн орлого
  const todayRevenue = computed(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayData = revenueData.value.find((item) => item.date === today);
    return todayData ? todayData.income : 0;
  });

  // Өчигдрийн орлого
  const yesterdayRevenue = computed(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const yesterdayData = revenueData.value.find(
      (item) => item.date === yesterdayStr,
    );
    return yesterdayData ? yesterdayData.income : 0;
  });

  // Өсөлтийн хувь
  const revenueGrowth = computed(() => {
    if (yesterdayRevenue.value === 0) return 0;
    return (
      ((todayRevenue.value - yesterdayRevenue.value) / yesterdayRevenue.value) *
      100
    ).toFixed(1);
  });

  async function fetchRevenueData() {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      revenueData.value = generateMockRevenueData();
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    revenueData,
    isLoading,
    error,
    totalRevenue,
    last30DaysRevenue,
    averageDailyRevenue,
    totalParkingsUsed,
    last7DaysData,
    last30DaysData,
    todayRevenue,
    yesterdayRevenue,
    revenueGrowth,
    fetchRevenueData,
  };
});
