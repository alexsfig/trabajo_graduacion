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



// Import base templates
import AdminTemplate from '@/layouts/Admin'
import JuezTemplate from '@/layouts/Juez'
import LoginTemplate from '@/layouts/Login'


import FechasIndex from '@/components/fechas/Index'
import FechasForm from '@/components/fechas/Form'
import CircuitosForm from '@/components/circuitos/Form'
import CircuitosFormbyFecha from '@/components/circuitos/FormbyFecha'
import CircuitosEditbyFecha from '@/components/circuitos/EditbyFecha'

import CircuitosIndex from '@/components/circuitos/Index'
import CircuitosIndexByFecha from '@/components/circuitos/IndexByFecha'
import AgregarAtleta from '@/components/circuitos/AgregarAtleta'

import NuevaRonda from '@/components/circuitos/NuevaRonda'

import AgregarJuez from'@/components/circuitos/AgregarJuez'

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
import EscuelasForm from '@/components/escuelas/Form'
import EscuelasIndex from '@/components/escuelas/Index'

import ClubsForm from '@/components/clubes/Form'
import ClubsIndex from '@/components/clubes/Index'
import JuezsForm from '@/components/jueces/Edit'
import JuezsAdd from '@/components/jueces/Add'


import CertiForm from '@/components/jueces/Form'
import RondaIndex from '@/components/rondas/Index'

import HeatIndex from '@/components/heat/Index'

import PatrocinadorAtletaCreate from '@/components/patrocinador_atleta/Create'
import PatrocinadorAtletaEdit from '@/components/patrocinador_atleta/Edit'
import PatrocinadorAtletaShow from '@/components/patrocinador_atleta/Show'
import PatrocinadorAtletaIndex from '@/components/patrocinador_atleta/Index'

import HeatInit from '@/components/heat/Iniciar'
import CalificarInit from '@/components/heat/Calificar'
import VerResultadosInit from '@/components/heat/VerResultados'

import Reportes from '@/components/reportes/Form'
import ReportesAtleta from '@/components/reportes/FormbyAtleta'
import ReportesPatrocinador from '@/components/reportes/FormbyPatrocinador'

Vue.use(Router)
 const router=new Router({
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
      meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false},
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
          component: EscuelasForm
        },
        {
          path: 'escuelas/form/:id',
          name: 'EscuelasShow',
          component: EscuelasForm
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
          path: 'circuitofecha/:id',
          name: 'circuitosIndexByFecha',
          component: CircuitosIndexByFecha
        },
        {
          path: 'circuitos/form',
          name: 'circuitosCreate',
          component: CircuitosForm
        },
        {
          path: 'circuitos/formbyfecha/:id',
          name: 'circuitosCreatebyfecha',
          component: CircuitosFormbyFecha
        },
        {
          path: 'circuitos/editbyfecha/:idcircuito/:idfecha',
          name: 'circuitosEditbyfecha',
          component: CircuitosEditbyFecha
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
          path: 'circuitos/nuevaronda/:id',
          name: 'circuitosNuevaRonda',
          component: NuevaRonda
        },
        {
          path: 'circuitos/agregarJuez/:id',
          name: 'circuitosAgregarJuez',
          component: AgregarJuez
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
        ,
        {
          path: 'escuela',
          name: 'escuelasIndex',
          component: EscuelasIndex
        },
        {
          path: 'escuelas/form',
          name: 'escuelasreate',
          component: EscuelasForm
        },
        {
          path: 'escuelas/form/:id',
          name: 'escuelasEdit',
          component: EscuelasForm
        }
        ,
        {
          path: 'club',
          name: 'clubsIndex',
          component: ClubsIndex
        },
        {
          path: 'clubs/form',
          name: 'clubscreate',
          component: ClubsForm
        },
        {
          path: 'clubs/form/:id',
          name: 'clubsEdit',
          component: ClubsForm
        },
        {
          path: 'ronda/:id',
          name: 'rondaIndex',
          component: RondaIndex
        }
      ,
        {
          path: 'editjuez/:id',
          name: 'juezEdit',
          component: JuezsForm
        },

        {
          path: 'addjuez/:id',
          name: 'juezAdd',
          component: JuezsAdd
        },

         {
          path: 'certiForm/:id',
          name: 'certiForm',
          component: CertiForm
        },
             
        {
          path: 'patrocinadoratleta/create',
          name: 'PatrocinadorAtletaCreate',
          component: PatrocinadorAtletaCreate
        },
        {
          path: 'patrocinadoratleta',
          name: 'PatrocinadorAtletaIndex',
          component: PatrocinadorAtletaIndex
        },
        {
          path: 'patrocinadoratleta/:id/edit',
          name: 'PatrocinadorAtletaEdit',
          component: PatrocinadorAtletaEdit
        },
        {
          path: 'patrocinadoratleta/:id',
          name: 'PatrocinadorAtletaShow',
          component: PatrocinadorAtletaShow
        },

        {
          path: 'reportes/form',
          name: 'Reportes',
          component: Reportes
        },

        {
          path: 'reportes/formbyAtleta',
          name: 'ReportesbyAtleta',
          component: ReportesAtleta
        },

        {
          path: 'reportes/formbyPatrocinador',
          name: 'ReportesbyPatrocinador',
          component: ReportesPatrocinador
        },

        {
          path: 'heat/:id',
          name: 'heat',
          component: HeatIndex
        }
        ,
        {
          path: 'heatinit/:id',
          name: 'heatInit',
          component: HeatInit
        },
        {
          path: 'heat/calificar/:id',
          name: 'CalificarHeat',
          component: CalificarInit
        }
,{
  path: 'heat/resultado/:id',
  name: 'ResultadoHeat',
  component: VerResultadosInit
}


        
      ]
    },
    {
      path: '/juez',
      component: JuezTemplate,
      meta: { requiresAuth: true ,adminAuth:false , juezAuth : true},
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        }]
      
      }   
  ],
})



router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
console.log("grim 1234");
    console.log
    const authUser = JSON.parse(window.localStorage.getItem('rol'))
    if(!authUser ) {
      next({name:'Login'})
    }
    else if(to.meta.adminAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('rol'))
    if(authUser ==1 ) {
      next()
    }else {
      next('/juez')
    }
  } else if(to.meta.juezAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('rol'))
    if(authUser == 2) {
      next()
    }else {
      console.log('Im in admin')
      next('/admin')
    }
  }
  }else {
  next()
  }
})

export default router;