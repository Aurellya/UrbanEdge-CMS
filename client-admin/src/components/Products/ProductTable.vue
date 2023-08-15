<script>
// import ProductRow from './ProductRow.vue'
import TableRow from '../TableRow.vue'

export default {
  components: {
    TableRow
  },
  props: ['products', 'session', 'currentPage'],
  emits: ['changePage', 'updateQueryId', 'updateProductStatus'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    updateQueryId(_id) {
      this.$emit('updateQueryId', _id)
    },
    updateProductStatus(product) {
      this.$emit('updateProductStatus', product)
    }
  }
}
</script>

<template>
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th>Name</th>
        <th class="w-[300px]">image</th>
        <th class="w-[250px] !text-left">Description</th>
        <th class="!px-5">Stock</th>
        <th>Price</th>
        <th>Author</th>
        <th>Status</th>
        <th class="w-[50px]"></th>
      </tr>
    </thead>

    <tbody v-if="products" class="bg-white" id="table-product">
      <TableRow
        v-for="(product, idx) in products"
        :key="product.id"
        :product="product"
        :index="idx"
        :session="session"
        :currentPage="currentPage"
        @changePage="changePage"
        @updateQueryId="updateQueryId"
        @updateProductStatus="updateProductStatus"
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
  @apply px-6 py-3 text-center font-medium;
}

thead > tr {
  @apply bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider;
}
</style>
