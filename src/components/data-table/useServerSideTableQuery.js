import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { ref, onMounted, computed, useTemplateRef } from "vue";

export function useServerSideTableQuery(requestFn, { pagination, filter }) {
  const loading = ref(false);
  // const tableRef = useTemplateRef("data-table");
  // const pagination = ref({
  //   sortBy: "desc",
  //   descending: false,
  //   page: 1,
  //   rowsPerPage: 3,
  // });

  const tablePagination = ref({
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 3,
    rowsNumber: 0,
  });

  // const defaultFilter = ref({});

  // const finalFilter = filter || defaultFilter;

  const { data, isLoading } = useQuery({
    queryKey: ["table", pagination.value, filter.value],
    queryFn: ({ queryKey }) => requestFn(queryKey[1], queryKey[2]),
    placeholderData: keepPreviousData,
  });

  const handleRequest = async (props) => {
    console.log("onRequest", props);
    const { page, rowsPerPage, sortBy, descending } = props.pagination;

    loading.value = true;

    try {
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  };

  const totalCount = computed(() => data?.value?.totalCount ?? 0);
  const rows = computed(() => data?.value?.data ?? []);

  const finalPagination = computed(() => {
    tablePagination.value = { ...pagination.value, rowsNumber: totalCount };
    return tablePagination.value;
    // return { ...pagination.value, rowsNumber: totalCount };
  });

  onMounted(() => {
    // get initial data from server (1st page)
    // tableRef.requestServerInteraction();
  });

  return {
    pagination: finalPagination,
    loading: isLoading,
    onRequest: handleRequest,
    filter,
    // tableRef,
    rows,
  };
}
