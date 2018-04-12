<template>
    <div>
        <section class="content-header">
            <h1>Transacciones</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Transacciones </li>
            </ol>
        </section>
        <section class="content" >

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

            <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Manejo de transacciones </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">
                                <router-link to="/admin/transaccions/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Registrar Nueva Transaccion
                                </router-link>
                            </div>
                            </div>
                            <div class="box-body">
                            <vue-good-table :columns="columns" :rows="transaccions" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.fecha }}</td>
<td>{{ props.row.cuentaId.nombre }}</td>
<td>{{ props.row.tipoTransaccionId.nombre }}</td> 
<td>{{ props.row.tipoTransaccionId.tipo==true?'Ingreso':'Gasto' }}</td> 
<td v-if="!props.row.tipoTransaccionId.tipo" style="color:#FF0000"><b>{{ roundToTwo(props.row.monto) }}</b></td>
<td v-if="props.row.tipoTransaccionId.tipo" style="color:green"><b>{{roundToTwo( props.row.monto) }}</b></td>
<td>{{ props.row.formaPagoId.nombre }}</td>
<td>{{ props.row.comprobante }}</td>
<!--<td>{{ props.row.patrocinadorId?props.row.patrocinadorId.nombre:"N/A" }}</td> -->




                                    <td class="nowrap">
 <router-link :to="{ name: 'transaccionsEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteTransaccion(props.row.id, props.row.descripcion)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
                    </div>
            </div>
           
        </section>
    </div>
</template>
<script>
  
    import transaccionsController from '../../controllers/transacciones.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Transaccions',
        data() {
            return {
                transaccions: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
 columns: [ 
 {
                        label: "Fecha",
                        field: "fecha",
                        filterable: true,
                    } 

                    , {
                        label: "Cuenta",
                        field: "nombre",
                        filterable: true,
                    }, 
                    
                    {
                        label: "Tipo de Transaccion",
                        field: "tipoTransaccion.nombre",
                         filterable: true,
                    },
                    {
                        label: "Concepto",
                        field: "tipoTransaccion.tipo",
                         filterable: true,
                    },

                    {
                        label: "Monto ($)",
                        field: "monto",
                         filterable: true,
                    },

                    {
                        label: "Forma de pago",
                        field: "formaPago.nombre",
                         filterable: true,
                    },  {
                        label: "Comprobante",
                        field: "comprobante",
                         filterable: true,
                    }
                    , 
                    /*
                    {
                        label: "Patrocinador",
                        field: "nombre",
                         filterable: true,
                    }
                    , */

                    {
                        label: "Acciones",
                        field: "",
                    }]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                transaccionsController.index(this)
            },
            deleteTransaccion(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la transaccion <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    transaccionsController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La transaccion no se elimino',
                          'error'
                        )
                    }
                })
            },

            roundToTwo(num) {
      return this.formatPrice(+(Math.round(num + "e+2") + "e-2"));
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
        }
    }
</script>
