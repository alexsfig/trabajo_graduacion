<template>
    <div>
        <section class="content-header">
            <h1>
                Escuelas
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Escuelas</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Escuelas</h3>
                        </div>
                       
                        <div class="box-body">
                            
                        
                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="escuelas"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.entidadId.nombre }}</td>
                                    <td>{{ props.row.fundacion}}</td>
                                    <td>{{ props.row.playaId.nombre}}</td>
                                    <td>{{ props.row.entrenadorId.personaId.nombre}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, escuela, props.row.entidadId.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
           <modalEscuelas :methodSubmit="methodSubmit"  :title="'Actualizar Escuela'" :buttonMsg="'Actualizar'" :openModal="openModal" 
            :escuela="escuela" v-on:openChange="isChange" ></modalEscuelas>
         
            

        </section>
    </div>
</template>

<script>
    import escuelasController from '../../controllers/escuelas.js'
   
    import ModalEscuelas from './subcomponents/ModalEscuelas'
   
    export default {
        name: 'escuelas',
        data() {
            return {
                columns: [
                    {
                      label: 'Nombre',
                      field: 'entidadId.nombre',
                      filterable: true,
                    },
                    {
                      label: 'Fundacion',
                      field: 'fundacion',
                     filterable: true,
                    },
                    {
                      label: 'Nombre Playa',
                      field: 'playaId.nombre',
                      filterable: true,
                    },
                    {
                      label: 'Entrenador',
                      field: 'entrenadorId.personaId.nombre',
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
                escuelas: [],
                escuela: {}
                

            
            }
        },
        components:{
            "modalEscuelas": ModalEscuelas
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, escuela, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la escuela <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        escuelasController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La escuela no se elimino',
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
                escuelasController.index(this)
                this.fetchData()
            },
            fetchData() {
                escuelasController.index(this)
            },
            retrieveData(id) {
                escuelasController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>