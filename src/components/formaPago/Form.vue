<template>
    <div>
        <section class="content-header">
            <h1>Formas de Pago</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/formaPagos">Formas de Pago</router-link>
                </li>
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
                            <h3 class="box-title" v-if="!id">Agregar Forma de Pago</h3>
                            <h3 class="box-title" v-if="id">Editar Forma de Pago</h3>
                        </div>
                        <div class="box-body">
                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }">
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control" v-model="formaPago.nombre" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }">
                                            <label for="">Descripcion</label>
                                            <!-- <input type="text" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control" v-model="formaPago.descripcion" v-validate="'required'"> -->

                                            <textarea rows="4" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control" v-model="formaPago.descripcion" v-validate="'required'"> </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix">

                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
                                        <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar</button>
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

  import formaPagosController from '../../controllers/formaPagos.js'
  import vSelect from "vue-select"
  export default {
      name: 'FormaPago',
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
              formaPago: {}
          }
      },
      components: {
          vSelect
      },
      created() {
          this.id = this.$route.params.id;
          if (this.id)
              formaPagosController.retrieve(this, this.id);
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
                          formaPagosController.create(this, this.formaPago)
                      else
                          formaPagosController.update(this, this.formaPago)
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
