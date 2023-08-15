<script>
import { RouterView } from 'vue-router'
import { mapState } from 'pinia'
import { useGlobalStore } from './stores/global'

import NavBar from './components/NavBar.vue'
import Preloader from './components/Preloader.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    NavBar,
    Preloader
  },
  computed: {
    ...mapState(useGlobalStore, ['isLoading'])
  }
}
</script>

<template>
  <Preloader :loadingState="isLoading" />
  <NavBar />

  <div>
    <div class="parallax"></div>
    <RouterView />
  </div>
</template>
