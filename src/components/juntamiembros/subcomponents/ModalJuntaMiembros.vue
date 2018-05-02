<template>
<div>
    <modal :size="'md'" :title="title" :footer="false" id="modal-demo-1" ref="modal1" v-model="openModalInside" @show="showCallback" @hide="dismissCallback">
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
        <div class="box box-primary">

            <label>Nivel de Jerarquia: {{ updateMiembrojunta.nivelJerarquia.name}}</label>
            <form @submit.prevent="validateMethod" role="form">
                <div class="box-body">
                    <input type="hidden" v-model="id">
                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('nombre') }">
                            <label for="">Nombre</label>
                            <input type="text" id="nombre" name="nombre" data-vv-as="Nombre" class="form-control" v-model="persona.nombre" v-validate="'required'">
                            <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                    {{ errors.first('nombre') }}
                                </span>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('apellido') }">
                            <label for="">Apellido</label>
                            <input type="text" id="apellido" name="apellido" data-vv-as="Apellido" class="form-control" v-model="persona.apellido" v-validate="'required'">
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
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fechaNacimiento" name="fechaNacimiento" class="form-control" data-vv-as="Fecha de Nacimiento" v-model="persona.fechaNacimiento" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('fechaNacimiento') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fechaNacimiento') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="persona.fechaNacimiento" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
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
                        <div class="fgroup" :class="{ 'has-error': errors.has('dui') }">
                            <label for="">Dui</label>
                            <input type="text" id="dui" name="dui" v-mask="'########-#'" data-vv-as="Dui" class="form-control" v-model="persona.dui" >
                            <span class="help-block" for="dui" v-bind:data-error="errors.first('dui')">
                                    {{ errors.first('dui') }}
                                </span>
                        </div>
                    </div>

                     <div class="clearfix">

                                    </div>

                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('nit') }">
                            <label for="">Nit</label>
                            <input type="text" id="nit" name="nit" data-vv-as="Nit" v-mask="'####-######-###-#'" class="form-control" v-model="persona.nit" >
                            <span class="help-block" for="nit" v-bind:data-error="errors.first('nit')">
                                    {{ errors.first('nit') }}
                                </span>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('direccion') }">
                            <label for="">Direccion</label>
                            <input type="text" id="direccion" name="direccion" data-vv-as="Direccion" class="form-control" v-model="persona.direccion" v-validate="'required'">
                            <span class="help-block" for="nit" v-bind:data-error="errors.first('direccion')">
                                    {{ errors.first('direccion') }}
                                </span>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('telefono') }">
                            <label for="">Telefono</label>
                           <input type="text" id="telefono" v-mask="'####-####'" name="telefono" data-vv-as="Telefono" class="form-control" v-model="persona.telefono" > 

                          
                            <span class="help-block" for="nit" v-bind:data-error="errors.first('telefono')">
                                    {{ errors.first('telefono') }}
                                </span>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                        <div class="fgroup" :class="{ 'has-error': errors.has('correo') }">
                            <label for="">Correo</label>
                            <input type="mail" id="correo" name="correo" data-vv-as="Correo" class="form-control" v-model="persona.correo" v-validate="'required|email'">
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
                                                v-model="persona.sexo"
                                                placeholder="Seleccione el genero" 
                                                label="nombre" >
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="sexo" value="" data-vv-as="sexo"  v-model="persona.sexo" v-validate="'required'">
                                            <span class="help-block" for="sexo" v-bind:data-error="errors.first('sexo')">
                                                {{ errors.first('sexo') }}
                                            </span>
                                        </div>
                                    </div>



                    <div class="col-xs-12 col-sm-6">
                       
                            <div class="fgroup" :class="{ 'has-error': errors.has('nivelJerarquia') }">
                                <label for="">Nivel Jerarquia</label>
                                <v-select :debounce="250" :options="jerarquia" v-model="updateMiembrojunta.nivelJerarquia" placeholder="Seleccione la jerarquia" label="name">
                                </v-select>
                                <div class="clearfix"></div>
                             <input type="hidden" name="nivelJerarquia" value="" data-vv-as="jerarquia"  v-model="updateMiembrojunta.nivelJerarquia" v-validate="'required'">
                                <span class="help-block" for="nivelJerarquia" v-bind:data-error="errors.first('nivelJerarquia')">
                                        {{ errors.first('nivelJerarquia') }}
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
import juntamiembros from '../../../controllers/juntamiembros.js'
import moment from 'moment'
import vSelect from "vue-select"

