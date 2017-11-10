<template>
    <div>
        <section class="content-header">
            <h1>Noticias</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/users">Usuarios</router-link></li>
                <li class="active">Agregar Noticia</li>
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
                            <h3 class="box-title">Agregar Noticia</h3>
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
                                        <div class="fgroup" :class="{ 'has-error': errors.has('Fechainicio') }" >
                                            <label for="">Fecha Inicio</label>
                                            <input type="date" id="Fechainicio" name="Fechainicio" data-vv-as="Fecha de Inicio" class="form-control" v-model="createNoticias.Fechainicio" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('Fechainicio')">
                                                {{ errors.first('Fechainicio') }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('Fechafin') }" >
                                            <label for="">Fecha Fin</label>
                                            <input type="date" id="Fechafin" name="Fechafin" data-vv-as="Fecha Fin" class="form-control" v-model="createNoticias.Fechafin" v-validate="'required'" >
                                            <span class="help-block" for="Fechafin" v-bind:data-error="errors.first('Fechafin')">
                                                {{ errors.first('Fechafin') }}
                                            </span>
                                        </div>
                                    </div>


                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('usuarioId') }" >
                                            <label for="">Publicada Por:</label>
                                            <input type="input" id="usuarioId" name="usuarioId" data-vv-as="Publicada Por:" class="form-control" v-model="createNoticias.usuarioId" v-validate="'required'" >
                                            <span class="help-block" for="usuarioId" v-bind:data-error="errors.first('usuarioId')">
                                                {{ errors.first('usuarioId') }}
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
    import noticias from '../../controllers/noticias.js'
    
    
    export default {
        name: 'Noticias',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createNoticias: {}
                

            }
        },
       
        
        methods: {
            
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                      
                        noticias.create(this, this.createNoticias)
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
