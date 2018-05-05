<template>
    <div>
        <section class="content-header">
            <h1>Usuario</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li><router-link to="/admin/users">Usuario</router-link></li>
                <li class="active">Modificar Contraseña</li>
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
                            <h3 class="box-title">Modificar Contraseña para el Usuario: <b>{{ usuario.usuario }} </b></h3>
                        </div>
                       
                        <div class="box-body">
        
                        
                <form @submit.prevent="validateMethod" role="form"> 
                    <div class="box-body">
                       <!-- <input type="hidden" v-model="id"> -->
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('password') }">
                                <label for="">Nueva Contraseña</label>
                                <input type="password" id="password" name="password" class="form-control" data-vv-as="Contraseña"  v-model="usuario.contrasena" v-validate="'required|confirmed:confirm_password|min:8'" >
                                <span class="help-block" for="password" v-bind:data-error="errors.first('password')">
                                    {{ errors.first('password') }}
                                </span>

                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('confirm_password') }">
                                <label for="">Confirmación de contraseña</label>
                                <input type="password" id="confirm_password" name="confirm_password" class="form-control" data-vv-as="Confirmación de contraseña"  v-model="confirm_password" v-validate="'required'" >
                                <span class="help-block" for="confirm_password" v-bind:data-error="errors.first('confirm_password')">
                                    {{ errors.first('confirm_password') }}
                                </span>

                            </div>
                        </div>
                    </div>    
                    <div class="box-footer">
                        <div class="col-xs-12 text-right">
                            <button type="submit" class="btn btn-flat btn-sm btn-primary"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Modificar</button>
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
    import users from '../../controllers/users.js'
    import roles from '../../controllers/roles.js'
    import vSelect from "vue-select"
    import juecesController from '../../controllers/jueces.js'
    export default {
        name: 'Usuarios',
        data() {
            return {
               confirm_password: '',
                openValue: "",
                errMsg:  '',
                successMsg:  '',
                success: false,
                isLogin: false,
                show: false,
                showAlert: false,
                showSuccess: false,
                usuario: {},
                openModalInside: false,
                roles: [],
                rol_edit: null,
                methodSubmit:'update'


            }
        },
        components:{
            vSelect
        },
        created(){
             this.retrieveData()
             
        },
        watch: {
            '$route': 'retrieveData',
            usuario: function(val, oldVal){
                
              
                this.usuario.contrasena = ""
                this.confirm_password = ""
                
            }},
        
        methods: {


            fetchData() {
                juecesController.index(this)
            },
            retrieveData(id) {
                users.retrieve(this, parseInt(localStorage.getItem('iduser')))
            },
           
            validateMethod(){
                console.log(this.methodSubmit)
                if(this.methodSubmit == 'update'){
                    this.updateUsuario();
                }
                else{
                    console.log(this.methodSubmit)
                }
            },
            updateUsuario() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                        users.updatepassjuez(this, this.usuario)
                    }
                    else{
                        this.errMsg = 'Error revisa el formulario'
                        this.showAlert=true
                    }
                })

            }
        }

    }
</script>
<style scoped>
