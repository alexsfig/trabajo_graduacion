<template>
    <div>
        <section class="content-header">
            <h1>Escuelas</h1>
            <ol class="breadcrumb">

                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/escuelas">Escuelas</router-link></li>
                <li class="active">Agregar Escuela</li>
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
                            <h3 class="box-title">Agregar Escuela</h3>
                        </div>

                        <div class="box-body">

                            <form @submit.prevent="submit"  role="form">
                                <div class="box-body">
                                    <!-- Agregado por Milton -->
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('entidadId') }">
                                            <label for="">Entidad</label>
                                            <v-select
                                                :debounce="250"
                                                :options="entidades"
                                                v-model="createEscuelas.entidadId"
                                                placeholder="Seleccione una entidad"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" id="entidadId" name="entidadId" data-vv-as="Entidad " class="form-control" v-model="createEscuelas.entidadId" v-validate="'required'" >
                                            <span class="help-block" for="entidadId" v-bind:data-error="errors.first('entidadId')">
                                                {{ errors.first('entidadId') }}
                                            </span>
                                        </div>
                                    </div>
                                    <!-- <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fechaInicio') }" >
                                            <label for="">Entidad</label>
                                            <input type="text" id="entidadId" name="Entidad" data-vv-as="entidadId" class="form-control" v-model="createEscuelas.entidadId" v-validate="'required'" >
                                            <span class="help-block" for="entidadId" v-bind:data-error="errors.first('entidadId')">
                                                {{ errors.first('entidadId') }}
                                            </span>
                                        </div>
                                    </div> -->

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fundacion') }" >
                                            <label for="">Fundacion</label>

                                            <input type="date" id="fundacion" name="fundacion" data-vv-as="fundacion" class="form-control" v-model="createEscuelas.fundacion" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('fundacion')">
                                                {{ errors.first('fundacion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('playaId') }" >
                                             <label for="">playa</label>
                                            <v-select
                                                :debounce="250"
                                                :options="playas"
                                                v-model="createEscuelas.playaId"
                                                placeholder="Seleccione una playa"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" id="playaId" name="playaId" data-vv-as="Playa" class="form-control" v-model="createEscuelas.playadId" v-validate="'required'" >
                                            <span class="help-block" for="playaId" v-bind:data-error="errors.first('playaId')">
                                                {{ errors.first('playaId') }}   
                                            </span>
                                        </div>
                                    </div>


                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('entrenadorId') }" >
                                             <label for="">entrenador</label>
                                            <v-select
                                                :debounce="250"
                                                :options="entrenadores"
                                                v-model="createEscuelas.entrenadorId"
                                                placeholder="Seleccione un Entrenador"
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" id="entrenadorId" name="entrenadorId" data-vv-as="Entrenador" class="form-control" v-model="createEscuelas.entrenadorId" v-validate="'required'" >
                                            <span class="help-block" for="entrenadorId" v-bind:data-error="errors.first('entrenadorId')">
                                                {{ errors.first('entrenadorId') }}   
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
    import escuelas from '../../controllers/escuelas.js'
    // Agregado por MILTON
    import vSelect from "vue-select"

    import entidadesController from '../../controllers/entidad'
    import playasController from '../../controllers/playas'
    import entrenadoresController from '../../controllers/entrenadores'
    
    export default {
        name: 'Escuelas',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createEscuelas: {},
                // Agregado por MILTON
                entidades: [],
                playas: [],
                entrenadores: [],
            }
        },
        components:{
            vSelect
          },
        created() {
          //do something after creating vue instance
          this.fetchData()
        },
        methods: {
            fetchData(){
                entidadesController.index(this)

                playasController.index(this)
        
                entrenadoresController.index(this)
            },
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {

                        escuelas.create(this, this.createEscuelas)
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
