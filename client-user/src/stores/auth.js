import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import Swal from 'sweetalert2'

import axios from 'axios'
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'

const $toast = useToast()
const BASE_URL = 'https://urbanedge.aurellya.com/pub'

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    global: useGlobalStore(),
    authenticated: localStorage.getItem('access_token'),
    isLoading: false,
    errors: {
      registration: null
    }
  }),
  actions: {
    async register(registrationData, cb) {
      try {
        this.global.triggerAsyncLoading()
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}/register`,
          data: registrationData
        })
        this.global.finishAsyncLoading()

        if (data.statusCode === 201) {
          this.router.push({ name: 'login' })

          $toast.open({
            message: 'Registration Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })

          cb()
        }
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)
        const errMsg = error?.response.data.message
        this.errors.registration = errMsg
      }
    },
    async login(loginData, cb) {
      try {
        this.global.triggerAsyncLoading()
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}/login`,
          data: loginData
        })
        this.global.finishAsyncLoading()

        if (data.access_token) {
          this.authenticated = true
          localStorage.setItem('access_token', data.access_token)
          this.router.push({ name: 'products-section' })

          $toast.open({
            message: 'Login Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })

          cb()
        }
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error)

        $toast.open({
          message: `Login Failed!<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    },
    async googleLogin(response) {
      console.log('Encoded JWT ID token: ' + response.credential)

      try {
        this.global.triggerAsyncLoading()
        const result = await axios({
          method: 'post',
          url: `${BASE_URL}/glogin`,
          headers: {
            google_token: response.credential
          }
        })
        this.global.finishAsyncLoading()

        const { access_token } = result.data
        if (access_token) {
          this.authenticated = true
          localStorage.setItem('access_token', access_token)
          this.router.push({ name: 'products-section' })

          $toast.open({
            message: 'Login Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        }
      } catch (error) {
        this.global.finishAsyncLoading()

        console.log(error.response)

        $toast.open({
          message: `Login Failed!<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    },
    async logout() {
      try {
        Swal.fire({
          title: '<h2>Are you sure?</h2>',
          icon: 'warning',
          html: 'you want to logout from this account',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<span>Yes, logout now!</span>',
          confirmButtonColor: 'hsl(204, 86%, 53%)',
          cancelButtonText: '<span>Cancel</span>',
          cancelButtonColor: 'hsl(348, 100%, 61%)'
        }).then((result) => {
          if (result.isConfirmed) {
            this.global.triggerLoading(() => {
              localStorage.removeItem('access_token')
              this.authenticated = false
              this.router.push({ name: 'login' })

              $toast.open({
                message: 'Logout Success!',
                type: 'success',
                duration: 3000,
                position: 'top-right',
                dismissible: true
              })
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
