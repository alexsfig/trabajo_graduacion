<template>
    <div>
        <section class="content" >
            <div class="row padd">
                <div class="col-md-4">
                    <img class="img-responsive" align="right" src="../../assets/images/logo-dash.png" alt="">
                  </div>
                  <div class="col-md-4">
                    <h1 class="text-center">
                        <i><b>Bienvenidos a SWELL</b></i>
                    </h1>
                  </div>
                  <div class="col-md-4">
                    <img class="img-responsive"  align="left" src="../../assets/images/logo.png" alt="">
                  </div>
            </div>
            <div class="row padd">
              <img class="img-responsive" src="../../assets/images/background/Foto2.png" alt="">
            </div>
            <div class="row padd">
             <router-link to="/admin/atletas"> <div class="col-lg-2 col-xs-6">
                <div class="small-box bg-blue">
                  <div class="inner">
                    <h3>{{ this.atletas.length}}</h3>
                    <p>Atletas registrados</p> 
                  </div>  
                  <div class="icon">
                    <i class="fa fa-users"></i>
                  </div> 
                  &nbsp;
                </div> 
              </div> </router-link>
               <router-link to="/admin/jueces"> <div class="col-lg-2 col-xs-6">
                <div class="small-box bg-green">
                  <div class="inner">
                    <h3>{{ this.jueces.length}}</h3>
                    <p>Jueces registrados</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-gavel"></i>
                  </div>
                  &nbsp;
                </div>
              </div>  </router-link>
              <router-link to="/admin/entrenadores"><div class="col-lg-2 col-xs-6">
                <div class="small-box bg-yellow">
                  <div class="inner">
                    <h3>{{ this.entrenadores.length}}</h3>
                    <p>Entrenadores registrados</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-binoculars"></i>
                  </div>
                  &nbsp;
                </div>
              </div> </router-link>
               <router-link to="/admin/escuelas"><div class="col-lg-2 col-xs-6">
                <div class="small-box bg-red">
                  <div class="inner">
                    <h3>{{ this.clubs.length + this.escuelas.length}}</h3>
                    <p>Escuelas/Club registrados</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-university"></i>
                  </div>
                  &nbsp;
                </div>
              </div></router-link>
              <router-link to="/admin/categorias"><div class="col-lg-2 col-xs-6">
                <div class="small-box bg-aqua">
                  <div class="inner">
                    <h3>{{ this.categorias.length }}</h3>
                    <p>Categorias registradas</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-circle-o"></i>
                  </div>
                  &nbsp;
                </div>
              </div></router-link>
               <router-link to="/admin/fechas"><div class="col-lg-2 col-xs-6">
                <div class="small-box bg-orange">
                  <div class="inner">
                    <h3>{{ this.fechas.length }}</h3>
                    <p>Fechas registradas</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-flag-checkered"></i>
                  </div>
                  &nbsp;
                </div>
              </div></router-link>

            </div> 

            <div class="row padd">
              <div class="col-md-6">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <i style="color:#031328"class="fa fa-users"></i>

                    <h3 class="box-title "><b>Interactuando con el Sistema</b></h3>
                  </div>
                  <div class="box-body text-justify">
                  
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box box-success">
                  <div class="box-header with-border">
                    <i style="color:#031328"class="fa fa-users"></i>

                    <h3 class="box-title "><b>Automatizacion de Procesos</b></h3>
                  </div>
                  <div class="box-body text-justify">
                   
                  </div>
                </div>
              </div>
            </div>
            <div class="row padd">
              <img class="img-responsive" src="../../assets/images/background/Foto3.png" alt="">
            </div>
        </section>
    </div>
  </template>
  <script>
    import clubesController from '../../controllers/clubes.js'
    import escuelasController from '../../controllers/escuelas.js'
    import atletaController from '../../controllers/atletas.js'
    import JuecesController from '../../controllers/jueces.js'
    import entrenadoresController from '../../controllers/entrenadores.js'
    import categoriasController from '../../controllers/categorias.js'
    import fechasController from '../../controllers/fechas.js';
    export default {
        name: 'clubes',
        data() {
            return {
              clubs: [],
              escuelas: [],
              atletas: [],
              jueces: [],
              entrenadores: [],
               categorias: [],
               fechas: [],

            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                clubesController.index(this)
                escuelasController.index(this)
                JuecesController.index(this)
                atletaController.index(this)
                entrenadoresController.index(this)
                categoriasController.index(this)
                fechasController.index(this)
            }
        }

    }

  </script>
  <style  lang="css">
    .padd {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  </style>
