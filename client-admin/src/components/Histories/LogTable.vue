<script>
import TableRow from '../TableRow.vue'

export default {
  components: {
    TableRow
  },
  props: ['logs', 'currentPage']
}
</script>

<template>
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="!text-center">#</th>
        <th class="min-w-[160px]">Product Name</th>
        <th class="w-screen">Description</th>
        <th class="min-w-[250px]">Created At</th>
        <th>Updated By</th>
      </tr>
    </thead>

    <tbody v-if="logs" class="bg-white" id="table-log">
      <TableRow
        v-for="(log, idx) in logs"
        :key="log.id"
        :log="log"
        :index="idx"
        :currentPage="currentPage"
      />
    </tbody>

    <tbody v-else>
      <tr>
        <td colspan="5" class="text-center py-4">No data available in table.</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th {
  @apply px-6 py-3 text-left font-medium;
}

thead > tr {
  @apply bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider;
}
</style>
