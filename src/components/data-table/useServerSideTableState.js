import { ref } from "vue";

export function useServerSideTableState() {
  const pagination = ref({
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 3,
  });

  const filter = ref({});

  return {
    pagination,
    filter,
  };
}
