<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/product'
import { useCategoryStore } from '../stores/category'

export default {
  data() {
    return {
      search: '',
      category: null,
      showElement: false
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchData', 'updateFilterName', 'updateFilterCategory']),
    ...mapActions(useCategoryStore, ['fetchCategories']),
    updateCategory(cat) {
      this.category = cat // update view
      this.updateFilterName(this.search)
      this.updateFilterCategory(cat.id)
      this.fetchData(1)
      this.showElement = false
    },
    handleFilter() {
      this.updateFilterName(this.search)
      this.fetchData(1)
    },
    // on click: 'outside select category options' listener
    hideElement(event) {
      const elementToTrack = this.$refs.elementToTrack
      if (!(elementToTrack === event.target || elementToTrack.contains(event.target))) {
        this.showElement = false
      }
    },
    // on click: select category options
    handleShowElement() {
      this.showElement = !this.showElement
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categories'])
  },
  created() {
    this.fetchCategories()
  },
  mounted() {
    document.addEventListener('click', this.hideElement)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideElement)
  }
}
</script>

<template>
  <form @submit.prevent="handleFilter" ref="elementToTrack">
    <div class="flex">
      <label for="search-dropdown">Category</label>

      <!-- Filter by Category: use Custom Select -->
      <div class="selectDiv">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          class="customSelect"
          type="button"
          @click="handleShowElement"
        >
          {{ category ? category.name : 'All categories' }}
          <i class="fa-solid fa-chevron-down w-2.5 h-3 ml-2.5"></i>
        </button>

        <div id="dropdown" v-show="showElement">
          <ul aria-labelledby="dropdown-button">
            <li>
              <button
                type="button"
                class="selectOption"
                @click.prevent="updateCategory({ id: null, name: 'All categories' })"
              >
                All categories
              </button>
            </li>
            <li v-for="category in categories" :key="category.id">
              <button type="button" class="selectOption" @click.prevent="updateCategory(category)">
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Search -->
      <div class="searchDiv">
        <input type="search" id="search-dropdown" placeholder="Search ..." v-model="search" />
        <button type="submit" class="searchBtn">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  @apply mt-[40px] max-w-[800px] w-full px-6;
}

input {
  @apply !text-[16px] h-full bg-transparent block py-2.5 px-4 w-full z-20 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-[#00C9A7] focus:border-[#00C9A7] outline-none;
}

label {
  @apply mb-2 text-sm font-medium sr-only;
}

.selectDiv {
  @apply flex-shrink-0 z-10 relative;
}

.customSelect {
  @apply h-[46px] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-[#00C9A7];
}

#dropdown {
  @apply absolute top-[40px] z-10 w-44 !text-[16px];
}

#dropdown ul {
  @apply py-2 text-sm text-gray-700 divide-y divide-gray-200;
}

#dropdown li {
  @apply bg-white shadow;
}

.selectOption {
  @apply text-left inline-flex w-full px-4 py-3 hover:bg-gray-100;
}

.searchDiv {
  @apply relative h-[46px] w-full;
}

.searchBtn {
  @apply absolute top-0 right-0 px-4 text-sm font-medium h-full text-white bg-[#00C9A7] hover:opacity-60 transition-opacity duration-100 rounded-r-lg border border-[#00C9A7] hover:bg-[#00C9A7] focus:outline-none focus:ring-[#00C9A7];
}
</style>
