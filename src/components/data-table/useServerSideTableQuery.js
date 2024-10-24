import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { ref, onMounted, computed, useTemplateRef } from "vue";
import { useServerSideTableState } from "./useServerSideTableState";

export function useServerSideTableQuery(requestFn, tableState) {
  const loading = ref(false);
  const dataTableRef = ref(null);

  const tablePagination = ref({
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 3,
    rowsNumber: 0,
  });

  const { pagination, filter } = tableState || useServerSideTableState();

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
    // TODO: check if another ref is necessary
    tablePagination.value = { ...pagination.value, rowsNumber: totalCount };
    return tablePagination.value;
  });

  onMounted(() => {
    // get initial data from server (1st page)
    dataTableRef.value?.tableRef?.requestServerInteraction?.();
  });

  return {
    pagination: finalPagination,
    loading: isLoading,
    onRequest: handleRequest,
    filter,
    dataTableRef,
    rows,
  };
}
