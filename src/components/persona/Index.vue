<template>
    <div>
        <section class="content-header">
            <h1>Personas</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/users">Personas</router-link></li>
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
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit('form-1')"  role="form" v-if="datosPersona" data-vv-scope="form-1"> 
                                <div>

                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.nombre') }" >
                                            <label for="">Nombre</label>
                                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre " class="form-control" v-model="createPersona.nombre" v-validate="'required'" >
                                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('form-1.nombre')">
                                                {{ errors.first('form-1.nombre') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.apellido') }" >
                                            <label for="">Apellido</label>
                                            <input type="text" id="apellido" name="apellido" data-vv-as="Apellido " class="form-control" v-model="createPersona.apellido" v-validate="'required'" >
                                            <span class="help-block" for="apellido" v-bind:data-error="errors.first('form-1.apellido')">
                                                {{ errors.first('form-1.apellido') }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.correo') }" >
                                            <label for="">Correo</label>
                                            <input type="email" id="correo" name="correo" data-vv-as="Correo " class="form-control" v-model="createPersona.correo" v-validate="'required|email'" >
                                            <span class="help-block" for="correo" v-bind:data-error="errors.first('form-1.correo')">
                                                {{ errors.first('form-1.correo') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.telefono') }" >
                                            <label for="">Telefono</label>
                                             <masked-input mask="1111-1111" placeholder="####-####"  id="telefono" name="telefono" data-vv-as="Telefono " class="form-control" v-model="createPersona.telefono" v-validate="'required'" >
                                             </masked-input>
                                            <span class="help-block" for="telefono" v-bind:data-error="errors.first('form-1.telefono')">
                                                {{ errors.first('form-1.telefono') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.dui') }" >
                                            <label for="">DUI</label>
                                            <masked-input mask="11111111-1" placeholder="########-#" id="dui" name="dui" data-vv-as="DUI " class="form-control" v-model="createPersona.dui" v-validate="'required'"/>
                                            <!-- <input type="text" id="dui" name="dui" v-mask="'########-#'"  data-vv-as="DUI " class="form-control" v-model="createPersona.dui" v-validate="'required'" > -->
                                            <span class="help-block" for="dui" v-bind:data-error="errors.first('form-1.dui')">
                                                {{ errors.first('form-1.dui') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.nit') }" >
                                            <label for="">NIT</label>
                                            <masked-input mask="1111-111111-111-1" placeholder="####-######-###-#" name="nit"  data-vv-as="NIT " class="form-control" v-model="createPersona.nit" v-validate="'required'"/>
                                            <!-- <input type="text" id="nit" name="nit"  v-mask="'####-######-###-#'" data-vv-as="NIT " class="form-control" v-model="createPersona.nit" v-validate="'required'" > -->
                                            <span class="help-block" for="nit" v-bind:data-error="errors.first('form-1.nit')">
                                                {{ errors.first('form-1.nit') }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xs-12 col-sm-6">
                                        
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('form-1.fechaNacimiento') }">
                                            <label for="">Fecha Nacimiento</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input type="text" id="fechaNacimiento" name="fechaNacimiento" class="form-control" data-vv-as="Fecha Nacimiento" v-model="createPersona.fechaNacimiento" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-1.fechaNacimiento') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-1.fechaNacimiento') }" >
                                                            <i  class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker"
                                                          v-model="createPersona.fechaNacimiento"
                                                          :today-btn="todayBtn"
                                                          :clear-btn="clearBtn"
                                                          :limit-from="limitFrom"
                                                          :format="format"
                                                          :week-starts-with="weekStartsWith"
                                                          :limit-to="limitTo"
                                                          :close-on-selected="closeOnSelected">
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
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('form-1.type') }">
                                            <label for="">Tipo</label>
                                            <v-select
                                                :debounce="250"
                                                :options="positions"
                                                v-model="type"
                                                placeholder="Seleccione el tipo" 
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="type" value="" data-vv-as="Tipo"  v-model="type" v-validate="'required'">
                                            <span class="help-block" for="type" v-bind:data-error="errors.first('form-1.type')">
                                                {{ errors.first('form-1.type') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-1.direccion') }" >
                                            <label for="">Dirección</label>
                                            <textarea type="text" id="direccion" name="direccion" data-vv-as="Dirección " class="form-control" v-model="createPersona.direccion" v-validate="'required'" ></textarea>
                                            <span class="help-block" for="direccion" v-bind:data-error="errors.first('form-1.direccion')">
                                                {{ errors.first('form-1.direccion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>                                           
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">Continuar</button>
                                    </div>
                                </div>

                            </form>
<!---############################################################################################################################################## -->
<!---############################################################################################################################################## -->
<!---###########################################                       FORM ATLETA                               ################################## -->
<!---############################################################################################################################################## -->
<!---############################################################################################################################################## -->
                            <form @submit.prevent="submitAtleta('form-2')" action="" v-if="datosTipo" data-vv-scope="form-2">
                                <div class="col-xs-12 text-left">
                                        <button type="button" @click="returnToSelect" class="btn btn-flat btn-sm btn-warning margin "><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Regresar a Editar informacion de persona</button>
                                    </div>
                                <div v-if="type.name == 'Atleta'">

                                    <h3>Información del Atleta</h3>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.aniosPracticando') }" >
                                            <label for="">Años practicando</label>
                                            <input min="0" max="50" type="number" id="aniosPracticando" name="aniosPracticando" data-vv-as="Años practicando " class="form-control" v-model="createAtleta.aniosPracticando" v-validate="'required'" >
                                            <span class="help-block" for="aniosPracticando" v-bind:data-error="errors.first('form-2.aniosPracticando')">
                                                {{ errors.first('form-2.aniosPracticando') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.edadInicio') }" >
                                            <label for="">Edad que inicio</label>
                                            <input type="number" min="5" max="50" id="edadInicio" name="edadInicio" data-vv-as="Edad que inicio " class="form-control" v-model="createAtleta.edadInicio" v-validate="'required'" >
                                            <span class="help-block" for="edadInicio" v-bind:data-error="errors.first('form-2.edadInicio')">
                                                {{ errors.first('form-2.edadInicio') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('form-2.type') }">
                                            <label for="">Idiomas</label>
                                            <v-select
                                                multiple
                                                :debounce="250"
                                                :options="idiomas"
                                                v-model="createAtleta.idiomas"
                                                placeholder="Seleccione el idioma" 
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="type" value="" data-vv-as="Tipo"  v-model="type" v-validate="'required'">
                                            <span class="help-block" for="type" v-bind:data-error="errors.first('form-2.type')">
                                                {{ errors.first('form-2.type') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.sabeEscribir') }" >
                                            <label for="">Sabe Escribir</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.sabeEscribir"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                            </span>
                                            <span class="help-block" for="sabeEscribir" v-bind:data-error="errors.first('form-2.sabeEscribir')">
                                                {{ errors.first('form-2.sabeEscribir') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.sabeFirmar') }" >
                                            <label for="">Sabe Leer</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.sabeFirmar"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                            </span>
                                            <span class="help-block" for="sabeFirmar" v-bind:data-error="errors.first('form-2.sabeFirmar')">
                                                {{ errors.first('form-2.sabeFirmar') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.sabeLeer') }" >
                                            <label for="">Sabe Firmar</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.sabeLeer"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}"/>
                                            </span>
                                            <span class="help-block" for="sabeLeer" v-bind:data-error="errors.first('form-2.sabeLeer')">
                                                {{ errors.first('form-2.sabeLeer') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.nivelAcademico') }" >
                                            <label for="">Nivel Academico</label>
                                            <input type="text" id="nivelAcademico" name="nivelAcademico" data-vv-as="Nivel Academico " class="form-control" v-model="createAtleta.nivelAcademico" v-validate="'required'" >
                                            <span class="help-block" for="nivelAcademico" v-bind:data-error="errors.first('form-2.nivelAcademico')">
                                                {{ errors.first('form-2.nivelAcademico') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.uanioCursado') }" >
                                            <label for="">Ultimo Año cursado</label>
                                            <input type="text" id="uanioCursado" name="uanioCursado" data-vv-as="Ultimo Año cursado " class="form-control" v-model="createAtleta.uanioCursado" v-validate="'required'" >
                                            <span class="help-block" for="uanioCursado" v-bind:data-error="errors.first('form-2.uanioCursado')">
                                                {{ errors.first('form-2.uanioCursado') }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.otrosEstudios') }" >
                                            <label for="">Otros Estudios</label>
                                            <textarea type="text" id="otrosEstudios" name="otrosEstudios" data-vv-as="Otros Estudios " class="form-control" v-model="createAtleta.otrosEstudios" v-validate="''"></textarea>
                                            <span class="help-block" for="otrosEstudios" v-bind:data-error="errors.first('form-2.otrosEstudios')">
                                                {{ errors.first('form-2.otrosEstudios') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <hr>
                                    <h3>Informacion sobre Formacion como Atleta</h3>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.tieneLesion') }" >
                                            <label for="">Tiene Lesion</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.tieneLesion"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeLesion"/>
                                            </span>
                                            <span class="help-block" for="tieneLesion" v-bind:data-error="errors.first('form-2.tieneLesion')">
                                                {{ errors.first('form-2.tieneLesion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-8">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.descripcionLesion') }" >
                                            <label for="">Descripcion lesión</label>
                                            <textarea type="text" id="descripcionLesion" name="descripcionLesion" data-vv-as="Descripcion lesión " class="form-control" v-model="createAtleta.descripcionLesion" v-validate="'required'" :disabled="has_lession == true"></textarea>
                                            <span class="help-block" for="descripcionLesion" v-bind:data-error="errors.first('form-2.descripcionLesion')">
                                                {{ errors.first('form-2.descripcionLesion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.compitioFechas') }" >
                                            <label for="">Ha competido en fechas</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.compitioFechas"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Si', unchecked: 'No'}" :color="{checked: '#37b53c', unchecked: '#f55d5d'}" @change="onChangeCompetition"/>
                                            </span>
                                            <span class="help-block" for="compitioFechas" v-bind:data-error="errors.first('form-2.compitioFechas')">
                                                {{ errors.first('form-2.compitioFechas') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.cuantasFechas') }" >
                                            <div class="fgroup" :class="{ 'has-error': errors.has('form-2.cuantasFechas') }" >
                                            <label for="">Fechas que ha competido</label>
                                            <input type="number" id="cuantasFechas" name="cuantasFechas" data-vv-as="Fechas que ha competido " class="form-control" v-model="createAtleta.cuantasFechas" v-validate="'required'" :disabled="has_competition == true">
                                            <span class="help-block" for="cuantasFechas" v-bind:data-error="errors.first('form-2.cuantasFechas')">
                                                {{ errors.first('form-2.cuantasFechas') }}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('form-2.ultimaParticipacion') }">
                                            <label for="">Fecha Ultima Competición</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input type="text" id="ultimaParticipacion" name="ultimaParticipacion" class="form-control" data-vv-as="Fecha Ultima Competición" v-model="createAtleta.ultimaParticipacion" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('form-2.ultimaParticipacion') }" :disabled="has_competition == true">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('form-2.ultimaParticipacion') }"  :disabled="has_competition == true"> 
                                                            <i  class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker"
                                                          v-model="createAtleta.ultimaParticipacion"
                                                          :today-btn="todayBtn"
                                                          :clear-btn="clearBtn"
                                                          :limit-from="limitFrom"
                                                          :format="format"
                                                          :week-starts-with="weekStartsWith"
                                                          :limit-to="limitTo"
                                                          :close-on-selected="closeOnSelected" >
                                                        </date-picker>
                                                    </li>
                                              </template>
                                            </dropdown>
                                            <span class="help-block" for="ultimaParticipacion" v-bind:data-error="errors.first('form-2.ultimaParticipacion')">
                                                {{ errors.first('form-2.ultimaParticipacion') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.ladoPie') }" >
                                            <label for="">Lado del Pie</label>
                                            <br>
                                            <span class="pull-right">
                                                <toggle-button  v-model="createAtleta.ladoPie"  :value="true" :width="130" :height="35" id="changed-font" :labels="{checked: 'Izquierdo', unchecked: 'Derecho'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                            </span>
                                            <span class="help-block" for="ladoPie" v-bind:data-error="errors.first('form-2.ladoPie')">
                                                {{ errors.first('form-2.createAtleta') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('form-2.type') }">
                                            <label for="">Ola Favorita</label>
                                            <v-select
                                                :debounce="250"
                                                :options="olas"
                                                v-model="createAtleta.olaPreferida"
                                                placeholder="Seleccione ola favorita" 
                                                label="name">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="type" value="" data-vv-as="Tipo"  v-model="type" v-validate="'required'">
                                            <span class="help-block" for="type" v-bind:data-error="errors.first('form-2.type')">
                                                {{ errors.first('form-2.type') }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.logros') }" >
                                            <label for="">Logros</label>
                                            <textarea type="text" id="logros" name="logros" data-vv-as="Logros " class="form-control" v-model="createAtleta.logros" v-validate="''"></textarea>
                                            <span class="help-block" for="logros" v-bind:data-error="errors.first('form-2.logros')">
                                                {{ errors.first('form-2.logros') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.playaPractica') }" >
                                            <label for="">Playa Donde Practica</label>
                                            <v-select
                                                :debounce="250"
                                                :options="playas"
                                                v-model="createAtleta.playaPractica"
                                                placeholder="Seleccione Playa" 
                                                label="nombre">
                                            </v-select>
                                            <span class="help-block" for="playaPractica" v-bind:data-error="errors.first('form-2.playaPractica')">
                                                {{ errors.first('form-2.playaPractica') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-8">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-2.rutinaConstancia') }" >
                                            <label for="">Rutina Constancia</label>
                                            <textarea type="text" id="rutinaConstancia" name="rutinaConstancia" data-vv-as="Rutina Constancia " class="form-control" v-model="createAtleta.rutinaConstancia" v-validate="'required'"></textarea>
                                            <span class="help-block" for="rutinaConstancia" v-bind:data-error="errors.first('form-2.rutinaConstancia')">
                                                {{ errors.first('form-2.rutinaConstancia') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-12 pull-right">
                                        <div class="box-footer">
                                            <div class="col-xs-12 text-right">
                                                <button type="submit" class="btn btn-flat btn-sm btn-primary">Guardar </button>
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
    import users from '../../controllers/users.js'
    import playasController from '../../controllers/playas.js'
    import personaController from '../../controllers/persona.js'
    import vSelect from "vue-select"
    import masked from "vue-masked-input"
    export default {
        name: 'Usuarios',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                successMsg: "",
                errMsg: "",
                isLogin: false,
                createPersona: {},
                createAtleta: {
                    "compitioFechas": false,
                    "sabeEscribir": false,
                    "sabeFirmar": false,
                    "sabeLeer": false,
                    "tieneLesion": false,
                    "ladoPie": true
                },
                type: null,
                confirm_password: "",
                roles: [],
                show: false,
                clearBtn: true,
                todayBtn: true,
                closeOnSelected: true,
                limitFrom: '',
                datosPersona: true,
                datosTipo: false    ,
                limitTo: '',
                format: 'yyyy-MM-dd',
                weekStartsWith: 0,
                has_lession: true,
                has_competition: true,
                positions:[
                    {name: 'Juez'},
                    {name: 'Atleta'},
                    {name: 'Miembro de Junta'},

                ],
                idiomas:[
                    {name: 'Español'},
                    {name: 'Ingles'},
                    {name: 'Frances'},
                    {name: 'Aleman'},
                    {name: 'Portugues'},

                ],
                playas: [],
                olas: [
                    {name: 'Derecha'},
                    {name: 'Izquierda'},
                    {name: 'Pico ó Mixta'},
                    {name: 'Cerrote'},
                    {name: 'Viento'},
                    {name: 'De Fondo ó Swell'},
                    {name: 'Huecas'},
                    {name: 'Derramadas'},
                    {name: 'Onduladas'},
                    {name: 'Colapso'},

                ],
                type:{name: 'Atleta'}
            }
        },
        components:{
            vSelect,
            'masked-input': masked
        },
        created(){
            this.fetchData()
            console.log(personaController.index())
        },
        methods: {
            onChangeLesion(evt){
                if(evt.value == true){
                    this.has_lession  = false
                }
                else{
                    this.has_lession  = true
                }
            },
            onChangeCompetition(evt){
                if(evt.value == true){
                    this.has_competition  = false
                }
                else{
                    this.has_competition  = true
                }
            },
            submit(scope) {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll(scope).then(success => {
                    if (success) {
                       this.datosPersona = false
                       this.datosTipo    = true
                    }
                    else{
                        this.showAlert = true
                        this.errMsg = "Por favor complete el formulario"
                    }
                });
            },
            submitAtleta(scope) {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll(scope).then(success => {
                    if (success) {
                       this.datosPersona = false
                       this.datosTipo    = true
                       let ladoPie, playaPractica, idiomas = '', olaPreferida;
                       for (var i = this.createAtleta.idiomas.length - 1; i >= 0; i--) {
                           idiomas = idiomas + ', ' + this.createAtleta.idiomas[i].name
                       }
                       if (this.createAtleta.ladoPie ==true) {
                            ladoPie = 'Izquierda'
                       }
                       else{
                            ladoPie = "Derecha"
                       }
                       olaPreferida = this.createAtleta.olaPreferida.name
                       playaPractica = this.createAtleta.playaPractica.nombre
                       let persona = this.createPersona
                       persona.id = 0
                       let atleta = {
                          "aniosPracticando": this.createAtleta.aniosPracticando == undefined ? 0 : parseInt(this.createAtleta.aniosPracticando),
                          "compitioFechas": this.createAtleta.compitioFechas == false ? 0 : 1,
                          "cuantasFechas": this.createAtleta.cuantasFechas == undefined ? 0 : parseInt(this.createAtleta.cuantasFechas),
                          "descripcionLesion": this.createAtleta.descripcionLesion == undefined ? '' : this.createAtleta.descripcionLesion,
                          "edadInicio": this.createAtleta.edadInicio == undefined ? 0 : parseInt(this.createAtleta.edadInicio),
                          "id": 0 ,
                          "idiomas": idiomas == undefined ? '' : idiomas,
                          "ladoPie": ladoPie == undefined ? '' :ladoPie,
                          "logros": this.createAtleta.logros == undefined ? '' : this.createAtleta.logros,
                          "nivelAcademico": this.createAtleta.nivelAcademico == undefined ? '' : this.createAtleta.nivelAcademico,
                          "olaPreferida": olaPreferida == undefined ? '' : olaPreferida,
                          "otrosEstudios": this.createAtleta.otrosEstudios == undefined ? '' : this.createAtleta.otrosEstudios,
                          "personaId": persona,
                          "playaPractica": playaPractica == undefined ? '' : playaPractica,
                          "rutinaConstancia": this.createAtleta.rutinaConstancia == undefined ? '' : this.createAtleta.rutinaConstancia,
                          "sabeEscribir": this.createAtleta.sabeEscribir == false ? 0 : 1,
                          "sabeFirmar": this.createAtleta.sabeFirmar == false ? 0 : 1,
                          "sabeLeer": this.createAtleta.sabeLeer == false ? 0 : 1,
                          "tieneLesion": this.createAtleta.tieneLesion == false ? 0 : 1,
                          "uanioCursado": this.createAtleta.uanioCursado == undefined ? '' : this.createAtleta.uanioCursado,
                          "ultimaParticipacion": this.createAtleta.ultimaParticipacion == undefined ? '' : this.createAtleta.ultimaParticipacion
                        }
                        personaController.createAtleta(this, atleta)
                        console.log(atleta)
                    }
                    else{
                        this.showAlert = true
                        this.errMsg = "Por favor complete el formulario"
                    }
                });
            },
            returnToSelect(){
                this.datosPersona = true
                this.datosTipo    = false
            },
            fetchData() {
                playasController.index(this)
            },
            
        }

    }
</script>
<style>
    .vue-js-switch#changed-font {
      font-size: 16px;
    }
</style>