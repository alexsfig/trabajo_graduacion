<template>
    <div>
        <section class="content-header">
           
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li><router-link to="/admin/jueces">Jueces</router-link></li>
                <li class="active">Agregar como juez</li>


            </ol>
        </section>
        <section class="content-header">         
           
          
        </section>
       <section class="content">
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
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" v-if="!id">Agregar Nuevo juez </h3>
                             <h3 class="box-title" v-if="id"></h3>


                              <router-link :to="{ name: 'PersonaIndex'}">
                                        <button type="button" class="btn btn-flat btn-sm btn-warning margin"
                                       ><i aria-hidden="true"
                                         class="fa fa-chevron-circle-left"></i> Regresar a personas</button>
                                        </router-link> 

                        </div>
                        
                        <div class="box-body">


        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> 
                             
                                

                                   

                                    <div class="col-xs-12 col-sm-12">

                                    <h3>Agregar como juez a <b>{{persona.nombre}},{{persona.apellido}} </b></h3>



                                        <div class="fgroup required" :class="{ 'has-error': errors.has('descripcion') }">

                                            <label for="">Descripcion del juez</label>
                                            <textarea v-model="descripcion" class="form-control" name="descripcion" rows="2" data-vv-as="Descripcion del juez" v-validate="'required'" >

                                            </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                    {{ errors.first('descripcion') }}
                                                </span>
                                      
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4>
                                            Agregar certificaciones:
                                        </h4>
                                          </div>
                                    <div class="col-sm-12">
                                        <form @submit.prevent="add_certificacion('form-4')" action="" data-vv-scope="form-4">

                                            <div class="col-sm-5">

                                                <div class="col-xs-12">
                                                    <div class="fgroup required" :class="{ 'has-error': errors.has('form-4.titulo') }">
                                                        <label for="">Titulo Obtenido</label>
                                                        <input v-model="newCert.titulo" name="titulo" type="text" data-vv-as="Titulo Obtenido" class="form-control" v-validate="'required'">
                                                        <span class="help-block" for="titulo" v-bind:data-error="errors.first('form-4.titulo')">
                                                                {{ errors.first('form-4.titulo') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                   
                                                
                                         <div class="col-xs-12">
                                         <div class="fgroup required"  :class="{ 'has-error': errors.has('form-4.fecha') }">
                                            <label for="">Fecha Expedicion</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fecha" name="fecha" class="form-control" data-vv-as="Fecha de Expedicion" v-model="newCert.fecha" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fecha') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fecha') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="newCert.fecha" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="fecha" v-bind:data-error="errors.first('fecha')">
                                                {{ errors.first('form-4.fecha') }}
                                            </span>
                                        </div>
                                    </div>


                                               
                                                <div class="clearfix"></div>
                                                <div class="col-xs-12">
                                                    <div class="fgroup required" :class="{ 'has-error': errors.has('form-4.lugar') }">
                                                        <label for="">Lugar Expedicion</label>
                                                        <input v-model="newCert.lugar" name="lugar" type="text" class="form-control" data-vv-as="Lugar de Expedicion" v-validate="'required'">
                                                        <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-4.descripcion')">
                                                                {{ errors.first('form-4.lugar') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 text-right">
                                                    <button type="submit" class="btn btn-flat btn-sm btn-primary"> <i class="fa fa-plus"></i> Agregar Certificación </button>
                                                </div>
                                            </div>
                                            <div class="col-xs-7">
                                                <div class="col-xs-12 ">
                                                    <vue-good-table :columns="columns" :rows="listaCert" title="Certificaciones del juez" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                                        <template slot="table-row" scope="props">
                                                            <td class="nowrap">{{ props.row.titulo }}</td>
                                                            <td>{{ props.row.fecha }}</td>
                                                            <td>{{ props.row.lugar }}</td>
                                                            <td>
                                                              
                                

                                                                <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteCert(props.index)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>

                                                            </td>
                                                        </template>
                                                    </vue-good-table>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </form>
                                           <div class="col-xs-12 col-sm-12 pull-right">
                                        <div class="box-footer">
                                            <div class="col-xs-12 text-right">
                                             
                                                <button type="submit" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-edit"></i> Guardar Juez </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                            
                                 
                              </div>
                               

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import juecesController from "../../controllers/jueces.js";
import personaController from "../../controllers/persona";
import certiController from "../../controllers/certificacion.js";
import vSelect from "vue-select";
export default {
  name: "TipoTransaccion",
  data() {
    return {
      errMsg: "",
      errorMsg: "",
      showAlert: false,
      showSuccess: false,
      successMsg: "",
      id: "",
      creaCert:[],
      newCert:{},
      persona:{},
descripcion:'',

      clearBtn: true,
      todayBtn: true,
      closeOnSelected: true,
      limitFrom: '',
      limitTo: '',
      format: 'yyyy-MM-dd',
      weekStartsWith: 0,
          listaCert:[],
      createPersona:{},
      errMsg: "",
      isLogin: false,
      juez: {certificacionList:[]},
  
        columns: [{
                label: "Titulo Obtenido",
                field: "titulo",
            }, {
                label: "Fecha Expedicion",
                field: "fecha",
            }, {
                label: "Lugar Expedicion",
                field: "lugar",
            }, {
                label: "Accion"
            }]
    };
  },
  components: {
    vSelect
  },
   watch: {
    showSuccess: function(val) {

      juecesController.retrieve(this, this.id);
    }
  },
  created() {
    this.id = this.$route.params.id;
    
    if (this.id) personaController.retrieve(this, this.id);
    console.log("idfwfddwfdfwwwe:" + this.id);
  },
  
  
 
  methods: {



   /*deleteCert(id) {
    console.log("id;"+id)
             certiController.delete(this, id,this.$swal)
             juecesController.retrieve(this, this.id);
        }, */
    submit() {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll().then(success => {
        if (success) {

            this.persona.juez={
           descripcion:this.descripcion,
           certificacionList:this.listaCert

            }


 personaController.update(this,this.persona)

            
      
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Form error";
        }
      });
    } ,   

fetchData(){



juecesController.retrieve(this, this.id);


},
  add_certificacion(scope) {
            this.$validator.validateAll(scope).then(success => {
                if (success) {
                    this.listaCert.push(this.newCert)
                    this.newCert = {
                        fecha: null,
                    }
                } else {
                    this.showAlert = true
                    this.errMsg = "Por favor complete el formulario"
                }
            });
        },
        deleteCert(id) {
            console.log("eliminar")
            this.listaCert.splice(id, 1);
        }
  },  
};
</script>
<style scoped>

