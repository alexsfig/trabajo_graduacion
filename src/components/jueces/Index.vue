<template>
    <div>
        <section class="content-header">
            <h1>
                Jueces
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Jueces</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Jueces</h3>
                        </div>
                       
                        <div class="box-body">
                            
                         <!--   <div class="box-action">
                                <router-link to="/admin/juntamiembros/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo Miembro
                                </router-link>
                            </div> -->

                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title=""
                                  :columns="columns"
                                  :rows="jueces"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.personaId.nombre}}</td> 
                                    <td>{{ props.row.personaId.apellido}}</td> 
                                    <td>{{ props.row.personaId.fechaNacimiento}}</td> 
                                     <td>{{ props.row.personaId.dui}}</td> 
                                     <td>{{ props.row.personaId.nit}}</td>
                                     <td>{{ props.row.personaId.direccion}}</td>
                                     <td>{{ props.row.personaId.telefono}}</td>
                                     <td>{{ props.row.personaId.correo}}</td>
                                      <td>{{ (props.row.personaId.sexo == 'F') ? 'Femenino' : ((props.row.personaId.sexo == 'M') ? 'Masculino' : 'N/A')}}</td>
                                      <td>{{ props.row.descripcion}}</td>
                                   
                                   
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar Datos</button>

                               <router-link :to="{ name: 'juezEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-certificate"></i> Certificaciones</button>
                                        </router-link> 
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, juez, props.row.personaId.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modaljueces :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Actualizar'" :openModal="openModal" :juez="juez" v-on:openChange="isChange"></modaljueces> 
         
            

        </section>
    </div>
</template>

<script>
    import juecesController from '../../controllers/jueces.js'
    import ModalJueces from './subcomponents/ModalJueces' 
   
   
    export default {
        name: 'jueces',
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
                      label: 'Dirección',
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
                      label: 'Descripción del Juez',
                      field: 'descripcion',
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
                jueces: [],
                juez: {}
                

            
            }
        },
       components:{
            "modaljueces": ModalJueces
            
        }, 
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {


          certificaciones(id, juez) {
            juecesController.retrieve(this, id)
            this.$router.push({
                name: 'juezEdit',
                params: {
                    id: id
                   
                }
            });
            },


            clickHandler(id, juez, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del Juez <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        juecesController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El Juez no se elimino',
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
                juecesController.index(this)
                this.fetchData()
            },
            fetchData() {
                juecesController.index(this)
            },
            retrieveData(id) {
                juecesController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>