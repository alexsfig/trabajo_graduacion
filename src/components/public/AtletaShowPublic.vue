<template>
    <div>
        <section class="bg-primary pt" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 text-left">
                        <div @click="volver()" class="btn btn-flat btn-sm btn-primary margin">
                            <i class="fa fa-arrow-circle-left"></i> Regresar
                        </div>
                    </div>
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <div class="service-box mt-5 mx-auto">
                            <i class="fa fa-4x fa-star-o text-primary mb-3 sr-icons"></i>
                            <hr >
                            <h3 class="mb-3">Perfil {{ (atleta.personaId ? atleta.personaId.nombre : '' )+ ' ' + (atleta.personaId ? atleta.personaId.apellido:'') }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white pt" id="ranking">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <img class="profile-img img-responsive img-circle" :src="avatar" alt="User profile picture">
                        <br>
                        <hr class="hr-text" data-content="ranking">
                        <div v-if=" atleta.ranking">
                            <div class="logros" v-for="value in atleta.ranking">
                                <p class="text-center"> {{value.categoriaName}}, Lugar {{value.lugar}} <b>Puntos {{value.puntos}} <i class="fa fa-star"></i></b></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <hr class="hr-text" :data-content="(atleta.personaId ? atleta.personaId.nombre : '' )+ ' ' + (atleta.personaId ? atleta.personaId.apellido:'') ">
                        <!-- <h2 class="profile-username text-center">{{atleta.personaId?atleta.personaId.nombre:'' + " " }} {{  atleta.personaId?atleta.personaId.apellido:''}}</h2> -->
                        <!-- <hr class=""> -->
                        <ul class="list-group list-group-unbordered">
                            <li class="list-group-item">
                                <b>Edad</b> <a class="pull-right">{{ _calculateAge( atleta.personaId?atleta.personaId.fechaNacimiento:'')?_calculateAge( atleta.personaId.fechaNacimiento)+' años':'No definida' }} </a>
                            </li>
                            <li class="list-group-item">
                                <b>Años practicando</b> <a class="pull-right">{{ atleta.aniosPracticando?parseInt(atleta.aniosPracticando)+' años':'Sin Experiencia' }} </a>
                            </li>
                            <li class="list-group-item">
                                <b>Edad que inicio</b> <a class="pull-right">{{ atleta.edadInicio }} años</a>
                            </li>
                            <li class="list-group-item">
                                <b>Fechas que ha Competido</b> <a class="pull-right">{{ atleta.cuantasFechas }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>Ultima Participacion</b> <a class="pull-right">{{ atleta.ultimaParticipacion?atleta.ultimaParticipacion:'Sin Participacion' }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>Escuela Inscrita</b> <a class="pull-right">{{ atleta.escuelaId?atleta.escuelaId.nombre:'Sin Inscripción' }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>Club Inscrito</b> <a class="pull-right">{{ atleta.clubId?atleta.clubId.nombre:'Sin Inscripción' }}</a>
                            </li>
                        </ul>
                    </div>


                </div>
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-md-8 col-md-offset-4 about-atl">
                        <h3 class="box-title">Acerca de {{ (atleta.personaId ? atleta.personaId.nombre : '' )+ ' ' + (atleta.personaId ? atleta.personaId.apellido:'')}}  </h3>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <strong><i class="fa fa-book margin-r-5"></i> Logros</strong>
                                        <p class="text-muted">
                                            {{ atleta.logros}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <strong><i class="fa fa-map-marker margin-r-5"></i> Playa Favorita</strong>
                                        <p class="text-muted">{{ atleta.playaPractica }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <strong><i class="fa fa-tasks margin-r-5"></i> Rutina</strong>
                                        <p class="text-muted">{{ atleta.rutinaConstancia }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <strong><i class="fa fa-star-o margin-r-5"></i> Ola Favorita</strong>
                                        <p class="text-muted">{{ atleta.olaPreferida }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <strong><i class="fa fa-arrows-h margin-r-5"></i> Lado pie favorito</strong>
                                        <p class="text-muted">{{ atleta.ladoPie }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-default">
                                    <div class="panel-body ">
                                        <strong><i class="fa fa-language margin-r-5"></i> Idiomas</strong>
                                        <p class="text-muted text-uppercase">
                                            {{ atleta.idiomas}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-secondary">

        </section>
    </div>
</template>

<script>

import atletasController from '../../controllers/atletas.js'
import moment from "moment"

const BASE_URL = process.env.BASE_URL;
//const BASE_URL = "http://192.168.1.96:8080/";
export default {
    name: "ShowAtleta",
    data: () => ({
        atleta: {
            personaId: {}
        },
        atleta: {},
        avatar: null,

    }),
    created() {
        this.fetchData()
        console.log(moment)
    },
    watch: {
        '$route': 'fetchData',
        atleta: function(val, oldVal) {
            //this.atleta = this.$route.params.atleta
            //this.atleta = this.atleta
            let img = this.atleta.id + "/" + this.atleta.rutaFoto;

            let imgAsset = null
            if (process.env.NODE_ENV == "development") {
                try {
                    imgAsset = require('@/assets/images/fotos/' + this.atleta.id + "/avatar.png")
                } catch (er) {
                    // console.log("eurecaaaaaakjlaasjisjhdhgds")
                    imgAsset = require('@/assets/images/default_avatar.png')
                }
            } else {
                imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/' + img

            }

            //imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/'+ img
            this.avatar = BASE_URL + "upload/files/" + this.atleta.id + ".png"
        }
    },
    methods: {
        _calculateAge(birthday) {
                var today = new Date();
                var birthDate = new Date(birthday);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            },
            fetchData() {
                atletasController.retrieve(this, this.$route.params.id)
            },
            volver() {
                console.log("entre")
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')


            }
    }
}

</script>
