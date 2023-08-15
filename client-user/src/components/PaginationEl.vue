<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  methods: {
    ...mapActions(useProductStore, ['fetchData', 'nextPage', 'prevPage', 'setPage'])
  },
  computed: {
    ...mapState(useProductStore, [
      'totalProducts',
      'lastPageIdx',
      'getPageBound',
      'pageNumber',
      'pageBound'
    ])
  },
  watch: {
    pageNumber(newVal) {
      this.fetchData(newVal)
    }
  }
}
</script>

<template>
  <div class="paginationDiv">
    <!-- Mobile -->
    <div class="mobile">
      <button :disabled="pageNumber === 1" @click.prevent="prevPage()">Previous</button>
      <button class="ml-3" :disabled="pageNumber === lastPageIdx" @click.prevent="nextPage()">
        Next
      </button>
    </div>

    <!-- Desktop -->
    <div class="desktop">
      <!-- Left -->
      <div>
        <p>
          Showing
          <span class="font-medium">{{ getPageBound.lowerBound }}</span>
          to
          <span class="font-medium">{{ getPageBound.upperBound }}</span>
          of
          <span class="font-medium">{{ totalProducts }}</span>
          results
        </p>
      </div>

      <!-- Right -->
      <div>
        <nav aria-label="Pagination">
          <!-- Prev Button -->
          <button
            class="navBtn rounded-l-md"
            @click.prevent="prevPage()"
            :disabled="pageNumber === 1"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Page No Button -->
          <div v-for="(_, idx) in Array(lastPageIdx).fill()" :key="idx">
            <button
              :class="pageNumber === idx + 1 ? 'active' : 'inactive'"
              @click.prevent="setPage(idx + 1)"
              :disabled="pageNumber === idx + 1"
            >
              {{ idx + 1 }}
            </button>
          </div>

          <!-- Next Button -->
          <button
            class="navBtn rounded-r-md"
            @click.prevent="nextPage()"
            :disabled="pageNumber === lastPageIdx"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.active {
  @apply relative z-10 inline-flex items-center bg-[#00C9A7] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C9A7];
}

button.inactive {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:opacity-50  hover:bg-gray-200 focus:z-20 focus:outline-offset-0;
}

.paginationDiv {
  @apply flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mx-[40px];
}

.mobile {
  @apply flex flex-1 justify-between sm:hidden;
}

.mobile button {
  @apply relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50;
}

.desktop {
  @apply hidden sm:flex sm:flex-1 sm:items-center sm:justify-between;
}

.desktop p {
  @apply text-sm text-gray-700;
}

nav {
  @apply isolate inline-flex -space-x-px rounded-md shadow-sm;
}

.navBtn {
  @apply relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0;
}
</style>
