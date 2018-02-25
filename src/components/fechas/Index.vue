<template>
    <div>
        <section class="content-header">
            <h1>Fechas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Fechas </li>
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
                            <h3 class="box-title">Manejo de fechas </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                                
                            <div class="box-action">
                                <router-link to="/admin/fechas/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Fecha
                                </router-link>
                            </div>

                            <vue-good-table :columns="columns" :rows="fechas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                                    <td class="nowrap">{{ props.row.id }}</td>
                                 
                                    <td>{{ props.row.nombre }}</td>
                                    <td>{{ props.row.fecha }}</td>
                                   <td>{{ props.row.playaId.nombre }}</td>
                                  
                                    <td class="nowrap">
                                        <router-link :to="{ name: 'fechasEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteFecha(props.row.id, props.row.nombre)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>

                                         <button type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="filtrarcircuitos(props.row.id, props.row)"><i aria-hidden="true" 
                                        class="fa fa-trophy"></i> Circuitos en Fecha</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
    |                </div>
            </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
  
    import fechasController from '../../controllers/fechas.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Fechas',
        data() {
            return {
                fechas: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false,
                columns: [
                    {
                        label: "Id",
                        field: "id",
                    },
                    
                    {
                        label: "Nombre",
                        field: "nombre",
                    },
                    {
                        label: "Fecha",
                        field: "fecha",
                    },

                     {
                        label: "Playa",
                        field: "playaId.nombre",
                    },
                     {
                        label: "Acciones",
                        field: "playaId.id",
                    },
                     {
                      label: '',
                      field: '',
                      filterable: true,
                    }
                ]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                fechasController.index(this)
            },

             filtrarcircuitos(id, fecha) {
            fechasController.retrieve(this, id)
            this.$router.push({
                name: 'circuitosIndexByFecha',
                params: {
                    id: id,
                    fecha: fecha
                }
            });
            },

            deleteFecha(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la fecha <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    fechasController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La fecha no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>
