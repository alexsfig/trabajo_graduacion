<template>
    <div>
        <section class="content-header">
            <h1>Formas de Pago</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Formas de Pago </li>
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
                            <h3 class="box-title">Manejo de Forma de Pago </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">
                                <router-link to="/admin/formaPagos/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo
                                </router-link>
                            </div>
                            <vue-good-table :columns="columns" :rows="formaPagos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.nombre }}</td>
<td>{{ props.row.descripcion }}</td>                                    <td class="nowrap">
 <router-link :to="{ name: 'formaPagosEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteFormaPago(props.row.id, props.row.nombre)"><i aria-hidden="true" 
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
  
    import formaPagosController from '../../controllers/formaPagos.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'FormaPagos',
        data() {
            return {
                formaPagos: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
 columns: [ 
 {
                        label: "Nombre",
                        field: "nombre",
                    }, {
                        label: "Descripción",
                        field: "descripcion",
                    },{
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
                formaPagosController.index(this)
            },
            deleteFormaPago(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la información de la Forma de Pago <b>&laquo;' + nombre + '&raquo</b><br>y toda la información relacionada a la misma ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    formaPagosController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Forma de Pago no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>