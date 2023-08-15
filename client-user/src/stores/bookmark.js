import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import Swal from 'sweetalert2'

import axios from 'axios'
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'

const $toast = useToast()
const BASE_URL = 'https://urbanedge.aurellya.com/pub'

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    global: useGlobalStore(),
    bookmarks: []
  }),
  getters: {
    bookmarkedPIdArray(state) {
      return state.bookmarks.map((b) => b.ProductId)
    }
  },
  actions: {
    async fetchBookmarks() {
      try {
        this.global.triggerAsyncLoading()
        const { data } = await axios({
          method: 'get',
          url: `${BASE_URL}/bookmarks`,
          headers: { access_token: localStorage.access_token }
        })
        this.global.finishAsyncLoading()

        this.bookmarks = data.data
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
      }
    },
    getBookmarkIdFromPId(pId) {
      const bookmark = this.bookmarks.filter((b) => b.ProductId === +pId)
      return bookmark[0]?.id
    },
    async addBookmark(productId) {
      try {
        this.global.triggerAsyncLoading()
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}/bookmarks/${+productId}`,
          headers: { access_token: localStorage.access_token }
        })
        this.global.finishAsyncLoading()

        if (data.statusCode === 201) {
          this.fetchBookmarks()

          $toast.open({
            message: data.message,
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        }
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
      }
    },
    async deleteBookmark(productId) {
      try {
        // prompt user confirmation
        Swal.fire({
          title: '<h2>Are you sure?</h2>',
          icon: 'warning',
          html: 'you want to remove this bookmark',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<span>Yes, remove it!</span>',
          confirmButtonColor: 'hsl(204, 86%, 53%)',
          cancelButtonText: '<span>Cancel</span>',
          cancelButtonColor: 'hsl(348, 100%, 61%)'
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.global.triggerAsyncLoading()
            const { data } = await axios({
              method: 'delete',
              url: `${BASE_URL}/bookmarks/${+productId}`,
              headers: { access_token: localStorage.access_token }
            })
            this.global.finishAsyncLoading()

            if (data.statusCode === 200) {
              this.fetchBookmarks()

              $toast.open({
                message: data.message,
                type: 'success',
                duration: 3000,
                position: 'top-right',
                dismissible: true
              })
            }
          }
        })
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
      }
    }
  }
})
