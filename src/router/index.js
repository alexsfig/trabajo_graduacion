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
import AtletasEdit from '@/components/atletas/Edit'
import AtletasShow from '@/components/atletas/Show'
import AtletasIndex from '@/components/atletas/Index'

import CategoriasCreate from '@/components/categorias/Create'
import CategoriasShow from '@/components/categorias/Show'
import CategoriasIndex from '@/components/categorias/Index'

import EscuelasCreate from '@/components/escuelas/Create'
import EscuelasShow from '@/components/escuelas/Show'
import EscuelasIndex from '@/components/escuelas/Index'


// Import base templates
import AdminTemplate from '@/layouts/Admin'
import LoginTemplate from '@/layouts/Login'


import FechasIndex from '@/components/fechas/Index'
import FechasForm from '@/components/fechas/Form'
import CircuitosForm from '@/components/circuitos/Form'
import CircuitosIndex from '@/components/circuitos/Index'
import AgregarAtleta from '@/components/circuitos/AgregarAtleta'
// Import base templates

import CuentasForm from '@/components/cuenta/Form'
import CuentasIndex from '@/components/cuenta/Index'

import TipoTransaccionForm from '@/components/tipotransaccion/Form'
import TipoTransaccionIndex from '@/components/tipotransaccion/Index'

import FormaPagoForm from '@/components/formaPago/Form'
import FormaPagoIndex from '@/components/formaPago/Index'

import PatrocinadorForm from '@/components/patrocinadores/Form'
import PatrocinadorIndex from '@/components/patrocinadores/Index'


import TransaccionForm from '@/components/transaccion/Form'
import TransaccionIndex from '@/components/transaccion/Index'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_ROUTE,
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
          path: 'atletas/create/:id',
          name: 'AtletasCreate',
          component: AtletasCreate
        },
        {
          path: 'atletas',
          name: 'AtletasIndex',
          component: AtletasIndex
        },
        {
          path: 'atletas/:id/edit',
          name: 'AtletasEdit',
          component: AtletasEdit
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
        }, {
          path: 'fechas',
          name: 'fechasIndex',
          component: FechasIndex
        }
        , 
        {
          path: 'fechas/form',
          name: 'fechasCreate',
          component: FechasForm
        },
        {
          path: 'fechas/form/:id',
          name: 'fechasEdit',
          component: FechasForm
        },
        {
          path: 'circuitos',
          name: 'circuitosIndex',
          component: CircuitosIndex
        },
        {
          path: 'circuitos/form',
          name: 'circuitosCreate',
          component: CircuitosForm
        },
        {
          path: 'circuitos/form/:id',
          name: 'circuitosEdit',
          component: CircuitosForm
        },
        {
          path: 'circuitos/agregarAtleta/:id',
          name: 'circuitosAgregarAtleta',
          component: AgregarAtleta
        },
        {
          path: 'cuentas',
          name: 'cuentasIndex',
          component: CuentasIndex
        },
        {
          path: 'cuentas/form',
          name: 'cuentasCreate',
          component: CuentasForm
        },
        {
          path: 'cuentas/form/:id',
          name: 'cuentasEdit',
          component: CuentasForm
        }
,
        {
          path: 'tipoTransaccions',
          name: 'tipoTransaccionIndex',
          component: TipoTransaccionIndex
        },
        {
          path: 'tipoTransaccions/form',
          name: 'tipoTransaccionCreate',
          component: TipoTransaccionForm
        },
        {
          path: 'tipoTransaccions/form/:id',
          name: 'tipoTransaccionsEdit',
          component: TipoTransaccionForm
        }, {
          path: 'formaPagos',
          name: 'formaPagoIndex',
          component: FormaPagoIndex
        },
        {
          path: 'formaPagos/form',
          name: 'formaPagoCreate',
          component: FormaPagoForm
        },
        {
          path: 'formaPagos/form/:id',
          name: 'formaPagosEdit',
          component: FormaPagoForm
        },
        {
          path: 'patrocinadors',
          name: 'patrocinadorIndex',
          component: PatrocinadorIndex
        },
        {
          path: 'patrocinadors/form',
          name: 'patrocinadorCreate',
          component: PatrocinadorForm
        },
        {
          path: 'patrocinadors/form/:id',
          name: 'patrocinadorsEdit',
          component: PatrocinadorForm
        },
        {
          path: 'transaccion',
          name: 'transaccionIndex',
          component: TransaccionIndex
        },
        {
          path: 'transaccions/form',
          name: 'transaccionCreate',
          component: TransaccionForm
        },
        {
          path: 'transaccions/form/:id',
          name: 'transaccionsEdit',
          component: TransaccionForm
        }
      ]
    },
  ]
})
