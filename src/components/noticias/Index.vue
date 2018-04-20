<template>
    <div>
        <section class="content-header">
            <h1>
                Noticias
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Noticias</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Noticias</h3>
                        </div>
                       
                        <div class="box-body">
                            
                            <div class="box-action">
                                <router-link to="/admin/noticias/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Noticia
                                </router-link>
                            </div>

                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Listado"
                                  :columns="columns"
                                  :rows="noticias"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.nombre }}</td>
                                    <td>{{ props.row.descripcion}}</td>
                                    <td>{{ props.row.fechaInicio}}</td>
                                    <td>{{ props.row.fechaFin}}</td>
                                    <td>{{ props.row.usuarioId.usuario}}</td>
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
    import noticiasController from '../../controllers/noticias.js'
   
    import ModalNoticias from './subcomponents/ModalNoticias'
   
    export default {
        name: 'noticias',
        data() {
            return {
                columns: [
                    {
                      label: 'Título',
                      field: 'nombre',
                      filterable: true,
                    },
                    {
                      label: 'Descripción',
                      field: 'descripcion',
                     filterable: true,
                    },
                    {
                      label: 'Fecha Inicio',
                      field: 'fechaInicio',
                      filterable: true,
                    },
                    {
                      label: 'Fecha Fin',
                      field: 'fechaFin',
                      filterable: true,
                    },
                    {
                      label: 'Publicada Por:',
                      field: 'usuarioId.usuario',
                      filterable: true,
                    },
                     {
                      label: 'Acción',
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
                noticias: [],
                noticia: {}
                

            
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
                    html: 'No podras recuperar la información de la Noticia: <b>' + noticia.nombre + '</b>',
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
                noticiasController.index(this)
                this.fetchData()
            },
            fetchData() {
                noticiasController.index(this)
            },
            retrieveData(id) {
                noticiasController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>