<template>
<div>
    <modal :size="'md'" :title="title2" :footer="false" id="modal-demo-3" ref="modal3" v-model="openModalInside" @show="showCallback" @hide="dismissCallback">
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

            <form @submit.prevent="validateMethod" role="form">
                <div class="box-body">
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('descripcion') }" >
                                <label for="">Descripción</label>
                                <input type="text" id="descripcion" name="descripcion" data-vv-as="Descripcion" class="form-control" 
                                v-model="updateEntrenador.descripcion" v-validate="'required'" >
                                <span class="help-block" for="descripcion" v-bind:data-error="errors.first('descripcion')">
                                    {{ errors.first('descripcion') }}
                                </span>
                            </div>
                        </div>
                </div>
                <div class="box-footer">
                    <div class="col-xs-12 text-right">
                        <button type="submit" class="btn btn-flat btn-sm btn-primary"><i class="fa fa-plus"></i> {{ buttonMsg }}</button>
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
import moment from 'moment'
import vSelect from "vue-select"

export default {
    name: 'ActualizarEntrenador',
    props: [

        "title",
        "id",
        "buttonMsg",
        "methodSubmit",
        "openModal",
        "entrenador",
        "persona"

    ],
    computed: {

    },
    created() {
        this.retrieveRoles()
    },
    data() {
        return {
            openValue: "",
            errMsg: '',
            successMsg: '',
            success: false,
            isLogin: false,
            show: false,
            showAlert: false,
            showSuccess: false,
            updateEntrenador: {
                personaId: ' '
            },
            openModalInside: false,
            roles: [],
            rol_edit: null,
         
            title2:'',

        }
    },
    components: {
        vSelect
    },
    watch: {
        '$route': 'fetchData',
        persona: function(val, oldVal) {
            this.openModalInside = this.openModal
          
            this.updateEntrenador = val.entrenador
            this.title2 =  "Actualizar Entrenador"
         //   this.buttonMsg="Actualizar"
            if (this.updateEntrenador == null) {
               this.updateEntrenador={};
                this.title2 =  "Crear Entrenador"
            //      this.buttonMsg="Crear"
            }


        },
        persona2(val){}
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
            retrieveData() {
                persona.retrieve(this, this.id)
            },
            validateMethod() {
                console.log(this.methodSubmit)
                if (this.methodSubmit == 'editar') {
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
                        
                          this.persona.sexo=this.persona.sexo.name;
                        console.log("la persona" );
                        console.log(this.persona)
                       /* let  miembroJunta = {}
                        miembroJunta.nivelJerarquia =  this.updateMiembrojunta.nivelJerarquia.name
                        miembroJunta.personaId = this.persona
                        delete miembroJunta.personaId.entrenadorId
                        delete miembroJunta.personaId.atletaId
                        delete miembroJunta.personaId.juezId
                        delete miembroJunta.personaId.miembroJuntaId
                        delete miembroJunta.personaId.usuarioList*/
                        if(  this.title2 !=  "Actualizar Entrenador"){
                        this.persona.entrenador=this.updateEntrenador;
                            entrenadores.create(this, this.persona)
                        }
                        else{
                          //  miembroJunta.id =  this.persona.miembroJuntaId.id
                                                  this.persona.entrenador=this.updateEntrenador;

                            entrenadores.update(this, this.persona)
                        }
                    } else {
                        this.errMsg = 'Error revisa el formulario'
                        this.showAlert = true
                    }
                })

            }
    }
}

</script>
