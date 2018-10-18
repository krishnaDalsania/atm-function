import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import cardDetail from '@/components/card-detail'
import viewBalance from '@/components/available-balance'
import amount from '@/components/amount'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/card-detail',
      name: 'card-detail',
      component: cardDetail
    },
    {
      path: '/available-balance',
      name: 'available-balance',
      component: viewBalance,
      props: true
    },
    {
      path: '/amount',
      name: 'amount',
      component: amount,
      props: true
    }
  ]
})
