<template>
    <div>
        <section class="content-header">
            <h1>Cuentas</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/cuentas">Cuentas</router-link>
                </li>
                <li class="active">Formulario de Cuentas</li>


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
                            <h3 class="box-title" v-if="!id">Agregar  Cuenta</h3>
                            <h3 class="box-title" v-if="id">Editar  Cuentas</h3>
                        </div>

                        <div class="box-body">

                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }">
                                            <label for="">Nombre Cuenta</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control" v-model="cuenta.nombre" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span> </div>
                                    </div>


                                    <!--  :disabled="id"    -->

                                      <div  class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('monto') }">
                                            <label for="">Monto Actual ($)</label>
                                            <div class="input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="number" id="monto" name="monto" data-vv-as="Monto" min="0" class="form-control" v-model="cuenta.monto" v-validate="'required|min_value:0.01'" step="0.01" disabled>
                                                    
                                            </div>
                                            <span class="help-block" for="monto" v-bind:data-error="errors.first('monto')">
                                                {{ errors.first('monto') }}
                                            </span>
                                        </div>
                                    </div>


                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }">
                                            <label for="">Descripción Cuenta</label>
                                            <textarea rows="4" cols="50" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control" v-model="cuenta.descripcion" v-validate="'required'"> </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar Cuenta</button>
                                        <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar Cuenta</button>

                                    </div>
                                </div>

                            </form>
                        </div>

                        <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Cuentas
                                </div>

                                </div> 

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

  import cuentasController from '../../controllers/cuentas.js'
  import vSelect from "vue-select"
  export default {
      name: 'Cuenta',
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
              cuenta: {}
          }
      },
      components: {
          vSelect
      },
      created() {
          this.id = this.$route.params.id;
          if (this.id)
              cuentasController.retrieve(this, this.id);
            else
              this.cuenta.monto="0.00";
          console.log("id:" + this.id);
      },
      methods: {

          submit() {
              this.showAlert = false
              this.showSuccess = false
              this.$validator.validateAll().then(success => {
                  if (success) {
                      console.log("Error en el servicio")
                      if (!this.id)
                          cuentasController.create(this, this.cuenta)
                      else
                          cuentasController.update(this, this.cuenta)
                  } else {
                      console.log("Error enn el formulario")
                      this.showAlert = true
                      this.errMsg = "Form error"
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
