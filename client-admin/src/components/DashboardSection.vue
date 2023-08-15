<script>
export default {
  props: ['summary']
}
</script>

<template>
  <section id="dashboard-section relative">
    <!-- bg -->
    <div class="fixed w-[calc(100%-18rem)] h-full top-0 left-[18rem] z-[-1]">
      <img src="../assets/bg.png" class="w-full h-full opacity-[0.08]" alt="" />
    </div>

    <div class="contentTitleDiv">
      <h1>Dashboard</h1>
    </div>

    <div class="flex gap-4 mt-2">
      <div class="summaryCol">
        <div>
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="summaryCard">
                <h5>Total Products</h5>
                <span>{{ summary.totalProducts }}</span>
                <p class="text-sm">
                  <span class="whitespace-nowrap">product&#40;s&#41;</span>
                </p>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="iconWrapper">
                  <i class="fa-solid fa-dolly"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="summaryCol">
        <div>
          <div class="flex-auto p-4">
            <div class="flex flex-wrap">
              <div class="summaryCard">
                <h5>Total Categories</h5>
                <span>{{ summary.totalCategories }}</span>
                <p class="text-sm">
                  <span class="whitespace-nowrap">category&#40;ies&#41;</span>
                </p>
              </div>
              <div class="relative w-auto pl-4 flex-initial">
                <div class="iconWrapper">
                  <i class="fa-solid fa-cubes-stacked"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
i {
  @apply text-[20px] mx-auto;
}

.contentTitleDiv {
  @apply flex justify-between flex-wrap md:flex-nowrap items-center pt-3 pb-2 mb-3;
}

.contentTitleDiv > h1 {
  @apply text-lg md:text-xl font-bold;
}

.summaryCol {
  @apply w-full lg:w-6/12 xl:w-3/12 px-4;
}

.summaryCol > div {
  @apply relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg;
}

.summaryCard {
  @apply relative w-full pr-4 max-w-full flex-grow flex-1;
}

.summaryCard > h5 {
  @apply uppercase font-bold text-xs mb-4;
}

.summaryCard > span {
  @apply font-semibold text-xl;
}

.iconWrapper {
  @apply text-white text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#00C9A7];
}
</style>
