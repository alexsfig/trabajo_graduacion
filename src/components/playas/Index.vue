<template>
<div>
    <section class="content-header">
        <h1>Playas</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
            <li>Manejo de Playas </li>
        </ol>
    </section>
    <section class="box-body">

        <div class="row">
            <div class="col-xs-12">
                <div class="wrapper-alert">
                    <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                        <h4><i class="icon fa fa-ban"></i> Error!</h4>
                        <p>{{ errMsg }}</p>
                    </alert>
                    <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                        <h4><i class="icon fa fa-check"></i> Exito!</h4>
                        <p>{{ successMsg }}</p>
                    </alert>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="box box-success ">
                    <div class="box-header with-border">
                        <h3 class="box-title">Buscar Playa</h3>
                    </div>
                    <div class="box-body">
                       ddd {{place}}
                        <div class="input-map">
                            <GmapAutocomplete @place_changed="setPlace" class="form-control " :options="{  componentRestrictions: {'country': ['SV']} }" :value="searchValue">
                            </GmapAutocomplete>
                        </div>
                        <div class="map">
                            <GmapMap style="width: 100%; height: 400px " :zoom="this.center.zoom" v-if="this.center" :center="{lat: this.center.lat, lng: this.center.lng}">
                                <GmapMarker v-if="this.place" label="★" :position="{
                              lat: this.place.geometry.location.lat(),
                              lng: this.place.geometry.location.lng(),
                              nombre: this.place.name,
                              direccion: this.place.formatted_address
                            }" />
                            </GmapMap>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box box-success">
                    <div class="box-header with-border">
                        <h3 class="box-title">Agregar Nueva Playa
                            {{searchValue}}
                        </h3>
                    </div>
                    <form @submit.prevent="submit()">
                        <div class="box-body">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('nombre') }">
                                <label for="nombre">Nombre</label>
                                <input type="text" id="nombre" name="nombre" data-vv-as="Nombre" class="form-control" v-model="this.center.nombre" v-validate="'required'" disabled/>
                                <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                        {{ errors.first('nombre') }}
                                    </span>
                            </div>
                            <div class="fgroup required" :class="{ 'has-error': errors.has('ubicacion') }">
                                <label for="ubicacion">Ubicación</label>
                                <input id="ubicacion" name="ubicacion" rows="5" data-vv-as="Ubicación" class="form-control" v-model="this.center.direccion" v-validate="'required'" disabled/>
                                <span class="help-block" for="ubicacion" v-bind:data-error="errors.first('ubicacion')">
                                        {{ errors.first('ubicacion') }}
                                    </span>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="button" class="pull-left btn btn-default btn-flat" @click="reset()">Limpiar</button>
                            <button type="submit" class="pull-right btn btn-success btn-flat">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Listado de Playas</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <vue-good-table :columns="columns" :rows="playas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                            <template slot="table-row" scope="props">
                                <td class="nowrap">{{ props.row.nombre }}</td>
                                <td>{{ props.row.ubicacion }}</td>
                                <td class="nowrap">
                                    <button type="button" class="margin btn btn-flat btn-sm btn-primary" @click="openModal=true, retrieveData(props.row.id)"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Actualizar</button>
                                    <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteLocation(props.row.id, props.row.nombre)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>
                                </td>
                            </template>
                        </vue-good-table>
                    </div>
                </div>
            </div>
        </div>
        <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Playa'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya>
    </section>
</div>

</template>

<script>

import playasController from '../../controllers/playas.js'
import modalPlaya from './subcomponents/modalPlaya'
import VueSweetAlert from 'vue-sweetalert'


export default {
    name: 'Playas',
    data() {
        return {
            markers: [],
            place: null,

            center: {
                lat: 13.491270679729123,
                lng: -89.38300688171387,
                zoom: 15,
                nombre: '',
                direccion: ''

            },

            errMsg: '',
            showAlert: false,
            successMsg: '',
            showSuccess: false,
            isLogin: false,
            modal_show: false,
            openModal: false,
            playasCreate: {
                id: 0,
                nombre: '',
                ubicacion: ''
            },
            searchValue: '',
            methodSubmit: 'update',
            buttonMsg: "Actualizar",
            users: [],
            openModal: false,
            locationUpdate: {},
            playas: [],
            playa: {},
            columns: [{
                label: "Nombre",
                field: "nombre",
            }, {
                label: "Ubicación",
                field: "ubicacion",
            }, {
                label: "Acción"
            }]
        }
    },


    components: {
        "modalPlaya": modalPlaya
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData',
        'locationUpdate': function(val) {
            this.modal_show = $.isEmptyObject(val) ? false : true;

        }

    },
    methods: {
        isChange() {
                this.modal_show = false
                this.fetchData()
            },
            showCallback() {
                this.showAlert = false
                this.showSuccess = false
            },
            dismissCallback(msg) {
                playasController.index(this)
            },
            fetchData() {
                playasController.index(this)
            },
            retrieveData(id) {
                playasController.retrieve(this, id)
            },
            //This method is used to create new playasController
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                        this.playasCreate.nombre = this.center.nombre ? this.center.nombre : '';
                        this.playasCreate.ubicacion = this.center.direccion ? this.center.direccion : '';
                           this.playasCreate.lat = this.center.lat ? this.center.lat : '';
                        this.playasCreate.lng = this.center.lng ? this.center.lng : '';
                        playasController.create(this, this.playasCreate);
                    } else {
                        this.showAlert = true
                        this.errMsg = "Todos los campos son requeridos"
                    }
                });
            },
            deleteLocation(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la playa <b>&laquo;' + nombre + '&raquo</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    playasController.delete(context, id, swal);
                }, function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                            'Cancelado',
                            'La playa no se elimino',
                            'error'
                        )
                    }
                })
            },
            reset() {
                this.searchValue = null;
                this.playasCreate = {},
                    this.center.lat = 13.491270679729123,
                    this.center.lng = -89.38300688171387,
                    this.center.zoom = 15,
                    this.center.nombre = '',
                    this.center.direccion = '',
                    this.errMsg = '',
                    this.showAlert = false,
                    this.successMsg = '',
                    this.showSuccess = false,
                    this.$validator.reset()

            },



            setPlace(place) {
                this.place = place
                this.center = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    zoom: 15,
                    nombre: place.name,
                    direccion: place.formatted_address
                }

            },
            usePlace(place) {
                if (this.place) {

                    this.center = {
                        lat: this.place.geometry.location.lat(),
                        lng: this.place.geometry.location.lng(),
                        nombre: place.name,
                        direccion: place.formatted_address
                    }


                }
            }
    }
}
</script>
<style scoped>
    .input-map{
        padding: 10px 0
    }
    .map{
        padding: 0 10px
    }
</style>
