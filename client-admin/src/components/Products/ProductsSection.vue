<script>
import ProductTable from '../Products/ProductTable.vue'
import ButtonEl from '../ButtonEl.vue'

export default {
  components: {
    ProductTable,
    ButtonEl
  },
  props: ['products', 'session', 'currentPage'],
  emits: ['changePage', 'updateQueryId', 'updateProductStatus'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    updateQueryId(id) {
      this.$emit('updateQueryId', id)
    },
    updateProductStatus(product) {
      this.$emit('updateProductStatus', product)
    }
  }
}
</script>

<template>
  <section id="product-section">
    <div class="titleContainer">
      <h1 class="text-lg md:text-xl font-bold">Products</h1>
      <ButtonEl
        size="medium"
        themeColor="green"
        content="+ New Product"
        @changePage="changePage('addProduct')"
      />
    </div>

    <div class="flex">
      <div class="my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="tableDiv">
          <ProductTable
            :products="products"
            :session="session"
            :currentPage="currentPage"
            @changePage="changePage"
            @updateQueryId="updateQueryId"
            @updateProductStatus="updateProductStatus"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.titleContainer {
  @apply flex justify-between flex-wrap md:flex-nowrap items-center pt-3 pb-2 mb-3;
}

.tableDiv {
  @apply align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200;
}
</style>
