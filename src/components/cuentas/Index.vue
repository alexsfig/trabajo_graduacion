<template>
    <div>
        <section class="content-header">
            <h1>
                Cuentas
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Cuentas</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Cuentas</h3>
                        </div>
                       
                        <div class="box-body">
                            
                            <div class="box-action">
                                <router-link to="/admin/cuentas/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Cuenta
                                </router-link>
                            </div>

                            <div class="table-responsive">
                              
                                <vue-good-table
                                  title="Dynamic Table"
                                  :columns="columns"
                                  :rows="cuentas"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.nombre }}</td>
                                    <!--<td>{{ props.row.cuentaMayor}}</td>-->
                                    <td>{{ props.row.naturaleza}}</td>
                                   
                                  
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, cuenta, props.row.nombre)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalCuentas :methodSubmit="methodSubmit"  :title="'Actualizar Cuenta'" :buttonMsg="'Actualizar'" :openModal="openModal" :cuenta="cuenta" v-on:openChange="isChange"></modalCuentas> 
         
            

        </section>
    </div>
</template>

<script>
    import cuentasController from '../../controllers/cuentas.js'
   
    import ModalCuentas from './subcomponents/ModalCuentas'
   
    export default {
        name: 'cuentas',
        data() {
            return {
                columns: [
                    {
                      label: 'Nombre Cuenta',
                      field: 'nombre',
                      filterable: true,
                    },
                 /*   {
                      label: 'Cuenta Mayor',
                      field: 'cuentaMayor',
                     filterable: true,
                    }, */
                    {
                      label: 'Naturaleza',
                      field: 'naturaleza',
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
                cuentas: [],
                cuenta: {}
                

            
            }
        },
        components:{
            "modalCuentas": ModalCuentas
            
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {

            clickHandler(id, cuenta, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la Cuenta <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        cuentasController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Cuenta no se elimino',
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
                cuentasController.index(this)
                this.fetchData()
            },
            fetchData() {
                cuentasController.index(this)
            },
            retrieveData(id) {
                cuentasController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>