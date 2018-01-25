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
                                  <template slot="table-row" slot-scope="props">
                                    <td>{{ props.row.entidadId.nombre }}</td>
                                    <td>{{ props.row.fundacion}}</td>
                                    <td>{{ props.row.playaPractica}}</td>
                                    <td>{{ props.row.atletaId.personaId.nombre}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, noticia)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalNoticias :methodSubmit="methodSubmit"  :title="'Actualizar Noticia'" :buttonMsg="'Actualizar'" :openModal="openModal" :noticia="noticia" v-on:openChange="isChange"></modalNoticias>
         
            

        </section>
    </div>
</template>

<script>
    import escuelasController from '../../controllers/escuelas.js'
   
    import ModalNoticias from './subcomponents/ModalNoticias'
   
    export default {
        name: 'escuelas',
        data() {
            return {
                columns: [
                    {
                      label: 'nombre',
                      field: 'entidadId.nombre',
                      filterable: true,
                    },
                    {
                      label: 'Fundacion',
                      field: 'fundacion',
                     filterable: true,
                    },
                    {
                      label: 'Nombre playa',
                      field: 'playaPractica',
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
            "modalNoticias": ModalNoticias
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, noticia) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la Noticia <b>' + noticia.nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        noticiasController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Noticia no se elimino',
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