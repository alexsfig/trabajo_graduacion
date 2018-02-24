<template>
    <div>
        <section class="content-header">
            <h1>Circuitos</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Circuitos </li>
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
                            <h3 class="box-title">atletas de inscritos en la fecha {{circuito.fechaId.nombre}}   del circuito {{circuito.nombre }}</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">

                            <form @submit.prevent="submit"  role="form"> 
           <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('atleta') }">
                                            <label for="atleta">Atleta</label>
                                            <v-select
                                                :debounce="250"
                                                :options="atletas"
                                                v-model="atleta"
                                                placeholder="Escoja un atleta" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="atleta" value="" data-vv-as="atleta"  v-model="atleta" v-validate="'required'">
                                            <span class="help-block" for="atleta" v-bind:data-error="errors.first('atleta')">
                                                {{ errors.first('atleta') }}
                                            </span>
                                              <button type="submit"  class="btn btn-flat btn-sm btn-primary">Agregar</button> 
                                        </div>
                                        
                                    </div>
                                      
                            </form> 
                             <!--   <router-link to="/admin/circuitos/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Circuito
                                </router-link>-->
                            </div>
                         <vue-good-table :columns="columns" :rows="atletaCircuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.atletaId.personaId.nombre}}</td> 
                                   
                                   <td>{{props.row.atletaId.personaId.apellido}}</td> 
                                     <td>{{ props.row.atletaId.aniosPracticando}}</td> 
                                     <td>{{ props.row.atletaId.playaPractica}}</td>                         
                                         <td class="nowrap">
                                 <!--    <router-link :to="{ name: 'circuitosEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>               -->
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteCircuito(props.row.id, props.row.atletaId.personaId.nombre+','+props.row.atletaId.personaId.apellido)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>
                                
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
  
    import circuitosController from '../../controllers/circuitos.js';
        import atletaController from '../../controllers/atletas.js';
      import  atletaCircuitoController  from '../../controllers/AtletaCircuito.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'AgregarAtleta',
        data() {
            return {
                circuito: {atletasCircuitoList:[],fechaId:{}},
                datos:[],
                atletaCircuito:{},
                atletas:[],
                atletaCircuitos:[],
                atleta:null,
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
                id:'',
 columns: [ 
 
                       {
                      label: 'Nombre',
                      field: 'atletaId.personaId.nombre',
                      filterable: true
                    },
                    {
                      label: 'Apellido',
                      field: 'atletaId.personaId.apellido',
                      filterable: true
                    },

                    {
                      label: 'Años Practicando',
                      field: 'aniosPracticando',
                      filterable: true
                    },
                     {
                      label: 'Playa Practica',
                      field: 'playaPractica',
                      filterable: true
                    },
                   
                     {
                      label: 'Accion',
                      field: '',
                      filterable: false
                    }
                    ]
            }
        }, components:{
            vSelect
        },
        created(){
              this.id = this.$route.params.id;
        
            this.fetchData()
        },
        methods:{
            fetchData(){
               // circuitosController.index(this)
               atletaCircuitoController.indexByCircuito(this,this.id);
                circuitosController.retrieve(this,this.id)
                 atletaController.index(this)
/*
  for (let i of this.atletas) {
  i.nombre=i.personaId.nombre+","+i.personaId.apellido;
  console.log("nombre:"+ i.nombre)
  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
}*/
            },
                  submit() {
                this.showAlert = false
                this.showSuccess = false

                this.$validator.validateAll().then(success => {
                    if (success) {
                 
                    
                        this.atletaCircuito.circuitoId=this.circuito;
                        this.atletaCircuito.atletaId=this.atleta;
                        this.atletaCircuito.estado=0;

                        console.log(JSON.stringify(  
                        this.atletaCircuito));
                        atletaCircuitoController.create(this,this.atletaCircuito)
                        
                     
                    }
                    else{
                          console.log("Error enn el formulario")
                        this.showAlert = true
                        this.errMsg = "Form error"
                    }
                });
            },
            deleteCircuito(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la circuito <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    atletaCircuitoController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La circuito no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>