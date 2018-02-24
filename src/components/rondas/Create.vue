<template>
    <div>
        <section class="content-header">
            <h1>Rondas</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/categorias">Rondas</router-link></li>
                <li class="active">Rondas</li>
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
                            <h3 class="box-title">Generar ronda inicial por arte de magia</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('idCircuito') }" >
                                            <label for="">id de circuito a generar las rondas</label>
                                            <input type="text" id="idCircuito" name="idCircuito" data-vv-as="id del circuito" class="form-control" v-model="createRondas.circuitoId" v-validate="'required'" >
                                            <span class="help-block" for="nombreCategoria" v-bind:data-error="errors.first('nombreCategoria')">
                                                {{ errors.first('idCircuito') }}
                                            </span>
                                        </div>
                                    </div>

                                                         
                                  
                                      
                                    
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">Generar  Nueva</button>
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
    import rondas from '../../controllers/rondas.js'
    import vSelect from "vue-select"
    
    
    
    export default {
        name: 'Rondas',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                idronda :"",
                isLogin: false,
                createRondas: {},
                createHeats: {},
               // createRondas: [],


              
                
                

            }
        },
        components:{
            
          
           
            
            
        }, 
       
        
        methods: {

                  
            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                        
                        this.createRondas.circuitoId = parseInt(this.createRondas.circuitoId)
                        this.createRondas.atletasRonda = 13
                        rondas.create(this, this.createRondas)
                        this.createHeats.rondaId = this.idronda
                        rondas.heat(this, this.createHeats)
                       
                         

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
