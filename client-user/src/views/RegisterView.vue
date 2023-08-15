<script>
import ButtonEl from '../components/ButtonEl.vue'
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
  components: {
    ButtonEl,
    RouterLink
  },
  data() {
    return {
      registrationForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    submitRegistration() {
      this.register(this.registrationForm, () => {
        // clear form
        this.registrationForm = {
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: ''
        }
      })
    }
  },
  computed: {
    ...mapState(useAuthStore, ['errors'])
  }
}
</script>

<template>
  <section id="login-section">
    <form id="register-form" @submit.prevent="submitRegistration">
      <div class="formDivCenter">
        <div class="formTitle">
          <h1 class="title">Register</h1>
        </div>

        <div class="formBody">
          <!-- email -->
          <div class="mb-4">
            <label for="register-email"> Email </label>
            <input
              :class="[{ errorClass: errors?.registration?.email }]"
              id="register-email"
              type="email"
              placeholder="user@example.com"
              autocomplete="off"
              v-model="registrationForm.email"
            />
            <span v-if="errors?.registration?.email" class="errorMsg">
              * {{ errors.registration.email }}
            </span>
          </div>

          <!-- password -->
          <div class="mb-6">
            <label for="register-password"> Password </label>
            <input
              type="password"
              :class="[{ errorClass: errors?.registration?.password }]"
              id="register-password"
              placeholder="********"
              autocomplete="off"
              v-model="registrationForm.password"
            />
            <span v-if="errors?.registration?.password" class="errorMsg">
              * {{ errors.registration.password }}
            </span>
          </div>

          <!-- submit button -->
          <div class="mb-6">
            <ButtonEl size="big" content="Register" themeColor="green" />
          </div>

          <div class="mt-[50px] text-center">
            <span class="font-normal">Have an account?&nbsp;</span>
            <RouterLink id="showLoginBtn" c class="navLink" to="/login">Login</RouterLink>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
#login-section {
  @apply font-medium pb-[80px] pt-[40px];
}

#register-form {
  @apply flex items-center content-center;
}

label {
  @apply block text-gray-700 text-sm font-medium mb-2;
}

input,
textarea {
  @apply shadow-sm appearance-none border border-gray-400 rounded w-full py-4 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-[#00C9A7];
}

hr {
  @apply mt-3 hidden sm:block border-gray-400;
}
</style>
