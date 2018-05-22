<style lang="css">

.breadcrumb > li {
    width: auto !important
}

.help-block {
    color: #dd4b39 !important;
}

.has-error {
    color: #dd4b39 !important
}

.btn.has-error {
    border-color: #dd4b39 !important
}

.table > tbody > tr > td {
    vertical-align: middle;
}

.margin {
    margin: 5px;
}

.padd {
    padding-top: 20px;
    padding-bottom: 20px;
}

#calendario {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

a.fc-day-grid-event {
    background-color: #3e9dbd !important;
    border-color: #31b6e4 !important;
    height: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
}

.container.my-auto {
    background: rgba(0, 0, 0, 0.5);
}

.container.my-auto h1 {
    color: #ff5531;
}

</style>

<template>

<div id="" class="row">
    <div class="container-fluid">
        <header class="masthead text-center text-white d-flex">
            <div class="container my-auto">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-1">
                        <h1 class="text-uppercase">
                            <strong>Swell</strong>
                        </h1>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <h1 class="text-uppercase">
                            <strong>Federacion Salvadoreña de SURF</strong>
                        </h1>
                        <p class="text-faded mb-5">
                            <img class="img-responsive" align="right" src="../../assets/images/logo-dash.png" alt="">
                            <img class="img-responsive" align="left" src="../../assets/images/logo.png" alt="">
                        </p>
                    </div>
                </div>
            </div>
        </header>
        <section class="bg-primary" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="service-box mt-5 mx-auto">
                            <i class="fa fa-4x fa-star-o text-primary mb-3 sr-icons"></i>
                            <hr>

                            <h3 class="mb-3">Ranking de atletas</h3>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <h2 class="section-heading">At Your Service</h2>
                            <hr class="my-4">
                        </div>
                    </div>
                </div> -->
            <!-- <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <i class="fa fa-4x fa-star-o text-primary mb-3 sr-icons"></i>
                                <h3 class="mb-3">Ranking de atletas</h3>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <i class="fa fa-4x fa-paper-plane text-primary mb-3 sr-icons"></i>
                                <h3 class="mb-3">Fechas</h3>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <i class="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons"></i>
                                <h3 class="mb-3">Noticias</h3>

                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <i class="fa fa-4x fa-heart text-primary mb-3 sr-icons"></i>
                                <h3 class="mb-3">Informacion dela Federacion</h3>
                            </div>
                        </div>
                    </div>
                </div> -->
        </section>
        <section class="bg-white" id="ranking">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="box-header with-border">
                            <h2 class="box-title ">
                                    <i style="color:#031328" class="fa fa-trophy fa-2x"></i>
                                     <b>Top 5 </b>
                                 </h2>
                        </div>
                    </div>
                    <div class="col-lg-12 text-center">
                        <div class="box-body text-justify">
                            <v-select :debounce="250" :options="categorias" v-model="catSelect" placeholder="Seleccione una categoria" label="nombreCategoria">
                            </v-select>
                            <br/>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Pos</th>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th>Puntos</th>
                                            <th>Heat ganados</th>
                                            <th>Promedio</th>
                                            <th>Mejor nota</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="r in ranking">
                                            <td>
                                                <label>{{r.lugar}}</label>
                                            </td>
                                            <td> <router-link :to="{ name: 'AtletasShowPublic', params: { id: r.atletaId.id }}" class="pull-right" v-tooltip="'You have new messages.'">
                                                <img class="custom-img img-responsive img-circle" v-bind:src="getImgA(r.atletaId.id)" alt="User profile picture">
                                                </router-link>
                                            </td>
                                            <td>
                                                {{r.atletaId.personaId.nombre+" "+r.atletaId.personaId.apellido}}
                                                <router-link :to="{ name: 'AtletasShowPublic', params: { id: r.atletaId.id }}" class="pull-right" v-tooltip="'You have new messages.'">
                                                    <i class="fa fa-bookmark"></i>
                                                </router-link>
                                            </td>
                                            <td>{{r.puntuacion}}</td>
                                            <td>{{r.heatGanados}}</td>
                                            <td>{{r.promedio}}</td>
                                            <td>{{r.mayorNota}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 text-center">
                        <router-link :to="{ name: 'AtletasIndexPublic' }" class="pull-right btn btn-primary2" v-tooltip="'You have new messages.'">
                            Ver Ranking completo <i class="fa fa-trophy"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-primary" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="service-box mt-5 mx-auto">
                            <i class="fa fa-4x fa-paper-plane text-primary mb-3 sr-icons"></i>
                            <hr>
                            <h3 class="mb-3">Fechas</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white" id="ranking">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-1 text-center">
                        <full-calendar :config="config" :events="events" eventClick="eventClick" />

                    </div>
                </div>
            </div>
        </section>
        <section class="bg-primary" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="service-box mt-5 mx-auto">
                            <i class="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons"></i>
                            <hr>
                            <h3 class="mb-3">Noticias</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white" id="ranking">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-1 text-center col-container">
                        <div v-for="noticia in noticias" class="col-md-4">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="notice-img">
                                        <img :src="getImg(noticia.id)" alt="User Image" class="img-rounded img-responsive" />
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <span class="username">
                                        <b> {{noticia.nombre}} </b>
                                        <br/>
                                        </span> {{noticia.descripcion.length>200?noticia.descripcion.substring(0,200)+".....":noticia.descripcion}}
                                    <br>
                                    <router-link :to="{ name: 'NoticiasShow', params: { id: noticia.id }}">
                                        Ver mas
                                    </router-link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-primary" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="service-box mt-5 mx-auto">
                            <i class="fa fa-4x fa-twitter-square  text-primary mb-3 sr-icons"></i>
                            <hr>
                            <h3 class="mb-3">Redes Sociales</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white" id="ranking">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-lg-offset-1 text-center col-container">
                        <Timeline :id="'fesasurf'" :sourceType="'profile'" :widget-class="'col-md-12'" :options="{ tweetLimit: '4' }" />
                    </div>
                </div>
                 </div>
            </section>

     
  
   </div>
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
import {
    Tweet, Moment, Timeline
}
from 'vue-tweet-embed'
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
            catSelect: '',
            ranking: [],
            events: [],
            config: {
                locale: 'es',
                defaultView: "month",
                weekends: false,
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
        categorias: "setDefault",
        catSelect: "changeCat",
        fechas: "mounted"
    },
    components: {
        'Tweet': Tweet,
        'Timeline': Timeline,
        vSelect,
        FullCalendar

    },
    methods: {
        changeCat() {
                if (this.catSelect)
                    rankingController.byCategoriaTop(this, this.catSelect.id)

            },
            setDefault() {

                if (this.categorias.length > 0) {

                    this.catSelect = this.categorias[0];

                }
            },
            getImg(img) {

                return BASE_URL + "upload/files/noticia/" + img + ".png"
            },
            getImgA(img) {

                return BASE_URL + "upload/files/" + img + ".png"
            },
            fetchData() {
                // clubesController.index(this);
                // escuelasController.index(this);
                // JuecesController.index(this);
                // atletaController.index(this);
                // entrenadoresController.index(this);
                categoriasController.index(this);
                fechasController.index(this);
                // patrocinadoresController.index(this);
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
