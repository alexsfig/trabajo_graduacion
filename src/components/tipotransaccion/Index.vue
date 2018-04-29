<template>
    <div>
        <section class="content-header">
            <h1>Tipos de Transacción</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Tipos de Transacción </li>
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
                            <h3 class="box-title">Manejo de Tipos de Transacción </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">
                                <router-link to="/admin/tipoTransaccions/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo
                                </router-link>
                            </div>
                            </div>
                             <div class="box-body">

                            <vue-good-table :columns="columns" :rows="tipoTransaccions" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.nombre }}</td>
<td>{{ props.row.descripcion }}</td>
<td>{{ props.row.tipoNombre }}</td>                                    <td class="nowrap">
 <router-link :to="{ name: 'tipoTransaccionsEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteTipoTransaccion(props.row.id, props.row.nombre)"><i aria-hidden="true" 
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
  
    import tipoTransaccionsController from '../../controllers/tipoTransaccions.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'TipoTransaccions',
        data() {
            return {
                tipoTransaccions: [],
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
                    }, {
                        label: "Concepto",
                        field: "tipoNombre",
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
                tipoTransaccionsController.index(this)
            },
            deleteTipoTransaccion(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la información de Tipo Transacción <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion en relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    tipoTransaccionsController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El  Tipo de Transacción no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>