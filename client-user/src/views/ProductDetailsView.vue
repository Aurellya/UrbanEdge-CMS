<script>
import { mapState, mapActions } from 'pinia'
import { useGlobalStore } from '../stores/global'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/product'
import { useBookmarkStore } from '../stores/bookmark'

import ButtonEl from '../components/ButtonEl.vue'

export default {
  components: { ButtonEl },
  methods: {
    ...mapActions(useGlobalStore, ['formattedPrice']),
    ...mapActions(useProductStore, ['getProductDetails']),
    ...mapActions(useBookmarkStore, ['getBookmarkIdFromPId', 'addBookmark', 'deleteBookmark'])
  },
  computed: {
    ...mapState(useGlobalStore, ['isLoading']),
    ...mapState(useAuthStore, ['authenticated']),
    ...mapState(useProductStore, ['product', 'qrCode']),
    ...mapState(useBookmarkStore, ['bookmarkedPIdArray']),
    isBookmarked() {
      return this.bookmarkedPIdArray.includes(this.product.id)
    }
  },
  created() {
    this.getProductDetails(this.$route.params.id)
  }
}
</script>

<template>
  <section>
    <div class="detailOuterDiv">
      <div class="detailDiv" v-if="product">
        <!-- left -->
        <img alt="ecommerce" class="left" :src="product.imgUrl" />

        <!-- right -->
        <div class="right">
          <h2 class="brand">Urban Edge</h2>

          <!-- product name -->
          <h1 class="productName">
            {{ product.name }}
          </h1>

          <!-- rating reviews + socmed -->
          <div class="flex mb-4">
            <!-- rating reviews -->
            <span class="flex items-center">
              <!-- rating -->
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
                v-for="(_, i) in product.rating"
                :key="i"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>

              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-red-500"
                viewBox="0 0 24 24"
                v-for="(_, i2) in 5 - product.rating"
                :key="i2"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>

              <!-- reviews -->
              <span class="text-gray-600 ml-3">{{ product.totalReviews }} Reviews</span>
            </span>

            <!-- soc med -->
            <span class="socMed">
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path>
                </svg>
              </a>
            </span>
          </div>

          <!-- description -->
          <p class="leading-relaxed">
            {{ product.description }}
          </p>

          <!-- category + stock + qrcode -->
          <div class="others">
            <!-- category + stock -->
            <div>
              <!-- category -->
              <div class="mb-6">
                <span class="category"> #&nbsp;{{ product.Category?.name }} </span>
              </div>

              <!-- stocks -->
              <div class="stock">
                <div class="flex">
                  <span class="mr-3">Stock:</span>
                  <span
                    ><b>{{ product.stock }}</b
                    >&nbsp;item&#40;s&#41;</span
                  >
                </div>
              </div>
            </div>

            <!-- qr code -->
            <div class="qrCode">
              <span v-html="qrCode"></span>
            </div>
          </div>

          <!-- price + button -->
          <div class="flex">
            <span class="price"> <sup>Rp</sup>&nbsp;{{ formattedPrice(product.price) }} </span>
            <div v-if="authenticated" class="flex ml-auto">
              <ButtonEl
                v-if="isBookmarked"
                size="medium"
                themeColor="red"
                content="Remove from Bookmark"
                @click.prevent="deleteBookmark(getBookmarkIdFromPId(product.id))"
              />
              <ButtonEl
                v-else
                size="medium"
                themeColor="green"
                content="Add to Bookmark"
                @click.prevent="addBookmark(product.id)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="notFoundDiv" v-else-if="!isLoading">
        <i class="fa-solid fa-boxes-packing"></i>
        <h1>No Details Found on Product with id {{ this.$route.params.id }}</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
.qrCode:deep(svg) {
  height: 174px !important;
  width: 174px !important;
}

section {
  @apply text-gray-700  overflow-hidden bg-white;
}

.detailOuterDiv {
  @apply container px-5 py-20 mx-auto;
}

.detailDiv {
  @apply lg:w-4/5 mx-auto flex flex-wrap;
}

.detailDiv .left {
  @apply lg:w-1/2 w-full object-cover object-center rounded border border-gray-200;
}

.detailDiv .right {
  @apply lg:w-1/2 w-full lg:pl-14 lg:py-6 mt-6 lg:mt-0;
}

.right .brand {
  @apply text-sm  text-gray-500 tracking-widest;
}

.right .productName {
  @apply text-gray-900 text-3xl font-medium mb-1;
}

.right .socMed {
  @apply flex ml-3 pl-3 py-2 border-l-2 border-gray-200;
}

.right .others {
  @apply flex justify-between border-b-2 border-gray-200 mb-5 mt-6;
}

.right .category {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2;
}

.right .stock {
  @apply flex mt-6 items-center pb-5;
}

.right .price {
  @apply font-medium text-2xl text-gray-900;
}

.notFoundDiv {
  @apply my-[100px] flex flex-col items-center gap-[40px];
}

.notFoundDiv i {
  @apply text-[100px] text-gray-800;
}

.notFoundDiv h1 {
  @apply text-center text-gray-800 text-2xl font-medium;
}
</style>
