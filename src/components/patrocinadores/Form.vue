<template>
    <div>
        <section class="content-header">
            <h1>Patrocinadores</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>
                    <router-link to="/admin/patrocinadors">Patrocinadores</router-link>
                </li>
                <li class="active">Formulario de Patrocinadores</li>
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
                            <h3 class="box-title" v-if="!id">Agregar  Patrocinador</h3>
                            <h3 class="box-title" v-if="id">Actualizar  Patrocinador</h3>
                        </div>
                        <div class="box-body">
                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('nombre') }">
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre" class="form-control" v-model="patrocinador.nombre" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('nit') }">
                                            <label for="">Nit</label>
                                            <masked-input mask="1111-111111-111-1" placeholder="####-######-###-#" name="nit" data-vv-as="Nit" class="form-control" v-model="patrocinador.nit" v-validate="'required'" />
                                            <span class="help-block" for="nit" v-bind:data-error="errors.first('nit')">
                                                {{ errors.first('nit') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <!--<div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('telefono') }">
                                            <label for="">Telefono</label>
                                            <input type="text" id="telefono" name="telefono" data-vv-as="Telefono" class="form-control" v-model="patrocinador.telefono" v-validate="'required'">
                                            <span class="help-block" for="telefono" v-bind:data-error="errors.first('telefono')">
                                                {{ errors.first('telefono') }}
                                            </span>
                                        </div>
                                    </div> -->
                                     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('telefono') }">
                                            <label for="">Telefono</label>
                                          <masked-input mask="1111-1111" placeholder="####-####" name="telefono" data-vv-as="Telefono" class="form-control" v-model="patrocinador.telefono" v-validate="'required'"/>
                                            <span class="help-block" for="telefono" v-bind:data-error="errors.first('telefono')">
                                                {{ errors.first('telefono') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('correo') }">
                                            <label for="">Correo</label>
                                            <input type="email" id="correo" name="correo" data-vv-as="Correo" class="form-control" v-model="patrocinador.correo" v-validate="'required|email'">
                                            <span class="help-block" for="correo" v-bind:data-error="errors.first('correo')">
                                                {{ errors.first('correo') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('tipo') }">
                                            <label for="">Tipo</label>
                                            <v-select :debounce="250" :options="tipo" v-model="patrocinador.tipo" placeholder="Seleccione el Tipo" label="label">
                                            </v-select>
                                            <input type="hidden" name="tipo" value="" data-vv-as="Tipo" v-model="patrocinador.tipo" v-validate="'required'">
                                            <span class="help-block" for="tipo" v-bind:data-error="errors.first('tipo')">
                                                {{ errors.first('tipo') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('direccion') }">
                                            <label for="">Dirección</label>
                                            <textarea id="direccion" name="direccion" data-vv-as="Dirección" class="form-control" v-model="patrocinador.direccion" v-validate="'required'" rows="3"></textarea>
                                            <!-- <input type="text" id="direccion" name="direccion" data-vv-as="direccion" class="form-control" v-model="patrocinador.direccion" v-validate="'required'"> -->
                                            <span class="help-block" for="direccion" v-bind:data-error="errors.first('direccion')">
                                                {{ errors.first('direccion') }}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-plus"></i> Agregar</button>
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

  import patrocinadorsController from '../../controllers/patrocinadores.js'
  import vSelect from "vue-select"
  import masked from "vue-masked-input"
  export default {
      name: 'Patrocinador',
      data() {
          return {
              errMsg: '',
              errorMsg: '',
              showAlert: false,
              showSuccess: false,
              successMsg: "",
              id: '',
              errMsg: "",
              isLogin: false,
              tipo: [{
                      label: 'Persona Juridica',
                      value: 'Persona Juridica'
                  }, {
                      label: 'Persona Natural',
                      value: 'Persona Natural'
                  }

              ],
              patrocinador: {
                  nit:null,
                  tipo:null,
                  telefono:null



              }
          }
      },
      components: {
          vSelect,
          'masked-input': masked
      },
      created() {
          this.id = this.$route.params.id;
          if (this.id)
              patrocinadorsController.retrieve(this, this.id);
          console.log("id:" + this.id);
      },


      methods: {

          submit() {
              this.showAlert = false
              this.showSuccess = false
              this.$validator.validateAll().then(success => {
                  if (success) {
                      console.log("Error en el servicio")
                      this.patrocinador.tipo = this.patrocinador.tipo.label == undefined ? this.patrocinador.tipo : this.patrocinador.tipo.label
                      if (!this.id)
                          patrocinadorsController.create(this, this.patrocinador)
                      else
                          patrocinadorsController.update(this, this.patrocinador)
                  } else {
                      console.log("Error enn el formulario")
                      this.showAlert = true
                      this.errMsg = "Error revisa el formulario"
                  }
              });
          },
          volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
      }

  }

</script>
