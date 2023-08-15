import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = 'https://urbanedge.aurellya.com/pub'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetchCategories() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/categories`,
          headers: { access_token: localStorage.access_token }
        })

        this.categories = data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
