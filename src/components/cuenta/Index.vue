<template>
    <div>
        <section class="content-header">
            <h1>Cuentas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Cuentas </li>
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
                            <h3 class="box-title">Manejo de Cuentas </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">
                                <router-link to="/admin/cuentas/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Cuenta
                                </router-link>
                            </div>
                            </div>
                            <div class="box-body">

                            <vue-good-table :columns="columns" :rows="cuentas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.nombre }}</td>
<td>{{ props.row.descripcion }}</td>
<td v-if="props.row.monto<=0" style="color:#FF0000"><b>{{ roundToTwo(props.row.monto) }}</b></td>
<td v-if="props.row.monto>0" style="color:green"><b>{{roundToTwo( props.row.monto) }}</b></td>
                                  <td class="nowrap">
 <router-link :to="{ name: 'cuentasEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteCuenta(props.row.id, props.row.nombre)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
                    </div>
            </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
  
    import cuentasController from '../../controllers/cuentas.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Cuentas',
        data() {
            return {
                cuentas: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
 columns: [ 
 {
                        label: "Nombre Cuenta",
                        field: "nombre",
                    }, {
                        label: "Descripcion Cuenta",
                        field: "descripcion",
                    }, {
                        label: "Monto Actual ($)",
                        field: "monto",
                    },
                     {
                        label: "Acciones",
                        field: "",
                    }
                    ]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                cuentasController.index(this)
            },
            deleteCuenta(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la cuenta <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion en relacion a la misma ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    cuentasController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Cuenta no se elimino',
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