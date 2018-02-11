<template>
    <div>
        <section class="content-header">
            <h1>Cuentas</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/cuentas">Cuentas</router-link></li>
                <li class="active">Agregar Cuentas</li>
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
                            <h3 class="box-title">Agregar Cuentas</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre Cuenta</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre de la Cuenta" class="form-control" v-model="createCuentas.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                                                      

                                    <!--
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('cuentaMayor') }" >
                                            <label for="">Cuenta Mayor</label>
                                            <v-select
                                                :debounce="250"
                                                :options="cuentas"
                                                v-model="createCuentas.cuentaMayor"
                                                placeholder="Seleccione Cuenta Mayor"
                                                label="nombre"
                                                
                                                >
                                            </v-select>
                                            <span class="help-block" for="cuentaMayor" v-bind:data-error="errors.first('cuentaMayor')">
                                                {{ errors.first('cuentaMayor') }}
                                            </span>
                                        </div>
                                    </div> -->


                                     <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('naturaleza') }">
                                            <label for="">Naturaleza de la Cuenta</label>
                                            <v-select
                                                :debounce="250"
                                                :options="naturalezas"
                                                v-model="createCuentas.naturaleza"
                                                placeholder="Seleccione la naturaleza de la Cuenta"
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="naturaleza" value="" data-vv-as="Naturaleza de la Cuenta"  v-model="createCuentas.naturaleza" v-validate="'required'">
                                            <span class="help-block" for="naturaleza" v-bind:data-error="errors.first('naturaleza')">
                                                {{ errors.first('naturaleza') }}
                                            </span>
                                        </div>
                                    </div>                                 

                                   
                                    <div class="clearfix"></div>                        
                                  
                                      
                                    
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">Agregar Nueva</button>
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
    import cuentas from '../../controllers/cuentas.js'
    import vSelect from "vue-select"
    
    
    
    export default {
        name: 'Cuentas',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createCuentas: {},

                
                cuentas: [ ],

                naturalezas: [
                    {name: 'Pasivo'},
                    {name: 'Activo'}]
                    

              
                
                

            }
        },
        components:{
            
          
           vSelect
            
            
        }, 

         created(){
            this.fetchData()
           
        },
       
        
        methods: {

          fetchData() {
                cuentas.index(this)
            }, 
            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                      // this.createCuentas.cuentaMayor = this.createCuentas.cuentaMayor.id == undefined ? '' : parseInt(this.createCuentas.cuentaMayor.id)
                         this.createCuentas.naturaleza = this.createCuentas.naturaleza.name == undefined ? '' : this.createCuentas.naturaleza.name
                        cuentas.create(this, this.createCuentas)
                    }
                    else{
                        this.showAlert = true
                        this.errMsg = "Form error"
                    }
                });
            }
        }

    }
</script>
<style scoped>
