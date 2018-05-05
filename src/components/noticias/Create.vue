<template>
<div>
    <section class="content-header">
        <h1>Noticias</h1>
        <ol class="breadcrumb">

            <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
            <li>
                <router-link to="/admin/noticias">Noticias</router-link>
            </li>
            <li class="active">Agregar Noticia</li>
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
                        <h3 class="box-title">Agregar Noticia</h3>
                    </div>
                    <div class="box-body">
                        <form @submit.prevent="submit" role="form">
                            <div class="box-body">
                                <div class="col-xs-12 col-sm-4">
                                    <div class="fgroup required" :class="{ 'has-error': errors.has('nombre') }">
                                        <label for="">Título</label>
                                        <input type="text" id="nombre" name="nombre" data-vv-as="Nombre de la noticia" class="form-control" v-model="noticia.nombre" v-validate="'required'">
                                        <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                                {{ errors.first('nombre') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <div class="fgroup required" :class="{ 'has-error': errors.has('fechaInicio') }">
                                        <label for="">Fecha Inicio</label>
                                        <dropdown class="form-group">
                                            <div class="input-group">
                                                <input placeholder="AAAA-MM-DD" type="text" id="fechaInicio" name="fechaInicio" class="form-control" data-vv-as="Fecha Inicio" v-model="noticia.fechaInicio" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fechaInicio') }">
                                                <div class="input-group-btn">
                                                    <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fechaInicio') }">
                                                        <i class="glyphicon glyphicon-calendar"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <template slot="dropdown">
                                                <li>
                                                    <date-picker class="date-picker" :language="'es'" v-model="noticia.fechaInicio" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                    </date-picker>
                                                </li>
                                            </template>
                                        </dropdown>
                                        <!-- <input type="date" id="fechaInicio" name="fechaInicio" data-vv-as="Fecha de Inicio" class="form-control" v-model="noticia.fechaInicio" v-validate="'required'" >-->
                                        <span class="help-block" for="FechaInicio" v-bind:data-error="errors.first('fechaInicio')">
                                                {{ errors.first('fechaInicio') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                    <div class="fgroup required" :class="{ 'has-error': errors.has('fechaFin') }">
                                        <label for="">Fecha Fin</label>
                                        <dropdown class="form-group">
                                            <div class="input-group">
                                                <input placeholder="AAAA-MM-DD" type="text" id="fechaFin" name="fechaFin" class="form-control" data-vv-as="Fecha Fin" v-model="noticia.fechaFin" v-validate="'required|date_format:YYYY-MM-DD|after:fechaInicio'" :class="{'datepicker':true,  'has-error': errors.has('fechaFin') }">
                                                <div class="input-group-btn">
                                                    <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fechaFin') }">
                                                        <i class="glyphicon glyphicon-calendar"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <template slot="dropdown">
                                                <li>
                                                    <date-picker class="date-picker" :language="'es'" v-model="noticia.fechaFin" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                    </date-picker>
                                                </li>
                                            </template>
                                        </dropdown>

                                        <!-- <input type="date" id="fechaFin" name="fechaFin" data-vv-as="Fecha Fin" class="form-control" v-model="noticia.fechaFin" v-validate="'required'" > -->
                                        <span class="help-block" for="fechaFin" v-bind:data-error="errors.first('fechaFin')">
                                                {{ errors.first('fechaFin') }}
                                            </span>
                                    </div>
                                </div>

                                <div class="clearfix"></div>
                                <div class="col-xs-12 col-sm-12">
                                    <div class="fgroup required" :class="{ 'has-error': errors.has('descripcion') }">
                                        <label for="">Descripción</label>
                                        <textarea id="descripcion" name="descripcion" data-vv-as="Descripcion de la noticia" class="form-control" v-model="noticia.descripcion" v-validate="'required'" rows="3"></textarea>
                                        <!-- <input type="text" id="descripcion" name="descripcion" data-vv-as="Descripcion de la noticia" class="form-control" v-model="noticia.descripcion" v-validate="'required'" > -->
                                        <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                                {{ errors.first('descripcion') }}
                                            </span>
                                    </div>
                                </div>
                                <div class="clearfix">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="fgroup required">
                                        <label for="">Afiche de noticia</label>
                                        <br>
                                        <span id="management-avatar" style="display:inline-block">
                                            <button  id="" type="button" class="btn btn-primary btn-flat btn-md margin" @click="toggleShow">
                                              <i class="fa fa-camera  "></i> Subir Afiche de noticia
                                            </button>
                                        </span>
                                        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="showAvatar" :width="300" :height="300" :params="params" lang-type="en" :headers="headers" img-format="png">
                                        </my-upload>
                                        <!-- <input type="hidden" id="avatar" name="avatar" class="form-control" v-model="avatar" v-validate="'required'" :class="{'datepicker':true,  'has-error': errors.has('form-avatar.avatar') }">-->
                                        <span class="help-block" for="avatar" v-bind:data-error="errors.first('form-avatar.avatar')">
                                            {{ errors.first('.avatar') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img :src="avatar" class="img-avatar img-responsive img-rounded">
                                </div>
                            </div>
                            <div class="box-footer">
                                <div class="col-xs-12 text-right">
                                    <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-plus"></i> Agregar </button>
                                    <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-edit"></i> Actualizar</button>
                                </div>
                            </div>

                        </form>

                        <div class="box-body">

                            <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                <i class="fa fa-arrow-circle-left"></i> Regresar
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

</template>

<script>

import noticias from "../../controllers/noticias.js";
import myUpload from "vue-image-crop-upload";
const BASE_URL = process.env.BASE_URL;
export default {
    name: "Noticias",
    data() {
        return {
            errMsg: "",
            errorMsg: "",
            showAlert: false,
            showSuccess: false,
            successMsg: "",
            errMsg: "",
            isLogin: false,
            noticia: {},
            clearBtn: true,
            todayBtn: true,
            closeOnSelected: true,
            limitFrom: "",
            datosPersona: true,
            datosTipo: false,
            limitTo: "",
            headers: {
                smail: "*_~"
            },
            params: {},
            format: "yyyy-MM-dd",
            avatar: "",
            changePhoto: false,
            showAvatar: false,
            show: false,
            use_default_avatar: true,
            weekStartsWith: 0,
            id: '',
            noticia: {
                fechaInicio: null,
                fechaFin: null
            }
        };
    },
    created() {
        this.id = this.$route.params.id;
        if (this.id) {
            noticias.retrieve(this, this.id);
            //this.comprobantev.value = this.transaccion.comprobante;

            this.avatar = this.getImg(this.id)
        }

    },
    watch: {


        avatar(val, oldVal) {
            /*   let img = this.atleta.rutaFoto
               let imgAsset = null
               if(process.env.NODE_ENV == "development"){
                   try{
                       imgAsset = require('@/assets/images/'+ img)
                   }
                   catch(er){
                       imgAsset = require('@/assets/images/default_avatar.png')
                   }
               }
               else{
                   imgAsset = process.env.BASE_ROUTE + '/static/img/src/assets/images/'+ img
               }*/
            if (val) {
                // this.changePhoto =  true
            } else {
                ///   this.changePhoto = false
            }
        }

    },
    components: {
        "my-upload": myUpload
    },
    methods: {
        toggleShow() {
                this.showAvatar = !this.show;
            },
            cropSuccess(imgDataUrl, field) {
                console.log("-------- crop success --------");
                this.changePhoto = true
                this.avatar = imgDataUrl;
                //   this.copy_of_default_image = imgDataUrl
            },
            /**
             * upload success
             */
            cropUploadSuccess(jsonData, field) {
                console.log("-------- upload success --------");
            },
            /**
             * upload fail
             */
            cropUploadFail(status, field) {
                console.log("-------- upload fail --------");
            },
            getImg(img) {

                return BASE_URL + "upload/files/noticia/" + img + ".png"
            },
            submit() {
                this.showAlert = false;
                this.showSuccess = false;
                this.$validator.validateAll().then(success => {
                    if (success) {
                        if (!this.id)
                            noticias.create(this, this.noticia);
                        else
                            noticias.update(this, this.noticia);
                    } else {
                        this.showAlert = true;
                        this.errMsg = "Error revisa el formulario";
                    }
                });
            },

            volver() {
                console.log("entre");
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            }
    }
};

</script>
