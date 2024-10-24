<template>
  <q-table flat ref="tableRef">
    <template v-slot:header="props">
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
import { ref, onMounted, computed, useTemplateRef } from "vue";

const tableRef = ref(null);

defineExpose({ tableRef });
</script>
