<script>
import ButtonEl from '../ButtonEl.vue'

export default {
  components: {
    ButtonEl
  },
  emits: ['changePage'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<template>
  <section id="new-category-section">
    <div class="contentTitleDiv">
      <h1>Add New Category</h1>
    </div>

    <div class="my-2 py-2">
      <form id="category-form">
        <div class="w-full max-w-md mt-4">
          <!-- category name -->
          <div class="mb-[24px]">
            <label for="category-name"> Category Name </label>
            <input
              type="text"
              id="category-name"
              placeholder="Enter category name"
              autocomplete="off"
              required
            />
          </div>

          <div class="flex gap-4">
            <!-- cancel button -->
            <div class="mb-6">
              <ButtonEl
                size="small"
                themeColor="red"
                content="Cancel"
                @changePage="changePage('categories')"
              />
            </div>

            <div class="mb-6">
              <ButtonEl
                size="small"
                themeColor="green"
                content="Submit"
                @changePage="changePage('categories')"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
input {
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
