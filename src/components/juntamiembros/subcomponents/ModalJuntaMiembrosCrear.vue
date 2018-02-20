<template>
<div>
    <modal :size="'md'" :title="title2" :footer="false" id="modal-demo-1" ref="modal1" v-model="openModalInside" @show="showCallback" @hide="dismissCallback">
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
                    <div class="col-xs-12 col-sm-12">
                        <div class="fgroup" :class="{ 'has-error': errors.has('nivelJerarquia') }">
                            <label for="">Nivel Jerarquia</label>
                            <v-select :debounce="250" :options="jerarquia" v-model="updateMiembrojunta.nivelJerarquia" placeholder="Seleccione la jerarquia" label="name">
                            </v-select>
                            <input type="hidden" value="" v-model="updateMiembrojunta.nivelJerarquia" name="nivelJerarquia"  data-vv-as="Nivel Jerarquia" v-validate="'required'">
                            <span class="help-block" for="type" v-bind:data-error="errors.first('nivelJerarquia')">
                                {{ errors.first('nivelJerarquia') }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="col-xs-12 text-right">
                        <button type="submit" class="btn btn-flat btn-sm btn-primary">{{ buttonMsg }}</button>
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
        "miembrojunta",
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
            updateMiembrojunta: {
                personaId: ' '
            },
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
            this.persona=val;
            this.updateMiembrojunta = val.miembroJuntaId
            this.title2 =  "Actualizar Jerarquia"
            if (this.updateMiembrojunta == null) {
                this.updateMiembrojunta = {
                    nivelJerarquia: null
                }
                this.title2 =  "Crear Jerarquia"
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
                        console.log("la persona" );
                        console.log(this.persona)
                        let  miembroJunta = {}
                        miembroJunta.nivelJerarquia =  this.updateMiembrojunta.nivelJerarquia.name
                        miembroJunta.personaId = this.persona
                        delete miembroJunta.personaId.entrenadorId
                        delete miembroJunta.personaId.atletaId
                        delete miembroJunta.personaId.juezId
                        delete miembroJunta.personaId.miembroJuntaId
                        delete miembroJunta.personaId.usuarioList
                        if(  this.title2 !=  "Actualizar Jerarquia"){
                        
                            juntamiembros.create(this, miembroJunta)
                        }
                        else{
                            miembroJunta.id =  this.persona.miembroJuntaId.id
                            juntamiembros.update(this, miembroJunta)
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
