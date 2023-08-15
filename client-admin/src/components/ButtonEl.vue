<script>
export default {
  props: ['size', 'themeColor', 'content', 'type'],
  emits: ['changePage', 'submitProductForm'],
  data() {
    return {
      colorVariants: {
        green: 'bg-[#00C9A7] hover:bg-[#00C9A7] text-white',
        red: 'bg-red-500 hover:bg-red-500 text-white'
      }
    }
  },
  methods: {
    changePage() {
      if (this.type === 'submit') {
        this.$emit('submitProductForm')
      } else {
        this.$emit('changePage')
      }
    }
  }
}
</script>

<template>
  <button v-if="size === 'big'" type="submit" :class="`${colorVariants[themeColor]} btnBig`">
    {{ content }}
  </button>
  <button
    v-else-if="size === 'medium'"
    id="new-product"
    :class="`${colorVariants[themeColor]} btnMed`"
    @click.prevent="changePage"
  >
    {{ content }}
  </button>
  <button
    v-else
    :class="`${colorVariants[themeColor]}  btnSm`"
    :type="type"
    @click.prevent="changePage"
  >
    {{ content }}
  </button>
</template>

<style scoped>
.btnBig {
  @apply hover:opacity-80 shadow-lg font-semibold text-sm py-3 px-0 rounded text-center w-full duration-200 transition-all;
}

.btnMed {
  @apply mt-[-4px] px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md hover:opacity-80 focus:outline-none;
}

.btnSm {
  @apply hover:opacity-80 shadow-lg font-semibold text-sm py-2 px-4 rounded text-center duration-200 transition-all;
}
</style>
