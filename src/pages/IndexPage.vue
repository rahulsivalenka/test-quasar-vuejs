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
  try {
    const params = {
      _page: pagination.page,
      _limit: pagination.rowsPerPage,
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
};

// Directly calling useServerSideTableQuery without table state passed in
// This will use a default table state created by useServerSideTableQuery
// const { rows, loading, onRequest, filter, pagination } =
//   useServerSideTableQuery(tableAPi);

// Using a custom table state
// const tableState = useServerSideTableState({
//   pagination: {
//     page: 1,
//     rowsPerPage: 10,
//     sortBy: "id",
//     descending: false,
//   },
// });
// const { rows, loading, onRequest, filter, pagination, dataTableRef } =
//   useServerSideTableQuery(tableAPi, tableState);

// Using a store to manage table state
const tableState = storeToRefs(useTableStore());
const { rows, loading, onRequest, filter, pagination, dataTableRef } =
  useServerSideTableQuery(tableAPi, tableState);
</script>
