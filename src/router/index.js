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
import UpdateUserJuez from '@/components/users/UpdateJuez'
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

import Ranking from '@/components/ranking/Ranking'

// Import base templates
import AdminTemplate from '@/layouts/Admin'
import JuezTemplate from '@/layouts/Juez'
import LoginTemplate from '@/layouts/Login'


import FechasIndex from '@/components/fechas/Index'
import FechasForm from '@/components/fechas/Form'
import CircuitosForm from '@/components/circuitos/Form'
import CircuitosFormbyFecha from '@/components/circuitos/FormbyFecha'
import CircuitosEditbyFecha from '@/components/circuitos/EditbyFecha'
import CircuitosFinalizar from '@/components/circuitos/Finalizar'
import CircuitosIndex from '@/components/circuitos/Index'
import CircuitosIndexByFecha from '@/components/circuitos/IndexByFecha'
import AgregarAtleta from '@/components/circuitos/AgregarAtleta'
import AgregarAtletaEscuela from '@/components/escuelas/AgregarAtletaEscuela'
import AgregarAtletaClub from '@/components/clubes/AgregarAtletaClub'

import NuevaRonda from '@/components/circuitos/NuevaRonda'

import AgregarJuez from'@/components/circuitos/AgregarJuez'

// Import base templates

import CuentasForm from '@/components/cuenta/Form'
import CuentasIndex from '@/components/cuenta/Index'

import TipoTransaccionForm from '@/components/tipotransaccion/Form'
import TipoTransaccionIndex from '@/components/tipotransaccion/Index'

