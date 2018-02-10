<template>
    <div>
        <section class="content-header">
            <h1>
                Patrocinadores
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Patrocinadores</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Patrocinadores</h3>
                        </div>
                       
                        <div class="box-body">
                            
                        
                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="patrocinadores"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                     <td>{{ props.row.personaId.nombre}}</td>
                                    <td>{{ props.row.entidadId.nombre }}</td>
                                    <td>{{ props.row.esPersona}}</td>
                                    <td>{{ props.row.activo}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, patrocinador, props.row.entidadId.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
         <modalPatrocinadores :methodSubmit="methodSubmit"  :title="'Actualizar Escuela'" :buttonMsg="'Actualizar'" :openModal="openModal" 
            :patrocinador="patrocinador" v-on:openChange="isChange" ></modalPatrocinadores>
        
            

        </section>
    </div>
</template>

<script>
    import patrocinadoresController from '../../controllers/patrocinador.js'
   
    import ModalPatrocinadores from './subcomponents/ModalPatrocinadores'
   
    export default {
        name: 'patrocinadores',
        data() {
            return {
                columns: [
                    {
                      label: 'Persona',
                      field: 'personaId.nombre',
                     filterable: true,
                    },
                    {
                      label: 'Entidad',
                      field: 'entidadId.nombre',
                      filterable: true,
                    },
                    {
                      label: 'Es Persona',
                      field: 'esPersona',
                      filterable: true,
                    },
                    {
                      label: 'Activo',
                      field: 'activo',
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
                
                errMsg:  '',
                success: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                patrocinadores: [],
                patrocinador: {}
                

            
            }
        },
        components:{
            "modalPatrocinadores": ModalPatrocinadores
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, patrocinador, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la patrocinador <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        patrocinadoresController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La patrocinador no se elimino',
                          'error'
                        )
                      }
                    }
                )
            },
            isChange () {
                this.openModal = false
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false 
                this.showSuccess = false 
            },
            dismissCallback (msg) {
                this.openModal =false
                patrocinadoresController.index(this)
                this.fetchData()
            },
            fetchData() {
                patrocinadoresController.index(this)
            },
            retrieveData(id) {
                patrocinadoresController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>