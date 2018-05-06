<style>
.vue-js-switch#changed-font {
  font-size: 16px;
}
</style>
<template>
    <div>
        <section class="content-header">
            <h1>Personas</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>
                    <router-link to="/admin/persona">Personas</router-link>
                </li>
                <li class="active">Agregar Personas</li>
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
                            <h3 class="box-title">Agregar Persona</h3>
                        </div>
                        <div class="box-body" v-if="datosPersona">
                            <form @submit.prevent="submit('form-1')" role="form" data-vv-scope="form-1">
                                <div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.nombre') }">
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre " class="form-control" v-model="createPersona.nombre" v-validate="'required'">
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('form-1.nombre')">
                                                    {{ errors.first('form-1.nombre') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.apellido') }">
                                            <label for="">Apellido</label>
                                            <input type="text" id="apellido" name="apellido" data-vv-as="Apellido " class="form-control" v-model="createPersona.apellido" v-validate="'required'">
                                            <span class="help-block" for="apellido" v-bind:data-error="errors.first('form-1.apellido')">
                                                    {{ errors.first('form-1.apellido') }}
                                                </span>
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.correo') }">
                                            <label for="">Correo</label>
                                            <input type="email" id="correo" name="correo" data-vv-as="Correo " class="form-control" v-model="createPersona.correo" v-validate="'required|email'">
                                            <span class="help-block" for="correo" v-bind:data-error="errors.first('form-1.correo')">
                                                    {{ errors.first('form-1.correo') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.telefono') }">
                                            <label for="">Telefono</label>
                                            <masked-input mask="1111-1111" placeholder="####-####" id="telefono" name="telefono" data-vv-as="Telefono " class="form-control" v-model="createPersona.telefono" >
                                            </masked-input>
                                            <span class="help-block" for="telefono" v-bind:data-error="errors.first('form-1.telefono')">
                                                    {{ errors.first('form-1.telefono') }}
                                                </span>
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.dui') }">
                                            <label for="">DUI</label>
                                            <masked-input mask="11111111-1" placeholder="########-#" id="dui" name="dui" data-vv-as="DUI " class="form-control" v-model="createPersona.dui"  />
                                            <!-- <input type="text" id="dui" name="dui" v-mask="'########-#'"  data-vv-as="DUI " class="form-control" v-model="createPersona.dui" v-validate="'required'" > -->
                                            <span class="help-block" for="dui" v-bind:data-error="errors.first('form-1.dui')">
                                                    {{ errors.first('form-1.dui') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.nit') }">
                                            <label for="">NIT</label>
                                            <masked-input mask="1111-111111-111-1" placeholder="####-######-###-#" name="nit" data-vv-as="NIT " class="form-control" v-model="createPersona.nit" />
                                            <!-- <input type="text" id="nit" name="nit"  v-mask="'####-######-###-#'" data-vv-as="NIT " class="form-control" v-model="createPersona.nit" v-validate="'required'" > -->
                                            <span class="help-block" for="nit" v-bind:data-error="errors.first('form-1.nit')">
                                                    {{ errors.first('form-1.nit') }}
                                                </span>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6">

                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.fechaNacimiento') }">
                                            <label for="">Fecha Nacimiento</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fechaNacimiento" name="fechaNacimiento" class="form-control" data-vv-as="Fecha Nacimiento" v-model="createPersona.fechaNacimiento" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-1.fechaNacimiento') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-1.fechaNacimiento') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es-MX'" v-model="createPersona.fechaNacimiento" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>
                                            <span class="help-block" for="fechaNacimiento" v-bind:data-error="errors.first('form-1.fechaNacimiento')">
                                                    {{ errors.first('form-1.fechaNacimiento') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.tipo') }">
                                            <label for="">Tipo</label>
                                            <v-select :debounce="250" :options="positions" v-model="type" 
                                            placeholder="Seleccione el tipo" label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipo" value="" 
                                            data-vv-as="Tipo" v-model="type" v-validate="'required'">
                                            <span class="help-block" for="tipo" v-bind:data-error="errors.first('form-1.tipo')">
                                                    {{ errors.first('form-1.tipo') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.sex') }">
                                            <label for="">Sexo</label>
                                            <v-select :options="sexo" v-model="sex" placeholder="Seleccione el sexo" label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="sex" value="" data-vv-as="Sexo" v-model="sex" v-validate="'required'">
                                            <span class="help-block" for="sex" v-bind:data-error="errors.first('form-1.sex')">
                                                    {{ errors.first('form-1.sex') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-1.direccion') }">
                                            <label for="">Dirección</label>
                                            <textarea type="text" id="direccion" name="direccion" data-vv-as="Dirección " class="form-control" v-model="createPersona.direccion" v-validate="'required'"></textarea>
                                            <span class="help-block" for="direccion" v-bind:data-error="errors.first('form-1.direccion')">
                                                    {{ errors.first('form-1.direccion') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-arrow-circle-right" ></i> Continuar</button>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div class="box-body" v-if="datosTipo">
                             <div class="box-body">
                            <div class="col-xs-12 text-left">
                                <button type="button" @click="returnToSelect" class="btn btn-flat btn-sm btn-warning margin "><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Regresar a Editar información de persona</button>
                            </div>   </div>
                            <!---#################################################################################-->
                            <!---#################################################################################-->
                            <!---                  FORM ATLETA                               #####################-->
                            <!-- #################################################################################-->
                            <!---#################################################################################-->

                            <div class="col-md-12 " v-if="type.name == 'Atleta'">
                                <form-wizard @on-complete="submitAtleta" errorColor="#dd4b39" finishButtonText="Crear Persona" title="" nextButtonText="Siguiente" backButtonText="Regresar" subtitle="" stepSize="lg" color="#367fa9">
                                    <tab-content title="Información del Atleta" icon="fa fa-user" :before-change="first_step">
                                        <form @submit.prevent="first_step('form-2-1')" action="" v-if="type.name == 'Atleta'" data-vv-scope="form-2-1">
                                           
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.edadInicio') }">
                                                    <label for="">Edad que inicio</label>
                                                    <input type="number" id="edadInicio" name="edadInicio" data-vv-as="Edad que inicio " class="form-control" v-model="createAtleta.edadInicio" v-validate="'required|min_value:4|max_value:79'">
                                                    <span class="help-block" for="edadInicio" v-bind:data-error="errors.first('form-2-1.edadInicio')">
                                                              {{ errors.first('form-2-1.edadInicio') }}
                                                          </span>
                                                </div>
                                            </div>
                                             <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.aniosPracticando') }">
                                                    <label for="">Años practicando</label>
                                                    <input type="number" id="aniosPracticando" name="aniosPracticando" data-vv-as="Años practicando " class="form-control" v-model="createAtleta.aniosPracticando" v-validate="'required|min_value:0|max_value:79'">
                                                    <span class="help-block" for="aniosPracticando" v-bind:data-error="errors.first('form-2-1.aniosPracticando')">
                                                        {{ errors.first('form-2-1.aniosPracticando') }}
                                                    </span>
                                                </div>
                                            </div> 
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.type') }">
                                                    <label for="">Idiomas</label>
                                                    <v-select multiple :debounce="250" :options="idiomas" v-model="createAtleta.idiomas" placeholder="Seleccione el idioma" label="name">
                                                    </v-select>
                                                    <div class="clearfix"></div>
                                                    <input type="hidden" name="idiomas" value="" data-vv-as="Idiomas" v-model="createAtleta.idiomas" v-validate="'required'">
                                                    <span class="help-block" for="type" v-bind:data-error="errors.first('form-2-1.idiomas')">
                                                              {{ errors.first('form-2-1.idiomas') }}
                                                          </span>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.sabeEscribir') }">
                                                    <label for="">Sabe Escribir</label>
                                                    <br>
                                                    <span class="pull-right">
                                                              <toggle-button  v-model="createAtleta.sabeEscribir"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                          </span>
                                                    <span class="help-block" for="sabeEscribir" v-bind:data-error="errors.first('form-2-1.sabeEscribir')">
                                                              {{ errors.first('form-2-1.sabeEscribir') }}
                                                          </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.sabeFirmar') }">
                                                    <label for="">Sabe Leer</label>
                                                    <br>
                                                    <span class="pull-right">
                                                              <toggle-button  v-model="createAtleta.sabeFirmar"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                          </span>
                                                    <span class="help-block" for="sabeFirmar" v-bind:data-error="errors.first('form-2-1.sabeFirmar')">
                                                              {{ errors.first('form-2-1.sabeFirmar') }}
                                                          </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.sabeLeer') }">
                                                    <label for="">Sabe Firmar</label>
                                                    <br>
                                                    <span class="pull-right">
                                                              <toggle-button  v-model="createAtleta.sabeLeer"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                          </span>
                                                    <span class="help-block" for="sabeLeer" v-bind:data-error="errors.first('form-2-1.sabeLeer')">
                                                              {{ errors.first('form-2-1.sabeLeer') }}
                                                          </span>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <!--<div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.nivelAcademico') }">
                                                    <label for="">Nivel Academico</label>
                                                    <input type="text" id="nivelAcademico" name="nivelAcademico" data-vv-as="Nivel Academico " class="form-control" v-model="createAtleta.nivelAcademico" v-validate="'required'">
                                                    <span class="help-block" for="nivelAcademico" v-bind:data-error="errors.first('form-2-1.nivelAcademico')">
                                                              {{ errors.first('form-2-1.nivelAcademico') }}
                                                          </span>
                                                </div>
                                            </div>-->

                                            
                                        <div class="col-xs-12 col-sm-4">
                                            <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.nivelAcademico') }">
                                                <label for="">Nivel Academico</label>
                                                <v-select :debounce="250" :options="niveles" v-model="createAtleta.nivelAcademico" placeholder="Seleccione un Nivel Academico" label="name">
                                                </v-select>
                                                <div class="clearfix"></div>
                                                <input type="hidden" name="nivelAcademico" value="" data-vv-as="Nivel Academico " v-model="createAtleta.nivelAcademico"  v-validate="'required'">
                                                <span class="help-block" for="nivelAcademico" v-bind:data-error="errors.first('form-2-1.nivelAcademico')">
                                                    {{ errors.first('form-2-1.nivelAcademico') }}
                                                </span>
                                            </div>
                                        </div>
                                           <!--
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.uanioCursado') }">
                                                    <label for="">Ultimo Año cursado</label>
                                                    <input type="text" id="uanioCursado" name="uanioCursado" data-vv-as="Ultimo Año cursado " class="form-control" v-model="createAtleta.uanioCursado" v-validate="'required'">
                                                    <span class="help-block" for="uanioCursado" v-bind:data-error="errors.first('form-2-1.uanioCursado')">
                                                              {{ errors.first('form-2-1.uanioCursado') }}
                                                          </span>
                                                </div>
                                            </div> -->

                                             <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-1.uanioCursado') }">
                                                    <label for="">Ultimo Año cursado</label>
                                                    <v-select :debounce="250" :options="ucursado" v-model="createAtleta.uanioCursado" placeholder="Seleccione ultimo Año Cursado" label="name">
                                                </v-select>
                                                <div class="clearfix"></div>
                                                    <input type="hidden" name="uanioCursado" value="" data-vv-as="Ultimo Año cursado " v-model="createAtleta.uanioCursado" v-validate="'required'">
                                                    <span class="help-block" for="uanioCursado" v-bind:data-error="errors.first('form-2-1.uanioCursado')">
                                                              {{ errors.first('form-2-1.uanioCursado') }}
                                                          </span>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup" :class="{ 'has-error': errors.has('form-2-1.otrosEstudios') }">
                                                    <label for="">Otros Estudios</label>
                                                    <textarea type="text" id="otrosEstudios" name="otrosEstudios" data-vv-as="Otros Estudios " class="form-control" v-model="createAtleta.otrosEstudios" v-validate="''"></textarea>
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
                                        <form @submit.prevent="second_step('form-2-2')" action="" v-if="type.name == 'Atleta'" data-vv-scope="form-2-2">
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.tieneLesion') }">
                                                    <label for="">Tiene Lesion</label>
                                                    <br>
                                                    <span class="pull-right">
                                                      <toggle-button  v-model="createAtleta.tieneLesion"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeLesion"/>
                                                  </span>
                                                    <span class="help-block" for="tieneLesion" v-bind:data-error="errors.first('form-2-2.tieneLesion')">
                                                      {{ errors.first('form-2-2.tieneLesion') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-8">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.descripcionLesion') }">
                                                    <label for="">Descripcion lesión</label>
                                                    <textarea type="text" id="descripcionLesion" name="descripcionLesion" data-vv-as="Descripcion lesión " class="form-control" v-model="createAtleta.descripcionLesion" v-validate="'required'" :disabled="has_lession == true"></textarea>
                                                    <span class="help-block" for="descripcionLesion" v-bind:data-error="errors.first('form-2-2.descripcionLesion')">
                                                      {{ errors.first('form-2-2.descripcionLesion') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.compitioFechas') }">
                                                    <label for="">Ha competido en fechas</label>
                                                    <br>
                                                    <span class="pull-right">
                                                      <toggle-button  v-model="createAtleta.compitioFechas"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeCompetition"/>
                                                  </span>
                                                    <span class="help-block" for="compitioFechas" v-bind:data-error="errors.first('form-2-2.compitioFechas')">
                                                      {{ errors.first('form-2-2.compitioFechas') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.cuantasFechas') }">
                                                    <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.cuantasFechas') }">
                                                        <label for="">Fechas que ha competido</label>
                                                        <input type="number" id="cuantasFechas" name="cuantasFechas" data-vv-as="Fechas que ha competido " class="form-control" v-model="createAtleta.cuantasFechas" v-validate="'required|min_value:1'" :disabled="has_competition == true">
                                                        <span class="help-block" for="cuantasFechas" v-bind:data-error="errors.first('form-2-2.cuantasFechas')">
                                                      {{ errors.first('form-2-2.cuantasFechas') }}
                                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-4">

                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.ultimaParticipacion') }">
                                                    <label for="">Fecha Ultima Competición</label>
                                                    <dropdown class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" id="ultimaParticipacion" name="ultimaParticipacion" class="form-control" data-vv-as="Fecha Ultima Competición" v-model="createAtleta.ultimaParticipacion" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-2-2.ultimaParticipacion') }"
                                                            :disabled="has_competition == true">
                                                            <div class="input-group-btn">
                                                                <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-2-2.ultimaParticipacion') }" :disabled="has_competition == true">
                                                                    <i class="glyphicon glyphicon-calendar"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <template slot="dropdown">
                                                            <li>
                                                                <date-picker class="date-picker" v-model="createAtleta.ultimaParticipacion" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
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
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.ladoPie') }">
                                                    <label for="">Lado del Pie</label>
                                                    <br>
                                                    <span class="pull-right">
                                                      <toggle-button  v-model="createAtleta.ladoPie"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Izquierdo', unchecked: 'Derecho'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                                  </span>
                                                  <span class="help-block" for="ladoPie" v-bind:data-error="errors.first('form-2-2.ladoPie')">
                                                      {{ errors.first('form-2-2.createAtleta') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.type') }">
                                                    <label for="">Ola Favorita</label>
                                                    <v-select :debounce="250" :options="olas" v-model="createAtleta.olaPreferida" placeholder="Seleccione ola favorita" label="name">
                                                    </v-select>
                                                    <div class="clearfix"></div>
                                                    <input type="hidden" name="olaPreferida" value="" data-vv-as="Ola Preferida" v-model="createAtleta.olaPreferida" v-validate="'required'">
                                                    <span class="help-block" for="olaPreferida" v-bind:data-error="errors.first('form-2-2.olaPreferida')">
                                                      {{ errors.first('form-2-2.olaPreferida') }}
                                                  </span>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.logros') }">
                                                    <label for="">Logros</label>
                                                    <textarea type="text" id="logros" name="logros" data-vv-as="Logros " class="form-control" v-model="createAtleta.logros" v-validate="'required'"></textarea>
                                                    <span class="help-block" for="logros" v-bind:data-error="errors.first('form-2-2.logros')">
                                                      {{ errors.first('form-2-2.logros') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="clearfix">

                                            </div>
                                            <div class="col-xs-12 col-sm-4">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.playaPractica') }">
                                                    <label for="">Playa Donde Practica</label>
                                                    <v-select :debounce="250" :options="playas" v-model="createAtleta.playaPractica" placeholder="Seleccione Playa" label="nombre">
                                                    </v-select>
                                                    <input type="hidden" name="playaPractica" value="" data-vv-as="Tipo" v-model="createAtleta.playaPractica" v-validate="'required'">
                                                    <span class="help-block" for="playaPractica" v-bind:data-error="errors.first('form-2-2.playaPractica')">
                                                      {{ errors.first('form-2-2.playaPractica') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-8">
                                                <div class="fgroup required" :class="{ 'has-error': errors.has('form-2-2.rutinaConstancia') }">
                                                    <label for="">Rutina Constancia</label>
                                                    <textarea type="text" id="rutinaConstancia" name="rutinaConstancia" data-vv-as="Rutina Constancia " class="form-control" v-model="createAtleta.rutinaConstancia" v-validate="'required'"></textarea>
                                                    <span class="help-block" for="rutinaConstancia" v-bind:data-error="errors.first('form-2-2.rutinaConstancia')">
                                                      {{ errors.first('form-2-2.rutinaConstancia') }}
                                                  </span>
                                                </div>
                                            </div>
                                            <div class="clearfix"></div>
                                        </form>
                                    </tab-content>
                                    <tab-content title="Fotografia" icon="fa fa-camera" :before-change="third_step">
                                        <form @submit.prevent="third_step('form-avatar')" action="" v-if="type.name == 'Atleta'" data-vv-scope="form-avatar">
                                            <div class="row">
                                                <div class="fgroup col-md-8 col-md-offset-2" :class="{ 'has-error': errors.has('form-avatar.avatar') }">
                                                    <div class="col-md-6">
                                                        <div class="fgroup required">
                                                            <label for="">Usar foto por defecto</label>
                                                            <br>
                                                            <span class="pull-right">
                                                                <toggle-button  v-model="use_default_avatar" :sync="true" :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                                            </span>

                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <div class="fgroup required">
                                                            <label for="">Imagen de perfil</label>
                                                            <br>
                                                            <span id="management-avatar" style="display:inline-block">
                                                                <button :disabled="use_default_avatar" id="" type="button" class="btn btn-primary btn-flat btn-md margin" @click="toggleShow">
                                                                  <i class="fa fa-camera  "></i> Subir Foto de perfil
                                                                </button>
                                                            </span>
                                                            <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="showAvatar" :width="300" :height="300" :params="params" lang-type="es" :headers="headers" img-format="png">
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
                            <!---#################################################################################-->
                            <!---#################################################################################-->
                            <!---                  FORM JUEz                                 #####################-->
                            <!-- #################################################################################-->
                            <!---#################################################################################-->
                            <form @submit.prevent="submitJuez('form-3')" action="" v-if="type.name == 'Juez'" data-vv-scope="form-3">
                                <div v-if="type.name == 'Juez'">
                                    <h3>Información del Juez</h3>
                                    <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-3.descripcion') }">
                                            <label for="">Descripcion del juez</label>
                                            <textarea v-model="createJuez.descripcion" class="form-control" name="descripcion" rows="2" data-vv-as="Descripcion del juez" v-validate="'required'">

                                            </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-3.descripcion')">
                                                    {{ errors.first('form-3.descripcion') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <h3>
                                            Agregar certificaciones:
                                        </h3>
                                    <div class="col-sm-12">
                                        <form id="formaddCer" name="formaddCer" @submit.prevent="add_certificacion('form-4')" action="" data-vv-scope="form-4">

                                            <div class="col-sm-5">

                                                <div class="col-xs-12">
                                                    <div class="fgroup required">
                                                        <label for="">Titulo</label>
                                                        <input v-model="newCert.titulo" name="titulo" type="text" data-vv-as="titulo" class="form-control" v-validate="'required'">
                                                        <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-4.descripcion')">
                                                                {{ errors.first('form-4.titulo') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12">

                                                    <div class="fgroup required" :class="{ 'has-error': errors.has('form-4.fecha') }">
                                                        <label for="">Fecha</label>
                                                        <dropdown class="form-group">
                                                            <div class="input-group">
                                                                <input type="text" id="fecha" name="fecha" class="form-control" data-vv-as="Fecha" v-model="newCert.fecha" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-4.fecha') }">
                                                                <div class="input-group-btn">
                                                                    <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-4.fecha') }">
                                                                        <i class="glyphicon glyphicon-calendar"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <template slot="dropdown">
                                                                <li>
                                                                    <date-picker class="date-picker" v-model="newCert.fecha" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                                    </date-picker>
                                                                </li>
                                                            </template>
                                                        </dropdown>
                                                        <span class="help-block" for="fecha" v-bind:data-error="errors.first('form-4.fecha')">
                                                                {{ errors.first('form-4.fecha') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xs-12">
                                                    <div class="fgroup required">
                                                        <label for="">Lugar</label>
                                                        <input v-model="newCert.lugar" name="lugar" type="text" class="form-control" data-vv-as="Lugar" v-validate="'required'">
                                                        <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-4.descripcion')">
                                                                {{ errors.first('form-4.lugar') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 text-right">
                                                    <button type="submit" class="btn btn-flat btn-sm btn-primary">Agregar certificacion </button>
                                                </div>
                                            </div>
                                            <div class="col-xs-7">
                                                <div class="col-xs-12 ">
                                                    <vue-good-table :columns="columns" :rows="creaCert" title="Certificaciones del juez" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                                        <template slot="table-row" scope="props">
                                                            <td class="nowrap">{{ props.row.titulo }}</td>
                                                            <td>{{ props.row.fecha }}</td>
                                                            <td>{{ props.row.lugar }}</td>
                                                            <td>
                                                                <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteCert(props.index)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>

                                                            </td>
                                                        </template>
                                                    </vue-good-table>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 pull-right">
                                        <div class="box-footer">
                                            <div class="col-xs-12 text-right">
                                                <button type="submit" class="btn btn-flat btn-sm btn-primary">Guardar Juez </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <!---#################################################################################-->
                            <!---#################################################################################-->
                            <!---                  FORM Entrenador                                 #####################-->
                            <!-- #################################################################################-->
                            <!---#################################################################################-->
                            <form @submit.prevent="submitEntrenador('form-5')" action="" v-if="type.name == 'Entrenador'" data-vv-scope="form-5">
                                <div v-if="type.name == 'Entrenador'">
                                    <h3>Información del Entrenador</h3>
                                    <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-5.descripcion') }">
                                            <label for="">Descripcion del Entrenador</label>
                                            <textarea v-model="createEntrenador.descripcion" class="form-control" name="descripcion" rows="2" data-vv-as="Descripcion del Entrenador" v-validate="'required'">

                                            </textarea>
                                            <span class="help-block" for="descripcion" v-bind:data-error="errors.first('form-5.descripcion')">
                                                    {{ errors.first('form-5.descripcion') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-12 pull-right">
                                        <div class="box-footer">
                                            <div class="col-xs-12 text-right">
                                                <button type="submit" class="btn btn-flat btn-sm btn-primary">Guardar Entrenador </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <!---#################################################################################-->
                            <!---#################################################################################-->
                            <!---                  FORM Miembro Junta                                 #####################-->
                            <!-- #################################################################################-->
                            <!---#################################################################################-->
                            <form @submit.prevent="submitMiembroJunta('form-6')" action="" v-if="type.name == 'Miembro Junta'" data-vv-scope="form-6">
                                <div v-if="type.name == 'Miembro Junta'">
                                    <h3>Información del Miembro Junta</h3>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup required" :class="{ 'has-error': errors.has('form-6.nivelJerarquia') }">
                                            <label for="">Nivel Jerarquia</label>
                                            <v-select :debounce="250" :options="jerarquia"
                                             v-model="createMiembroJunta.nivelJerarquia" placeholder="Seleccione la jerarquia" label="name">
                                            </v-select>
                                            <!--<input  v-model="createMiembroJunta.nivelJerarquia" name="nivelJerarquia"  data-vv-as="nivelJerarquia" v-validate="'required'"> -->
                                             <div class="clearfix"></div>
                                           <input type="hidden" name="nivelJerarquia" value="" data-vv-as="jerarquia"  v-model="createMiembroJunta.nivelJerarquia" v-validate="'required'">
                                            <span class="help-block" for="type" v-bind:data-error="errors.first('form-6.nivelJerarquia')">
                                                    {{ errors.first('form-6.nivelJerarquia') }}
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 pull-right">
                                        <div class="box-footer">
                                            <div class="col-xs-12 text-right">
                                                <button type="submit" class="btn btn-flat btn-sm btn-primary">Guardar Miembro Junta </button>
                                            </div>
                                        </div>
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
import users from "../../controllers/users.js";
import playasController from "../../controllers/playas.js";
import personaController from "../../controllers/persona.js";
import certificacionController from "../../controllers/certificacion.js";
import vSelect from "vue-select";
import moment from "moment";
import myUpload from "vue-image-crop-upload";
const default_avatar = require("@/assets/images/default_avatar.png");

import masked from "vue-masked-input";
export default {
  name: "Usuarios",
  data() {
    return {
      errMsg: "",
      errorMsg: "",
      showAlert: false,
      showSuccess: false,
      successMsg: "",
      errMsg: "",
      isLogin: false,
      createPersona: {
        fechaNacimiento: null,
        telefono: null,
        dui: null,
        nit: null
      },
      filename: "",
      createJuez: {},
      createEntrenador: {},
      createMiembroJunta: {},
      newCert: {
        fecha: null
      },
      creaCert: [],
      createAtleta: {
        compitioFechas: false,
        sabeEscribir: false,
        sabeFirmar: false,
        sabeLeer: false,
        tieneLesion: false,
        ladoPie: true,
        olaPreferida: null,
        playaPractica: null,
        idiomas: null,
          nivelAcademico: null,
          uanioCursado: null
      },
      type: null,
      confirm_password: "",
      roles: [],
      clearBtn: true,
      todayBtn: true,
      closeOnSelected: true,
      limitFrom: "",
      datosPersona: true,
      datosTipo: false,
      limitTo: "",
      format: "yyyy-MM-dd",
      weekStartsWith: 0,
      has_lession: true,
      has_competition: true,
      positions: [
        {
          name: "Juez"
        },
        {
          name: "Atleta"
        },
        {
          name: "Miembro Junta"
        },
        {
          name: "Entrenador"
        }
      ],
      jerarquia: [
        {
          name: "Presidente"
        },
        {
          name: "Vice Presidente"
        },
        {
          name: "Secretario"
        },
        {
          name: "Tesorero"
        },
        {
          name: "Vocal"
        },
        {
          name: "Sindico"
        }
      ],

      idiomas: [
        {
          name: "Español"
        },
        {
          name: "Ingles"
        },
        {
          name: "Frances"
        },
        {
          name: "Aleman"
        },
        {
          name: "Portugues"
        }
      ],
      playas: [],
      sex: "",
      sexo: [
        { name: "Femenino", shortName: "F" },
        { name: "Masculino", shortName: "M" }
      ],
      olas: [
        {
          name: "Derecha"
        },
        {
          name: "Izquierda"
        },
        {
          name: "Pico ó Mixta"
        },
        {
          name: "Cerrote"
        },
        {
          name: "Viento"
        },
        {
          name: "De Fondo ó Swell"
        },
        {
          name: "Huecas"
        },
        {
          name: "Derramadas"
        },
        {
          name: "Onduladas"
        },
        {
          name: "Colapso"
        }
      ],
      niveles: [
        {
          name: "Nivel Inicial"
        },
        {
          name: "Nivel Parvulario"
        },
        {
          name: "Nivel Basico"
        },
        {
          name: "Nivel Medio"
        },
        {
          name: "Nivel Superior"
        }
      ],
      ucursado: [
        {
          name: "Nivel Inicial"
        },
        {
          name: "Nivel Parvulario"
        },
        {
          name: "Nivel Basico-1er Ciclo"
        },
        {
          name: "Nivel Basico-2do Ciclo"
        },
        {
          name: "Nivel Basico-3er Ciclo"
        },
        {
          name: "Nivel Medio - 1er año de Bachillerado"
        },
        {
          name: "Nivel Medio - 2do año de Bachillerado"
        },
        {
          name: "Nivel Medio - 3er año de Bachillerado(Opcional)"
        },
        {
          name: "Nivel Superior - No Finalizado"
        },
        {
          name: "Nivel Superior - Finalizado"
        }
      ],
      columns: [
        {
          label: "titulo",
          field: "titulo"
        },
        {
          label: "fecha",
          field: "fecha"
        },
        {
          label: "lugar",
          field: "lugar"
        },
        {
          label: "Action"
        }
      ],
      avatar: default_avatar,
      juez: null,
      imgDataUrl: "", // the datebase64 url of created image
      showAvatar: false,
      params: {},
      headers: {
        smail: "*_~"
      },
      show: false,
      use_default_avatar: false
    };
  },
  components: {
    vSelect,
    "masked-input": masked,
    "my-upload": myUpload
  },
  created() {
    this.filename = new Date().getTime().toString(36);
    this.createAtleta.ruta_foto = "persona/atleta/" + this.filename + ".png";
    this.fetchData();
    //console.log(personaController.index())
    console.log(moment);
  },
  watch: {
    use_default_avatar(val, oldVal) {
      if (val == true) {
        this.avatar = default_avatar;
      } else {
        this.avatar = "";
      }
    },
    sex(val, oldVal) {
      this.createPersona.sexo = val.shortName;
    },
    juez(val, old_val) {
      if (val != null) {
        $.each(this.creaCert, function(index, val) {
          val.juezId = this.juez;
          console.log(val);

          //certificacionController.create(this, val)
        });
      }
    }
  },
  methods: {
    first_step() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("form-2-1").then(success => {
          if (success) {
            if (
              this.createAtleta.aniosPracticando <=
              this._calculateAge(this.createPersona.fechaNacimiento) -
                this.createAtleta.edadInicio
            ) {
              resolve(true);
              this.showAlert = false;
              this.errMsg = "";
            } else {
              reject(true);
              this.showAlert = true;
              this.errMsg =
                "Los Años Practicando no pueden ser superior al intervalo de tiempo entre la Edad de Inicio y la Edad del Atleta";
            }
          } else {
            reject(true);
          }
        });
      });
    },
    second_step() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("form-2-2").then(success => {
          if (success) {
            resolve(true);
          } else {
            reject(true);
          }
        });
      });
    },
    third_step() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("form-avatar").then(success => {
          this.showAlert = false;
          this.showSuccess = false;
          if (success) {
            resolve(true);
          } else {
            this.showAlert = true;
            this.errMsg = "Please complete all required fields";
            reject(true);
          }
        });
      });
    },
    resetForm() {
      (this.createPersona = {
        fechaNacimiento: null,
        telefono: null,
        dui: null,
        nit: null
      }),
        (this.createJuez = {}),
        (this.createEntrenador = {}),
        (this.createMiembroJunta = {}),
        (this.newCert = {
          fecha: null
        }),
        (this.creaCert = []),
        (this.createAtleta = {
          compitioFechas: false,
          sabeEscribir: false,
          sabeFirmar: false,
          sabeLeer: false,
          tieneLesion: false,
          ladoPie: true,
        
        }),
        (this.type = null),
        (this.datosPersona = true);
      this.datosTipo = false;
    },
    add_certificacion(scope) {
      this.$validator.validateAll(scope).then(success => {
        if (success) {
          this.creaCert.push(this.newCert);
          this.newCert = {
            fecha: ' '
          };

       
          console.log(this.errors)
        

  
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    deleteCert(id) {
      this.creaCert.splice(id, 1);
    },
    onChangeLesion(evt) {
      if (evt.value == true) {
        this.has_lession = false;
      } else {
        this.has_lession = true;
      }
    },
    onChangeCompetition(evt) {
      if (evt.value == true) {
        this.has_competition = false;
      } else {
        this.has_competition = true;
      }
    },
    submit(scope) {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll(scope).then(success => {
        if (success) {
          this.datosPersona = false;
          this.datosTipo = true;
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    submitEntrenador(scope) {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll(scope).then(success => {
        if (success) {
          let persona = this.createPersona;
          let entrenador = {
            descripcion: this.createEntrenador.descripcion
          };
          persona.entrenador = entrenador;
          this.entrenador = entrenador;
          personaController.createEntrenador(this, persona);
          console.log("////////////////////////");
          console.log(persona);
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    submitMiembroJunta(scope) {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll(scope).then(success => {
        if (success) {
          let persona = this.createPersona;
          let miembroJunta = {
            nivelJerarquia: this.createMiembroJunta.nivelJerarquia.name
          };
          persona.miembroJunta = miembroJunta;

          this.miembroJunta = miembroJunta;
          personaController.createMiembroJunta(this, persona);
          console.log(miembroJunta);
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    submitJuez(scope) {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll(scope).then(success => {
        if (success) {
          let persona = this.createPersona;
          let juez = {
            descripcion: this.createJuez.descripcion,
            certificacionList: this.creaCert
            //"personaId": persona,
          };
          persona.juez = juez;
          this.juez = juez;
          personaController.createJuez(this, persona);
          console.log(juez);
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    submitAtleta() {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll().then(success => {
        if (success) {
          this.datosPersona = false;
          this.datosTipo = true;
          let ladoPie,
            playaPractica,
            idiomas = "",
            olaPreferida,
            nivelAcademico,
            uanioCursado,
            idiomasArr = [];
          for (var i = this.createAtleta.idiomas.length - 1; i >= 0; i--) {
            idiomasArr.push(this.createAtleta.idiomas[i].name);
          }
          idiomas = idiomasArr.toString();

          if (this.createAtleta.ladoPie == true) {
            ladoPie = "Izquierda";
          } else {
            ladoPie = "Derecha";
          }
          olaPreferida = this.createAtleta.olaPreferida.name;
          nivelAcademico = this.createAtleta.nivelAcademico.name;
          uanioCursado = this.createAtleta.uanioCursado.name;
          playaPractica = this.createAtleta.playaPractica.nombre;
          let persona = this.createPersona;
          let atleta = {
            ruta_foto: this.createAtleta.ruta_foto,
            aniosPracticando:
              this.createAtleta.aniosPracticando == undefined
                ? 0
                : parseInt(this.createAtleta.aniosPracticando),
            compitioFechas: this.createAtleta.compitioFechas == false ? 0 : 1,
            cuantasFechas:
              this.createAtleta.cuantasFechas == undefined
                ? 0
                : parseInt(this.createAtleta.cuantasFechas),
            descripcionLesion:
              this.createAtleta.descripcionLesion == undefined
                ? ""
                : this.createAtleta.descripcionLesion,
            edadInicio:
              this.createAtleta.edadInicio == undefined
                ? 0
                : parseInt(this.createAtleta.edadInicio),
            idiomas: idiomas == undefined ? "" : idiomas,
            ladoPie: ladoPie == undefined ? "" : ladoPie,
            logros:
              this.createAtleta.logros == undefined
                ? ""
                : this.createAtleta.logros,
            nivelAcademico: nivelAcademico == undefined ? "" : nivelAcademico,
            olaPreferida: olaPreferida == undefined ? "" : olaPreferida,
            otrosEstudios:
              this.createAtleta.otrosEstudios == undefined
                ? ""
                : this.createAtleta.otrosEstudios,
            // "personaId": persona,
            playaPractica: playaPractica == undefined ? "" : playaPractica,
            rutinaConstancia:
              this.createAtleta.rutinaConstancia == undefined
                ? ""
                : this.createAtleta.rutinaConstancia,
            sabeEscribir: this.createAtleta.sabeEscribir == false ? 0 : 1,
            sabeFirmar: this.createAtleta.sabeFirmar == false ? 0 : 1,
            sabeLeer: this.createAtleta.sabeLeer == false ? 0 : 1,
            tieneLesion: this.createAtleta.tieneLesion == false ? 0 : 1,
            uanioCursado: uanioCursado == undefined ? "" : uanioCursado,
            ultimaParticipacion:
              this.createAtleta.ultimaParticipacion == undefined
                ? ""
                : this.createAtleta.ultimaParticipacion
          };
          persona.atleta = atleta;
          personaController.createAtleta(this, persona);
          console.log(atleta);
        } else {
          this.showAlert = true;
          this.errMsg = "Por favor complete el formulario";
        }
      });
    },
    returnToSelect() {
      this.datosPersona = true;
      this.datosTipo = false;
    },
    fetchData() {
      playasController.index(this);
    },
    toggleShow() {
      this.showAvatar = !this.show;
    },
    /**
     * crop success
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.avatar = imgDataUrl;
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

    _calculateAge(birthday) {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
};
</script>
