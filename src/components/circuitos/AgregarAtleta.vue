<template>
    <div>
        <section class="content-header">
            <h1>Inscripcion de Atletas</h1>

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
                            <h3 class="box-title">Atletas Inscritos en la Fecha: <b>{{circuito.fechaId.nombre}}</b>   del Circuito: <b>{{circuito.nombre }} </b></h3>
                        </div>
                       
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
                         <vue-good-table :columns="columns" :rows="atletaCircuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.atletaId.personaId.nombre}}</td> 
                                   
                                   <td>{{props.row.atletaId.personaId.apellido}}</td> 
                                     <td>{{ props.row.atletaId.aniosPracticando}}</td> 
                                     <td>{{ props.row.atletaId.playaPractica}}</td>    
                                     <td>{{ props.row.atletaId.ladoPie}}</td>   
                                     <td>{{ props.row.atletaId.olaPreferida}}</td>   
                                    <td> {{ _calculateAge( props.row.atletaId.personaId.fechaNacimiento)  }} años</td>
                                      <td> {{ props.row.atletaId.personaId.sexo == 'F' ? 'Femenino' : 'Masculino' }}</td>                                
                                         <td class="nowrap">
                                 <!--    <router-link :to="{ name: 'circuitosEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>               -->
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteCircuito(props.row.id, props.row.atletaId.personaId.nombre+','+props.row.atletaId.personaId.apellido)"><i aria-hidden="true" 
                                        class="fa fa-times"></i> Dar de baja</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>


                        </div>

                          <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> x Regresar a Circuitos
                                </div>

                                </div> 


                    </div>
                   </div>
            </div>
          
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
                listheat:[],
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
                      label: 'Edad',
                      field: 'fechaNacimiento',
                      filterable: true
                    },
                    {
                      label: 'Sexo',
                      field: 'sexo',
                      filterable: true
                    },
                     {
                      label: 'Accion',
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
               // circuitosController.index(this)
               atletaCircuitoController.indexByCircuito(this,this.id);
                       atletaCircuitoController.getheat(this,this.id);
                circuitosController.retrieve(this,this.id)
                 atletaController.byCircuito(this, this.id)

                 console.log("son :"+Object.keys(this.atletaCircuitos).length)
/*
  for (let i of this.atletas) {
  i.nombre=i.personaId.nombre+","+i.personaId.apellido;
  console.log("nombre:"+ i.nombre)
  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
}*/
            },
                  submit() {
                         console.log("son :"+Object.keys(this.atletaCircuitos).length)
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
                    html: 'No podras recuperar la informacion del Atleta <b>&laquo;' + nombre + '&raquo</b><br> en el Circuito y toda la informacion en relacion al mismo ya no sera accesible',
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
                          'El Atleta en el Circuito no se dio de baja',
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