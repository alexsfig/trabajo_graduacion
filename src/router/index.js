import Vue from 'vue'
import Router from 'vue-router'
// Import components to use in view
//import HelloWorld from '@/components/HelloWorld'
import Error404 from '@/layouts/Error'
import Login from '@/components/login/Login'
import Playas from '@/components/playas/Index'
import Dashboard from '@/components/dashboard/Index'
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

import AtletasCreate from '@/components/atletas/Create'
import AtletasShow from '@/components/atletas/Show'
import AtletasIndex from '@/components/atletas/Index'

import CategoriasCreate from '@/components/categorias/Create'
import CategoriasShow from '@/components/categorias/Show'
import CategoriasIndex from '@/components/categorias/Index'

import EscuelasCreate from '@/components/escuelas/Create'
import EscuelasShow from '@/components/escuelas/Show'
import EscuelasIndex from '@/components/escuelas/Index'

import FormapagosCreate from '@/components/formapagos/Create'
import FormapagosShow from '@/components/formapagos/Show'
import FormapagosIndex from '@/components/formapagos/Index'

import CuentasCreate from '@/components/cuentas/Create'
import CuentasShow from '@/components/cuentas/Show'
import CuentasIndex from '@/components/cuentas/Index'

import TransaccionesCreate from '@/components/transacciones/Create'
import TransaccionesShow from '@/components/transacciones/Show'
import TransaccionesIndex from '@/components/transacciones/Index'

// Import base templates
import AdminTemplate from '@/layouts/Admin'
import LoginTemplate from '@/layouts/Login'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    // Load login views
    {
      path: '/404',
      component: Error404
    },
    {
      path: '/login',
      component: LoginTemplate,
      children:[
        {
          path: '',
          name: 'Login',
          component: Login
        },
        {
          path: '404',
          name: 'Error404',
          component: Error404
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
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
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
        },
        {
          path: 'atletas/create',
          name: 'AtletasCreate',
          component: AtletasCreate
        },
        {
          path: 'atletas',
          name: 'AtletasIndex',
          component: AtletasIndex
        },
        {
          path: 'atletas/:id',
          name: 'AtletasShow',
          component: AtletasShow
        },
        {
          path: 'categorias/create',
          name: 'CategoriasCreate',
          component: CategoriasCreate
        },
        {
          path: 'categorias',
          name: 'CategoriasIndex',
          component: CategoriasIndex
        },
        {
          path: 'categorias/:id',
          name: 'CategoriasShow',
          component: CategoriasShow
        },
        {
          path: 'escuelas',
          name: 'EscuelasIndex',
          component: EscuelasIndex
        },
        {
          path: 'escuelas/create',
          name: 'EscuelasCreate',
          component: EscuelasCreate
        },
        {
          path: 'escuelas/:id',
          name: 'EscuelasShow',
          component: EscuelasShow
        },
        {
          path: 'formapagos',
          name: 'FormapagosIndex',
          component: FormapagosIndex
        },
        {
          path: 'formapagos/create',
          name: 'FormapagosCreate',
          component: FormapagosCreate
        },
        {
          path: 'formapagos/:id',
          name: 'FormapagosShow',
          component: FormapagosShow
        },
        {
          path: 'cuentas',
          name: 'CuentasIndex',
          component: CuentasIndex
        },
        {
          path: 'cuentas/create',
          name: 'CuentasCreate',
          component: CuentasCreate
        },
        {
          path: 'cuentas/:id',
          name: 'CuentasShow',
          component: CuentasShow
        },
         {
          path: 'transacciones',
          name: 'TransaccionesIndex',
          component: TransaccionesIndex
        },
        {
          path: 'transacciones/create',
          name: 'TransaccionesCreate',
          component: TransaccionesCreate
        },
        {
          path: 'transaccciones/:id',
          name: 'TransaccionesShow',
          component: TransaccionesShow
        }
      ]
    },
  ]
})
