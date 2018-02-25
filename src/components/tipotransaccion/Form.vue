<template>
    <div>
        <section class="content-header">
            <h1>Tipo de Transaccion</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/tipoTransaccions">Tipo de Transaccion</router-link></li>
                <li class="active">Formulario Tipo de Transaccion</li>


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
                            <h3 class="box-title" v-if="!id">Agregar  Tipo de Transaccion</h3>
                             <h3 class="box-title" v-if="id">Editar Tipo de Transaccion</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control"
											v-model="tipoTransaccion.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }" >
                                            <label for="">Descripcion</label>
                                            <input type="text" id="descripcion" name="descripcion" data-vv-as="descripcion" class="form-control"
											v-model="tipoTransaccion.descripcion" v-validate="'required'" >
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>      </div>
                                    </div>
 <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('tipo') }" >
                                            <label for="">Tipo</label>
                                               <span class="pull-right">
                                                <toggle-button  v-model="tipoTransaccion.tipo" :sync="true"  
                                                 :value="tipoTransaccion.tipo" :width="130" :height="35" 
                                                 id="changed-font" :labels="{checked: 'Ingreso', unchecked: 'Gasto'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                            </span>
                                          <!--  <input type="text" id="tipo" name="tipo" data-vv-as="tipo" class="form-control"
											v-model="tipoTransaccion.tipo" v-validate="'required'" >-->
                                            <span class="help-block" for="tipo" v-bind:data-error="errors.first('tipo')">
                                                {{ errors.first('tipo') }}
                                            </span>      </div>
                                    </div>
                                     <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('asociar') }" >
                                            <label for="" >Asociar a</label>
                                               <span class="pull-right">
                                                <toggle-button  v-model="tipoTransaccion.asociar" :sync="true"  
                                                 :value="tipoTransaccion.asociar" :width="130" :height="35" 
                                                 id="changed-font" :labels="{checked: 'Asociar', unchecked: 'No Asociar'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                            </span>
                                          <!--  <input type="text" id="tipo" name="tipo" data-vv-as="tipo" class="form-control"
											v-model="tipoTransaccion.tipo" v-validate="'required'" >-->
                                            <span class="help-block" for="tipo" v-bind:data-error="errors.first('asociar')">
                                                {{ errors.first('asociar') }}
                                            </span>      </div>
                                    </div>
  </div>
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

<script>  import tipoTransaccionsController from '../../controllers/tipoTransaccions.js'
  import vSelect from "vue-select" 
export default {
        name: 'TipoTransaccion',
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
tipoTransaccion:{}
,  }
        },
        components:{
            vSelect
        },
        created(){
                this.id = this.$route.params.id;
                if(this.id)
                tipoTransaccionsController.retrieve(this,this.id);
                console.log("id:"+this.id);  },



       watch: {
            '$route': 'fetchData',
            tipoTransaccion: function(val, oldVal){
            //this.atleta = this.$route.params.atleta 
            //this.atleta = this.atleta 
           
            this.tipoTransaccion.tipo = ( val.tipo == 1 ? true : false)
            this.tipoTransaccion.asociar = ( val.asociar == 1? true : false)
            
           }
        },      


        methods: {
            

            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                     console.log("Error en el servicio")
                     if(!this.id)
                        tipoTransaccionsController.create(this, this.tipoTransaccion)
                        else
                        tipoTransaccionsController.update(this,this.tipoTransaccion)
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