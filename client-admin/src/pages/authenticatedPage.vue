<script>
import SideBar from '../components/SideBar.vue'
import DashboardSection from '../components/DashboardSection.vue'
import ProductsSection from '../components/Products/ProductsSection.vue'
import ProductForm from '../components/Products/ProductForm.vue'
import CategoriesSection from '../components/Categories/CategoriesSection.vue'
import CategoryForm from '../components/Categories/CategoryForm.vue'
import LogsSection from '../components/Histories/LogsSection.vue'

export default {
  components: {
    SideBar,
    DashboardSection,
    ProductsSection,
    ProductForm,
    CategoriesSection,
    CategoryForm,
    LogsSection
  },
  props: ['currentPage', 'session', 'errors', 'products', 'categories', 'logs'],
  emits: [
    'changePage',
    'showLoading',
    'updateError',
    'logout',
    'addProduct',
    'editProduct',
    'updateProductStatus'
  ],
  data() {
    return {
      queryId: null,
      queryProduct: {
        name: null,
        categoryId: null,
        description: null,
        stock: null,
        price: null,
        imgUrl: null
      }
    }
  },
  methods: {
    updateQueryId(id) {
      this.queryId = id
    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    showLoading(cb) {
      this.$emit('showLoading', cb)
    },
    updateError(err) {
      this.$emit('updateError', err)
    },
    logout() {
      this.$emit('logout')
    },
    addProduct(product) {
      this.$emit('addProduct', product)
    },
    editProduct(product) {
      this.$emit('editProduct', product)
    },
    updateProductStatus(product) {
      this.$emit('updateProductStatus', product)
    }
  },
  computed: {
    totalProducts() {
      return this.products ? this.products.length : 0
    },
    totalCategories() {
      return this.categories ? this.categories.length : 0
    },
    summary() {
      return {
        totalProducts: this.totalProducts,
        totalCategories: this.totalCategories
      }
    }
  },
  watch: {
    queryId(newQueryId) {
      if (this.products && newQueryId) {
        this.queryProduct = this.products.filter((product) => product.id === newQueryId)[0]
      }
    }
  }
}
</script>

<template>
  <div id="home-section">
    <!-- Sidebar  -->
    <SideBar
      :currentPage="currentPage"
      @changePage="changePage"
      @showLoading="showLoading"
      @logout="logout"
    />

    <!-- Content -->
    <div class="contentDiv">
      <!-- Dashboard Section -->
      <DashboardSection v-if="currentPage === 'dashboard'" :summary="summary" />

      <!-- Product Section -->
      <ProductsSection
        v-else-if="currentPage === 'products'"
        :currentPage="currentPage"
        :session="session"
        :products="products"
        @changePage="changePage"
        @updateQueryId="updateQueryId"
        @updateProductStatus="updateProductStatus"
      />
      <ProductForm
        v-else-if="currentPage === 'addProduct' || currentPage === 'editProduct'"
        :currentPage="currentPage"
        :errors="errors"
        :categories="categories"
        :queryProduct="queryProduct"
        @changePage="changePage"
        @updateError="updateError"
        @addProduct="addProduct"
        @editProduct="editProduct"
      />

      <!-- Category Section -->
      <CategoriesSection
        v-else-if="currentPage === 'categories'"
        :currentPage="currentPage"
        :categories="categories"
        @changePage="changePage"
      />
      <CategoryForm v-else-if="currentPage === 'addCategory'" @changePage="changePage" />

      <!-- Logs Section -->
      <LogsSection v-else-if="currentPage === 'logs'" :currentPage="currentPage" :logs="logs" />
    </div>
  </div>
</template>

<style scoped>
#home-section {
  @apply md:flex md:flex-shrink-0 items-stretch;
}

.contentDiv {
  @apply flex flex-col w-0 flex-1 overflow-auto py-[26px] px-[40px];
}
</style>
