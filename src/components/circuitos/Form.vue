<template>
    <div>
        <section class="content-header">
            <h1>Circuitos</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/circuitos">Circuitos</router-link></li>
                <li class="active">Formulario de  Circuitos</li>


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
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control"
											v-model="circuito.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }" >
                                            <label for="">Descripcion</label>
                                            <input type="text" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control"
											v-model="circuito.descripcion" v-validate="'required'" >
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>      </div>
                                    </div>
     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('fechaId') }">
                                            <label for="fechaId">Fecha</label>
                                            <v-select
                                                :debounce="250"
                                                :options="fechas"
                                                v-model="circuito.fechaId"
                                                placeholder="Escoja una fechaId" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="fechaId" value="" data-vv-as="fechaId"  v-model="circuito.fechaId" v-validate="'required'">
                                            <span class="help-block" for="fechaId" v-bind:data-error="errors.first('fechaId')">
                                                {{ errors.first('fechaId') }}
                                            </span>
                                        </div>
                                    </div>     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('categoriaId') }">
                                            <label for="categoriaId">Categoria</label>
                                            <v-select
                                                :debounce="250"
                                                :options="categorias"
                                                v-model="circuito.categoriaId"
                                                placeholder="Escoja una categoriaId" 
                                                label="nombreCategoria">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="categoriaId" value="" data-vv-as="categoriaId"  v-model="circuito.categoriaId" v-validate="'required'">
                                            <span class="help-block" for="categoriaId" v-bind:data-error="errors.first('categoriaId')">
                                                {{ errors.first('categoriaId') }}
                                            </span>
                                        </div>
                                    </div>  </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit"  v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
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

<script>  import circuitosController from '../../controllers/circuitos.js'
  import vSelect from "vue-select" 
  import fechasController from '../../controllers/fechas.js'
  import categoriasController from '../../controllers/categorias.js'
export default {
        name: 'Circuito',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
id: '',
                errMsg: "",
                isLogin: false,
circuito:{},fechas:[],categorias:[]}
        },
        components:{
            vSelect
        },
        created(){
                this.id = this.$route.params.id;
                if(this.id)
                circuitosController.retrieve(this,this.id);
                console.log("id:"+this.id);
                fechasController.index(this) 
categoriasController.index(this) 
  },
        methods: {
        
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                     console.log("Error en el servicio")
                     if(!this.id)
                        circuitosController.create(this, this.circuito)
                        else
                        circuitosController.update(this,this.circuito)
                    }
                    else{
                          console.log("Error enn el formulario")
                        this.showAlert = true
                        this.errMsg = "Form error"
                    }
                });
            }
        }

    }
</script>
<style scoped>