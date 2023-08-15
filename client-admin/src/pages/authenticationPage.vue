<script>
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

export default {
  components: {
    LoginPage,
    RegisterPage
  },
  props: ['currentPage', 'errors'],
  emits: ['changePage', 'updateError', 'submitRegistration', 'submitLogin', 'googleLogin'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    updateError(err) {
      this.$emit('updateError', err)
    },
    submitRegistration(registrationData, cb) {
      this.$emit('submitRegistration', registrationData, cb)
    },
    submitLogin(loginData, cb) {
      this.$emit('submitLogin', loginData, cb)
    },
    googleLogin(response) {
      this.$emit('googleLogin', response)
    }
  }
}
</script>

<template>
  <section id="login-section">
    <div class="parallax"></div>

    <!-- Login -->
    <LoginPage
      v-if="currentPage === 'login'"
      @changePage="changePage"
      @submitLogin="submitLogin"
      @googleLogin="googleLogin"
    />

    <!-- Register -->
    <RegisterPage
      v-if="currentPage === 'register'"
      :errors="errors"
      @changePage="changePage"
      @updateError="updateError"
      @submitRegistration="submitRegistration"
    />
  </section>
</template>

<style scoped>
#login-section {
  @apply font-medium pb-[80px] pt-[40px];
}

.parallax {
  @apply fixed top-0 z-[-1] w-full h-full min-h-screen opacity-[0.04];
  background-image: url('../assets/bg.png');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
