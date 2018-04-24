<template>
    <div>
        <section class="content-header">
            <h1>Usuarios</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/users">Usuarios</router-link></li>
                <li class="active">Agregar Usuarios</li>
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
                            <h3 class="box-title">Agregar Usuarios</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('usuario') }" >
                                            <label for="">Usuario</label>
                                            <input type="text" id="usuario" name="usuario" data-vv-as="Nombre de usuario" class="form-control" v-model="createUser.usuario" v-validate="'required'" >
                                            <span class="help-block" for="usuario" v-bind:data-error="errors.first('usuario')">
                                                {{ errors.first('usuario') }}
                                            </span>
                                        </div>
                                    </div>
                                   

                                         <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('rol_edit') }">
                                            <label for="">Rol</label>
                                            <v-select
                                                :debounce="250"
                                                :options="roles"
                                                v-model="createUser.rolId"
                                                placeholder="Rol Usuario" 
                                                label="nombre" @input="changedValue">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="rol_edit" value="" data-vv-as="Position Employee"  v-model="createUser.rolId" v-validate="'required'">
                                            <span class="help-block" for="rol_edit" v-bind:data-error="errors.first('rol_edit')">
                                                {{ errors.first('rol_edit') }}
                                            </span>
                                        </div>
                                    </div>


                                   <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('password') }">
                                            <label for="">Contraseña</label>
                                            <input type="password" id="password" name="password" class="form-control" data-vv-as="Contraseña"  v-model="createUser.contrasena" v-validate="'required|confirmed:confirm_password|min:8'" >
                                            <span class="help-block" for="password" v-bind:data-error="errors.first('password')">
                                                {{ errors.first('password') }}
                                            </span>

                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('confirm_password') }">
                                            <label for="">Confirmación de contraseña</label>
                                            <input type="password" id="confirm_password" name="confirm_password" class="form-control" data-vv-as="Confirmación de contraseña"  v-model="confirm_password" v-validate="'required'" >
                                            <span class="help-block" for="confirm_password" v-bind:data-error="errors.first('confirm_password')">
                                                {{ errors.first('confirm_password') }}
                                            </span>

                                        </div>
                                    </div>   


                                        <div class="col-xs-12 col-sm-6" v-if="enapatro">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('personaId') }">
                                            <label for="">Juez Asociado</label>
                                            <v-select
                                                :debounce="250"
                                                :options="jueces"
                                                v-model="personaId"
                                                placeholder="Juez Asociado" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="personaId" value="" data-vv-as="Juez Asociado"  v-model="personaId" v-validate="'required'">
                                            <span class="help-block" for="personaId" v-bind:data-error="errors.first('personaId')">
                                                {{ errors.first('personaId') }}
                                            </span>
                                        </div>
                                    </div>      
                                    
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">Agregar Nuevo</button>
                                    </div>
                                </div>

                            </form>
                        

                         <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

                                </div> </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import users from '../../controllers/users.js'
    import roles from '../../controllers/roles.js'
    import vSelect from "vue-select"
    import juecesController from '../../controllers/jueces.js'
    export default {
        name: 'Usuarios',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createUser: {},
                confirm_password: "",
                roles: [],
                jueces: [],
                personaId : null,
                enapatro  : null

            }
        },
        components:{
            vSelect
        },
        created(){
            this.retrieveRoles()
            this.fetchData()
        },
        methods: {


            changedValue() {
    
      this.enapatro = false;
      if(this.createUser.rolId){
         console.log(this.createUser.rolId)
if(this.createUser.rolId.descripcion=='Juez'){
 this.enapatro = true;
  console.log("fffffffffffffffff hhhhhhhhhhh");

}


      }
      console.log("ejemplo hhhhhhhhhhh");
     },

            fetchData() {
                juecesController.index(this)
            },

            retrieveRoles(){
                roles.index(this)
            },
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                         if(this.createUser.rolId.descripcion=="Juez")
                      this.createUser.personaId = {id:this.personaId.personaId.id}
                        users.create(this, this.createUser)
                    }
                    else{
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
<style scoped>
