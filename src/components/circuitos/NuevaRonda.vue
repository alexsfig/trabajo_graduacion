<template>
    <div>
        <section class="content-header">
            <h1>Rondas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Rondas </li>
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
                            <h3 class="box-title">Atletas inscritos en la Fecha <b>{{circuito.fechaId.nombre}}</b>  del Circuito <b>{{circuito.nombre }} </b></h3>
                        </div>
                       
                       
                               
    <form @submit.prevent="submit"  role="form"> 
 <button type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="submit()"><i aria-hidden="true" 
                                        class="fa fa-check"></i>Crear </button>
<div v-for="value in listheat">
 <div class="box-body">
        
 <h4 class="box-title"> <b> Heat {{value[0].numeroHeat}} </b> </h4> 
       

        <vue-good-table :columns="columns" :rows="value" :paginate="true" :globalSearch="false" globalSearchPlaceholder="Search"  styleClass="table table-striped table-condensed">

                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.atletaId.personaId.nombre}}</td>                                   
                                       <td>{{props.row.atletaId.personaId.apellido}}</td> 
                                       <td>{{ props.row.atletaId.aniosPracticando}}</td> 
                                      <td>{{ props.row.color}}</td>                         
                                         <td class="nowrap">
                                        
                                        <button type="button" class="margin btn btn-flat btn-sm btn-warning" 
                                        @click="deleteCircuito(props.row.id, props.row.atletaId.personaId.nombre+','+props.row.atletaId.personaId.apellido)"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Re-Asignar</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>


        </div>

                        </div>
    </form>
                    </div>
                   
                  </div>
            </div>
        
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>

</template>
<script>
  
    import circuitosController from '../../controllers/circuitos.js';
    import atletaController from '../../controllers/atletas.js';
    import atletaCircuitoController  from '../../controllers/AtletaCircuito.js';
    import rondasController  from '../../controllers/rondas.js';
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
                listheat:[],
                totalAtletas:0,
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
                      filterable: false
                    },
                    {
                      label: 'Apellido',
                      field: 'atletaId.personaId.apellido',
                      filterable: false
                    },

                    {
                      label: 'Años Practicando',
                      field: 'aniosPracticando',
                      filterable: false
                    },
                     {
                      label: 'Color',
                      field: 'color',
                      filterable: false
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
               atletaCircuitoController.getheat(this,this.id);
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
                 
                    
                       /* this.atletaCircuito.circuitoId=this.circuito;
                        this.atletaCircuito.atletaId=this.atleta;
                        this.atletaCircuito.estado=0;

                        console.log(JSON.stringify(  
                        this.atletaCircuito));
                        atletaCircuitoController.create(this,this.atletaCircuito)
                        */

                        rondasController.create(this,this.listheat);

                     
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