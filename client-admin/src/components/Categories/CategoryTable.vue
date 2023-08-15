<script>
// import CategoryRow from './CategoryRow.vue'
import TableRow from '../TableRow.vue'

export default {
  components: {
    TableRow
  },
  props: ['categories', 'currentPage']
}
</script>

<template>
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="w-screen">Name</th>
        <th></th>
        <th></th>
      </tr>
    </thead>

    <tbody v-if="categories" class="bg-white" id="table-category">
      <TableRow
        v-for="(category, idx) in categories"
        :key="category.id"
        :category="category"
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
