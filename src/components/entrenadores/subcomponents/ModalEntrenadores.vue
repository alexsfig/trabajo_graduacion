<template>
    <div>
        <modal :size="'md'" :title="title" :footer="false" id="modal-demo-1" ref="modal1" v-model="openModalInside"  @show="showCallback" @hide="dismissCallback">
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
            <div class="box box-primary" >
            
                <label>Descripcion del Entrenador: {{ updateEntrenador.descripcion}}</label>
                <form @submit.prevent="validateMethod" role="form"> 
                    <div class="box-body">
                       <input type="hidden" v-model="id"> 
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }" >
                                <label for="">Nombre</label>
                                <input type="text" id="nombre" name="nombre" data-vv-as="Nombre" class="form-control" 
                                v-model="updateEntrenador.personaId.nombre" v-validate="'required'" >
                                <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                    {{ errors.first('nombre') }}
                                </span>
                            </div>
                        </div>
                      

                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('apellido') }" >
                                <label for="">Apellido</label>
                                <input type="text" id="apellido" name="apellido" data-vv-as="Apellido" class="form-control" v-model="updateEntrenador.personaId.apellido" v-validate="'required'" >
                                <span class="help-block" for="apellido" v-bind:data-error="errors.first('apellido')">
                                    {{ errors.first('apellido') }}
                                </span>
                            </div>
                        </div>

                        
                         <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fechaNacimiento') }" >
                                            <label for="">Fecha de Nacimiento</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fechaNacimiento" name="fechaNacimiento" class="form-control" data-vv-as="Fecha de Nacimiento" v-model="updateEntrenador.personaId.fechaNacimiento" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fechaNacimiento') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fechaNacimiento') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="updateEntrenador.personaId.fechaNacimiento" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                           
                                            <span class="help-block" for="fechaNacimiento" v-bind:data-error="errors.first('fechaNacimiento')">
                                                {{ errors.first('fechaNacimiento') }}
                                            </span>
                                        </div>
                                    </div>

                         <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('dui') }" >
                                <label for="">Dui</label>
                                <input type="text" id="dui" name="dui" data-vv-as="Dui" v-mask="'########-#'" class="form-control" v-model="updateEntrenador.personaId.dui" >
                                <span class="help-block" for="dui" v-bind:data-error="errors.first('dui')">
                                    {{ errors.first('dui') }}
                                </span>
                            </div>
                        </div>

                         <div class="clearfix">

                                    </div>

                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('nit') }" >
                                <label for="">Nit</label>
                                <input type="text" id="nit" name="nit" data-vv-as="Nit" class="form-control" v-mask="'####-######-###-#'" v-model="updateEntrenador.personaId.nit"  >
                                <span class="help-block" for="nit" v-bind:data-error="errors.first('nit')">
                                    {{ errors.first('nit') }}
                                </span>
                            </div>
                        </div>

                         <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('direccion') }" >
                                <label for="">Direccion</label>
                                <input type="text" id="direccion" name="direccion" data-vv-as="Direccion" class="form-control" v-model="updateEntrenador.personaId.direccion" v-validate="'required'" >
                                <span class="help-block" for="nit" v-bind:data-error="errors.first('direccion')">
                                    {{ errors.first('direccion') }}
                                </span>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('telefono') }" >
                                <label for="">Telefono</label>
                                <input type="mail" id="telefono" name="telefono" v-mask="'####-####'" data-vv-as="Telefono" class="form-control" v-model="updateEntrenador.personaId.telefono" >
                                <span class="help-block" for="nit" v-bind:data-error="errors.first('telefono')">
                                    {{ errors.first('telefono') }}
                                </span>
                            </div>
                        </div>

                         <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('correo') }" >
                                <label for="">Correo</label>
                                <input type="mail" id="correo" name="correo" data-vv-as="Correo" class="form-control" v-model="updateEntrenador.personaId.correo" v-validate="'required|email'" >
                                <span class="help-block" for="nit" v-bind:data-error="errors.first('correo')">
                                    {{ errors.first('correo') }}
                                </span>
                            </div>
                        </div>



                      <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('sexo') }">
                                            <label for="">Sexo</label>
                                            <v-select
                                                :debounce="250"
                                                :options="sexo"
                                                v-model="updateEntrenador.personaId.sexo"
                                                placeholder="Seleccione el genero" 
                                                label="nombre" >
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="sexo" value="" data-vv-as="sexo"  v-model="updateEntrenador.personaId.sexo" v-validate="'required'">
                                            <span class="help-block" for="sexo" v-bind:data-error="errors.first('sexo')">
                                                {{ errors.first('sexo') }}
                                            </span>
                                        </div>
                                    </div>



                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('descripcion') }" >
                                <label for="">Descripcion del Entrenador</label>
                                <input type="text" id="descripcion" name="descripcion" data-vv-as="Descripcion" class="form-control" v-model="updateEntrenador.descripcion" v-validate="'required'" >
                                <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                    {{ errors.first('descripcion') }}
                                </span>
                            </div>
                        </div>
                      
                                            
                    </div>    
                    <div class="box-footer">
                        <div class="col-xs-12 text-right">
                            <button type="submit" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-edit"></i> {{ buttonMsg }}</button>
                        </div>
                    </div>

                </form>
            </div>

        </modal>
    </div>
