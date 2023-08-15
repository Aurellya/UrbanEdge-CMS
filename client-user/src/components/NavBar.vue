<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/product'

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      mobile: {
        openNav: false
      }
    }
  },
  computed: {
    ...mapState(useAuthStore, ['authenticated'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    ...mapActions(useProductStore, ['fetchData', 'updateFilterName', 'updateFilterCategory']),
    clearFilter() {
      this.updateFilterName('')
      this.updateFilterCategory(null)
      this.fetchData(1)
    },
    updateMobileNav() {
      this.mobile.openNav = !this.mobile.openNav
    }
  }
}
</script>

<template>
  <nav id="navbar">
    <div>
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile Menu: Hamburger Button-->
        <div class="hamBtnDiv">
          <button
            type="button"
            class="hamBtn"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click.prevent="updateMobileNav"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="black"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <!-- Navbar Left -->
        <div class="navLeft">
          <!-- Logo / Brand Name -->
          <div class="brandDiv">
            <span><i class="fa-solid fa-couch"></i></span>
            <span>UrbanEdge</span>
          </div>

          <!-- Nav Link Normal View -->
          <div class="navLink">
            <div>
              <RouterLink class="navLinkItem" to="/products" @click.prevent="clearFilter">
                Products
              </RouterLink>
              <RouterLink class="navLinkItem" v-if="authenticated" to="/bookmarks">
                Bookmark
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Navbar Right -->
        <div class="navRight">
          <!-- Nav Link Normal View -->
          <div class="flex gap-[20px]" v-if="!authenticated">
            <RouterLink class="navLinkItem" to="/login">Login</RouterLink>
            <RouterLink class="navLinkItem" to="/register">Register</RouterLink>
          </div>

          <div v-else>
            <button type="button" class="navLinkItem p-1" @click.prevent="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu: Nav Link on Menu Open -->
    <div :class="[mobile.openNav ? 'block' : 'hidden']" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <RouterLink
          class="navLinkItem"
          to="/products"
          @click.prevent="
            () => {
              clearFilter()
              updateMobileNav()
            }
          "
        >
          Products
        </RouterLink>
        <RouterLink
          class="navLinkItem"
          to="/bookmarks"
          v-if="authenticated"
          @click.prevent="updateMobileNav"
        >
          Bookmark
        </RouterLink>

        <hr />

        <RouterLink
          class="navLinkItem"
          to="/login"
          v-if="!authenticated"
          @click.prevent="updateMobileNav"
        >
          Login
        </RouterLink>
        <RouterLink
          class="navLinkItem"
          to="/register"
          v-if="!authenticated"
          @click.prevent="updateMobileNav"
        >
          Register
        </RouterLink>

        <button
          type="button"
          class="block rounded-md px-3 py-2 hover:opacity-60"
          @click.prevent="
            () => {
              logout()
              updateMobileNav()
            }
          "
          v-if="authenticated"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  @apply z-[100] bg-white shadow sticky top-0;
}

nav > div {
  @apply mx-auto max-w-7xl px-2 sm:px-6 lg:px-8;
}

.hamBtnDiv {
  @apply absolute inset-y-0 left-0 flex items-center sm:hidden;
}

.hamBtn {
  @apply inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
}

.navLeft {
  @apply flex flex-1 items-center justify-center sm:items-stretch sm:justify-start;
}

.navRight {
  @apply hidden sm:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0;
}

.brandDiv {
  @apply flex flex-shrink-0 items-center gap-[6px] cursor-default;
}

.navLeft .navLink {
  @apply hidden sm:ml-[36px] sm:block;
}

.navLeft .navLink > div {
  @apply flex space-x-4;
}

.navLeft .navLinkItem {
  @apply hover:opacity-60 rounded-md px-3 py-2 text-black;
}

.navRight .navLinkItem {
  @apply rounded-full hover:opacity-60;
}

#mobile-menu .navLinkItem {
  @apply block rounded-md px-3 py-2;
}
</style>
