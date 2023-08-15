<script>
import LogTable from './LogTable.vue'

export default {
  components: {
    LogTable
  },
  props: ['logs', 'currentPage']
}
</script>

<template>
  <section id="log-section">
    <div class="titleContainer">
      <h1 class="text-lg md:text-xl font-bold">Logs</h1>
    </div>

    <div class="flex">
      <div class="my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="tableDiv">
          <LogTable :logs="logs" :currentPage="currentPage" />
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
