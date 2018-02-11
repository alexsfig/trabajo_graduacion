<style scoped>

.active {
    width: 100%;
}

</style>

<template>

<div>
    <section class="content-header">
        <h1>
                Atletas
            </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li>Manejo de Atletas</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Manejo de Atletas</h3>
                    </div>

                    <div class="box-body">

                        <!--   <div class="box-action">
                                <router-link to="/admin/juntamiembros/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo Miembro
                                </router-link>
                            </div> -->
                        <div class="table-responsive">

                            <vue-good-table :columns="columns" :rows="atletas" :globalSearch="true" :paginate="true" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                    <td style="width: 100px"><img class="custom-img img-responsive img-circle" v-bind:src="getImg(props.row.rutaFoto)" alt="User profile picture"></td>
                                    <td>{{props.row.personaId.nombre}}</td>
                                    <td>{{props.row.personaId.apellido}}</td>
                                    <td>{{ props.row.aniosPracticando}}</td>
                                    <td>{{ props.row.playaPractica}}</td>
                                    <td>{{ props.row.ladoPie}}</td>
                                    <td>{{ props.row.olaPreferida}}</td>
                                    <!-- <td>{{ props.row.logros}}</td>
                                    <td>{{ props.row.rutinaConstancia}}</td> -->
                                    <td>{{ (props.row.personaId.sexo == 'F' || props.row.personaId.sexo == 'f') ? 'Femenino' : 'Masculino' }}</td>
                                    <td>{{ props.row.edadInicio}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="retrieveData(props.row.id, props.row)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="profile(props.row.id, props.row)"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Ver Perfil</button>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, atleta, props.row.personaId.nombre)"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                </template>
                            </vue-good-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--     <modalentrenadores :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Actualizar'" :openModal="openModal" :entrenador="entrenador" v-on:openChange="isChange"></modalentrenadores> -->



    </section>
</div>

</template>

<script>

import atletasController from '../../controllers/atletas.js'
import ModalEntrenadores from './subcomponents/ModalEntrenadores'


export default {
    name: 'atletas',
    data() {
        return {
            columns: [
                {
                    label: '',
                    field: 'avatar',
                    filterable: true,
                },
                {
                    label: 'Nombre',
                    field: 'personaId.nombre',
                    filterable: true,
                }, {
                    label: 'Apellido',
                    field: 'personaId.apellido',
                    filterable: true,
                },

                {
                    label: 'Años Practicando',
                    field: 'aniosPracticando',
                    filterable: true,
                }, {
                    label: 'Playa Practica',
                    field: 'playaPractica',
                    filterable: true,
                }, {
                    label: 'Lado de Pie',
                    field: 'ladoPie',
                    filterable: true,
                }, {
                    label: 'Ola Preferida',
                    field: 'olaPreferida',
                    filterable: true,
                },
                // {
                //     label: 'Logros',
                //     field: 'logros',
                //     filterable: true,
                // }, {
                //     label: 'Rutina Constancia',
                //     field: 'rutinaConstancia',
                //     filterable: true,
                // },
                {
                    label: 'Sexo',
                    field: 'personaId.sexo',
                    filterable: true,
                }, {
                    label: 'Edad Inicio',
                    field: 'edadInicio',
                    filterable: true,
                },

                {
                    label: 'Accion',
                    field: '',
                    filterable: true,
                }
            ],
            methodSubmit: 'update',
            buttonMsg: "Actualizar",

            openModal: false,

            errMsg: '',
            success: false,
            isLogin: false,
            // We need to initialize the component with any
            // properties that will be used in it
            atletas: [],
            atleta: {}



        }
    },
    components: {
        "modalentrenadores": ModalEntrenadores

    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        getImg(img) {
            var imgAsset = "", imgResource = img
            //imgAsset = "http://104.131.164.244/insense-web/src/assets/images/"+ img
            if(process.env.NODE_ENV == "development"){
                try{
                    imgAsset = require('@/assets/images/'+ img)
                }
                catch(er){
                    imgAsset = require('@/assets/images/default_avatar.png')
                }
            }
            else{
                imgAsset = '/static/img/src/assets/images/'+ img

            }
            return imgAsset
        },
        clickHandler(id, atleta, nombre) {
            let swal = this.$swal
            let context = this
            swal({
                title: 'Estas Seguro?',
                html: 'No podras recuperar la informacion del atleta <b>' + nombre + '</b>',
                type: 'error',
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Mantener'
            }).then(
                function() {
                    atletasController.delete(context, id, swal)
                },
                function(dismiss) {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        swal(
                            'Cancelado',
                            'El Atleta no se elimino',
                            'error'
                        )
                    }
                }
            )
        },
        isChange() {
            this.openModal = false
            this.fetchData()
        },
        showCallback() {
            this.showAlert = false
            this.showSuccess = false
        },
        dismissCallback(msg) {
            this.openModal = false
            atletasController.index(this)
            this.fetchData()
        },
        fetchData() {
            atletasController.index(this)
        },
        retrieveData(id, atleta) {
            atletasController.retrieve(this, id)
            this.$router.push({
                name: 'AtletasEdit',
                params: {
                    id: id,
                    atleta: atleta
                }
            });
        },
        profile(id) {
            this.$router.push({
                name: 'AtletasShow',
                params: {
                    id: id
                }
            });

        },
    }

}

</script>
<style>
.active {
  width: 100%;
}
.custom-img{
    width: 75px;
    margin:auto;
}
</style>
