<template>
    <div>
        <section class="content-header">
            <h1>Transacciones</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/transaccion/">Transacciones</router-link>
                </li>
                <li class="active">Formulario de Transacciones</li>
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
                            <h3 class="box-title" v-if="!id">Agregar  Transaccion</h3>
                            <h3 class="box-title" v-if="id">Editar  Transaccion</h3>
                        </div>
                        <div class="box-body">
                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fecha') }">
                                            <label for="">Fecha</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fecha" name="fecha" class="form-control" data-vv-as="Fecha" v-model="transaccion.fecha" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fecha') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fecha') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="transaccion.fecha" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="fecha" v-bind:data-error="errors.first('fecha')">
                                                {{ errors.first('fecha') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('formaPagoId') }">
                                            <label for="formaPagoId">Forma de pago</label>
                                            <v-select :debounce="250" :options="formaPagos" v-model="transaccion.formaPagoId" placeholder="Seleccione una Forma de Pago" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="formaPagoId" value="" data-vv-as="Forma de Pago" v-model="transaccion.formaPagoId" v-validate="'required'">
                                            <span class="help-block" for="formaPagoId" v-bind:data-error="errors.first('formaPagoId')">
                                                {{ errors.first('formaPagoId') }}
                                            </span>
                                        </div>
                           
                                    </div> 
                                     <div class="clearfix"></div>


                           <!--          <div class="col-xs-12 col-sm-6">
                         <div class="fgroup" :class="{ 'has-error': errors.has('monto') }" >
                                            <label for="">Monto ($)</label>
                                            <input type="number" id="monto" name="monto" data-vv-as="monto" min="0" class="form-control"
											v-model="transaccion.monto" v-validate="'required|min_value:0.01'"  step="0.01">
                                            <span class="help-block" for="monto" v-bind:data-error="errors.first('monto')">
                                                {{ errors.first('monto') }}
                                            </span>      </div>

                                    </div>   -->

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('comprobante') }">
                                            <label for="">Comprobante</label>

                                            <v-select :debounce="250" :options="comprobante" v-model="transaccion.comprobante" placeholder="Seleccione un Comprobante" label="label">
                                            </v-select>
                                            <input type="hidden" name="comprobante" value="" data-vv-as="Comprobante" v-model="transaccion.comprobante" v-validate="'required'">
                                            <span class="help-block" for="comprobante" v-bind:data-error="errors.first('comprobante')">
                                                {{ errors.first('comprobante') }}
                                            </span>
                                        </div>
                                    </div>
                                   
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('monto') }">
                                            <label for="">Monto</label>
                                            <div class="input-group">
                                                <span class="input-group-addon">$</span>
                                                <input type="number" id="monto" name="monto" data-vv-as="Monto" min="0" class="form-control" v-model="transaccion.monto" v-validate="'required|min_value:0.01'" step="0.01">
                                                    
                                            </div>
                                            <span class="help-block" for="monto" v-bind:data-error="errors.first('monto')">
                                                {{ errors.first('monto') }}
                                            </span>
                                        </div>
                                    </div>
                                     <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('cuentaId') }">
                                            <label for="cuentaId">Cuenta</label>
                                            <v-select :debounce="250" 
                                            :options="cuentas" v-model="transaccion.cuentaId" 
                                            placeholder="Seleccione una Cuenta" label="nombrem">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="cuentaId" value="" data-vv-as="Cuenta" v-model="transaccion.cuentaId" v-validate="'required'" >
                                            <span class="help-block" for="cuentaId" v-bind:data-error="errors.first('cuentaId')">
                                                    {{ errors.first('cuentaId') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('tipoTransaccionId') }">
                                            <label for="tipoTransaccionId">Tipo de Transaccion</label>
                                            <v-select :debounce="250" :options="tipoTransaccions" v-model="transaccion.tipoTransaccionId" placeholder="Seleccione un Tipo de Transaccion" label="nombre" @input="changedValue">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipoTransaccionId" value="" data-vv-as="Tipo de Transaccion" v-model="transaccion.tipoTransaccionId" v-validate="'required'">
                                            <span class="help-block" for="tipoTransaccionId" v-bind:data-error="errors.first('tipoTransaccionId')">
                                                    {{ errors.first('tipoTransaccionId') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('referencia') }">
                                            <label for="">Referencia</label>
                                            <input type="text" id="referencia" name="referencia" data-vv-as="Referencia" class="form-control" v-model="transaccion.referencia" v-validate="'required'">
                                            <span class="help-block" for="referencia" v-bind:data-error="errors.first('referencia')">
                                                {{ errors.first('referencia') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }">
                                            <label for="">Descripcion</label>
                                            <textarea type="text" id="descripcion" name="descripcion" data-vv-as="Dirección " class="form-control" v-model="transaccion.descripcion" v-validate="'required'"></textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="col-xs-12 col-sm-6" v-if="enapatro">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('patrocinadorId') }">
                                            <label for="patrocinadorId">Patrocinador</label>
                                            <v-select :debounce="250" :options="patrocinadors" v-model="transaccion.patrocinadorId" placeholder="Seleccione un Patrocinador" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="patrocinadorId" value="" data-vv-as="Patrocinador" v-model="transaccion.patrocinadorId" v-validate="'required'">
                                            <span class="help-block" for="patrocinadorId" v-bind:data-error="errors.first('patrocinadorId')">
                                                    {{ errors.first('patrocinadorId') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6" v-if="enaatle">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('atletaId') }">
                                            <label for="atletaId">Atleta</label>
                                            <v-select :debounce="250" :options="atletas" v-model="transaccion.atletaId" placeholder="Seleccione un Atleta" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="atletaId" value="" data-vv-as="Atleta" v-model="transaccion.atletaId" v-validate="'required'">
                                            <span class="help-block" for="atletaId" v-bind:data-error="errors.first('atletaId')">
                                                    {{ errors.first('atletaId') }}
                                                </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
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

<script>

import transaccionsController from "../../controllers/transacciones.js";
import vSelect from "vue-select";
import patrocinadoresController from "../../controllers/patrocinadores.js";
import atletasController from "../../controllers/atletas.js";
import formaPagosController from "../../controllers/formaPagos.js";
import cuentasController from "../../controllers/cuentas.js";
import tipoTransacionsController from "../../controllers/tipoTransaccions.js";
export default {
    name: "Transaccion",
    data() {
        return {
            errMsg: "",
            errorMsg: "",
            showAlert: false,
            showSuccess: false,
            successMsg: "",
            id: "",
            errMsg: "",
            enapatro: false,
            enaatle: false,
            isLogin: false,
            comprobante: [{
                label: "Factura",
                value: "Factura"
            }, {
                label: "Recibo",
                value: "Recibo"
            }, {
                label: "Voucher",
                value: "Voucher"
            }],
            // comprobantev:null,
            transaccion: {
                fecha: null
            },

            patrocinadors: [],
            atletas: [],
            formaPagos: [],
            cuentas: [],
            tipoTransaccions: [],
            limitTo: '',
            limitFrom: '',
            format: 'yyyy-MM-dd',
            weekStartsWith: 0,
            clearBtn: true,
            todayBtn: true,
            closeOnSelected: true,
        };
    },
    components: {
        vSelect
    },
    created() {
        this.id = this.$route.params.id;
        if (this.id) {
            transaccionsController.retrieve(this, this.id);
            //this.comprobantev.value = this.transaccion.comprobante;
        }
        //this.transaccion.fecha=new Date();

        console.log("id:" + this.id);
        patrocinadoresController.index(this);
        atletasController.index(this);
        formaPagosController.index(this);
        cuentasController.index(this);
        tipoTransacionsController.index(this);
    },
    methods: {
        changedValue() {
                this.enaatle = false;
                this.enapatro = false;
                console.log("ejemplo hhhhhhhhhhh");
                if (this.transaccion.tipoTransaccionId) {
                    if (this.transaccion.tipoTransaccionId.tipo) {
                        if (this.transaccion.tipoTransaccionId.asociar) {}

                        this.enapatro = true;
                    } else {
                        if (this.transaccion.tipoTransaccionId.asociar) {
                            this.enaatle = true;
                        }
                    }
                }
            },
            submit() {
                this.showAlert = false;
                this.showSuccess = false;
                this.$validator.validateAll().then(success => {
                    if (success) {

                        //this.transaccion.comprobante = this.comprobantev.label;

                        if(this.transaccion.cuentaId.monto>this.transaccion.monto){
                        this.transaccion.comprobante = this.transaccion.comprobante.label == undefined ? this.transaccion.comprobante : this.transaccion.comprobante.label
                        if (!this.id) transaccionsController.create(this, this.transaccion);
                        else transaccionsController.update(this, this.transaccion);}
                        else{

 this.showAlert = true;
                        this.errMsg = "La cuenta no tiene fondos suficientes";
                        }
                    } else {
                        console.log("Error enn el formulario");
                        this.showAlert = true;
                        this.errMsg = "Form error";
                    }
                });
            }
    }
};

</script>
