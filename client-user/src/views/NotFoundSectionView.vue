<template>
  <section>
    <div>
      <div>
        <i class="fa-solid fa-link-slash"></i>
        <h1>404 Page Not Found</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  @apply text-gray-700  overflow-hidden bg-white;
}

section > div {
  @apply container px-5 py-20 mx-auto;
}

section > div > div {
  @apply my-[100px] flex flex-col items-center gap-[40px];
}

i {
  @apply text-[100px] text-gray-800;
}

h1 {
  @apply text-center text-gray-800 text-2xl font-medium;
}
</style>
