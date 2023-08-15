<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import Navbar from './components/Navbar.vue'
import Preloader from './components/PreLoader.vue'

import AuthenticationPage from './pages/AuthenticationPage.vue'
import Home from './pages/AuthenticatedPage.vue'

export default {
  components: {
    Navbar,
    Preloader,
    AuthenticationPage,
    Home
  },
  data() {
    return {
      BASE_URL: 'https://urbanedge.aurellya.com',
      currentPage: 'login',
      loadingState: false,
      errors: null,
      authenticated: false,
      session: {
        access_token: '',
        username: '',
        email: '',
        role: ''
      },
      products: null,
      categories: null,
      logs: null
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    showLoading(cb) {
      this.loadingState = true
      setTimeout(() => {
        this.loadingState = false
        cb()
      }, 1000)
    },
    updateError(err) {
      this.errors = err
    },
    updateSession(session) {
      this.session = session
    },
    async submitLogin(loginData, cb) {
      try {
        const result = await axios({
          method: 'post',
          url: `${this.BASE_URL}/login`,
          data: loginData
        })

        // fake preloader
        this.showLoading(() => {
          // destruct variable
          const { access_token, username, email, role } = result.data

          // set local storage
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('email', email)
          localStorage.setItem('username', username)
          localStorage.setItem('role', role)

          // update session variable
          this.updateSession({
            access_token,
            username,
            email,
            role
          })

          // redirect to dashboard
          this.changePage('dashboard')

          this.$toast.open({
            message: 'Login Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })

          // clear login form
          cb()
        })
      } catch (error) {
        console.log(error.response)
        this.$toast.open({
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
        const result = await axios({
          method: 'post',
          url: `${this.BASE_URL}/glogin`,
          headers: {
            google_token: response.credential
          }
        })

        // fake preloader
        this.showLoading(() => {
          // destruct variable
          const { access_token, message } = result.data
          const { username, email, role } = message

          // set local storage
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('email', email)
          localStorage.setItem('username', username)
          localStorage.setItem('role', role)

          // update session variable
          this.updateSession({
            access_token,
            username,
            email,
            role
          })

          // redirect to dashboard
          this.changePage('dashboard')

          this.$toast.open({
            message: 'Login Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        })
      } catch (error) {
        console.log(error.response)
        this.$toast.open({
          message: `Login Failed!<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    },
    async submitRegistration(registrationData, cb) {
      try {
        await axios({
          method: 'post',
          url: `${this.BASE_URL}/register`,
          data: registrationData
        })

        // fake preloader
        this.showLoading(() => {
          // redirect to login page
          this.changePage('login')

          this.$toast.open({
            message: 'Registration Success!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })

          cb()
        })
      } catch (error) {
        console.log(error?.response.data.message)
        const errMsg = error?.response.data.message
        this.updateError(errMsg)
      }
    },
    logout() {
      // prompt user confirmation
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
          // fake preloader
          this.showLoading(() => {
            // clear local storage
            localStorage.clear()

            // clear session variable
            this.session.access_token = ''
            this.session.username = ''
            this.session.email = ''
            this.session.role = ''

            // redirect to login page
            this.changePage('login')

            this.$toast.open({
              message: 'Logout Success!',
              type: 'success',
              duration: 3000,
              position: 'top-right',
              dismissible: true
            })
          })
        }
      })
    },
    async fetch(item) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${this.BASE_URL}/${item === 'logs' ? 'histories' : item}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this[`${item === 'histories' ? 'logs' : item}`] = await data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async addProduct(product) {
      try {
        const access_token = localStorage.getItem('access_token')

        await axios({
          method: 'post',
          url: `${this.BASE_URL}/products`,
          headers: { access_token },
          data: product
        })

        // fake preloader
        this.showLoading(async () => {
          // fetch updated products
          this.fetch('products')
          // fetch updated histories
          this.fetch('histories')
          // redirect to products page
          this.changePage('products')

          this.$toast.open({
            message: 'Successfully added product!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        })
      } catch (error) {
        console.log(error?.response.data.message)
        const errMsg = error?.response.data.message
        this.updateError(errMsg)
      }
    },
    async editProduct(product) {
      try {
        const access_token = localStorage.getItem('access_token')

        await axios({
          method: 'put',
          url: `${this.BASE_URL}/products/${product.id}`,
          headers: { access_token },
          data: product
        })

        // fake preloader
        this.showLoading(async () => {
          // fetch updated products
          this.fetch('products')
          // fetch updated histories
          this.fetch('histories')
          // redirect to products page
          this.changePage('products')

          this.$toast.open({
            message: 'Successfully edited product!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        })
      } catch (error) {
        console.log(error?.response.data.message)
        const errMsg = error?.response.data.message
        this.updateError(errMsg)
      }
    },
    async updateProductStatus(product) {
      try {
        const access_token = localStorage.getItem('access_token')

        await axios({
          method: 'patch',
          url: `${this.BASE_URL}/products/${product.id}`,
          headers: { access_token },
          data: {
            status: product.status
          }
        })

        // fake preloader
        this.showLoading(async () => {
          // fetch updated products
          this.fetch('products')
          // fetch updated histories
          this.fetch('histories')
          // redirect to products page
          this.changePage('products')

          this.$toast.open({
            message: 'Product status has been updated!',
            type: 'success',
            duration: 3000,
            position: 'top-right',
            dismissible: true
          })
        })
      } catch (error) {
        console.log(error.response.data)
        this.$toast.open({
          message: `Failed to update product status!<br/>${error.response.data.message}`,
          type: 'error',
          duration: 3000,
          position: 'top-right',
          dismissible: true
        })
      }
    }
  },
  created() {
    // if already logged in
    if (localStorage.getItem('access_token')) {
      // get local storage
      this.session.access_token = localStorage.getItem('access_token')
      this.session.username = localStorage.getItem('username')
      this.session.email = localStorage.getItem('email')
      this.session.role = localStorage.getItem('role')
    }
  },
  mounted() {
    // check access_token on refresh / on page load
    this.currentPage = this.authenticated ? 'dashboard' : 'login'
  },
  watch: {
    'session.access_token'(newAccessToken) {
      if (newAccessToken) {
        this.authenticated = true
        this.currentPage = 'dashboard'

        // fetch products
        this.fetch('products')
        // fetch categories
        this.fetch('categories')
        // fetch histories
        this.fetch('histories')
      } else {
        this.authenticated = false
        this.currentPage = 'login'
      }
    }
  }
}
</script>

<template>
  <!-- Preloader -->
  <Preloader :loadingState="loadingState" />

  <!-- Navbar -->
  <Navbar />

  <!-- Authenticated Section -->
  <Home
    v-if="authenticated"
    :currentPage="currentPage"
    :session="session"
    :errors="errors"
    :products="products"
    :categories="categories"
    :logs="logs"
    @changePage="changePage"
    @showLoading="showLoading"
    @updateError="updateError"
    @logout="logout"
    @addProduct="addProduct"
    @editProduct="editProduct"
    @updateProductStatus="updateProductStatus"
  />

  <!-- Unauthenticated Section => Login/Register -->
  <AuthenticationPage
    v-else
    :currentPage="currentPage"
    :errors="errors"
    @changePage="changePage"
    @updateError="updateError"
    @submitRegistration="submitRegistration"
    @submitLogin="submitLogin"
    @googleLogin="googleLogin"
  />
</template>
