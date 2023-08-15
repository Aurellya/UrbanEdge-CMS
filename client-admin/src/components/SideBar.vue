<script>
export default {
  props: ['currentPage'],
  emits: ['changePage', 'showLoading', 'logout'],
  data() {
    return {
      activeClass: ' bg-gray-100 text-gray-900 ',
      inactiveClass: ' text-gray-600 hover:bg-gray-50 hover:text-gray-900 '
    }
  },
  methods: {
    changePage(page) {
      // fake preloader
      this.$emit('showLoading', () => {
        this.$emit('changePage', page)
      })
    },
    logout() {
      this.$emit('logout')
    }
  },
  computed: {
    username() {
      return localStorage.getItem('username')
    }
  }
}
</script>

<template>
  <div class="flex-col w-64">
    <div class="sideBarDiv">
      <div class="mt-3 flex-grow flex flex-col h-screen">
        <div class="flex-1 px-2 bg-white space-y-1">
          <a
            href=""
            id="nav-dashboard"
            class="sideBarNavLink"
            :class="[currentPage === 'dashboard' ? activeClass : inactiveClass]"
            @click.prevent="changePage('dashboard')"
          >
            <span class="iconWrapper">
              <i class="fa-solid fa-cart-shopping mr-3"></i>
            </span>
            Dashboard
          </a>

          <a
            href=""
            id="nav-product"
            class="sideBarNavLink"
            :class="[currentPage === 'products' ? activeClass : inactiveClass]"
            @click.prevent="changePage('products')"
          >
            <span class="iconWrapper">
              <i class="fa-solid fa-bag-shopping"></i>
            </span>
            Products
          </a>

          <a
            href=""
            id="nav-category"
            class="sideBarNavLink"
            :class="[currentPage === 'categories' ? activeClass : inactiveClass]"
            @click.prevent="changePage('categories')"
          >
            <span class="iconWrapper">
              <i class="fa-solid fa-shapes"></i>
            </span>
            Categories
          </a>

          <a
            href=""
            id="nav-log"
            class="sideBarNavLink"
            :class="[currentPage === 'logs' ? activeClass : inactiveClass]"
            @click.prevent="changePage('logs')"
          >
            <span class="iconWrapper">
              <i class="fa-regular fa-clock"></i>
            </span>
            Logs
          </a>

          <br />

          <div>
            <h1 class="font-bold mb-2 px-2">Account</h1>

            <div class="sideBarNavLink cursor-default text-gray-600">
              <span class="iconWrapper"><i class="fa-solid fa-user"></i></span>Hey,&nbsp;<span
                id="username"
                >{{ username ? username : 'Anonymous' }}!</span
              >
            </div>

            <a href="" id="nav-logout" @click.prevent="logout">
              <span class="iconWrapper"><i class="fa-solid fa-right-from-bracket"></i></span>Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sideBarDiv {
  @apply flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto fixed md:w-64;
}

.iconWrapper {
  @apply flex items-center justify-center text-[18px] w-[30px];
}

.iconWrapper > i {
  @apply mr-3;
}

.sideBarNavLink {
  @apply flex items-center px-4 py-2 text-sm font-medium rounded-md;
}

#nav-logout {
  @apply text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-4 py-2 text-sm font-medium rounded-md;
}
</style>
