<template>
    <div>
        <section class="content-header">
            <h1>Circuitos</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                      <router-link :to="{ name: 'circuitosIndexByFecha', params: { id: this.id2 }}">
                                       Circuitos
                                        </router-link> 
                </li>
                <li class="active">Formulario de Circuitos</li>


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
                            <h3 class="box-title" v-if="!id">Agregar  Circuito</h3>
                            <h3 class="box-title" v-if="id">Editar  Circuitos</h3>
                        </div>

                        <div class="box-body">

                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }">
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control" v-model="circuito.nombre" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }">
                                            <label for="">Descripción</label>
                                            <input type="text" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control" v-model="circuito.descripcion" v-validate="'required'">
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix">

                                    </div>

                                      <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" >
                                            <label for="">Fecha</label>
                                            <input type="text" id="fecha.nombre" name="fecha.nombre" data-vv-as="fecha.nombre" class="form-control" v-model="fecha.nombre" v-validate="'required'" disabled>
                                            <span class="help-block" for="fecha.nombre" v-bind:data-error="errors.first('fecha.nombre')">
                                                {{ errors.first('fecha.nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                   
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('categoriaId') }">
                                            <label for="categoriaId">Categoria</label>
                                            <v-select :debounce="250" :options="categorias" v-model="circuito.categoriaId" placeholder="Escoja una categoria" label="nombreCategoria">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="categoriaId" value="" data-vv-as="categoriaId" v-model="circuito.categoriaId" v-validate="'required'">
                                            <span class="help-block" for="categoriaId" v-bind:data-error="errors.first('categoriaId')">
                                                {{ errors.first('categoriaId') }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
                                        <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar</button>

                                    </div>
                                </div>

                                <div class="box-body">
                                 <router-link :to="{ name: 'circuitosIndexByFecha', params: { id: this.id2 }}">
                                        <button type="button" class="btn btn-flat btn-sm btn-warning margin"
                                       ><i aria-hidden="true"
                                         class="fa fa-arrow-circle-left"></i>  Regresar a Circuitos</button>
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

  import circuitosController from '../../controllers/circuitos.js'
  import vSelect from "vue-select"
  import fechasController from '../../controllers/fechas.js'
  import categoriasController from '../../controllers/categorias.js'
  export default {
      name: 'Circuito',
      data() {
          return {
              errMsg: '',
              errorMsg: '',
              showAlert: false,
              showSuccess: false,
              successMsg: "",
              id: '',  
              id2: '', 
                          
              errMsg: "",
              isLogin: false,
              circuito: {},
              fecha: [],
              categorias: []
          }
      },
      components: {
          vSelect
      },
      created() {
          this.id = this.$route.params.idcircuito;
          this.id2 = this.$route.params.idfecha;
          if (this.id)
              circuitosController.retrieve(this, this.id);
          console.log("id:" + this.id);
          
          categoriasController.index(this)

          fechasController.retrieve(this, this.id2)
      },
      methods: {

          submit() {
              this.showAlert = false
              this.showSuccess = false
              this.$validator.validateAll().then(success => {
                  if (success) {
                      console.log("Error en el servicio")
                      if (!this.id)
                          circuitosController.create(this, this.circuito)
                      else
                          circuitosController.update(this, this.circuito)
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
