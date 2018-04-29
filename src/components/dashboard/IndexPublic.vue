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
                    <h3>{{ this.patrocinadors.length}}</h3>
                    <p>Patrocinadores </p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-user-secret"></i>
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
                    <i class="fa fa-bookmark"></i>
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
                    <i class="fa fa-flag"></i>
                  </div>
                  &nbsp;
                </div>
              </div></router-link>

            </div> 

            <div class="row padd">
              <div class="col-md-6">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-users"></i>

                    <h1 class="box-title "><b>Noticias </b></h1>
                  </div>
                  <div class="box-body text-justify">
                <div v-for="noticia in noticias">
               <router-link :to="{ name: 'NoticiasShow', params: { id: noticia.id }}">
               <div class="box-comment"><img :src="getImg(noticia.id)" alt="User Image" class="img-rounded img-md" style="margin-right:5%" />
                <div class="comment-text"><span class="username">
         <b> {{noticia.nombre}} </b> <br/>
          </span>
  {{noticia.descripcion.length>200?noticia.descripcion.substring(0,200)+".....":noticia.descripcion}}
  </div></div></router-link>
  <hr/>
                </div>
            

                

                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box box-success">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-users"></i>

                    <h3 class="box-title "><b>Automatización de Procesos</b></h3>
                  </div>
                  <div class="box-body text-justify">
                <div class="col-md-12">
                      El sistema permitirá la creación de <b>TORNEOS (FECHAS)</b>, asignado a la playa donde se realizará el evento.
                      <br><br>
                      Se podrá definir las <b>CATEGORÍAS</b> participantes, así como los atletas por cada categoría.
                      <br><br>
                      El sistema será el responsable de la asignación de atletas para cada uno de los heats que se realicen, así como la sumatoria de puntos al final de cada heat.
                      <br><br>
                      Al final de cada <b>TORNEOS (FECHAS)</b> que se realice el sistema generará la tabla de puntuaciones finales de cada una de las <b>CATEGORÍAS</b>
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
import clubesController from "../../controllers/clubes.js";
import escuelasController from "../../controllers/escuelas.js";
import atletaController from "../../controllers/atletas.js";
import JuecesController from "../../controllers/jueces.js";
import entrenadoresController from "../../controllers/entrenadores.js";
import categoriasController from "../../controllers/categorias.js";
import fechasController from "../../controllers/fechas.js";
import patrocinadoresController from "../../controllers/patrocinadores.js";
import noticiasController from "../../controllers/noticias.js";
const BASE_URL = process.env.BASE_URL;
export default {
  name: "clubes",
  data() {
    return {
      clubs: [],
      escuelas: [],
      atletas: [],
      jueces: [],
      entrenadores: [],
      categorias: [],
      fechas: [],
      patrocinadors: [],
      noticias: []
    };
  },
  components: {},
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
      getImg(img) {
            
            return BASE_URL+"upload/files/noticia/"+img+".png"
        },
    fetchData() {
      clubesController.index(this);
      escuelasController.index(this);
      JuecesController.index(this);
      atletaController.index(this);
      entrenadoresController.index(this);
      categoriasController.index(this);
      fechasController.index(this);
      patrocinadoresController.index(this);
      noticiasController.indexActuales(this);
    }
  }
};
</script>
  <style  lang="css">
.padd {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
