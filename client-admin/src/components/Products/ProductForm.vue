<script>
import ButtonEl from '../ButtonEl.vue'

export default {
  components: {
    ButtonEl
  },
  props: ['categories', 'currentPage', 'queryProduct', 'errors'],
  emits: ['changePage', 'addProduct', 'editProduct', 'updateError'],
  data() {
    return {
      product: this.queryProduct
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    addProduct() {
      this.$emit('addProduct', this.product)
    },
    editProduct() {
      this.$emit('editProduct', this.product)
    },
    submitProductForm() {
      this.$emit('updateError', null)
      this.currentPage === 'editProduct' ? this.editProduct() : this.addProduct()
    }
  },
  created() {
    if (this.currentPage === 'addProduct') {
      this.product = {
        name: null,
        categoryId: null,
        description: null,
        stock: null,
        price: null,
        imgUrl: null
      }
    }
  }
}
</script>

<template>
  <section id="new-product-section">
    <div class="contentTitleDiv">
      <h1>
        {{ currentPage === 'editProduct' ? 'Edit Product' : 'Add New Product' }}
      </h1>
    </div>

    <div class="my-2 py-2 flex md:gap-[100px]">
      <form id="product-form" @submit.prevent="submitProductForm">
        <div class="w-full max-w-md mt-4">
          <!-- name -->
          <div class="mb-4">
            <label for="product-name"> Name </label>
            <input
              :class="[{ errorClass: errors?.name }]"
              type="text"
              id="product-name"
              placeholder="Enter product name"
              autocomplete="off"
              required
              v-model="product.name"
            />
            <span v-if="errors?.name" class="errorMsg">* {{ errors.name }}</span>
          </div>

          <!-- category -->
          <div class="mb-4 relative">
            <label for="product-category"> Category </label>
            <select
              id="product-category"
              :class="[{ errorClass: errors?.categoryId }]"
              v-model="product.categoryId"
            >
              <option value="" selected disabled>-- Select Category --</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-3 top-[28px] flex items-center px-2 pointer-events-none"
            >
              <span class="text-gray-500 select-custom-icon">
                <i class="fa-solid fa-caret-down text-[28px]"></i>
              </span>
            </div>
            <span v-if="errors?.categoryId" class="errorMsg">* {{ errors.categoryId }}</span>
          </div>

          <!-- description -->
          <div class="mb-4">
            <label for="product-desc"> Description </label>
            <input
              :class="[{ errorClass: errors?.description }]"
              type="text"
              id="product-desc"
              placeholder="Enter product description"
              autocomplete="off"
              required
              v-model="product.description"
            />
            <span v-if="errors?.description" class="errorMsg">* {{ errors.description }}</span>
          </div>

          <div class="grid grid-cols-2 grid-flow-col gap-4 mb-4">
            <!-- price -->
            <div>
              <label for="product-price"> Price </label>
              <input
                :class="[{ errorClass: errors?.price }]"
                type="number"
                min="0"
                id="product-price"
                placeholder="Enter product price"
                autocomplete="off"
                required
                v-model="product.price"
              />
              <span v-if="errors?.price" class="errorMsg">* {{ errors.price }}</span>
            </div>

            <!-- stock -->
            <div>
              <label for="product-stock"> Stock </label>
              <input
                :class="[{ errorClass: errors?.stock }]"
                type="number"
                min="0"
                id="product-stock"
                placeholder="Enter product stock"
                autocomplete="off"
                required
                v-model="product.stock"
              />
              <span v-if="errors?.stock" class="errorMsg">* {{ errors.stock }}</span>
            </div>
          </div>

          <!-- image url -->
          <div class="mb-[34px]">
            <label for="product-image"> Image </label>
            <input
              :class="[{ errorClass: errors?.imgUrl }]"
              type="text"
              id="product-image"
              placeholder="Enter product image url"
              autocomplete="off"
              required
              v-model="product.imgUrl"
            />
            <span v-if="errors?.imgUrl" class="errorMsg">* {{ errors.imgUrl }}</span>
          </div>

          <div class="flex gap-4">
            <!-- cancel button -->
            <div class="mb-6">
              <ButtonEl
                size="small"
                themeColor="red"
                content="Cancel"
                @changePage="changePage('products')"
              />
            </div>

            <!-- submit button -->
            <div class="mb-6">
              <ButtonEl
                size="small"
                themeColor="green"
                content="Submit"
                type="submit"
                @submitProductForm="submitProductForm"
              />
            </div>
          </div>
        </div>
      </form>

      <div class="max-w-[500px]" v-if="currentPage === 'editProduct'">
        <img :src="product.imgUrl" :alt="product.name" class="w-100" />
      </div>
    </div>
  </section>
</template>

<style scoped>
input,
select {
  @apply shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-[#00C9A7];
}

label {
  @apply block text-gray-700 text-sm font-medium mb-2;
}

form {
  @apply flex items-center content-center;
}

.contentTitleDiv {
  @apply flex justify-between flex-wrap md:flex-nowrap items-center pt-3;
}

.contentTitleDiv > h1 {
  @apply text-lg md:text-xl font-bold;
}
</style>
