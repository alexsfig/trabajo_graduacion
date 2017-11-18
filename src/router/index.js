import Vue from 'vue'
import Router from 'vue-router'
// Import components to use in view
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Playas from '@/components/playas/Index'
import EmployeesCreate from '@/components/users/Create'
import EmployeesShow from '@/components/users/Show'
import EmployeeIndex from '@/components/users/Index'
// Import base templates
import AdminTemplate from '@/layouts/Admin'
import LoginTemplate from '@/layouts/Login'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    // Load login views
    {
      path: '/login',
      component: LoginTemplate,
      children:[
        {
          path: '',
          name: 'Login',
          component: Login
        }
      ]
    },
    // Load Admin views
    {
      path: '/admin',
      component: AdminTemplate,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'playas',
          name: 'Playas',
          component: Playas
        },
        
        {
          path: 'users/create',
          name: 'EmployeesCreate',
          component: EmployeesCreate
        },
        {
          path: 'users',
          name: 'EmployeeIndex',
          component: EmployeeIndex
        },
        {
          path: 'users/:id',
          name: 'EmployeesShow',
          component: EmployeesShow
        }
      ]
    },
  ]
})

