import Vue from 'vue'
import Router from 'vue-router'
// Import components to use in view
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Playas from '@/components/playas/Index'
import UsersCreate from '@/components/users/Create'
import UsersShow from '@/components/users/Show'
import UsersIndex from '@/components/users/Index'
import PersonaIndex from '@/components/persona/Index'
import PersonaCreate from '@/components/persona/Create'

import NoticiasCreate from '@/components/noticias/Create'
import NoticiasShow from '@/components/noticias/Show'
import NoticiasIndex from '@/components/noticias/Index'

import JuntamiembrosCreate from '@/components/juntamiembros/Create'
import JuntamiembrosShow from '@/components/juntamiembros/Show'
import JuntamiembrosIndex from '@/components/juntamiembros/Index'

import EntrenadoresCreate from '@/components/entrenadores/Create'
import EntrenadoresShow from '@/components/entrenadores/Show'
import EntrenadoresIndex from '@/components/entrenadores/Index'

import ClubesCreate from '@/components/clubes/Create'
import ClubesShow from '@/components/clubes/Show'
import ClubesIndex from '@/components/clubes/Index'

import JuecesCreate from '@/components/jueces/Create'
import JuecesShow from '@/components/jueces/Show'
import JuecesIndex from '@/components/jueces/Index'


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
          path: 'persona',
          name: 'PersonaIndex',
          component: PersonaIndex
        },
        {
          path: 'persona/create',
          name: 'PersonaCreate',
          component: PersonaCreate
        },
        {
          path: 'users/create',
          name: 'UsersCreate',
          component: UsersCreate
        },
        {
          path: 'users',
          name: 'UsersIndex',
          component: UsersIndex
        },
        {
          path: 'users/:id',
          name: 'UsersShow',
          component: UsersShow
        },
        {
          path: 'noticias/create',
          name: 'NoticiasCreate',
          component: NoticiasCreate
        },
        {
          path: 'noticias',
          name: 'NoticiasIndex',
          component: NoticiasIndex
        },
        {
          path: 'noticias/:id',
          name: 'NoticiasShow',
          component: NoticiasShow
        },
        {
          path: 'juntamiembros/create',
          name: 'JuntamiembrosCreate',
          component: JuntamiembrosCreate
        },
        {
          path: 'juntamiembros',
          name: 'JuntamiembrosIndex',
          component: JuntamiembrosIndex
        },
        {
          path: 'juntamiembros/:id',
          name: 'JuntamiembrosShow',
          component: JuntamiembrosShow
        },
        {
          path: 'entrenadores/create',
          name: 'EntrenadoresCreate',
          component: EntrenadoresCreate
        },
        {
          path: 'entrenadores',
          name: 'EntrenadoresIndex',
          component: EntrenadoresIndex
        },
        {
          path: 'entrenadores/:id',
          name: 'EntrenadoresShow',
          component: EntrenadoresShow
        },
         {
          path: 'clubes/create',
          name: 'ClubesCreate',
          component: ClubesCreate
        },
        {
          path: 'clubes',
          name: 'ClubesIndex',
          component: ClubesIndex
        },
        {
          path: 'clubes/:id',
          name: 'ClubesShow',
          component: ClubesShow
        },
         {
          path: 'jueces/create',
          name: 'JuecesCreate',
          component: JuecesCreate
        },
        {
          path: 'jueces',
          name: 'JuecesIndex',
          component: JuecesIndex
        },
        {
          path: 'jueces/:id',
          name: 'JuecesShow',
          component: JuecesShow
        }
      ]
    },	
  ]
})

