<style scoped>

.active {
    width: 100%;
}

</style>

<template>

<div>
    <section class="content-header">
        <h1>
            Atletas
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li>Manejo de Atletas</li>
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
                        <h3 class="box-title">Manejo de Atletas</h3>
                    </div>

                    <div class="box-body">
                        <div class="col-xs-12 text-left">
                            <router-link to="/admin/atletas" type="button" class="btn btn-flat btn-sm btn-warning margin ">
                                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                                Regresar a atletas
                            </router-link>
                        </div>
                        <div class="col-md-12">
                            <h3>
                                Editar Información de Atleta: {{ atleta.personaId.nombre + " " + atleta.personaId.apellido}}
                            </h3>
                        </div>
                        <div class="col-md-12">
                            <form-wizard @on-complete="updateUsuario" errorColor="#dd4b39" finishButtonText="Actualizar Atleta" title="" nextButtonText="Siguiente" backButtonText="Regresar" subtitle="" stepSize="lg" color="#367fa9">
                                <tab-content title="Información del Atleta" icon="fa fa-user" :before-change="first_step">
                                    <form @submit.prevent="first_step('form-2-1')" role="form" data-vv-scope="form-2-1">
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.aniosPracticando') }">
                                                <label for="">Años practicando</label>
                                                <input min="0" max="50" type="number" id="aniosPracticando" name="aniosPracticando" data-vv-as="Años practicando " class="form-control" v-model="atleta.aniosPracticando" v-validate="'required'">
                                                <span class="help-block" for="aniosPracticando" v-bind:data-error="errors.first('form-2-1.aniosPracticando')">
                                                    {{ errors.first('form-2-1.aniosPracticando') }}
                                                </span>

                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.edadInicio') }">
                                                <label for="">Edad que inicio</label>
                                                <input type="number" min="5" max="50" id="edadInicio" name="edadInicio" data-vv-as="Edad que inicio " class="form-control" v-model="atleta.edadInicio" v-validate="'required'">
                                                <span class="help-block" for="edadInicio" v-bind:data-error="errors.first('form-2-1.edadInicio')">
                                                    {{ errors.first('form-2-1.edadInicio') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.idiomas') }">
                                                <label for="">Idiomas</label>
                                                <v-select multiple :debounce="250" :options="idiomas" v-model="atleta.idiomas" placeholder="Seleccione el idioma" label="name">
                                                </v-select>
                                                <div class="clearfix"></div>
                                                <input type="hidden" name="type" value="" data-vv-as="Tipo" v-model="type" v-validate="'required'">
                                                <span class="help-block" for="type" v-bind:data-error="errors.first('form-2-1.idiomas')">
                                                    {{ errors.first('form-2-1.idiomas') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.sabeEscribir') }">
                                                <label for="">Sabe Escribir</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true"  v-model="atleta.sabeEscribir"   :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                </span>
                                                <span class="help-block" for="sabeEscribir" v-bind:data-error="errors.first('form-2-1.sabeEscribir')">
                                                    {{ errors.first('form-2-1.sabeEscribir') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.sabeFirmar') }">
                                                <label for="">Sabe Leer</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true" v-model="atleta.sabeLeer"  :width="130" :height="35" id="changed-font"  :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>

                                                </span>
                                                <span class="help-block" for="sabeFirmar" v-bind:data-error="errors.first('form-2-1.sabeFirmar')">
                                                    {{ errors.first('form-2-1.sabeFirmar') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.sabeLeer') }">
                                                <label for="">Sabe Firmar</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true" v-model="atleta.sabeFirmar"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                </span>
                                                <span class="help-block" for="sabeLeer" v-bind:data-error="errors.first('form-2-1.sabeLeer')">
                                                    {{ errors.first('form-2-1.sabeLeer') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.nivelAcademico') }">
                                                <label for="">Nivel Academico</label>
                                                <input type="text" id="nivelAcademico" name="nivelAcademico" data-vv-as="Nivel Academico " class="form-control" v-model="atleta.nivelAcademico" v-validate="'required'">
                                                <span class="help-block" for="nivelAcademico" v-bind:data-error="errors.first('form-2-1.nivelAcademico')">
                                                    {{ errors.first('form-2-1.nivelAcademico') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.uanioCursado') }">
                                                <label for="">Ultimo Año cursado</label>
                                                <input type="text" id="uanioCursado" name="uanioCursado" data-vv-as="Ultimo Año cursado " class="form-control" v-model="atleta.uanioCursado" v-validate="'required'">
                                                <span class="help-block" for="uanioCursado" v-bind:data-error="errors.first('form-2-1.uanioCursado')">
                                                    {{ errors.first('form-2-1.uanioCursado') }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.otrosEstudios') }">
                                                <label for="">Otros Estudios</label>
                                                <textarea type="text" id="otrosEstudios" name="otrosEstudios" data-vv-as="Otros Estudios " class="form-control" v-model="atleta.otrosEstudios" v-validate="''"></textarea>
                                                <span class="help-block" for="otrosEstudios" v-bind:data-error="errors.first('form-2-1.otrosEstudios')">
                                                    {{ errors.first('form-2-1.otrosEstudios') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <hr>
                                    </form>
                                </tab-content>
                                <tab-content title="Formación Como Atleta" icon="fa fa-user" :before-change="second_step">
                                    <form @submit.prevent="second_step('form-2-2')" role="form" data-vv-scope="form-2-2">
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.tieneLesion') }">
                                                <label for="">Tiene Lesion</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true"  v-model="atleta.tieneLesion"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeLesion"/>
                                                </span>
                                                <span class="help-block" for="tieneLesion" v-bind:data-error="errors.first('form-2-2.tieneLesion')">
                                                    {{ errors.first('form-2-2.tieneLesion') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-8">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.descripcionLesion') }">
                                                <label for="">Descripcion lesión</label>
                                                <textarea type="text" id="descripcionLesion" name="descripcionLesion" data-vv-as="Descripcion lesión " class="form-control" v-model="atleta.descripcionLesion" v-validate="'required'" :disabled="has_lession == true"></textarea>
                                                <span class="help-block" for="descripcionLesion" v-bind:data-error="errors.first('form-2-2.descripcionLesion')">
                                                    {{ errors.first('form-2-2.descripcionLesion') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.compitioFechas') }">
                                                <label for="">Ha competido en fechas</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true"  v-model="atleta.compitioFechas"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeCompetition"/>
                                                </span>
                                                <span class="help-block" for="compitioFechas" v-bind:data-error="errors.first('form-2-2.compitioFechas')">
                                                    {{ errors.first('form-2-2.compitioFechas') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.cuantasFechas') }">
                                                <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.cuantasFechas') }">
                                                    <label for="">Fechas que ha competido</label>
                                                    <input type="number" id="cuantasFechas" name="cuantasFechas" data-vv-as="Fechas que ha competido " class="form-control" v-model="atleta.cuantasFechas" v-validate="'required'" :disabled="has_competition == true">
                                                    <span class="help-block" for="cuantasFechas" v-bind:data-error="errors.first('form-2-2.cuantasFechas')">
                                                    {{ errors.first('form-2-2.cuantasFechas') }}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">

                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.ultimaParticipacion') }">
                                                <label for="">Fecha Ultima Competición</label>
                                                <dropdown class="form-group">
                                                    <div class="input-group">
                                                        <input type="text" id="ultimaParticipacion" name="ultimaParticipacion" class="form-control" data-vv-as="Fecha Ultima Competición" v-model="atleta.ultimaParticipacion" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-2-2.ultimaParticipacion') }"
                                                        :disabled="has_competition == true">
                                                        <div class="input-group-btn">
                                                            <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-2-2.ultimaParticipacion') }" :disabled="has_competition == true">
                                                                <i class="glyphicon glyphicon-calendar"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <template slot="dropdown">
                                                        <li>
                                                            <date-picker class="date-picker" v-model="atleta.ultimaParticipacion" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                            </date-picker>
                                                        </li>
                                                    </template>
                                                </dropdown>
                                                <span class="help-block" for="ultimaParticipacion" v-bind:data-error="errors.first('form-2-2.ultimaParticipacion')">
                                                    {{ errors.first('form-2-2.ultimaParticipacion') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.ultimaParticipacion') }">
                                                <label for="">Lado del Pie</label>
                                                <br>
                                                <span class="pull-right">
                                                    <toggle-button :sync="true"  v-model="atleta.ladoPie" :width="130" :height="35" id="changed-font" :labels="{checked: 'Izquierdo', unchecked: 'Derecho'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                                </span>
                                                <span class="help-block" for="ladoPie" v-bind:data-error="errors.first('form-2-2.ladoPie')">
                                                    {{ errors.first('form-2-2.ladoPie') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.olaPreferida') }">
                                                <label for="">Ola Favorita</label>
                                                <v-select :debounce="250" :options="olas" v-model="atleta.olaPreferida" placeholder="Seleccione ola favorita" label="name">
                                                </v-select>
                                                <div class="clearfix"></div>
                                                <input type="hidden" name="olaPreferida" value="" data-vv-as="Ola Preferida" v-model="atleta.olaPreferida" v-validate="'required'">
                                                <span class="help-block" for="olaPreferida" v-bind:data-error="errors.first('form-2-2.olaPreferida')">
                                                    {{ errors.first('form-2-2.olaPreferida') }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.logros') }">
                                                <label for="">Logros</label>
                                                <textarea type="text" id="logros" name="logros" data-vv-as="Logros " class="form-control" v-model="atleta.logros" v-validate="'required'"></textarea>
                                                <span class="help-block" for="logros" v-bind:data-error="errors.first('form-2-2.logros')">
                                                    {{ errors.first('form-2-2.logros') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix">
                                        </div>
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.playaPractica') }">
                                                <label for="">Playa Donde Practica</label>
                                                <v-select :debounce="250" :options="playas" v-model="atleta.playaPractica" placeholder="Seleccione Playa" label="nombre">
                                                </v-select>
                                                <input type="hidden" name="playaPractica" value="" data-vv-as="Tipo" v-model="atleta.playaPractica" v-validate="'required'">
                                                <span class="help-block" for="playaPractica" v-bind:data-error="errors.first('form-2-2.playaPractica')">
                                                    {{ errors.first('form-2-2.playaPractica') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-8">
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2-2.rutinaConstancia') }">
                                                <label for="">Rutina Constancia</label>
                                                <textarea type="text" id="rutinaConstancia" name="rutinaConstancia" data-vv-as="Rutina Constancia " class="form-control" v-model="atleta.rutinaConstancia" v-validate="'required'"></textarea>
                                                <span class="help-block" for="rutinaConstancia" v-bind:data-error="errors.first('form-2-2.rutinaConstancia')">
                                                    {{ errors.first('form-2-2.rutinaConstancia') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </form>
                                </tab-content>
                                <tab-content title="Fotografia" icon="fa fa-camera" :before-change="third_step">
                                    <form  @submit.prevent="third_step('form-avatar')" role="form" data-vv-scope="form-avatar">
                                        <div class="row">
                                            <div class="fgroup col-md-8 col-md-offset-2" :class="{ 'has-error': errors.has('form-avatar.avatar') }">
                                                <div class="col-md-6">
                                                    <!-- <div class="fgroup">
                                                        <label for="">Usar foto por defecto</label>
                                                        <br>
                                                        <span class="pull-right">
                                                            <toggle-button  v-model="use_default_avatar" :sync="true" :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                        </span>

                                                    </div> -->
                                                    <div class="clearfix"></div>
                                                    <div class="fgroup">
                                                        <label for="">Imagen de perfil</label>
                                                        <br>
                                                        <span id="management-avatar" style="display:inline-block">
                                                            <button :disabled="use_default_avatar" id="" type="button" class="btn btn-primary btn-flat btn-md margin" @click="toggleShow">
                                                              <i class="fa fa-camera  "></i> Subir Foto de perfil
                                                            </button>
                                                        </span>
                                                        <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="showAvatar" :width="300" :height="300" :params="params" lang-type="en" :headers="headers" img-format="png">
                                                        </my-upload>
                                                        <input type="hidden" id="avatar" name="avatar" class="form-control" v-model="avatar" v-validate="'required'" :class="{'datepicker':true,  'has-error': errors.has('form-avatar.avatar') }">
                                                        <span class="help-block" for="avatar" v-bind:data-error="errors.first('form-avatar.avatar')">
                                                            {{ errors.first('form-avatar.avatar') }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <img :src="avatar" class="img-avatar img-responsive img-rounded">
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </tab-content>
                            </form-wizard>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    </section>
</div>

</template>

<script>

import atletasController from '../../controllers/atletas.js'
import ModalEntrenadores from './subcomponents/ModalEntrenadores'
import vSelect from "vue-select"
import masked from "vue-masked-input"
import playasController from '../../controllers/playas.js'
import moment from "moment"
import myUpload from 'vue-image-crop-upload';
const default_avatar = require('@/assets/images/default_avatar.png')

export default {
    name: 'atletas',
    data() {
        return {
            methodSubmit: 'update',
            buttonMsg: "Actualizar",
            openModal: false,
            errMsg: '',
            success: false,
            isLogin: false,
            showAlert: false,
            showSuccess: false,
            // We need to initialize the component with any
            // properties that will be used in it
            atletas: [],
            atleta: {},

            atletaUpdate: {},
            idiomas: [{
                    name: 'Español'
                }, {
                    name: 'Ingles'
                }, {
                    name: 'Frances'
                }, {
                    name: 'Aleman'
                }, {
                    name: 'Portugues'
                },

            ],
            playas: [],
            olas: [{
                    name: 'Derecha'
                }, {
                    name: 'Izquierda'
                }, {
                    name: 'Pico ó Mixta'
                }, {
                    name: 'Cerrote'
                }, {
                    name: 'Viento'
                }, {
                    name: 'De Fondo ó Swell'
                }, {
                    name: 'Huecas'
                }, {
                    name: 'Derramadas'
                }, {
                    name: 'Onduladas'
                }, {
                    name: 'Colapso'
                },

            ],
            type: {
                name: 'Atleta'
            },
            has_lession: true,
            has_competition: true,
            limitTo: '',
            format: 'yyyy-MM-dd',
            weekStartsWith: 0,
            clearBtn: true,
            todayBtn: true,
            closeOnSelected: true,
            limitFrom: '',
            avatar: '',
            juez: null,
            imgDataUrl: '', // the datebase64 url of created image
            showAvatar: false,
            params: {},
            headers: {
                smail: '*_~'
            },
            show: false,
            use_default_avatar: false,
            changePhoto: false,
            copy_of_default_image: '',
            filename: ''
        }
    },
    components: {
        "modalentrenadores": ModalEntrenadores,
        vSelect,
        'masked-input': masked,
        'my-upload': myUpload,
    },
    created() {
        this.fetchData()
        console.log(moment)
    },
    watch: {
        use_default_avatar(val, oldVal){
            if(val == true){
                this.avatar = default_avatar
            }
            else{
                this.avatar = this.copy_of_default_image
            }
        },
        avatar(val, oldVal){
            let img = this.atleta.rutaFoto
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
                imgAsset = '/static/img/src/assets/images/'+ img
            }
            if(val !== imgAsset){
                this.changePhoto =  true
            }
            else{
                this.changePhoto = false
            }
        },
        '$route': 'fetchData',
        atleta: function(val, oldVal) {
            //this.atleta = this.$route.params.atleta
            //this.atleta = this.atleta
            let img = this.atleta.rutaFoto
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
                imgAsset = '/static/img/src/assets/images/'+ img

            }
            this.avatar =  imgAsset
            this.copy_of_default_image = imgAsset
            this.atleta.sabeEscribir = (val.sabeEscribir == 1 ? true : false)
            this.atleta.sabeLeer = (val.sabeLeer == 1 ? true : false)
            this.atleta.tieneLesion = (val.tieneLesion == 1 ? true : false)
            this.atleta.sabeFirmar = (val.sabeFirmar == 1 ? true : false)
            this.atleta.compitioFechas = (val.compitioFechas == 1 ? true : false)
            this.atleta.ladoPie = (val.ladoPie == "Izquierda" ? true : false)
            this.atleta.idiomas = val.idiomas.replace(/\s/g, "")
            this.atleta.idiomas = val.idiomas.split(",")
            var idiomas = val.idiomas
            var newArry = []
            for (var i = idiomas.length - 1; i >= 0; i--) {
                if (idiomas[i] != "") {
                    newArry.push({
                        name: idiomas[i]
                    });
                }
            }
            this.atleta.idiomas = newArry

            this.atleta.olaPreferida = val.olaPreferida.replace(/\s/g, "")
            var olaPreferida = val.olaPreferida
            this.atleta.olaPreferida = {
                name: olaPreferida
            }

            var playaPractica = val.playaPractica
            this.atleta.playaPractica = {
                nombre: playaPractica
            }

        },

    },
    methods: {
        first_step() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll('form-2-1').then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(true)
                    }
                });
            })
        },
        second_step() {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll('form-2-2').then(success => {
                    if (success) {
                        resolve(true)
                    } else {
                        reject(true)
                    }
                });
            })
        },
        third_step(){
            return new Promise((resolve, reject) => {
                this.$validator.validateAll('form-avatar').then(success => {
                    this.showAlert = false
                    this.showSuccess = false
                    if (success) {
                        resolve(true)
                    }
                    else{
                        this.showAlert = true
                        this.errMsg = "Please complete all required fields"
                        reject(true)
                    }
                });
            })
        },
        onChangeLesion(evt) {
            if (evt.value == true) {
                this.has_lession = false
            } else {
                this.has_lession = true
            }
        },
        onChangeCompetition(evt) {
            if (evt.value == true) {
                this.has_competition = false
            } else {
                this.has_competition = true
            }
        },



        isChange() {
            this.openModal = false
            this.fetchData()
        },
        showCallback() {
            this.showAlert = false
            this.showSuccess = false
        },
        dismissCallback(msg) {
            this.openModal = false
            atletasController.index(this)
            this.fetchData()
        },
        fetchData() {
            atletasController.retrieve(this, this.$route.params.id)
            playasController.index(this)

        },
        retrieveData(id) {
            atletasController.retrieve(this, id)
        },
        volverAtletas() {
            this.$router.push({
                name: 'AtletasIndex',
            });
        },


        validateMethod() {
            console.log(this.methodSubmit)
            if (this.methodSubmit == 'update') {
                this.updateUsuario();
            } else {
                console.log(this.methodSubmit)
            }
        },
        updateUsuario() {
            this.showAlert = false
            this.showSuccess = false
            this.$validator.validateAll().then(success => {
                if (success) {
                    let ladoPie, playaPractica, idiomas = '',
                        olaPreferida;
                    for (var i = this.atleta.idiomas.length - 1; i >= 0; i--) {
                        idiomas = idiomas + ', ' + this.atleta.idiomas[i].name
                    }
                    if (this.atleta.ladoPie == true) {
                        ladoPie = 'Izquierda'
                    } else {
                        ladoPie = "Derecha"
                    }
                    olaPreferida = this.atleta.olaPreferida.name
                    playaPractica = this.atleta.playaPractica.nombre
                    let persona = this.createPersona
                    let atleta = {
                        "rutaFoto": this.atleta.rutaFoto,
                        "aniosPracticando": this.atleta.aniosPracticando == undefined ? 0 : parseInt(this.atleta.aniosPracticando),
                        "compitioFechas": this.atleta.compitioFechas == false ? 0 : 1,
                        "cuantasFechas": this.atleta.cuantasFechas == undefined ? 0 : parseInt(this.atleta.cuantasFechas),
                        "descripcionLesion": this.atleta.descripcionLesion == undefined ? '' : this.atleta.descripcionLesion,
                        "edadInicio": this.atleta.edadInicio == undefined ? 0 : parseInt(this.atleta.edadInicio),
                        "id": this.atleta.id,
                        "idiomas": idiomas == undefined ? '' : idiomas,
                        "ladoPie": ladoPie == undefined ? '' : ladoPie,
                        "logros": this.atleta.logros == undefined ? '' : this.atleta.logros,
                        "nivelAcademico": this.atleta.nivelAcademico == undefined ? '' : this.atleta.nivelAcademico,
                        "olaPreferida": olaPreferida == undefined ? '' : olaPreferida,
                        "otrosEstudios": this.atleta.otrosEstudios == undefined ? '' : this.atleta.otrosEstudios,
                        "personaId": this.atleta.personaId,
                        "playaPractica": playaPractica == undefined ? '' : playaPractica,
                        "rutinaConstancia": this.atleta.rutinaConstancia == undefined ? '' : this.atleta.rutinaConstancia,
                        "sabeEscribir": this.atleta.sabeEscribir == false ? 0 : 1,
                        "sabeFirmar": this.atleta.sabeFirmar == false ? 0 : 1,
                        "sabeLeer": this.atleta.sabeLeer == false ? 0 : 1,
                        "tieneLesion": this.atleta.tieneLesion == false ? 0 : 1,
                        "uanioCursado": this.atleta.uanioCursado == undefined ? '' : this.atleta.uanioCursado,
                        "ultimaParticipacion": this.atleta.ultimaParticipacion == undefined ? '' : this.atleta.ultimaParticipacion
                    }
                    atletasController.update(this, atleta)
                } else {
                    this.errMsg = 'Error revisa el formulario'
                    this.showAlert = true
                }
            })

        },
        toggleShow() {
            this.showAvatar = !this.show;
        },
        /**
         * crop success
         */
        cropSuccess(imgDataUrl, field) {
            console.log('-------- crop success --------');
            this.avatar = imgDataUrl;
            this.copy_of_default_image = imgDataUrl
        },
        /**
         * upload success
         */
        cropUploadSuccess(jsonData, field) {
            console.log('-------- upload success --------');
        },
        /**
         * upload fail
         */
        cropUploadFail(status, field) {
            console.log('-------- upload fail --------');
        }


    }

}

</script>
