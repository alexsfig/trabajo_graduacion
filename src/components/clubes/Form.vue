<template>
    <div>
        <section class="content-header">
            <h1>Clubs</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/clubs">Clubs</router-link></li>
                <li class="active">Formulario de  Clubs</li>


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
                            <h3 class="box-title" v-if="!id">Agregar  Club</h3>
                             <h3 class="box-title" v-if="id">Editar  Clubs</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control"
											v-model="club.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('fundacion') }" >
                                            <label for="">Fundacion</label>
                                            <input type="date" id="fundacion" name="fundacion" data-vv-as="fundacion" class="form-control"
											v-model="club.fundacion" v-validate="'required'" >
                                            <span class="help-block" for="fundacion" v-bind:data-error="errors.first('fundacion')">
                                                {{ errors.first('fundacion') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('correo') }" >
                                            <label for="">Correo</label>
                                            <input type="email" id="correo" name="correo" data-vv-as="correo" class="form-control"
											v-model="club.correo" v-validate="'required|email'" >
                                            <span class="help-block" for="correo" v-bind:data-error="errors.first('correo')">
                                                {{ errors.first('correo') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('direccion') }" >
                                            <label for="">Direccion</label>
                                            <input type="text" id="direccion" name="direccion" data-vv-as="direccion" class="form-control"
											v-model="club.direccion" v-validate="'required'" >
                                            <span class="help-block" for="direccion" v-bind:data-error="errors.first('direccion')">
                                                {{ errors.first('direccion') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('celular') }" >
                                            <label for="">Celular</label>
                                            <input type="text" id="celular" name="celular" data-vv-as="celular" class="form-control"
											v-model="club.celular" v-validate="'required'" >
                                            <span class="help-block" for="celular" v-bind:data-error="errors.first('celular')">
                                                {{ errors.first('celular') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('representante') }" >
                                            <label for="">Representante</label>
                                            <input type="text" id="representante" name="representante" data-vv-as="representante" class="form-control"
											v-model="club.representante" v-validate="'required'" >
                                            <span class="help-block" for="representante" v-bind:data-error="errors.first('representante')">
                                                {{ errors.first('representante') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('telefonoFijo') }" >
                                            <label for="">Telefon Fijo</label>
                                            <input type="text" id="telefonoFijo" name="telefonoFijo" data-vv-as="telefonoFijo" class="form-control"
											v-model="club.telefonoFijo" v-validate="'required'" >
                                            <span class="help-block" for="telefonoFijo" v-bind:data-error="errors.first('telefonoFijo')">
                                                {{ errors.first('telefonoFijo') }}
                                            </span>      </div>
                                    </div>
     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('playaId') }">
                                            <label for="playaId">Playa</label>
                                            <v-select
                                                :debounce="250"
                                                :options="playas"
                                                v-model="club.playaId"
                                                placeholder="Escoja una playaId" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden"  name="playaId" value="" data-vv-as="playaId"  v-model="club.playaId" v-validate="'required'">
                                            <span class="help-block" for="playaId" v-bind:data-error="errors.first('playaId')">
                                                {{ errors.first('playaId') }}
                                            </span>
                                        </div>
                                    </div>     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('entrenadorId') }">
                                            <label for="entrenadorId">Entrenador</label>
                                            <v-select
                                                :debounce="250"
                                                :options="entrenadores"
                                                v-model="club.entrenadorId"
                                                placeholder="Escoja una entrenadorId" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="entrenadorId" value="" data-vv-as="entrenadorId"  v-model="club.entrenadorId" v-validate="'required'">
                                            <span class="help-block" for="entrenadorId" v-bind:data-error="errors.first('entrenadorId')">
                                                {{ errors.first('entrenadorId') }}
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

<script>  import clubsController from '../../controllers/clubes.js'
  import vSelect from "vue-select" 
  import playasController from '../../controllers/playas.js'
  import entrenadoresController from '../../controllers/entrenadores.js'
export default {
        name: 'Club',
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
club:{},playas:[],entrenadores:[]}
        },
        components:{
            vSelect
        },
        created(){
                this.id = this.$route.params.id;
                if(this.id)
                clubsController.retrieve(this,this.id);
                console.log("id:"+this.id);playasController.index(this) 
entrenadoresController.index(this) 
  },
        methods: {
        
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                     console.log("Error en el servicio")
                     if(!this.id)
                        clubsController.create(this, this.club)
                        else
                        clubsController.update(this,this.club)
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