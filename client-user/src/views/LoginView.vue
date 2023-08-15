<script>
import ButtonEl from '../components/ButtonEl.vue'
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
  components: {
    ButtonEl,
    RouterLink
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'googleLogin']),
    submitLogin() {
      this.login(this.loginForm, () => {
        // clear form
        this.loginForm = {
          email: '',
          password: ''
        }
      })
    },
    gLogin(response) {
      this.googleLogin(response)
    }
  }
}
</script>

<template>
  <section id="login-section">
    <form id="login-form" @submit.prevent="submitLogin">
      <div class="formDivCenter">
        <div class="formTitle">
          <h1 class="title">Sign in</h1>
        </div>

        <div class="formBody">
          <!-- email -->
          <div class="mb-4">
            <label for="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="user@example.com"
              autocomplete="off"
              v-model="loginForm.email"
            />
          </div>

          <!-- password -->
          <div class="mb-6">
            <label for="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="********"
              autocomplete="off"
              v-model="loginForm.password"
            />
          </div>

          <!-- submit button -->
          <div class="mb-6">
            <ButtonEl size="big" content="Log In" themeColor="green" />
          </div>

          <div class="grid sm:grid-cols-3 gap-0 mb-6">
            <hr />
            <span class="optionText"> Or continue with </span>
            <hr />
          </div>

          <!-- google button -->
          <div class="w-full mt-5">
            <div class="w-fit mx-auto hover:opacity-80">
              <GoogleLogin :callback="gLogin" />
            </div>
          </div>

          <div class="mt-[50px] text-center">
            <span class="font-normal">Don't have an account?&nbsp;</span>
            <RouterLink id="showRegisterBtn" class="navLink" to="/register">Register</RouterLink>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
label {
  @apply block text-gray-700 text-sm font-medium mb-2;
}

input {
  @apply shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-[#00C9A7];
}

hr {
  @apply mt-3 hidden sm:block border-gray-400;
}

#login-section {
  @apply font-medium pb-[80px] pt-[40px];
}

#login-form {
  @apply flex items-center content-center;
}

span.optionText {
  @apply text-center text-sm text-gray-700 font-normal;
}
</style>
