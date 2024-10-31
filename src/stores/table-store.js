import { defineStore } from "pinia";

export const useTableStore = defineStore("counter", {
  state: () => ({
    pagination: {
      sortBy: "",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    },
    filter: {},
  }),
});
