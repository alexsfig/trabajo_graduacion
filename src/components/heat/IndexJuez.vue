<template>
    <div>
        <section class="content-header">
            <h1>Manejo de Heats</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Heats  </li>
            </ol>
        </section>
        <section class="content" >

            <div class="row">
                <div class="col-xs-12">
                    <div class="wrapper-alert">
                        <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                            <h4><i class="icon fa fa-ban"></i> Error!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Exito!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Heats Asignados a Calificar</b></h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                                
                          <!--  <div class="box-action">
                                <router-link to="/admin/heats/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Heat
                                </router-link>
                            </div>-->
   <!-- {{heats[0]}} -->

                            <vue-good-table :columns="columns" :rows="heats" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                      
                                 
                                    <td>{{ props.row.numero }}</td>
                                    
                                         <td>{{ props.row.estado }}</td>
                                          <td>{{ props.row.rondaId.numero }}</td>
                                           <td>{{ props.row.rondaId.circuitoId.nombre }}</td>
                                            <td>{{ props.row.rondaId.circuitoId.descripcion }}</td>
                                     
                                        <td>{{ props.row.rolJuez }}</td>
                                    <td class="nowrap">
                                        <div v-if="props.row.rolJuez!='Lider'">
                                        <router-link  :to="{ name: 'CalificarHeatJ', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Calificar</button>
                                        </router-link>
                                        </div>
                                            <div v-if="props.row.rolJuez=='Lider'">
                                        <router-link  :to="{ name: 'VerResultadosJuezInit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Ver Resultados</button>
                                        </router-link>
                                            </div>
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
  
    import heatsController from '../../controllers/heats.js';
        import rondaController from '../../controllers/rondas.js';
         import usuarioController from '../../controllers/users.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Heats',
        data() {
            return {
                heats: [],
                usuario:{},
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false,
                circuito:{},
                id:'',

                ronda:'',
                columns: [
                   
         
                    {
                        label: "Numero de Heat",
                        field: "numero",
                    },
                        {
                        label: "Estado",
                        field: "estado",
                    },
                    {
                        label: "Numero de Ronda",
                        field: "rondaId.numero",
                    },
                    {
                        label: "Circuito",
                        field: "rondaId.circuitoId.nombre",
                    },     
                    {
                        label: "Descripción del Circuito",
                        field: "rondaId.circuitoId.descripcion",
                    }                                
                     ,
                       {
                        label: "Rol Juez",
                        field: "rolJuez",
                    }                                
                     ,
                     {
                      label: 'Acción',
                      field: '',
                      filterable: true,
                    }
                ]
            }
        },
        watch:{
        "usuario":"getHeat"
        },
        created(){
            this.fetchData()
        },
        methods:{
            getHeat(){
                console.log("entres al fectdata:"+this.usuario.id)
                 if(this.usuario.personaId)
                if(this.usuario.personaId.juez){

                     localStorage.setItem('juezid', this.usuario.personaId.juez.id)
                 heatsController.byJuez (this,this.usuario.personaId.juez.id);
                 
                 }
            },
            fetchData(){
                usuarioController.retrieve(this, localStorage.getItem('iduser'))
            //    this.id=localStorage.getItem('rol');
              //  console.log("juez:"+localStorage.getItem('rol'))
             //   heatsController.byJuez (this,this.id);
            //    rondaController.retrieve(this,this.id);
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
            }
        }
    }
</script>
