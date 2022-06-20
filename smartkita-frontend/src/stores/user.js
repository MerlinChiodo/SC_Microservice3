import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: 1,
    smartCityId: 1,
    userData: null,
    token: "",
  }),
  getters: {},
  actions: {},
});