</template>
<script>
    import users from '../../../controllers/users.js'
    import roles from '../../../controllers/roles.js'
    import entrenadores from '../../../controllers/entrenadores.js'
    import personaController from '../../../controllers/persona.js'
    import moment from 'moment'
    import vSelect from "vue-select"

    export default {
        name: 'ActualizarEntrenador',
        props:  [
           
             "title",
            "id",
            "buttonMsg",
            "methodSubmit",
            "openModal",
            "entrenador"

        ],
        computed: {

        },
        created(){
            this.retrieveRoles()
        },
        data() {
            return {

                clearBtn: true,
                todayBtn: true,
                closeOnSelected: true,
                limitFrom: '',
                limitTo: '',
                format: 'yyyy-MM-dd',
                weekStartsWith: 0,
                
                openValue: "",
                errMsg:  '',
                successMsg:  '',
                success: false,
                isLogin: false,
                show: false,
                showAlert: false,
                showSuccess: false,
                persona: {},
                openModalInside: false,
                roles: [],
                rol_edit: null,

                 sexo:[
                    {name: 'M', nombre:'Masculino'},
                    {name: 'F', nombre:'Femenino'}                    
                   
                   
                ]

            }
        },
        components:{
            vSelect
        },
        watch: {
            '$route': 'fetchData',
            entrenador: function(val, oldVal){
                this.openModalInside = this.openModal
                this.updateEntrenador = this.entrenador


                if(typeof this.updateEntrenador.personaId.sexo != 'object' ){
                    let nombre = this.updateEntrenador.personaId.sexo == 'M' ? 'Masculino' : 'Femenino'
                    let name = this.updateEntrenador.personaId.sexo 
                    this.updateEntrenador.personaId.sexo = this.updateEntrenador.personaId.sexo.replace(/\s/g, "")
                    this.updateEntrenador.personaId.sexo = {name: name, nombre: nombre}   
                }
              
            }
        },
        methods:{
            showCallback () {
            },
            dismissCallback (msg) {
                this.showSuccess = false
                this.showAlert = false
                this.openModalInside =false
                this.$emit('openChange', false);
            },
            retrieveRoles(){
                roles.index(this)
            },
            retrieveData(id) {
                entrenadores.retrieve(this, id)
            },
            validateMethod(){
                console.log(this.methodSubmit)
                if(this.methodSubmit == 'update'){
                    this.updateUsuario();
                }
                else{
                    console.log(this.methodSubmit)
                }
            },
            updateUsuario() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {


                         if( this.updateEntrenador.personaId.sexo=='Masculino'){
                        this.updateEntrenador.personaId.sexo='M'
                      }

                       if( this.updateEntrenador.personaId.sexo=='Femenino'){
                        this.updateEntrenador.personaId.sexo='F'
                      }

                        this.updateEntrenador.personaId.sexo = this.updateEntrenador.personaId.sexo.name == undefined ? this.updateEntrenador.personaId.sexo : this.updateEntrenador.personaId.sexo.name
                   personaController.patch(this,this.updateEntrenador.personaId)
       //   personaController.patch(this,this.updateEntrenador.personaId)

              
                        
                        entrenadores.update2(this, this.updateEntrenador)
                    
                    }
                    else{
                        this.errMsg= 'Error revisa el formulario'
                        this.showAlert=true
                    }
                })

            }
        }
    }
</script>