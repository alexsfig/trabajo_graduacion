<template>
    <div>
        <section class="content" >
            <div class="row padd">
                <div class="col-md-4">
                    <img class="img-responsive" align="right" src="../../assets/images/logo-dash.png" alt="">
                  </div>
                  <div class="col-md-4">
                    <h1 class="text-center">
                        Bienvenidos a SWELL
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
              <div class="col-lg-3 col-xs-6">
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
              </div>
              <div class="col-lg-3 col-xs-6">
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
              </div>
              <div class="col-lg-3 col-xs-6">
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
              </div>
              <div class="col-lg-3 col-xs-6">
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
              </div>

            </div>

            <div class="row padd">
              <div class="col-md-6">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <i style="color:#031328"class="fa fa-users"></i>

                    <h3 class="box-title "><b>Interactuando con el Sistema</b></h3>
                  </div>
                  <div class="box-body text-justify">
                    <div class="col-md-12">
                      Usando el menu lateral, podra acceder a todas las opciones que posee el sistema.
                      <br><br>
                      Usted podra agregar <b> ATLETAS, JUECES, MIEMBROS DE JUNTA O ENTRENADORES</b> de forma facil y rapida.
                      <br><br>
                      Tambien podra llevar un registro de las <b>PLAYAS</b> donde se practica el surf y donde se realizan las competencias.
                      <br><br>
                      Mediante el sistema se podran crear <b>NOTICIAS</b> las cuales podran ser accesadas desde el sitio web o de desde la aplicacion movil.
                      <br><br>
                      El sistema permitira la creacion de <b>USUARIOS</b>, los cuales podran acceder al sistema, y poder realizar modifcaciones segun los permisos que se le halla concedido
                    </div>

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
                    <div class="col-md-12">
                      El sistema permitira la creacion de <b>TORNEOS (FECHAS)</b>, asignado la playa donde se realizara el evento
                      <br><br>
                      Se podra definir las <b>CATEGORIAS</b> participantes, asi como los atletas por cada cetegoria
                      <br><br>
                      El sistema sera el responsable de la asignacion de atletas para cada uno de los heats que se realicen, asi como la sumarizacion de puntos al final de cada heat.
                      <br><br>
                      Al final de cada <b>TORNEOS (FECHAS)</b> que se realice el sistema generara la tabla de puntuaciones finales de cada una de las <b>CATEGORIAS</b>
                    </div>

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
    export default {
        name: 'clubes',
        data() {
            return {
              clubs: [],
              escuelas: [],
              atletas: [],
              jueces: [],
              entrenadores: [],

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
