import { createRouter, createWebHistory } from 'vue-router'

import ProductsSectionView from '../views/ProductsSectionView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import BookmarksSectionView from '../views/BookmarksSectionView.vue'
import NotFoundSectionView from '../views/NotFoundSectionView.vue'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products-section',
      component: ProductsSectionView
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/bookmarks',
      name: 'bookmarks-section',
      component: BookmarksSectionView
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404-section',
      component: NotFoundSectionView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const unauthenticatedPage = ['login', 'register'].includes(to.name)
  const authenticated = localStorage.access_token
  // const global = useProductStore()

  if (['products-section', 'product-detail'].includes(to.name)) {
    next()
  } else if ((unauthenticatedPage && authenticated) || to.path === '/') {
    next('/products')
  } else if (!unauthenticatedPage && !authenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