import FormaPagoForm from '@/components/formaPago/Form'
import FormaPagoIndex from '@/components/formaPago/Index'
import CalendarioIndex from '@/components/calendario/Index'

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
import RondaEnd from '@/components/rondas/End'
import HeatJuez from '@/components/heat/IndexJuez'
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
      /*  {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },*/
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'playas',
          name: 'Playas',
          component: Playas,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'persona',
          name: 'PersonaIndex',
          component: PersonaIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'persona/create',
          name: 'PersonaCreate',
          component: PersonaCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'users/create',
          name: 'UsersCreate',
          component: UsersCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'users',
          name: 'UsersIndex',
          component: UsersIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'users/:id',
          name: 'UsersShow',
          component: UsersShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'noticias/create',
          name: 'NoticiasCreate',
          component: NoticiasCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'noticias',
          name: 'NoticiasIndex',
          component: NoticiasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'noticias/:id',
          name: 'NoticiasShow',
          component: NoticiasShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'juntamiembros/create',
          name: 'JuntamiembrosCreate',
          component: JuntamiembrosCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'juntamiembros',
          name: 'JuntamiembrosIndex',
          component: JuntamiembrosIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'juntamiembros/:id',
          name: 'JuntamiembrosShow',
          component: JuntamiembrosShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'entrenadores/create',
          name: 'EntrenadoresCreate',
          component: EntrenadoresCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'entrenadores',
          name: 'EntrenadoresIndex',
          component: EntrenadoresIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'entrenadores/:id',
          name: 'EntrenadoresShow',
          component: EntrenadoresShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        
         {
          path: 'jueces/create',
          name: 'JuecesCreate',
          component: JuecesCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'jueces',
          name: 'JuecesIndex',
          component: JuecesIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'jueces/:id',
          name: 'JuecesShow',
          component: JuecesShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'atletas/create/:id',
          name: 'AtletasCreate',
          component: AtletasCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'atletas',
          name: 'AtletasIndex',
          component: AtletasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'atletas/:id/edit',
          name: 'AtletasEdit',
          component: AtletasEdit,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'atletas/:id',
          name: 'AtletasShow',
          component: AtletasShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'categorias/create',
          name: 'CategoriasCreate',
          component: CategoriasCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'categorias',
          name: 'CategoriasIndex',
          component: CategoriasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'categorias/:id',
          name: 'CategoriasShow',
          component: CategoriasShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'escuelas',
          name: 'EscuelasIndex',
          component: EscuelasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'escuelas/create',
          name: 'EscuelasCreate',
          component: EscuelasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'escuelas/form/:id',
          name: 'EscuelasShow',
          component: EscuelasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }, {
          path: 'fechas',
          name: 'fechasIndex',
          component: FechasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
        , 
        {
          path: 'fechas/form',
          name: 'fechasCreate',
          component: FechasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'fechas/form/:id',
          name: 'fechasEdit',
          component: FechasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos',
          name: 'circuitosIndex',
          component: CircuitosIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'ronda/end/:id',
          name: 'rondaEnd',
          component: RondaEnd,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        
        {
          path: 'circuitofecha/:id',
          name: 'circuitosIndexByFecha',
          component: CircuitosIndexByFecha,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos/form',
          name: 'circuitosCreate',
          component: CircuitosForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos/formbyfecha/:id',
          name: 'circuitosCreatebyfecha',
          component: CircuitosFormbyFecha,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos/editbyfecha/:idcircuito/:idfecha',
          name: 'circuitosEditbyfecha',
          component: CircuitosEditbyFecha,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
       {
          path: 'circuitos/form/:id',
          name: 'circuitosEdit',
          component: CircuitosForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos/agregarAtleta/:id',
          name: 'circuitosAgregarAtleta',
          component: AgregarAtleta,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
          {
          path: 'escuelas/agregarAtleta/:id',
          name: 'escuelasAgregarAtleta',
          component: AgregarAtletaEscuela,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'clubes/agregarAtleta/:id',
          name: 'clubesAgregarAtleta',
          component: AgregarAtletaClub,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
         {
          path: 'circuitos/nuevaronda/:id',
          name: 'circuitosNuevaRonda',
          component: NuevaRonda,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'circuitos/agregarJuez/:id',
          name: 'circuitosAgregarJuez',
          component: AgregarJuez,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'cuentas',
          name: 'cuentasIndex',
          component: CuentasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'cuentas/form',
          name: 'cuentasCreate',
          component: CuentasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'cuentas/form/:id',
          name: 'cuentasEdit',
          component: CuentasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
        ,
        {
          path: 'tipoTransaccions',
          name: 'tipoTransaccionIndex',
          component: TipoTransaccionIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'tipoTransaccions/form',
          name: 'tipoTransaccionCreate',
          component: TipoTransaccionForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'tipoTransaccions/form/:id',
          name: 'tipoTransaccionsEdit',
          component: TipoTransaccionForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }, {
          path: 'formaPagos',
          name: 'formaPagoIndex',
          component: FormaPagoIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'calendario',
          name: 'calendarioIndex',
          component: CalendarioIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'formaPagos/form',
          name: 'formaPagoCreate',
          component: FormaPagoForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'formaPagos/form/:id',
          name: 'formaPagosEdit',
          component: FormaPagoForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadors',
          name: 'patrocinadorIndex',
          component: PatrocinadorIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadors/form',
          name: 'patrocinadorCreate',
          component: PatrocinadorForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadors/form/:id',
          name: 'patrocinadorsEdit',
          component: PatrocinadorForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'transaccion',
          name: 'transaccionIndex',
          component: TransaccionIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'transaccions/form',
          name: 'transaccionCreate',
          component: TransaccionForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'transaccions/form/:id',
          name: 'transaccionsEdit',
          component: TransaccionForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
        ,
        {
          path: 'escuela',
          name: 'escuelasIndex',
          component: EscuelasIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'escuelas/form',
          name: 'escuelasreate',
          component: EscuelasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'escuelas/form/:id',
          name: 'escuelasEdit',
          component: EscuelasForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
        ,
        {
          path: 'club',
          name: 'clubsIndex',
          component: ClubsIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'clubs/form',
          name: 'clubscreate',
          component: ClubsForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'clubs/form/:id',
          name: 'clubsEdit',
          component: ClubsForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'ronda/:id',
          name: 'rondaIndex',
          component: RondaIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
      ,
        {
          path: 'editjuez/:id',
          name: 'juezEdit',
          component: JuezsForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'addjuez/:id',
          name: 'juezAdd',
          component: JuezsAdd,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

         {
          path: 'certiForm/:id',
          name: 'certiForm',
          component: CertiForm,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
             
        {
          path: 'patrocinadoratleta/create',
          name: 'PatrocinadorAtletaCreate',
          component: PatrocinadorAtletaCreate,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadoratleta',
          name: 'PatrocinadorAtletaIndex',
          component: PatrocinadorAtletaIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadoratleta/:id/edit',
          name: 'PatrocinadorAtletaEdit',
          component: PatrocinadorAtletaEdit,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'patrocinadoratleta/:id',
          name: 'PatrocinadorAtletaShow',
          component: PatrocinadorAtletaShow,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'reportes/form',
          name: 'Reportes',
          component: Reportes,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'ranking',
          name: 'Ranking',
          component: Ranking,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'reportes/formbyAtleta',
          name: 'ReportesbyAtleta',
          component: ReportesAtleta,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'reportes/formbyPatrocinador',
          name: 'ReportesbyPatrocinador',
          component: ReportesPatrocinador,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },

        {
          path: 'heat/:id',
          name: 'heat',
          component: HeatIndex,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
        ,
        {
          path: 'heatinit/:id',
          name: 'heatInit',
          component: HeatInit,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        },
        {
          path: 'heat/calificar/:id',
          name: 'CalificarHeat',
          component: CalificarInit,
          meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
        }
,{
  path: 'heat/resultado/:id',
  name: 'ResultadoHeat',
  component: VerResultadosInit,
  meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
}
,{
path: 'circuito/finalizar/:id',
name: 'CircuitosFinalizar',
component: CircuitosFinalizar,
meta: { requiresAuth: true  ,adminAuth:true , juezAuth : false}
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
          name: 'Dashboard2',
          component: Dashboard,
          meta: { requiresAuth: true ,adminAuth:false , juezAuth : true}
        },

        {
          path: 'heat',
          name: 'HeatJ',
          component: HeatJuez,
          meta: { requiresAuth: true  ,adminAuth:false , juezAuth : true}
        },
        {
          path: 'calificar/:id',
          name: 'CalificarHeatJ',
          component: CalificarInit,
          meta: { requiresAuth: true  ,adminAuth:false , juezAuth : true}
        },
        
        {
          path: 'userjuez',
          name: 'UpdateUserJuez',
          component:  UpdateUserJuez,
          meta: { requiresAuth: true  ,adminAuth:false , juezAuth : true}
        }

      
     
      
      ]
      
      }   
  ],
})



router.beforeEach((to, from, next) => {
  //console.log(JSON.stringify(to));
  if(to.meta.requiresAuth) {
    console.log("requiere audit");
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