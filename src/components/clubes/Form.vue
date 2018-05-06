<template>
    <div>
        <section class="content-header">
            <h1>Clubes</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li><router-link to="/admin/club">Clubes</router-link></li>
                <li class="active">Formulario de  Clubes</li>


            </ol>
        </section>
       <section class="content">
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
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" v-if="!id">Agregar  Club</h3>
                             <h3 class="box-title" v-if="id">Actualizar Club</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> <div class="col-xs-12 col-sm-6">
                         <div class="fgroup required" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control"
											v-model="club.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>      </div>
                                    </div>


 <div class="col-xs-6 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('fundacion') }" >
                                            <label for="">Fundación</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fundacion" name="fundacion" class="form-control" data-vv-as="fecha de fundacion" v-model="club.fundacion" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fundacion') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fundacion') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="club.fundacion" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="fundacion" v-bind:data-error="errors.first('fundacion')">
                                                {{ errors.first('fundacion') }}
                                            </span>
                                        </div>
                                    </div>


 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup required" :class="{ 'has-error': errors.has('correo') }" >
                                            <label for="">Correo Electronico</label>
                                            <input type="email" id="correo" name="correo" data-vv-as="correo" class="form-control"
											v-model="club.correo" v-validate="'required|email'" >
                                            <span class="help-block" for="correo" v-bind:data-error="errors.first('correo')">
                                                {{ errors.first('correo') }}
                                            </span>      </div>
                                    </div>


 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup required" :class="{ 'has-error': errors.has('representante') }" >
                                            <label for="">Representante</label>
                                            <input type="text" id="representante" name="representante" data-vv-as="representante" class="form-control"
											v-model="club.representante" v-validate="'required'" >
                                            <span class="help-block" for="representante" v-bind:data-error="errors.first('representante')">
                                                {{ errors.first('representante') }}
                                            </span>      </div>
                                    </div>



<div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('celular') }">
                                            <label for="">Celular</label>
                                            <masked-input mask="1111-1111" placeholder="####-####" id="celular" name="celular" data-vv-as="celular " class="form-control" v-model="club.celular" v-validate="'required'">
                                            </masked-input>
                                            <span class="help-block" for="celular" v-bind:data-error="errors.first('celular')">
                                                    {{ errors.first('celular') }}
                                                </span>
                                        </div>
                                    </div>




 <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('telefonoFijo') }">
                                            <label for="">Telefono Fijo</label>
                                            <masked-input mask="1111-1111" placeholder="####-####" id="telefonoFijo" name="telefonoFijo" data-vv-as="telefonoFijo " class="form-control" v-model="club.telefonoFijo" v-validate="'required'">
                                            </masked-input>
                                            <span class="help-block" for="telefonoFijo" v-bind:data-error="errors.first('telefonoFijo')">
                                                    {{ errors.first('telefonoFijo') }}
                                                </span>
                                        </div>
                                    </div>
                              
     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required"  :class="{ 'has-error': errors.has('playaId') }">
                                            <label for="playaId">Playa</label>
                                            <v-select
                                                :debounce="250"
                                                :options="playas"
                                                v-model="club.playaId"
                                                placeholder="Escoja una playa" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden"  name="playaId" value="" data-vv-as="playa"  v-model="club.playaId" v-validate="'required'">
                                            <span class="help-block" for="playaId" v-bind:data-error="errors.first('playaId')">
                                                {{ errors.first('playaId') }}
                                            </span>
                                        </div>
                                    </div>     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required"  :class="{ 'has-error': errors.has('entrenadorId') }">
                                            <label for="entrenadorId">Entrenador</label>
                                            <v-select
                                                :debounce="250"
                                                :options="entrenadores"
                                                v-model="club.entrenadorId"
                                                placeholder="Escoja un entrenador" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="entrenadorId" value="" data-vv-as="entrenador"  v-model="club.entrenadorId" v-validate="'required'">
                                            <span class="help-block" for="entrenadorId" v-bind:data-error="errors.first('entrenadorId')">
                                                {{ errors.first('entrenadorId') }}
                                            </span>
                                        </div>
                                    </div>  

                                       <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('direccion') }" >
                                            <label for="">Dirección</label>
                                            <textarea id="direccion" name="direccion" data-vv-as="Direccion" class="form-control" v-model="club.direccion" v-validate="'required'" rows="3"></textarea>
                                                {{ errors.first('club.direccion') }}
                                            <span class="help-block" for="direccion" v-bind:data-error="errors.first('direccion')"> 
                                                {{ errors.first('direccion') }}
                                            </span>

                                        </div>
                                    </div>




                                    </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit"  v-if="!id" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-plus"></i> Agregar</button>
                                            <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-edit"></i> Actualizar</button>

                                    </div>
                                </div>

                            </form>
                       
                        <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

                                </div>  </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import clubsController from "../../controllers/clubes.js";
import vSelect from "vue-select";
import playasController from "../../controllers/playas.js";
import entrenadoresController from "../../controllers/entrenadores.js";
import masked from "vue-masked-input";
export default {
  name: "Club",
  data() {
    return {
      clearBtn: true,
      todayBtn: true,
      closeOnSelected: true,
      limitFrom: "",
      limitTo: "",
      format: "yyyy-MM-dd",
      weekStartsWith: 0,

      errMsg: "",
      errorMsg: "",
      showAlert: false,
      showSuccess: false,
      successMsg: "",
      id: "",
      errMsg: "",
      isLogin: false,
      club: {
        correo: null,
        playaId: null,
        entrenadorId: null,
        celular:null,
        telefonoFijo:null,
        fundacion:null
      },
      playas: [],
      entrenadores: []
    };
  },
  components: {
    vSelect,
    "masked-input": masked
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) clubsController.retrieve(this, this.id);
    console.log("id:" + this.id);
    playasController.index(this);
    entrenadoresController.index(this);
  },
  methods: {
    submit() {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll().then(success => {
        if (success) {
          console.log("Error en el servicio");
          if (!this.id) clubsController.create(this, this.club);
          else clubsController.update(this, this.club);
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Error revisa el formulario";
        }
      });
    },

    volver() {
      console.log("entre");
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
<style scoped>