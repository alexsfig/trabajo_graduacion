<template>
    <div>
        <section class="content-header">
            <h1>Certificaciones</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/jueces">Jueces</router-link>
                </li>
                <li class="active">Editar Certificacion</li>
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
                            <h4><i class="icon fa fa-check"></i> Success!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>

                   



                    <div class="box">                    


                        <div class="box-header">
                            <h3 class="box-title" v-if="!id">Agregar  Tipo de Transaccion</h3>
                            <h3 class="box-title" v-if="id">Editar Certificacion</h3>
                        </div>

                        <div class="box-body">

                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('titulo') }">
                                            <label for="">Titulo Obtenido</label>
                                            <input type="text" id="titulo" name="titulo" data-vv-as="Titulo Obtenido" class="form-control" v-model="Certificacion.titulo" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('titulo')">
                                                {{ errors.first('titulo') }}
                                            </span>
                                        </div>
                                    </div>




                                         <div class="col-xs-12 col-sm-4">
                                         <div class="fgroup"  :class="{ 'has-error': errors.has('fecha') }">
                                            <label for="">Fecha Expedicion</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fecha" name="fecha" class="form-control" data-vv-as="Fecha de Expedicion" v-model="Certificacion.fecha" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fecha') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fecha') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="Certificacion.fecha" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="fecha" v-bind:data-error="errors.first('fecha')">
                                                {{ errors.first('fecha') }}
                                            </span>
                                        </div>
                                    </div>

                                     <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('lugar') }">
                                            <label for="">Lugar Expedicion</label>
                                            <input type="text" id="lugar" name="lugar" data-vv-as="Lugar" class="form-control" v-model="Certificacion.lugar" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('lugar')">
                                                {{ errors.first('lugar') }}
                                            </span>
                                        </div>
                                    </div>                                  
                                   
                                   
                                

                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
                                        <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar</button>

                                    

                                    </div>

                                    

                            <router-link :to="{ name: 'juezEdit', params: { id: Certificacion.juezId.id }}">
                                        <button type="button" class="btn btn-flat btn-sm btn-warning margin"
                                       ><i aria-hidden="true"
                                         class="fa fa-chevron-circle-left"></i> Regresar a Certificaciones del Juez</button>
                                        </router-link> 

                                     
                                

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

 
 import certiController from "../../controllers/certificacion.js";
  import vSelect from "vue-select"
  export default {
      name: 'TipoTransaccion',
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
              Certificacion: {},


               clearBtn: true,
               todayBtn: true,
               closeOnSelected: true,
               limitFrom: '',
               limitTo: '',
               format: 'yyyy-MM-dd',
               weekStartsWith: 0,
          }
      },
      components: {
          vSelect
      },
      created() {
          this.id = this.$route.params.id;
          if (this.id)
             certiController.retrieve(this, this.id);
          console.log("id:" + this.id);
      },



      watch: {
          '$route': 'fetchData',
         
      },
      methods: {
          submit() {
              this.showAlert = false
              this.showSuccess = false
              this.$validator.validateAll().then(success => {
                  if (success) {
                      console.log("Error en el servicio")
                      if (!this.id)
                          certiController.create(this, this.Certificacion)
                      else
                          certiController.update(this, this.Certificacion)
                  } else {
                      console.log("Error enn el formulario")
                      this.showAlert = true
                      this.errMsg = "Form error"
                  }
              });
          }
      }

  }

</script>
