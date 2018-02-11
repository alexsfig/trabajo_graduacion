<template>
    <div>
        <section class="content-header">
            <h1>Transacciones</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/categorias">Transacciones</router-link></li>
                <li class="active">Registrar Transaccion</li>
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
                            <h3 class="box-title">Registrar Transaccion</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">
                                
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('tipo') }">
                                            <label for="">Tipo Transaccion</label>
                                            <v-select
                                                :debounce="250"
                                                :options="tipotransacciones"
                                                v-model="createTransacciones.tipo"
                                                placeholder="Seleccione Tipo de Transaccion"
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipo" value="" data-vv-as="Tipo de Transaccion"  v-model="createTransacciones.tipo" v-validate="'required'">
                                            <span class="help-block" for="tipo" v-bind:data-error="errors.first('tipo')">
                                                {{ errors.first('tipo') }}
                                            </span>                                       



                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('tipoDocumento') }">
                                            <label for="">Tipo Documento</label>
                                            <v-select
                                                :debounce="250"
                                                :options="tipodocumentos"
                                                v-model="createTransacciones.tipoDocumento"
                                                placeholder="Seleccione Tipo de Documento"
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipoDocumento" value="" data-vv-as="Tipo de Documento"  v-model="createTransacciones.tipoDocumento" v-validate="'required'">
                                            <span class="help-block" for="tipoDocumento" v-bind:data-error="errors.first('tipoDocumento')">
                                                {{ errors.first('tipoDocumento') }}
                                            </span>
                                        </div>
                                    </div>


                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('monto') }" >
                                            <label for="">Monto</label>
                                            <input type="number" id="monto" name="monto" min=0  data-vv-as="Monto de la Transaccion" class="form-control" v-model="createTransacciones.monto" v-validate="'required'" step="0.01" >
                                            <span class="help-block" for="edadMin" v-bind:data-error="errors.first('monto')">
                                                {{ errors.first('monto') }}
                                            </span>
                                        </div>
                                    </div>                                 
 
                                                                    
                                   
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('formaPagoId') }" >
                                            <label for="">Forma de Pago</label>
                                            <v-select
                                                :debounce="250"
                                                :options="formapagos"
                                                v-model="createTransacciones.formaPagoId"
                                                placeholder="Seleccione Forma de Pago"
                                                label="nombre">
                                            </v-select>
                                             <div class="clearfix"></div>
                                            <input type="hidden" name="formaPagoId" value="" data-vv-as="Forma de Pago"  v-model="createTransacciones.formaPagoId" v-validate="'required'">
                                            <span class="help-block" for="formaPagoId" v-bind:data-error="errors.first('formaPagoId')">
                                                {{ errors.first('formaPagoId') }}
                                            </span>
                                        </div>
                                    </div> 


                                     <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('¨patrocinadorId') }" >
                                            <label for="">Patrocinador</label>
                                            <v-select
                                                :debounce="250"
                                                :options="patrocinadores"
                                                v-model="createTransacciones.patrocinadorId"
                                                placeholder="Seleccione el Patrocinador"
                                                label="id">
                                            </v-select>
                                             <div class="clearfix"></div>
                                            <input type="hidden" name="patrocinadorId" value="" data-vv-as="Patrocinador"  v-model="createTransacciones.patrocinadorId" v-validate="'required'">
                                            <span class="help-block" for="patrocinadorId" v-bind:data-error="errors.first('patrocinadorId')">
                                                {{ errors.first('patrocinadorId') }}
                                            </span>
                                        </div>
                                    </div> 


                                    

                                
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
    import transacciones from '../../controllers/transacciones.js'
    import vSelect from "vue-select"
    import formapagos from '../../controllers/formapagos.js'
    
    
    
    export default {
        name: 'Transacciones',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createTransacciones: {},
                formapagos: [],

                 tipodocumentos: [
                    {name: 'Factura'},
                    {name: 'Notas de Credito'},
                    {name: 'Letras de Cambio'},
                    {name: 'Credito Fiscal'}

                ],


                 tipotransacciones: [
                    {name: 'Credito'},
                    {name: 'Contable'},
                   

                ],

              
                
                

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
                formapagos.index(this)
            }, 

                  
            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                     
                        let nombrepago, tipoDocumento, tipo

                        this.nombrepago = this.createTransacciones.formaPagoId

                        tipoDocumento = this.createTransacciones.tipoDocumento.name
                        tipo = this.createTransacciones.tipo.name

                        this.createTransacciones.tipo = tipo == undefined ? '' : tipo
                        this.createTransacciones.tipoDocumento = tipoDocumento == undefined ? '' : tipoDocumento

                       this.createTransacciones.formaPagoId = this.createTransacciones.formaPagoId.id == undefined ? '' : parseInt(this.createTransacciones.formaPagoId.id)                       
                      
                        transacciones.create(this, this.createTransacciones)
                        this.createTransacciones.formaPagoId = this.nombrepago 

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
