<script>
import Swal from 'sweetalert2'

export default {
  props: ['product', 'category', 'log', 'index', 'session', 'currentPage'],
  emits: ['changePage', 'updateQueryId', 'updateProductStatus'],
  data() {
    return {
      status: ['Active', 'Inactive', 'Archived'],
      productStatus: ''
    }
  },
  methods: {
    changePage(page) {
      this.$emit('updateQueryId', this.product.id)
      this.$emit('changePage', page)
    },
    formattedPrice(price) {
      return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    updateProductStatus() {
      // prompt user confirmation
      Swal.fire({
        title: '<h2>Are you sure?</h2>',
        icon: 'warning',
        html: `want to update status to ${this.productStatus}`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<span>Yes, update it!</span>',
        confirmButtonColor: 'hsl(204, 86%, 53%)',
        cancelButtonText: '<span>Cancel</span>',
        cancelButtonColor: 'hsl(348, 100%, 61%)'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedProduct = { id: this.product.id, status: this.productStatus }
          this.$emit('updateProductStatus', updatedProduct)
        } else {
          this.productStatus = this.product.status
        }
      })
    }
  },
  computed: {
    formattedCreatedAt() {
      var date = new Date(this.log.createdAt)

      var dateStr =
        ('00' + (date.getMonth() + 1)).slice(-2).replace(/^0+/, '') +
        '/' +
        ('00' + date.getDate()).slice(-2).replace(/^0+/, '') +
        '/' +
        date.getFullYear() +
        ', ' +
        ('00' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()))
          .slice(-2)
          .replace(/^0+/, '') +
        ':' +
        ('00' + date.getMinutes()).slice(-2).replace(/^0+/, '') +
        ':' +
        ('00' + date.getSeconds()).slice(-2).replace(/^0+/, '') +
        ' ' +
        (date.getHours() > 12 ? 'PM' : 'AM')

      return dateStr
    }
  },
  created() {
    if (this.currentPage === 'products') {
      this.productStatus = this.product.status
    }
  }
}
</script>

<template>
  <tr :class="[index % 2 === 0 ? '' : 'bg-gray-100']">
    <!-- Products -->
    <td v-if="currentPage === 'products'">
      {{ product.id }}
    </td>
    <td class="fw-bold pr-5" v-if="currentPage === 'products'">
      {{ product.name }}
    </td>
    <td class="px-2 w-100" v-if="currentPage === 'products'">
      <img :src="product.imgUrl" class="w-[100%]" />
    </td>
    <td class="pl-6 !text-left" v-if="currentPage === 'products'">
      {{ product.description }}
    </td>
    <td class="px-2" v-if="currentPage === 'products'">
      {{ product.stock }}
    </td>
    <td class="fw-bold px-2" v-if="currentPage === 'products'">
      {{ formattedPrice(product.price) }}
    </td>
    <td class="px-3" v-if="currentPage === 'products'">
      {{ product.User.email }}
    </td>
    <td v-if="currentPage === 'products'">
      <div class="relative" v-if="session.role === 'Admin'">
        <select
          :id="`product-status-${product.id}`"
          v-model="productStatus"
          @change="updateProductStatus"
        >
          <option
            v-for="(s, index) in status"
            :key="index"
            :value="s"
            :selected="productStatus === s"
          >
            {{ s }}
          </option>
        </select>
        <div class="selectDropdown">
          <span class="text-gray-500">
            <i class="fa-solid fa-caret-down text-[18px]"></i>
          </span>
        </div>
      </div>
      <div v-else>{{ productStatus }}</div>
    </td>
    <td class="px-6" v-if="currentPage === 'products'">
      <button
        v-if="
          session.role === 'Admin' ||
          (session.role !== 'Admin' && product.User.email === session.email)
        "
        @click="changePage('editProduct')"
      >
        <i class="fa-solid fa-pen-to-square hover:opacity-60"></i>
      </button>
    </td>

    <!-- Category  -->
    <td v-if="currentPage === 'categories'">#{{ category.id }}</td>
    <td class="fw-bold px-6 py-4 !text-left" v-if="currentPage === 'categories'">
      {{ category.name }}
    </td>
    <td class="px-6" v-if="currentPage === 'categories'">
      <button>
        <i class="fa-solid fa-pen-to-square hover:opacity-60"></i>
      </button>
    </td>
    <td class="pr-[36px]" v-if="currentPage === 'categories'">
      <button>
        <i class="fa-solid fa-trash-can text-red-500 hover:opacity-60"></i>
      </button>
    </td>

    <!-- Logs -->
    <td v-if="currentPage === 'logs'">#{{ log.id }}</td>
    <td class="fw-bold px-6 !text-left" v-if="currentPage === 'logs'">
      {{ log.title }}
    </td>
    <td class="px-6 !text-left" v-if="currentPage === 'logs'">
      {{ log.description }}
    </td>
    <td class="px-6 !text-left" v-if="currentPage === 'logs'">
      {{ formattedCreatedAt }}
    </td>
    <td class="px-6 !text-left" v-if="currentPage === 'logs'">{{ log.email }}</td>
  </tr>
</template>

<style scoped>
td {
  @apply text-center py-4 border-b border-gray-200;
}

select {
  @apply shadow-sm appearance-none border border-gray-400 rounded py-1 pl-2 pr-[30px] text-gray-700 text-sm leading-tight focus:outline-none focus:border-[#00C9A7];
}

.selectDropdown {
  @apply absolute inset-y-0 right-[10px] top-[2px] flex items-center pointer-events-none;
}
</style>
