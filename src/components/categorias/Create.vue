<template>
    <div>
        <section class="content-header">
            <h1>Categorias</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/categorias">Categorias</router-link></li>
                <li class="active">Agregar Categorias</li>
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
                            <h3 class="box-title">Agregar Categorias</h3>
                        </div>

                        <div class="box-body">

                            <form @submit.prevent="submit"  role="form">
                                <div class="box-body">

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombreCategoria') }" >
                                            <label for="">Nombre Categoria</label>
                                            <input type="text" id="nombreCategoria" name="nombreCategoria" data-vv-as="Nombre de la categoria" class="form-control" v-model="createCategorias.nombreCategoria" v-validate="'required'" >
                                            <span class="help-block" for="nombreCategoria" v-bind:data-error="errors.first('nombreCategoria')">
                                                {{ errors.first('nombreCategoria') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('sexo') }">
                                            <label for="">Sexo</label>
                                            <v-select
                                                :debounce="250"
                                                :options="sexo"
                                                v-model="createCategorias.sexo"
                                                placeholder="Seleccione el genero"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="sexo" value="" data-vv-as="sexo"  v-model="createCategorias.sexo" v-validate="'required'">
                                            <span class="help-block" for="sexo" v-bind:data-error="errors.first('sexo')">
                                                {{ errors.first('sexo') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('edadMin') }" >
                                            <label for="">Edad Minima</label>
                                            <input type="number" id="edadMin" name="edadMin" data-vv-as="Edad Minima de la categoria" class="form-control" v-model="createCategorias.edadMin" v-validate="'required|min_value:7|max_value:79'" >
                                            <span class="help-block" for="edadMin" v-bind:data-error="errors.first('edadMin')">
                                                {{ errors.first('edadMin') }}
                                            </span>
                                        </div>
                                    </div>

                                     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('edadMax') }" >
                                            <label for="">Edad Maxima</label>
                                            <input type="number" id="edadMax" name="edadMax"  data-vv-as="Edad Maxima de la categoria" class="form-control" v-model="createCategorias.edadMax" v-validate="'required|min_value:7|max_value:79'" 
                                            >
                                            <span class="help-block" for="edadMax" v-bind:data-error="errors.first('edadMax')">
                                                {{ errors.first('edadMax') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcionCategoria') }" >
                                            <label for="">Descripción</label>
                                            <textarea rows="4" cols="50" id="descripcionCategoria" name="descripcionCategoria" data-vv-as="Descripcion de la categoria" class="form-control" v-model="createCategorias.descripcionCategoria" v-validate="'required'"> </textarea>



                                            <span class="help-block" for="descripcionCategoria" v-bind:data-error="errors.first('descripcionCategoria')">
                                                {{ errors.first('descripcionCategoria') }}
                                            </span>
                                        </div>
                                    </div>

                                      <!--<div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcionCategoria') }" >
                                            <label for="">Descripcion</label>
                                            <input type="text" id="descripcionCategoria" name="descripcionCategoria" data-vv-as="Descripcion de la categoria" class="form-control" v-model="createCategorias.descripcionCategoria" v-validate="'required'" >
                                            <span class="help-block" for="descripcionCategoria" v-bind:data-error="errors.first('descripcionCategoria')">
                                                {{ errors.first('descripcionCategoria') }}
                                            </span>
                                        </div>
                                    </div> -->


                                   <!-- <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('sexo') }" >
                                            <label for="">Sexo</label>
                                            <input type="text" id="sexo" name="sexo" data-vv-as="Sexo de la Categoria" class="form-control" v-model="createCategorias.sexo" v-validate="'required'" >
                                            <span class="help-block" for="sexo" v-bind:data-error="errors.first('sexo')">
                                                {{ errors.first('sexo') }}
                                            </span>
                                        </div>
                                    </div> -->

                                   <!-- <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('sexo') }" >
                                            <label for="">Sexo</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button   v-model="createCategorias.sexo"   :width="130" :height="35" id="changed-font" :labels="{checked: 'Masculino', unchecked: 'Femenino'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                            </span>
                                            <span class="help-block" for="sexo" v-bind:data-error="errors.first('sexo')">
                                                {{ errors.first('sexo') }}
                                            </span>
                                        </div>
                                    </div>  -->




                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">Agregar Categoria</button>
                                    </div>
                                </div>

                            </form>
                             <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import categorias from '../../controllers/categorias.js'
    import vSelect from "vue-select"



    export default {
        name: 'Categorias',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createCategorias: {
                    edadMax: null,
                    edadMin: null
                },

                sexo:[
                    {name: 'M', nombre:'Masculino'},
                    {name: 'F', nombre:'Femenino'},
                    {name: 'X', nombre:'Mixto'}


                ]





            }
        },
        components:{


           vSelect


        },    
             
             
        


        methods: {



            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {


                        if( this.createCategorias.sexo=='Masculino'){
                        this.createCategorias.sexo='M'
                      }

                       if( this.createCategorias.sexo=='Femenino'){
                        this.createCategorias.sexo='F'
                      }

                        if( this.createCategorias.sexo=='Mixto'){
                        this.createCategorias.sexo='X'
                      }


                       this.createCategorias.sexo = this.createCategorias.sexo.name == undefined ? this.createCategorias.sexo : this.createCategorias.sexo.name
                        categorias.create(this, this.createCategorias)

                      




                      /* this.createCategorias.sexo.nombre =  this.createCategorias.sexo.name == 'M' ? this.createCategorias.sexo.nombre ='Masculino' : this.createdCategorias.sexo.name == 'F' ? this.createCategorias.sexo.nombre ='Femenino' : this.createCategorias.sexo.nombre = 'Mixto' */
                    }
                    else{
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
<style scoped>
