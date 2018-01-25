<template>
    <div>
        <section class="content-header">
            <h1>Escuelas</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/noticias">Noticias</router-link></li>
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

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                            <label for="">Titulo</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre de la noticia" class="form-control" v-model="createNoticias.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }" >
                                            <label for="">Descripcion</label>
                                            <input type="text" id="descripcion" name="descripcion" data-vv-as="Descripcion de la noticia" class="form-control" v-model="createNoticias.descripcion" v-validate="'required'" >
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fechaInicio') }" >
                                            <label for="">Fecha Inicio</label>
                                            <input type="date" id="fechaInicio" name="fechaInicio" data-vv-as="Fecha de Inicio" class="form-control" v-model="createNoticias.fechaInicio" v-validate="'required'" >
                                            <span class="help-block" for="FechaInicio" v-bind:data-error="errors.first('fechaInicio')">
                                                {{ errors.first('fechaInicio') }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fechaFin') }" >
                                            <label for="">Fecha Fin</label>
                                            <input type="date" id="fechaFin" name="fechaFin" data-vv-as="Fecha Fin" class="form-control" v-model="createNoticias.fechaFin" v-validate="'required'" >
                                            <span class="help-block" for="fechaFin" v-bind:data-error="errors.first('fechaFin')">
                                                {{ errors.first('fechaFin') }}
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
    import noticias from '../../controllers/escuelas.js'
    
    
    
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
                createNoticias: {},
                
                

            }
        },
       
        
        methods: {
            
            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                      
                        noticias.create(this, this.createEscuelas)
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
