<style scoped>

.active {
    width: 100%;
}

</style>

<template>

<div>
    <section class="content-header">
        <h1>
                Patrocinio de Atletas
            </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li>Patrocinio de Atletas</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Patrocinadores de Atletas</h3>
                    </div>

                    <div class="box-body">

                        <div class="box-action">
                                <router-link to="/admin/patrocinadoratleta/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo Patrocinio
                                </router-link>
                            </div>

                            </div>

                    <div class="box-body">

                        <div class="table-responsive">

                            <vue-good-table :columns="columns" :rows="patrocinadoresAtletas" :globalSearch="true" :paginate="true" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                   
                                    
                                    <td>{{props.row.atletaId.personaId.nombre}} ,{{props.row.atletaId.personaId.apellido}}</td>
                                    <td>{{ props.row.patrocinadorId.nombre}}</td>
                                    <td>{{props.row.tiempoPatrocinio}} años </td>
                                     <td>
                                                                               
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="profile(props.row.atletaId.id, props.row)"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Perfil  de Atleta Patrocinado</button>            
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar Patrocinio</button>

                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, patrocinadorAtleta, props.row.atletaId.personaId.nombre)"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                
                                </template>
                            </vue-good-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
           <modalentrenadores :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Actualizar'" :openModal="openModal" :patrocinadorAtleta="patrocinadorAtleta" v-on:openChange="isChange"></modalentrenadores> 



    </section>
</div>

</template>

<script>

import patrocinadorAtletaController from '../../controllers/patrocinador_atleta.js'
import ModalEntrenadores from './subcomponents/ModalEntrenadores'


export default {
    name: 'patrocinadoresAtletas',
    data() {
        return {
        columns: [
                
                {
                    label: 'Atleta Patrocinado',
                    field: 'atletaId.personaId.nombre',
                    filterable: true,
                },

                {
                    label: 'Patrocinador',
                    field: 'patrocinadorId.nombre',
                    filterable: true,
                }, 
                {
                    label: 'Tiempo de Patrocinio',
                    field: 'tiempoPatrocinio',
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
            patrocinadoresAtletas: [],
            patrocinadorAtleta: {}



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
                imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/'+ img

            }
            return imgAsset
        },
        clickHandler(id, patrocinadorAtleta, nombre) {
            let swal = this.$swal
            let context = this
            swal({
                title: 'Estas Seguro?',
                html: 'No podras recuperar la informacion del Patrocinio <b>' + nombre + '</b>',
                type: 'error',
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Mantener'
            }).then(
                function() {
                    patrocinadorAtletaController.delete(context, id, swal)
                },
                function(dismiss) {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        swal(
                            'Cancelado',
                            'El Patrocinio no se elimino',
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
            patrocinadorAtletaController.index(this)
            this.fetchData()
        },
        fetchData() {
            patrocinadorAtletaController.index(this)
        },
        retrieveData(id, patrocinadorAtleta) {
            patrocinadorAtletaController.retrieve(this, id)
            //this.$router.push({
            //    name: 'AtletasEdit',
            //    params: {
            //        id: id,
            //        patrocinador_atleta: patrocinador_atleta
            //    }
            //});
        },
        profile(id) {
            this.$router.push({
                name: 'AtletasShow',
                params: {
                    id: id
                }
            });

        }

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
