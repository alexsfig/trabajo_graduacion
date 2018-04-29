<template>
    <div>
        <section class="content-header">
            <h1>Inscripción de Atletas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Escuelas </li>
              
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
                            <h3 class="box-title">Atletas Inscritos en la Escuela: <b>{{escuela.nombre}}</b>, con el Entrenador Asignado: <b>{{escuela.entrenadorId.nombre}}</b>   </h3>
                        </div>
                       
                       
                        <div class="box-body">
      <div class="box-action">
 
                            <form @submit.prevent="submit"  role="form"> 
           <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('atleta') }">
                                          
                                            <label for="atleta">Atleta</label>
                                            <v-select
                                                :debounce="250"
                                                :options="sinescuelas"
                                                v-model="atleta"
                                                placeholder="Selecciona un atleta" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="atleta" value="" data-vv-as="atleta"  v-model="atleta" v-validate="'required'">
                                            <span class="help-block" for="atleta" v-bind:data-error="errors.first('atleta')">
                                                {{ errors.first('atleta') }}
                                            </span>
                                              <button type="submit"  class="btn btn-flat btn-sm btn-primary"><i aria-hidden="true" 
                                        class="fa fa-check-circle"></i>  Inscribir </button> 
                                        </div>
                                        
                                    </div>
                                      
                            </form> 
                             <!--   <router-link to="/admin/circuitos/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Circuito
                                </router-link>-->
                            </div>

                              </div>
                       
                        <div class="box-body">
                         <vue-good-table :columns="columns" :rows="conescuelas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.personaId.nombre}}</td> 
                                   
                                   <td>{{props.row.personaId.apellido}}</td> 
                                   <td> {{ _calculateAge( props.row.personaId.fechaNacimiento)  }} años</td>
                                    <td> {{ props.row.personaId.sexo == 'F' ? 'Femenino' : 'Masculino' }}</td>
                                     <td style="text-align:right;">{{ props.row.aniosPracticando}} años</td> 
                                     <td>{{ props.row.playaPractica}}</td>    
                                     <td>{{ props.row.ladoPie}}</td>   
                                     <td>{{ props.row.olaPreferida}}</td>   
                                                                    
                                         <td class="nowrap">
                                 <!--    <router-link :to="{ name: 'circuitosEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>               -->
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteAtletaEscuela(props.row.id, props.row.personaId.nombre+','+props.row.personaId.apellido)"><i aria-hidden="true" 
                                        class="fa fa-times"></i> Dar de baja</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>


                        </div>

                          <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

                                </div> 


                    </div>
                   </div>
            </div>
          
        </section>
    </div>
</template>
<script>
    
    import escuelasController from '../../controllers/escuelas.js';    
        import atletaController from '../../controllers/atletas.js';

     
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'AgregarAtleta',
        data() {
            return {
                
                escuela: {entrenadorId:{}},
                datos:[],
                
                sinescuelas:[],
                conescuelas:[],
                atletaEscuela:{},
                
                
                atleta:null,
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
                id:'',
 columns: [ 
 
                       {
                      label: 'Nombre',
                      field: 'personaId.nombre',
                      filterable: true
                    },
                    {
                      label: 'Apellido',
                      field: 'personaId.apellido',
                      filterable: true
                    },

                     {
                      label: 'Edad',
                      field: 'personaId.fechaNacimiento',
                      filterable: true
                    },
                    {
                      label: 'Sexo',
                      field: 'personaId.sexo',
                      filterable: true
                    },

                    {
                      label: 'Años Practicando',
                      field: 'aniosPracticando',
                      type: 'number',
                      filterable: true
                    },
                     {
                      label: 'Playa donde Practica',
                      field: 'playaPractica',
                      filterable: true
                    },
                     {
                      label: 'Lado del Pie',
                      field: 'ladoPie',
                      filterable: true
                    },
                      {
                      label: 'Ola Preferida',
                      field: 'olaPreferida',
                      filterable: true
                    },
                    
                     {
                      label: 'Acción',
                      field: '',
                      filterable: true
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
               
                escuelasController.retrieve(this,this.id)
                escuelasController.sinescuela(this)
               escuelasController.conescuela(this,this.id)

                 
            },
                  submit() {
                         
                this.showAlert = false
                this.showSuccess = false

                this.$validator.validateAll().then(success => {
                    if (success) {
                    if(this.atleta.id>0)
                    {   

                        this.atletaEscuela.escuela=this.id;
                        this.atletaEscuela.atleta=this.atleta.id;
                                                                       
                        escuelasController.asociar(this,this.atletaEscuela)
                    }
                     else{

                         this.showAlert = true
                        this.errMsg = "Debe seleccionar un atleta"
                     }
                    }
                    else{
                          console.log("Error enn el formulario")
                        this.showAlert = true
                        this.errMsg = "Error revisa el formulario"
                    }
                });
            },
            deleteAtletaEscuela(idatleta, nombre) {
                let context = this;
                let swal = this.$swal;
               
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del Atleta <b>&laquo;' + nombre + '&raquo</b><br> en la Escuela y toda la informacion en relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    
                    
                    escuelasController.desasociar(context,idatleta,swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El Atleta en la Escuela no se dio de baja',
                          'error'
                        )
                    }
                })
            },
            volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
,
             _calculateAge(birthday) {
            var today = new Date();
            var birthDate = new Date(birthday);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
              }
        }
    }
</script>