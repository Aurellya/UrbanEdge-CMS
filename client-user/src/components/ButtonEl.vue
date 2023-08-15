<script>
export default {
  props: ['size', 'themeColor', 'content'],
  data() {
    return {
      colorVariants: {
        green: 'bg-[#00C9A7] hover:bg-[#00C9A7] text-white',
        red: 'bg-red-500 hover:bg-red-500 text-white'
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
  >
    {{ content }}
  </button>
  <button v-else-if="size === 'small'" :class="`${colorVariants[themeColor]}  btnSm`">
    {{ content }}
  </button>
</template>

<style scoped>
.btnBig {
  @apply hover:opacity-80 shadow-lg font-semibold text-sm py-3 px-0 rounded text-center w-full duration-200 transition-all;
}

.btnMed {
  @apply text-white  border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded;
}

.btnSm {
  @apply hover:opacity-80 shadow-lg font-semibold text-sm py-2 px-4 rounded text-center duration-200 transition-all;
}
</style>
