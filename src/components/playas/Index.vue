<template>
    <div>
        <section class="content-header">
            <h1>Playas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Playas </li>
            </ol>
        </section>



        <section class="box-body">     

        <div class="row">
                <div class="col-xs-12">                    
                    <div class="wrapper-alert">
                        <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                            <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Success!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                </div>
            </div>      
        

         <div class="col-lg-12">
    <label>
     </b>
      <GmapAutocomplete @place_changed="setPlace">
      </GmapAutocomplete>
      <button @click="usePlace">Buscar Playa</button>
    </label>
    

    <GmapMap style="width: 100%; height: 400px;" :zoom="1" :center="{lat: 0, lng: 0}">
      <GmapMarker v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        />
      <GmapMarker
        v-if="this.place"
        label="★"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        />
    </GmapMap>
  </div>

  </section>


        <section class="content" >
            
            
            
            <div class="row">
                <div class="col-lg-6">
                    <div class="box box-success">
                        <div class="box-header with-border">
                            <h3 class="box-title">Agregar Nueva Playa</h3>
                        </div>
    
                        <form @submit.prevent="submit()"> 
                            <div class="box-body">
                                <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                    <label for="nombre">Nombre</label>
                                    <input type="text" id="nombre" name="nombre" data-vv-as="Nombre" class="form-control" v-model="playasCreate.nombre" v-validate="'required'" />
                                    <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                        {{ errors.first('nombre') }}
                                    </span>
                                </div>
                            
                                <div class="fgroup" :class="{ 'has-error': errors.has('ubicacion') }" >
                                    <label for="ubicacion">Ubicación</label>
                                    <input id="ubicacion" name="ubicacion" rows="5" data-vv-as="Ubicación" class="form-control" v-model="playasCreate.ubicacion" v-validate="'required'"/>
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

                <div class="col-lg-6">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Listado de Playas</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            
                            <vue-good-table :columns="columns" :rows="playas" :paginate="true" :globalSearch="true"  globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed"  >
                                <template slot="table-row" scope="props"  >
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

                errMsg:  '',
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
                methodSubmit: 'update',
                buttonMsg: "Actualizar",
                users: [],   
                openModal: false,
                locationUpdate: {},
                playas: [],
                playa: {},
                columns: [
                    {
                        label: "Nombre",
                        field: "nombre",
                    },
                    {
                        label: "Ubicación",
                        field: "ubicacion",
                    },
                    {
                        label: "Acción"
                    }
                ]
            }
        },
         description: 'Autocomplete Example (#164)',

        components:{
            "modalPlaya": modalPlaya
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData',
            'locationUpdate': function (val) {
                this.modal_show = $.isEmptyObject(val) ? false : true;
            }
        },
        methods: {
            isChange () {
                this.modal_show = false
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false 
                this.showSuccess = false 
            },
            dismissCallback (msg) {
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
                        playasController.create(this, this.playasCreate);                        
                    }
                    else {
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
                },function(dismiss) {
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
                this.playasCreate = {}
                this.$validator.reset();
            },


            setDescription(description) {
            this.description = description;
            },
          setPlace(place) {
            this.place = place

            },
          usePlace(place) {
           if (this.place) {
            console.log(this.place)
          this.markers.push({
            position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
            }
          })
          this.place = null;
         }
       }
     




        }
    }
</script>