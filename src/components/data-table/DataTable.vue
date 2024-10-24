<template>
  <!-- <q-table
    flat
    :rows="rows"
    :loading="loading"
    :filter="filter"
    ref="tableRef"
    v-model:pagination="pagination"
    @request="onRequest"
  > -->
  <q-table flat ref="tableRef">
    <!-- <template v-slot:header-cell="props">
      <q-th :props="props">
        {{ props.col.label }}
        <q-input
          @click.stop
          dense
          outlined
          debounce="300"
          v-model="filter[props.col.name]"
        />
      </q-th>
    </template> -->
    <template v-slot:header="props">
      <!-- <pre>{{ props }}</pre> -->
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-tr :props="props">
        <th v-for="col in props.cols" :key="col.name">
          <q-input
            @click.stop
            dense
            outlined
            debounce="300"
            v-model="$attrs.filter[col.name]"
          />
        </th>
      </q-tr>
    </template>
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <q-badge rounded color="high" v-if="props.col.badge" />
        {{ props.value }}
      </q-td>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script setup>
import { ref, onMounted, computed, useTemplateRef, defineExpose } from "vue";
// import { useServerSideTableQuery } from "./useServerSideTableQuery";
// const props = defineProps({
//   api: {
//     type: Function,
//     required: true,
//   },
// });
// const { pagination, loading, onRequest, filter, rows, tableRef } =
//   useServerSideTableQuery(props.api);
// const tableRef = useTemplateRef("data-table");

// onMounted(() => {
//   // get initial data from server (1st page)
//   tableRef.value.requestServerInteraction();
// });
const tableRef = ref(null);

defineExpose({ tableRef });
</script>
