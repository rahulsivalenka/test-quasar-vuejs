import { defineStore } from "pinia";

export const useTableStore = defineStore("counter", {
  state: () => ({
    pagination: {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    },
    filter: {},
  }),
});
