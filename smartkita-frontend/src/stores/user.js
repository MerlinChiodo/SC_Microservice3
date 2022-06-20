import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userId: 1,
    token: "",
  }),
  getters: {},
  actions: {},
});
