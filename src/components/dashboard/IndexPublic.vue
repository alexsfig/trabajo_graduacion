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
             <router-link to="/public/atletas"> <div class="col-lg-2 col-xs-6">
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

                    <h3 class="box-title "><b>Ranking</b></h3>
                  </div>
                  <div class="box-body text-justify">
    
            <v-select  :debounce="250" :options="categorias" v-model="catSelect" placeholder="Seleccione una categoria" label="nombreCategoria">
                                            </v-select>

<br/>
<div class="table-responsive">
 <table class="table table-bordered">
    <thead>
      <tr>
           <th>Pos</th>
        <th></th>
         <th>Puntos</th>
        <th>Heat ganados</th>
        <th>Promedio</th>
               <th>Mejor nota</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in ranking">
        <td><label>{{r.lugar}}</label></td>
        <td><img class="custom-img img-responsive img-circle" v-bind:src="getImgA(r.atletaId.id)" alt="User profile picture">
        <h3>{{r.atletaId.personaId.nombre+","+r.atletaId.personaId.apellido}}</h3>
        
        </td>
            <td>{{r.puntuacion}}</td>
        <td>{{r.heatGanados}}</td>
        <td>{{r.promedio}}</td>
            <td>{{r.mayorNota}}</td>
      </tr>
   
   
    </tbody>
  </table>
          </div>          </div>
                </div>
              </div>
               
            </div>

             <div class="col-md-12">
                <div class="box box-success">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-users"></i>

                    <h3 class="box-title "><b>Automatización de Procesos</b></h3>
                  </div>
                  <div class="box-body text-justify">
    
           <Timeline :id="'fesurfing_'" :sourceType="'likes'" style="height:200" :options="{ tweetLimit: '8' }"/>


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
import rankingController from "../../controllers/ranking.js";
import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
import vSelect from "vue-select";
import categorias from '../../controllers/categorias.js';
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
      noticias: [],
      catSelect:'',
      ranking:[]
    };
  },
  components: {},
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
    categorias:"setDefault",
    catSelect:"changeCat"
  },
      components: {
         'Tweet': Tweet,
        'Timeline': Timeline,
        vSelect
  
    },
  methods: {
    changeCat(){
if(this.catSelect)
rankingController.byCategoriaTop(this,this.catSelect.id)

    },
    setDefault(){

      if(this.categorias.length>0){
        
this.catSelect=this.categorias[0];

      }



    },
      getImg(img) {
            
            return BASE_URL+"upload/files/noticia/"+img+".png"
        },
           getImgA(img) {
            
            return BASE_URL+"upload/files/"+img+".png"
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

.active {
  width: 100%;
}
.custom-img{
    width: 75px;
    margin:auto;
}
</style>

