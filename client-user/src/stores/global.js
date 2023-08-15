import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    // fake preloader
    triggerLoading(cb) {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
        cb()
      }, 1000)
    },
    triggerAsyncLoading() {
      this.isLoading = true
    },
    finishAsyncLoading() {
      this.isLoading = false
    },
    formattedPrice(price) {
      return price.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    }
  }
})
