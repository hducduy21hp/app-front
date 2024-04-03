import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import HomeView from '../pages/home'
import Employee from '../pages/employees'
import EmployeeDetail from '../pages/employeeDetail'

const routes = [
  { path: '/', component: HomeView },
  { path: '/employee', component: Employee },
  {
    path: '/employee/:id',
    name: 'employee-detail',
    component: EmployeeDetail
  },
]

const router = new VueRouter({routes})

export default router