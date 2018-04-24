<template>
    <div>
        <section class="content-header">
            <h1>Nuevo Patrocinio</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/patrocinadoratleta">Patrocinio Atletas</router-link></li>
                <li class="active">Nuevo Patrocinio</li>
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
                            <h3 class="box-title">Agregar Nuevo Patrocinio</h3>
                        </div>
                        
                        <div class="box-body">
        
                       <form @submit.prevent="submit"  role="form"> 
                        <div class="box-body">


                        

                            <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('patrocinadorId') }">
                                            <label for="">Patrocinador</label>
                                            <v-select
                                                :debounce="250"
                                                :options="patrocinadors"
                                                v-model="createPatrocinadorAtleta.patrocinadorId"
                                                placeholder="Seleccione un Patrocinador"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" id="patrocinadorId" name="patrocinadorId" data-vv-as="Patrocinador " class="form-control" v-model="createPatrocinadorAtleta.patrocinadorId" v-validate="'required'" >
                                            <span class="help-block" for="patrocinadorId" v-bind:data-error="errors.first('patrocinadorId')">
                                                {{ errors.first('patrocinadorId') }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('atletaId') }">
                                            <label for="">Atleta Patrocinado</label>
                                            <v-select
                                                :debounce="250"
                                                :options="atletas"
                                                v-model="createPatrocinadorAtleta.atletaId"
                                                placeholder="Seleccione un Atleta"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" id="atletaId" name="atletaId" data-vv-as="Atleta " class="form-control" v-model="createPatrocinadorAtleta.atletaId" v-validate="'required'" >
                                            <span class="help-block" for="atletaId" v-bind:data-error="errors.first('atletaId')">
                                                {{ errors.first('atletaId') }}
                                            </span>
                                        </div>
                                    </div>

 
                            
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('tiempoPatrocinio') }" >
                                <label for="">Tiempo de Patrocinio (Años)</label>
                                <input type="number" id="tiempoPatrocinio" name="tiempoPatrocinio" data-vv-as="Tiempo de Patrocinio" class="form-control" 
                                v-model="createPatrocinadorAtleta.tiempoPatrocinio" v-validate="'required|min_value:1|max_value:1000'" >
                                <span class="help-block" for="tiempoPatrocinio" v-bind:data-error="errors.first('tiempoPatrocinio')">
                                    {{ errors.first('tiempoPatrocinio') }}
                                </span>
                            </div>
                        </div>                         
                                        
                               



                                <div class="clearfix"></div>                        
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

                                </div>  </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    //import categorias from '../../controllers/categorias.js'
    import patrocinadorAtleta from '../../controllers/patrocinador_atleta.js'
    import patrocinadorsc from '../../controllers/patrocinadores.js'
    import atleta from '../../controllers/atletas.js'
    import vSelect from "vue-select"
    
    
    
    export default {
        name: 'Patrocinador_atleta',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createPatrocinadorAtleta: {},

                patrocinadors: [],
                atletas: []

            }
        },
        components:{
            
          
           vSelect
            
            
        }, 
       created(){
            //this.retrieveRoles()
            console.log('entre al fetch cretated')

             this.fetchData() 
            },
        methods: {

            fetchData(){
                console.log('entre al fetch data')

                patrocinadorsc.index(this) 
                atleta.index(this)
                //atleta.index(this)
            }, 

            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                       
                       //his.createCategorias.sexo = this.createCategorias.sexo.name == undefined ? '' : this.createCategorias.sexo.name
                       patrocinadorAtleta.create(this, this.createPatrocinadorAtleta)
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
