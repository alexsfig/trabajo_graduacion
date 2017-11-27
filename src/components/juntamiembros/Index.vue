<template>
    <div>
        <section class="content-header">
            <h1>
                Miembros de Junta Directiva
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Miembros de Junta Directiva</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Miembros de Junta Directiva</h3>
                        </div>
                       
                        <div class="box-body">
                            
                            <div class="box-action">
                                <router-link to="/admin/noticias/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo Miembro
                                </router-link>
                            </div>

                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="juntamiembros"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" slot-scope="props">
                                    <td>{{ props.row.personaId.nombre}}</td> 
                                    <td>{{ props.row.personaId.apellido}}</td> 
                                    <td>{{ props.row.personaId.fechaNacimiento}}</td> 
                                     <td>{{ props.row.personaId.dui}}</td> 
                                     <td>{{ props.row.personaId.nit}}</td>
                                     <td>{{ props.row.personaId.direccion}}</td>
                                     <td>{{ props.row.personaId.telefono}}</td>
                                     <td>{{ props.row.personaId.correo}}</td>
                                      <td>{{ props.row.personaId.sexo}}</td>
                                      <td>{{ props.row.nivelJerarquia}}</td>
                                   
                                   
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
    import juntamiembrosController from '../../controllers/juntamiembros.js'
   
    import ModalNoticias from './subcomponents/ModalNoticias'
   
    export default {
        name: 'entrenadores',
        data() {
            return {
                columns: [
                    {
                      label: 'Nombre',
                      field: 'personaId.nombre',
                      filterable: true,
                    },
                    {
                      label: 'Apellido',
                      field: 'personaId.apellido',
                      filterable: true,
                    },

                    {
                      label: 'Fecha de Nacimiento',
                      field: 'fechaNacimiento',
                      filterable: true,
                    },
                     {
                      label: 'Dui',
                      field: 'dui',
                      filterable: true,
                    },
                    {
                      label: 'Nit',
                      field: 'nit',
                      filterable: true,
                    },
                    {
                      label: 'Direccion',
                      field: 'direccion',
                      filterable: true,
                    },
                    {
                      label: 'Telefono',
                      field: 'telefono',
                      filterable: true,
                    },
                    {
                      label: 'Correo',
                      field: 'correo',
                      filterable: true,
                    },
                    {
                      label: 'Sexo',
                      field: 'sexo',
                      filterable: true,
                    },
                    {
                      label: 'Nivel de Jerarquia',
                      field: 'nivelJerarquia',
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
                juntamiembros: [],
                miembrojunta: {}
                

            
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
                noticiasController.index(this)
                this.fetchData()
            },
            fetchData() {
                juntamiembrosController.index(this)
            },
            retrieveData(id) {
                juntamiembrosController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>