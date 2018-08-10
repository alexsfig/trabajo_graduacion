<template>
    <div>
        <section class="content-header">
            <h1>Certificaciones</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li><router-link to="/admin/jueces">Jueces</router-link></li>
                <li class="active">Certificaciones</li>


            </ol>
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
                            <h4><i class="icon fa fa-check"></i> Exito!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" v-if="!id">Agregar  Nuevo juez </h3>
                             <h3 class="box-title" v-if="id"></h3>


                              <router-link :to="{ name: 'JuecesIndex'}">
                                        <button type="button" class="btn btn-flat btn-sm btn-warning margin"
                                       ><i aria-hidden="true"
                                         class="fa fa-chevron-circle-left"></i> Regresar a Jueces</button>
                                        </router-link> 

                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> 
                             
                                

                                   

                                    <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-3.descripcion') }">
                                            <label for="">Descripción del juez</label>
                                            <textarea v-model="juez.descripcion" class="form-control" name="descripcion" rows="2" data-vv-as="Descripcion del juez" v-validate="'required'" disabled>

                                            </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-3.descripcion')">
                                                    {{ errors.first('form-3.descripcion') }}
                                                </span>
                                      
                                    </div>
                                    <div class="clearfix"></div>
                                    <h4>
                                            Agregar certificaciones:
                                        </h4>
                                          </div>
                                    <div class="col-sm-12">
                                        <form @submit.prevent="add_certificacion('form-4')" action="" data-vv-scope="form-4">

                                            <div class="col-md-5">

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
                                            <label for="">Fecha Expedición</label>
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


                                               
                                               
                                                <div class="col-xs-12">
                                                    <div class="fgroup required" :class="{ 'has-error': errors.has('form-4.lugar') }">
                                                        <label for="">Lugar Expedición</label>
                                                        <input v-model="newCert.lugar" name="lugar" type="text" class="form-control" data-vv-as="Lugar de Expedicion" v-validate="'required'">
                                                        <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-4.descripcion')">
                                                                {{ errors.first('form-4.lugar') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 text-right">
                                                    <button type="submit" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-plus"></i> Agregar Certificación </button>
                                                </div>
                                                 <div class="clearfix"></div>
                                            </div>
                                            
                                            <div class="col-md-7">
                                                <div class="col-xs-12 ">
                                                    <vue-good-table :columns="columns" :rows="juez.certificacionList" title="Certificaciones del juez" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                                        <template slot="table-row" scope="props">
                                                            <td class="nowrap">{{ props.row.titulo }}</td>
                                                            <td>{{ props.row.fecha }}</td>
                                                            <td>{{ props.row.lugar }}</td>
                                                            <td>
                                                              
                                                               <router-link :to="{ name: 'certiForm', params: { id: props.row.id }}">
                                                               <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                                                ><i aria-hidden="true"
                                                                class="fa fa-pencil-square-o"></i> Actualizar</button>
                                                                 </router-link> 


                                                                <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteCert(props.row.id, props.row.titulo)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>

                                                            </td>
                                                        </template>
                                                    </vue-good-table>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </form>
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
      newCert:{fecha:null},



      clearBtn: true,
      todayBtn: true,
      closeOnSelected: true,
      limitFrom: '',
      limitTo: '',
      format: 'yyyy-MM-dd',
      weekStartsWith: 0,
          
      createPersona:{},
      errMsg: "",
      isLogin: false,
      juez: {certificacionList:[]},
  
        columns: [{
                label: "Titulo Obtenido",
                field: "titulo",
            }, {
                label: "Fecha Expedición",
                field: "fecha",
            }, {
                label: "Lugar Expedición",
                field: "lugar",
            }, {
                label: "Acción"
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
    
    if (this.id) juecesController.retrieve(this, this.id);
    console.log("idfwfddwfdfwwwe:" + this.id);
  },
  
  
 
  methods: {

   deleteCert(id, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la certificacion <b>' + nombre + ' </b> del juez',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        certiController.delete(context, id, swal)
                        
                        
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Certificacion no se elimino',
                          'error'
                        )
                      }
                    }
                )
            },

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
          console.log("Error en el servicio");
          if (!this.id) juecesController.create(this, this.tipoTransaccion);
          else juecesController.update(this, this.tipoTransaccion);
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
                    this.creaCert.push(this.newCert)
                    this.newCert.juezId={id:this.juez.id}                    
                    certiController.create(this, this.newCert)
                    this.newCert = {
                        fecha: null,
                    }

  juecesController.retrieve(this, this.id);
                } else {
                    this.showAlert = true
                    this.errMsg = "Por favor complete el formulario"
                }
            });
        }
  },  
};
</script>
<style scoped>

