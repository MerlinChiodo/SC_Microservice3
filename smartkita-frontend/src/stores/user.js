import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: 1,
    smartCityId: null,
    userData: null,
    token: localStorage.getItem("token"),
    isLoggedIn: false,
    isEmployee: true,
  }),
  getters: {},
  actions: {},
});
