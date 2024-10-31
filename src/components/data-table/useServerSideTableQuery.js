import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { ref, onMounted, watch, computed } from "vue";
import { useServerSideTableState } from "./useServerSideTableState";

export function useServerSideTableQuery({
  queryFn,
  queryKey,
  tableState,
  ...queryOptions
}) {
  const dataTableRef = ref(null);
  
  const { pagination, filter } = tableState || useServerSideTableState();
  const tablePagination = ref({
    sortBy: "",
    descending: false,
    page: 1,
    rowsPerPage: 3,
    rowsNumber: 0,
  });


  const { data, ...queryResponse } = useQuery({
    ...queryOptions,
    queryKey: [
      ...(Array.isArray(queryKey) ? queryKey : [queryKey]),
      { pagination, filter }
    ],
    queryFn: ({ queryKey, ...queryFnProps }) => 
      {
        console.log('request call', queryKey)
        const { pagination, filter } = queryKey.at(-1)
        return queryFn(pagination, filter, { queryKey, ...queryFnProps });
      },
    placeholderData: keepPreviousData,
  });

  const handleRequest = async (props) => {
    console.log("onRequest", props);
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  };

  const rows = ref(data?.value?.data ?? []);
  watch([pagination, data], ([newPagination, newData]) => {
    console.log('tablePagination', newPagination, newData, newData.totalCount)
    // Below code is not working. Need to understand why.
    // tablePagination.value = { ...newPagination, rowsNumber: newTotalCount }
    tablePagination.value.page = newPagination.page;
    tablePagination.value.rowsPerPage = newPagination.rowsPerPage;
    tablePagination.value.sortBy = newPagination.sortBy;
    tablePagination.value.descending = newPagination.descending;
    tablePagination.value.rowsNumber = newData.totalCount;
    rows.value = newData.data;
  })

  onMounted(() => {
    // get initial data from server (1st page)
    dataTableRef.value?.tableRef?.requestServerInteraction?.();
  });

  const isTableDataLoading = computed(() => queryResponse.isFetching.value && queryResponse.isPlaceholderData.value)

  console.log(isTableDataLoading, queryResponse.isPlaceholderData)

  return {
    pagination: tablePagination,
    isTableDataLoading,
    onRequest: handleRequest,
    filter,
    dataTableRef,
    rows,
    ...queryResponse,
  };
}
