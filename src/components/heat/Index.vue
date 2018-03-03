<template>
    <div>
        <section class="content-header">
            <h1>Heats</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Heats  </li>
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
                            <h3 class="box-title">Manejo de heats de la ronda {{ronda.numero}}</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                                
                          <!--  <div class="box-action">
                                <router-link to="/admin/heats/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Heat
                                </router-link>
                            </div>-->

                            <vue-good-table :columns="columns" :rows="heats" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                      
                                 
                                    <td>{{ props.row.numero }}</td>
                                    
                                         <td>{{ props.row.estado }}</td>
                                      <td>{{ props.row.natletas }}</td>
                                        <td>{{ props.row.natletas }}</td>
                                    <td class="nowrap">
                                        <router-link v-if="props.row.estado=='Por iniciar'" :to="{ name: 'heatInit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Iniciar</button>
                                        </router-link>
                                  
                                
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
  
    import heatsController from '../../controllers/heats.js';
        import rondaController from '../../controllers/rondas.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Heats',
        data() {
            return {
                heats: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false,
                circuito:{},
                id:'',

                ronda:'',
                columns: [
                   
         
                    {
                        label: "Numero",
                        field: "numero",
                    },
                        {
                        label: "Estado",
                        field: "estado",
                    }
                     ,
                        {
                        label: "Atletas",
                        field: "nAtletas",
                    }

                    ,

                        {
                        label: "Jueces",
                        field: "jueces",
                    }

                   
                     ,
                     {
                      label: 'Acciones',
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
                this.id=this.$route.params.id;
                heatsController.byRonda (this,this.id);
                rondaController.retrieve(this,this.id);
            },
            deleteHeat(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la heat <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    heatsController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La heat no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>
