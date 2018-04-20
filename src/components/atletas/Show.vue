<template>
    <div class="content">
        <div class="row">
            <div class="col-xs-12 text-left">
                                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

                               
            </div>
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-primary">
                    <div class="box-body box-profile">
                        <img class="profile-user-img img-responsive img-circle" :src="avatar" alt="User profile picture">

                        <h3 class="profile-username text-center">{{ atleta.personaId.nombre + " " + atleta.personaId.apellido}}</h3>
                        <p class="text-muted text-center">Ranking 10 <i class="fa fa-star-o"></i></p>
                        <div class="col-sm-8 col-sm-offset-2">
                            <ul class="list-group list-group-unbordered">
                                <li class="list-group-item">
                                    <b>Edad</b> <a class="pull-right">{{ _calculateAge( atleta.personaId.fechaNacimiento)?_calculateAge( atleta.personaId.fechaNacimiento)+' años':'No definida' }} </a>
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
                                    <b>Ola Preferida</b> <a class="pull-right">{{ atleta.olaPreferida }}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Lado Pie</b> <a class="pull-right">{{ atleta.ladoPie }}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Idiomas</b></b> <a class="pull-right">{{ atleta.idiomas }}</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <!-- /.box-body -->
                </div>
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Acerca de mi </h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <strong><i class="fa fa-book margin-r-5"></i> Logros</strong>

                        <p class="text-muted">
                            {{ atleta.logros}}
                        </p>
                        <hr>
                        <strong><i class="fa fa-map-marker margin-r-5"></i> Playa Favorita</strong>
                        <p class="text-muted">{{ atleta.playaPractica }}</p>
                        <hr>

                        <strong><i class="fa fa-pencil margin-r-5"></i> Rutina</strong>
                        <p class="text-muted">{{ atleta.rutinaConstancia }}</p>
                        <hr>

                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Nivel Academico</strong>

                        <p>{{ atleta.nivelAcademico }}</p>
                         <hr>

                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Otros Estudios</strong>

                        <p>{{ atleta.otrosEstudios }}</p>
                    </div>
                    <!-- /.box-body -->
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import atletasController from '../../controllers/atletas.js'
import moment from "moment"
export default {
    name: "ShowAtleta",
    data: () => ({
        atleta: {personaId:{}},
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
            let img =this.atleta.id+"/"+ this.atleta.rutaFoto;
            
            let imgAsset = null
           if(process.env.NODE_ENV == "development"){
                try{
                    imgAsset = require('@/assets/images/fotos/'+ this.atleta.id+"/avatar.png")
                }
                catch(er){
                   // console.log("eurecaaaaaakjlaasjisjhdhgds")
                    imgAsset = require('@/assets/images/default_avatar.png')
                }
            }
            else{
               imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/'+ img

            }

           //imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/'+ img
            this.avatar =  imgAsset
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
      volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
    }
}

</script>
