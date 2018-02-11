<template>
    <div>
        <section class="content-header">
            <h1>
                Formas de Pago
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Forma de Pago</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Formas de Pago</h3>
                        </div>
                       
                        <div class="box-body">
                            
                            <div class="box-action">
                                <router-link to="/admin/formapagos/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Forma de Pago
                                </router-link>
                            </div>

                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="formapagos"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.nombre }}</td>
                                    <td>{{ props.row.descripcion}}</td>
                                    
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, formapago, props.row.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalFormapagos :methodSubmit="methodSubmit"  :title="'Actualizar Forma de Pago'" :buttonMsg="'Actualizar'" :openModal="openModal" :formapago="formapago" v-on:openChange="isChange"></modalFormaPagos>
         
            

        </section>
    </div>
</template>

<script>
    import formapagosController from '../../controllers/formapagos.js'
   
    import ModalFormapagos from './subcomponents/ModalFormapagos'
   
    export default {
        name: 'formapagos',
        data() {
            return {
                columns: [
                    {
                      label: 'Forma de Pago',
                      field: 'nombre',
                      filterable: true,
                    },
                    {
                      label: 'Descripcion',
                      field: 'descripcion',
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
                formapagos: [],
                formapago: {}
                

            
            }
        },
        components:{
            "modalFormapagos": ModalFormapagos
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, formapago, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la Forma de Pago <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        formapagosController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Forma de Pago no se elimino',
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
                formapagosController.index(this)
                this.fetchData()
            },
            fetchData() {
                formapagosController.index(this)
            },
            retrieveData(id) {
                formapagosController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>