export default {
    name: 'ActualizarMiembroJunta',
    props: [

        "title",
        "id",
        "buttonMsg",
        "methodSubmit",
        "openModal",
        "miembrojunta" //,
        //"persona"

    ],
    jerarquia: [{
            name: 'Presidente'
        }, {
            name: 'Vice Presidente'
        }, {
            name: 'Secretario'
        }, {
            name: 'Tesorero'
        }, {
            name: 'Vocal'
        }, {
            name: 'Sindico'
        },

    ],

    

    computed: {

    },
    created() {
        this.retrieveRoles()
    },
    data() {
        return {

             clearBtn: true,
             todayBtn: true,
             closeOnSelected: true,
             limitFrom: "",
             limitTo: "",
             format: "yyyy-MM-dd",
             weekStartsWith: 0,
             
            openValue: "",
            errMsg: '',
            successMsg: '',
            success: false,
            isLogin: false,
            show: false,
            showAlert: false,
            showSuccess: false,
            updateMiembrojunta: {
                personaId: {}, nivelJerarquia:{}
            },
            persona:{},
            openModalInside: false,
            roles: [],
            rol_edit: null,
            jerarquia: [
                {
                    name: 'Presidente'
                },
                {
                    name: 'Vice Presidente'
                },
                {
                    name: 'Secretario'
                },
                {
                    name: 'Tesorero'
                },
                {
                    name: 'Vocal'
                },
                {
                    name: 'Sindico'
                },
            ],

             sexo:[
                    {name: 'M', nombre:'Masculino'},
                    {name: 'F', nombre:'Femenino'}                    
                   
                   
                ], 

        }
    },
    components: {
        vSelect
    },
    watch: {

        '$route': 'fetchData',
        miembrojunta: function(val, oldVal) {
            console.log("entre all watbo")
            this.openModalInside = this.openModal;
            this.updateMiembrojunta = this.miembrojunta;
            this.persona=this.miembrojunta.personaId;
            this.updateMiembrojunta.personaId=null;
            if(this.miembrojunta.nivelJerarquia){
                for(let i of this.jerarquia)
                    if(i.name==this.miembrojunta.nivelJerarquia)
            this.updateMiembrojunta.nivelJerarquia=i;


        if(typeof this.persona.sexo != 'object' ){
                    let nombre = this.persona.sexo == 'M' ? 'Masculino' : 'Femenino'
                    let name = this.persona.sexo 
                    this.persona.sexo = this.persona.sexo.replace(/\s/g, "")
                    this.persona.sexo = {name: name, nombre: nombre}   
                }


}

        }
    },
    methods: {
        showCallback() {},
            dismissCallback(msg) {
                this.showSuccess = false
                this.showAlert = false
                this.openModalInside = false
                this.$emit('openChange', false);
            },
            retrieveRoles() {
                roles.index(this)
            },
            retrieveData(id) {
                juntamiembros.retrieve(this, id)
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
                        console.log('Estoy Actualizando un miembro de junta ');
                     /*     const miembro=this.updateMiembrojunta;
                    let persona=miembro.personaId;
                      
                           console.log(this.updateMiembrojunta)
                        miembro.nivelJerarquia=miembro.nivelJerarquia.name;
                       miembro.personaId=null;
                        console.log(this.updateMiembrojunta)
                        persona.miembroJunta=miembro;*/

                        
                        let jer= this.updateMiembrojunta.nivelJerarquia.name == undefined ? this.updateMiembrojunta.nivelJerarquia : this.updateMiembrojunta.nivelJerarquia.name

                       
console.log("value:" + jer)
                        const miembro={
id:this.updateMiembrojunta.id,
nivelJerarquia:jer


                        }
                        this.persona.miembroJunta=miembro


                         if( this.persona.sexo=='Masculino'){
                        this.persona.sexo='M'
                      }

                       if( this.persona.sexo=='Femenino'){
                        this.persona.sexo='F'
                      }

                        

                        this.persona.sexo = this.persona.sexo.name == undefined ?  this.persona.sexo : this.persona.sexo.name

                        juntamiembros.update(this, this.persona)

                        

                        



                       
                    


                      //     this.openModalInside=false; 
                    } else {
                        this.errMsg = 'Error revisa el formulario'
                        this.showAlert = true
                    }
                })

            }
    }
}

</script>
