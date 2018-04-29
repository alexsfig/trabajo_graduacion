<template>
    <div>
        <section class="content-header">
            <h1>Transacciones</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
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
                                    <i class="fa fa-plus"></i> Nuevo
                                </router-link>
                            </div>
                            </div>
                            <div class="box-body">
                            <vue-good-table :columns="columns" :rows="transaccions" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.fecha }}</td>

<td>{{ props.row.tipoTransaccionId.nombre }}</td> 
<td>{{ props.row.tipoTransaccionId.tipo==true?'Ingreso':'Gasto' }}</td> 
<td v-if="!props.row.tipoTransaccionId.tipo" style="color:#FF0000;text-align:right;"><b>{{ roundToTwo(props.row.monto) }}</b></td>
<td v-if="props.row.tipoTransaccionId.tipo" style="color:green;text-align:right;"><b>{{roundToTwo( props.row.monto) }}</b></td>
<td>{{ props.row.formaPagoId.nombre }}</td>
<td>{{ props.row.comprobante }}</td>
<td v-if="props.row.patrocinadorId"><router-link :to="{ name: 'ReportesbyPatrocinadorOne', params: { id: props.row.patrocinadorId.id }}">{{ props.row.patrocinadorId.nombre}}</router-link></td> 
<td v-if="!props.row.patrocinadorId">N/A</td>

<td v-if="props.row.atletaId"><router-link :to="{ name: 'ReportesbyAtletaOne', params: { id: props.row.atletaId.id }}">{{ props.row.atletaId.personaId.nombre+","+props.row.atletaId.personaId.apellido}}</router-link></td> 
<td v-if="!props.row.atletaId">N/A</td>




                                    <td class="nowrap">
 <router-link :to="{ name: 'transaccionsEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>                                         
                                        </router-link>  

                                        <button type="button" class="margin btn btn-flat btn-sm bg-navy margin" @click="detalle(props.row.id)"><i class="fa fa-eye" aria-hidden="true"></i>  Ver Detalle</button>                                      


                                        <!--<button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteTransaccion(props.row.id, props.row.cuentaId.nombre)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>-->
                                
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
                    }, 
                    
                    {
                        label: "Tipo de Transacción",
                        field: "tipoTransaccionId.nombre",
                         filterable: true,
                    },
                    {
                        label: "Concepto",
                        field: "tipo",
                        filterable: true,
                    },

                    {
                        label: "Monto ($)",
                        field: "monto",
                         filterable: true,
                         type : "number"
                    },

                    {
                        label: "Forma de pago",
                        field: "formaPagoId.nombre",
                         filterable: true,
                    },  {
                        label: "Comprobante",
                        field: "comprobante",
                         filterable: true,
                    }
                    , 
                
                    {
                        label: "Patrocinador",
                        field: "nombre",
                         filterable: true,
                    }
                    , 
                    {
                        label: "Atleta",
                        field: "nombre",
                         filterable: true,
                    }
                    , 
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
            detalle(id) {
            
            this.$router.push({
                name: 'transaccionShow',
                params: {
                    id: id
                   
                }
            });
            },
            fetchData(){
                transaccionsController.index(this)
            },
            deleteTransaccion(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la información de la transaccion de la cuenta: <b>&laquo;' + nombre + '&raquo</b><br>y toda la información en relacion a la misma ya no sera accesible',
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
                          'La Transaccion no se elimino',
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
