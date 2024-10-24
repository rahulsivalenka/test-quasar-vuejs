<template>
  <!-- <q-page class="flex flex-center"> -->
  <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
  <!-- </q-page> -->
  <q-page>
    <RouterLink to="/test">Test</RouterLink>
    <q-input v-model="filter.id" label="Search" />
    <DataTable
      ref="dataTableRef"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      @request="onRequest"
    />
    <div>{{ filter }}</div>
    <div>{{ pagination }}</div>
  </q-page>
</template>

<script setup>
import DataTable from "src/components/data-table/DataTable.vue";
import { useServerSideTableState } from "src/components/data-table/useServerSideTableState";
import { useServerSideTableQuery } from "src/components/data-table/useServerSideTableQuery";
import { useTableStore } from "src/stores/table-store";
import axios from "axios";
import { storeToRefs } from "pinia";

defineOptions({
  name: "IndexPage",
});

const columns = [
  {
    name: "userId",
    required: true,
    label: "User ID",
    align: "left",
    field: (row) => row.userId,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "title",
    required: true,
    label: "Title",
    align: "left",
    field: (row) => row.title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "body",
    required: true,
    label: "Body",
    align: "left",
    field: (row) => row.body,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const tableAPi = async (pagination, filters) => {
  debugger;
  try {
    const params = {
      _page: pagination.page,
      _limit: pagination.rowsPerPage,
      // q: filters?.searchCriteria,
      ...filters,
      _sort: pagination.sortBy,
      _order: pagination.descending ? "desc" : "asc",
    };

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      { params }
    );
    return {
      data: response.data,
      totalCount: parseInt(response.headers["x-total-count"], 10),
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return {
      data: [],
      totalCount: 0,
    };
  }

  // try {
  //   const payload = {
  //     date: null,
  //     roleId: '1', // TODO: Need to get it from login user profile data
  //     supplier: globalFilters.supplier?.join?.(',') ?? null,
  //     recordLocation: globalFilters?.recordLocation?.join?.(',') ?? null,
  //     searchCriteria: filters?.searchCriteria,
  //     pageNo: pagination.page,
  //     pageSize: pagination.rowsPerPage,
  //     orderBy: pagination.sortBy === 'desc' ? '' : `${pagination.sortBy} ${pagination.descending ? 'desc' : 'asc'}`
  //   }
  //   const data = await getAlertsActionTaken(payload)
  //   debugger
  //   return data
  // } catch (error) {
  //   debugger
  //   console.log('Error while table API', error)
  // }
};

// const tableState = useServerSideTableState();
const tableState = storeToRefs(useTableStore());
// const { filter, pagination } = tableState;
const { rows, loading, onRequest, filter, pagination, dataTableRef } =
  useServerSideTableQuery(tableAPi, tableState);
// const { rows, loading, onRequest, filter, pagination } =
//   useServerSideTableQuery(tableAPi);
</script>
