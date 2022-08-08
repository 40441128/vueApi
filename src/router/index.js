import Vue from 'vue'
import Router from 'vue-router'
import Meteorological from '@/components/Meteorological'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Meteorological',
      component: Meteorological
    }
  ]
})
