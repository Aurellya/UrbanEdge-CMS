<script>
import ButtonEl from './ButtonEl.vue'
export default {
  components: {
    ButtonEl
  },
  props: ['errors'],
  emits: ['changePage', 'updateError', 'submitRegistration'],
  data() {
    return {
      registrationForm: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  methods: {
    changePage(page) {
      this.$emit('updateError', null)
      this.$emit('changePage', page)
    },
    submitRegistration() {
      this.$emit('submitRegistration', this.registrationForm, () => {
        // clear form
        this.registrationForm = {
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: ''
        }
        this.$emit('updateError', null)
      })
    }
  }
}
</script>

<template>
  <form id="register-form" @submit.prevent="submitRegistration">
    <div class="formDivCenter">
      <div class="formTitle">
        <h1 class="title">Register</h1>
      </div>

      <div class="formBody">
        <!-- username -->
        <div class="mb-4">
          <label for="register-username"> Username </label>
          <input
            :class="[{ errorClass: errors?.username }]"
            id="register-username"
            type="text"
            placeholder="username"
            autocomplete="off"
            v-model="registrationForm.username"
          />
          <span v-if="errors?.username" class="errorMsg">* {{ errors.username }}</span>
        </div>

        <!-- email -->
        <div class="mb-4">
          <label for="register-email"> Email </label>
          <input
            :class="[{ errorClass: errors?.email }]"
            id="register-email"
            type="email"
            placeholder="user@example.com"
            autocomplete="off"
            v-model="registrationForm.email"
          />
          <span v-if="errors?.email" class="errorMsg">* {{ errors.email }}</span>
        </div>

        <!-- password -->
        <div class="mb-6">
          <label for="register-password"> Password </label>
          <input
            type="password"
            :class="[{ errorClass: errors?.password }]"
            id="register-password"
            placeholder="********"
            autocomplete="off"
            v-model="registrationForm.password"
          />
          <span v-if="errors?.password" class="errorMsg">* {{ errors.password }}</span>
        </div>

        <!-- phone Number -->
        <div class="mb-4">
          <label for="register-phone"> Phone Number </label>
          <input
            :class="[{ errorClass: errors?.phoneNumber }]"
            id="register-phone"
            type="text"
            autocomplete="off"
            v-model="registrationForm.phoneNumber"
          />
          <span v-if="errors?.phoneNumber" class="errorMsg">* {{ errors.phoneNumber }}</span>
        </div>

        <!-- Address -->
        <div class="mb-4">
          <label for="register-address"> Address </label>
          <textarea
            id="register-address"
            :class="[{ errorClass: errors?.address }]"
            rows="3"
            autocomplete="off"
            v-model="registrationForm.address"
          ></textarea>
          <span v-if="errors?.address" class="errorMsg">* {{ errors.address }}</span>
        </div>

        <!-- submit button -->
        <div class="mb-6">
          <ButtonEl size="big" content="Register" themeColor="green" />
        </div>

        <div class="mt-[50px] text-center">
          <span class="font-normal">Have an account?&nbsp;</span>
          <button id="showLoginBtn" class="navLink" @click.prevent="changePage('login')">
            Login
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
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

#register-form {
  @apply flex items-center content-center;
}
</style>
