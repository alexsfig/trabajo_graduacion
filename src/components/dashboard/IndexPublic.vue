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
             <router-link to="/public/atletas"> <div class="col-lg-3 col-xs-6">
                <div class="small-box bg-blue">
                  <div class="inner">
                    <h3>{{ this.atletas.length}}</h3>
                     <p>Atletas Registrados</p> 
                  </div>  
                  <div class="icon">
                    <i class="fa fa-users"></i>
                  </div> 
                  &nbsp;
                </div> 
              </div> </router-link>
              <!-- <router-link to="/admin/patrocinadors"> --><div class="col-lg-3 col-xs-6">
                <div class="small-box bg-green">
                  <div class="inner">
                    <h3>{{ this.patrocinadors.length}}</h3>
                    <p>Patrocinadores Registrados</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-user-secret"></i>
                  </div>
                  &nbsp;
                </div>
              </div> <!-- </router-link> -->
              
               <!--<router-link to="/admin/escuelas"> --><div class="col-lg-3 col-xs-6">
                <div class="small-box bg-red">
                  <div class="inner">
                    <h3>{{ this.clubs.length + this.escuelas.length}}</h3>
                    <p>Escuelas/Clubes Registrados</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-university"></i>
                  </div>
                  &nbsp;
                </div>
              </div> <!--</router-link> -->
              
               <!--<router-link to="/admin/fechas">--><div class="col-lg-3 col-xs-6">
                <div class="small-box bg-yellow">
                  <div class="inner">
                    <h3>{{ this.fechas.length }}</h3>
                    <p>Fechas Registradas</p>
                  </div>
                  <div class="icon">
                    <i class="fa fa-flag"></i>
                  </div>
                  &nbsp;
                </div>
              </div><!--</router-link> -->

            </div> 

            <div class="row padd">
              <div class="col-md-6">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-newspaper-o"></i>

                    <h1 class="box-title "><b>Ultimas Noticias </b></h1>
                  </div>
                  <div class="box-body text-justify"  >
                    <div class="pre-scrollable" >
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

                 <div class="col-12">
                <div class="box box-success">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-twitter"></i>

                    <h3 class="box-title "><b>Redes Sociales</b></h3>
                  </div>
                  <div class="box-body text-justify">
    
           <Timeline :id="'fesasurf'" :sourceType="'profile'" style="height:200" :options="{ tweetLimit: '4' }"/>


                  </div>
                </div>
              </div>
              </div>
              <div class="col-md-6">
                <div class="box box-success">
                  <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-list-ol"></i>

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
         <router-link :to="{ name: 'AtletasShowPublic', params: { id: r.atletaId.id }}">
         <h3>{{r.atletaId.personaId.nombre+","+r.atletaId.personaId.apellido}}</h3>
         </router-link>

        
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
                 <div class="col-12">
                             <div class="box box-success">
                  <div class="box-header with-border">

                      <div class="box-header with-border">
                    <i style="color:#031328" class="fa fa-list-ol"></i>

                    <h3 class="box-title "><b>Calendario</b></h3>
                  </div>
                  <div class="box-body text-justify">
          <full-calendar :config="config" :events="events" eventClick="eventClick" />

              
                  </div>    </div></div></div>
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
import moment from "moment";
import {
    FullCalendar
}
from "vue-full-calendar";
import calendarController from "../../components/calendario/Index";
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
      ranking:[],
      events:[],
         config: {
           locale: 'es',
                defaultView: "month",
                eventRender: function(event, element) {
                    console.log(event);
                }
            }
    };
  },
  components: {},
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
    categorias:"setDefault",
    catSelect:"changeCat",
     fechas: "mounted"
  },
      components: {
         'Tweet': Tweet,
        'Timeline': Timeline,
        vSelect,
        FullCalendar
  
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
    
    },
          mounted() {
                console.log("entrell");

                this.fechas.forEach(element => {
                    console.log(element.fecha);

                    console.log(
                        "entre" + "*",
                        element.fecha.substring(0, 4),
                        element.fecha.substring(5, 7),
                        element.fecha.substring(8, 10)
                    );
                    this.events.push({
                        title: element.nombre,
                        start: moment(
                            new Date(
                                element.fecha.substring(0, 4),
                                element.fecha.substring(5, 7),
                                element.fecha.substring(8, 10)
                            )
                        ),
                        end: moment(
                            new Date(
                                element.fecha.substring(0, 4),
                                element.fecha.substring(5, 7),
                                element.fecha.substring(8, 10)
                              
                            )
                        ).add(1, "d"),
                        // description: 'Competencia ',
                        color: "red",
                    //    url: "/admin/circuitofecha/" + element.id


                        // date:new Date(element.fecha.substring(0,4),element.fecha.substring(5,7),element.fecha.substring(8,10))});
                    });
                });
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
.custom-img {
  width: 75px;
  margin: auto;
}

#calendario {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
a.fc-day-grid-event{
    background-color: #3e9dbd !important;
    border-color: #31b6e4 !important;
    height: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
}
</style>



