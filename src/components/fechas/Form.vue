<template>
    <div>
        <section class="content-header">
            <h1>Fechas</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/fechas">Fechas</router-link></li>
                <li class="active">Formulario de  Fechas</li>


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
                            <h3 class="box-title" v-if="!id">Agregar  Fecha</h3>
                             <h3 class="box-title" v-if="id">Editar  Fechas</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Nombre de Fecha</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre de Fecha" class="form-control" v-model="fecha.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('playa') }">
                                            <label for="playa">Playa de Realizazion</label>
                                            <v-select
                                                :debounce="250"
                                                :options="playas"
                                                v-model="fecha.playaId"
                                                placeholder="Escoja una playa" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="playa" value="" data-vv-as="Playa"  v-model="fecha.playaId" v-validate="'required'">
                                            <span class="help-block" for="playa" v-bind:data-error="errors.first('playa')">
                                                {{ errors.first('playa') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>


                                     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fecha') }" >
                                            <label for="">Inicio de Fecha</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fecha" name="fecha" class="form-control" data-vv-as="Inicio de Fecha" v-model="fecha.fecha" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fecha') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fecha') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="fecha.fecha" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="Fecha" v-bind:data-error="errors.first('fecha')">
                                                {{ errors.first('fecha') }}
                                            </span>
                                        </div>
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

<script>
    import fechasController from '../../controllers/fechas.js'
    import playasController from '../../controllers/playas.js'
    import vSelect from "vue-select"
    export default {
        name: 'Fechas',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                fecha: {},
                playas: [],
                id: '',

                  clearBtn: true,
                todayBtn: true,
                closeOnSelected: true,
                limitFrom: '',
                limitTo: '',
                format: 'yyyy-MM-dd',
                weekStartsWith: 0,

            }
        },
        components:{
            vSelect
        },
        created(){
                this.id = this.$route.params.id;
                if(this.id)
                fechasController.retrieve(this,this.id);
                console.log("id:"+this.id);
            this.retrievePlayas()
        },
        methods: {
            retrievePlayas(){
                playasController.index(this)
            },
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                     console.log("Error en el servicio")
                     if(!this.id)
                        fechasController.create(this, this.fecha)
                        else
                        fechasController.update(this,this.fecha)
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
