import axios from 'axios'
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'

const BASE_URL = 'https://urbanedge.aurellya.com/pub'

export const useProductStore = defineStore('product', {
  state: () => ({
    global: useGlobalStore(),
    products: [],
    product: null, // container
    qrCode: null, // container
    totalProducts: 0,
    totalProductsInAPage: 0,
    pageSize: 8,
    lastPageIdx: 0,
    pageNumber: 1, // current page
    pageBound: {
      lowerBound: null,
      upperBound: null
    },
    filter: {
      name: '',
      category: null
    }
  }),
  getters: {
    getPageBound(state) {
      return {
        lowerBound:
          state.pageNumber === 1
            ? state.totalProducts > 0
              ? 1
              : 0
            : state.pageSize * (state.pageNumber - 1) + 1,
        upperBound: state.pageSize * (state.pageNumber - 1) + state.totalProductsInAPage
      }
    }
  },
  actions: {
    nextPage() {
      if (this.pageNumber < this.lastPageIdx) this.pageNumber++
    },
    prevPage() {
      if (this.pageNumber > 1) this.pageNumber--
    },
    setPage(val) {
      this.pageNumber = val
    },
    getTotalPage(totalData, pageSize) {
      return Math.ceil(totalData / pageSize)
    },
    updateFilterName(name) {
      this.filter.name = name
    },
    updateFilterCategory(cat) {
      this.filter.category = cat
    },
    async fetchData(page) {
      try {
        this.global.triggerAsyncLoading()
        if (page <= 1) this.setPage(1) // on search, reset current page to 1

        let query = page ? `page=${+page}&&` : ''
        query += this.filter.name ? `name=${this.filter.name}&&` : ''
        query += this.filter.category ? `categoryId=${this.filter.category}` : ''

        const { data } = await axios.get(`${BASE_URL}/products?${query}`)
        this.global.finishAsyncLoading()

        this.products = data.data
        this.totalProducts = data.total

        this.totalProductsInAPage = data.data.length
        this.lastPageIdx = this.getTotalPage(data.total, this.pageSize)

        this.pageBound = this.getPageBound
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
      }
    },
    async getProductDetails(productId) {
      try {
        this.product = null
        this.global.triggerAsyncLoading()
        const { data } = await axios.get(`${BASE_URL}/products/${productId}`)
        this.global.finishAsyncLoading()
        this.product = data.data
        this.qrCode = data.qrCode
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
      }
    }
  }
})
