<template>
    <div>
        <section class="content-header">
            <h1>Iniciar Heat </h1>

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
                            <h3 class="box-title">Manejo del heat  {{heat.numero}}   de la ronda {{heat.rondaId.numero}} </h3>
                                         <button type="button" style="float:right" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="juezLider=null"><i aria-hidden="true" 
                                        class="fa fa-check"></i> Iniciar heat </button>
                        </div>

     
                        <!-- /.box-header -->
                        <div class="box-body">
                            

<div v-if="juezLider" >
    Lider de jueces: 
    {{
        juezLider.juezId.personaId.nombre}},{{
        juezLider.juezId.personaId.apellido}}

<button v-if="juezLider" type="button" class="margin btn btn-flat btn-sm btn-warning" 
                                        @click="juezLider=null"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Cambiar</button>

     </div>                           



                            <vue-good-table :columns="columns" :rows="juezCircuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                      
                                  <td>{{ props.row.juezId.personaId.nombre }}, {{ props.row.juezId.personaId.apellido }}</td>
                                         <td>{{ props.row.rolJuezId.rol }}</td>
                                    
                                        
                                   
                                    <td class="nowrap">
                                      <div v-if=" props.row.rolJuezId.rol=='Evaluador'">
                                        <button v-if="!juezLider" type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="ponerLider(props.row)"><i aria-hidden="true" 
                                        class="fa fa-at"></i> Lider</button>
                                      </div>
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
        import juezCircuitoController from '../../controllers/JuezCircuito.js';
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
                juezLider:null,
                heat:{},
                juezCircuitos:[],
                id:'',

                ronda:'',
                columns: [
                   
         
                        {
                        label: "Nombre",
                        field: "nombre",
                    },
          
                    {
                        label: "Rol",
                        field: "rol",
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
          watch: {
            heat:  function (val) {juezCircuitoController.indexByCircuito(this,val.rondaId.circuitoId.id)}
        },
        methods:{
        ponerLider(lider){
this.juezLider=lider;

        },
            fetchData(){
                this.id=this.$route.params.id;
                heatsController.retrieve(this,this.id);

                
             //   a.retrieve(this,this.id);
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
