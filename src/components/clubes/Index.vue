<template>
    <div>
        <section class="content-header">
            <h1>
                Clubes
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Clubes</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Clubes</h3>
                        </div>
                       
                        <div class="box-body">
                            
                        
                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="clubes"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" slot-scope="props">
                                    <td>{{ props.row.entidadId.nombre }}</td>
                                    <td>{{ props.row.fundacion}}</td>
                                    <td>{{ props.row.playaId.nombre}}</td>
                                    <td>{{ props.row.entrenadorId.personaId.nombre}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, club, props.row.entidadId.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalClubes :methodSubmit="methodSubmit"  :title="'Actualizar Club'" :buttonMsg="'Actualizar'" :openModal="openModal" 
            :club="club" v-on:openChange="isChange" ></modalClubes>
         
            

        </section>
    </div>
</template>

<script>
    import clubesController from '../../controllers/clubes.js'
   
    import ModalClubes from './subcomponents/ModalClubes'
   
    export default {
        name: 'clubes',
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
                clubes: [],
                club: {}
                

            
            }
        },
        components:{
            "modalClubes": ModalClubes
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, club, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del club <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        clubesController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El club no se elimino',
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
                clubesController.index(this)
                this.fetchData()
            },
            fetchData() {
                clubesController.index(this)
            },
            retrieveData(id) {
                clubesController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>