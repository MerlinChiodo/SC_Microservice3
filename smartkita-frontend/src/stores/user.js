import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: 1,
    token: "",
  }),
  getters: {},
  actions: {},
});
