import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/reset.css'
import '../assets/css/header.css'

Vue.use(Router)
import Shop from '../views/shop.vue'
import Item from '../views/item.vue'
import Cart from '../views/cart.vue'
import CheckOut from '../views/checkout.vue'
import Payment from '../views/payment.vue'
import Account from '../views/account.vue'
import Order from '../views/account/order.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: CheckOut
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [{
        path: '',
        name: 'Account',
        component: Order
      }]
    }
  ]
})
