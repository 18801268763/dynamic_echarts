import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import column from 'components/column/column'
import funnel from 'components/funnel/funnel'
import heat from 'components/heat/heat'
import point from 'components/point/point'
import line from 'components/line/line'
import dashboard from 'components/dashboard/dashboard'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import {DatePicker} from 'element-ui'

Vue.component(DatePicker.name, DatePicker)

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    // color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
    color: ['#007cdc', '#ff5675', '#ff8345', '#f8bd0b', '#009f5d', '#8cc540']
  }
});
const router = new VueRouter({
  routes: [{
    path: '/column',
    component: column
  }, {
    path: '/funnel',
    component: funnel
  }, {
    path: '/heat',
    component: heat
  }, {
    path: '/point',
    component: point
  }, {
    path: '/dashboard',
    component: dashboard
  }, {
    path: '/multipleColumn',
    component: multipleColumn
  }, {
    path: '/line',
    component: line
  }],
  linkActiveClass: 'active'
})
new Vue({
  router,
  store,
  template: '<App />',
  components: {
    App
  },
  data: {
    eventHub: new Vue(),
    charts: []
  }
}).$mount('#app')

router.push('dashboard')
