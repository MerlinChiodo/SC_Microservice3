import { defineStore } from "pinia";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    internalId: null,
    smartCityId: null,
    userData: null,
    token: localStorage.getItem("token"),
    isLoggedIn: false,

    employeeId: null,
    employeeData: null,
    employeeToken: localStorage.getItem("employeeToken"),
    isLoggedInEmployee: false,
  }),
  getters: {},
  actions: {
    updateLoggedInEmployee(value) {
      Object.assign(this.isLoggedInEmployee, value);
    },
  },
});
