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
            <label>Playa: {{ playaUpdate.nombre }}</label>
            <form @submit.prevent="validateMethod" role="form">
                <div class="box-body">
                    <input type="hidden" v-model="id">
                    <div class="fgroup required" :class="{ 'has-error': errors.has('nombre') }">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" data-vv-as="nombre" class="form-control" v-model="playaUpdate.nombre" v-validate="'required'" disabled/>
                        <span class="help-block" for="nombre" v-bind:data-error="errors.first('nombre')">
                                {{ errors.first('nombre') }}
                            </span>
                    </div>
                    <div class="fgroup required" :class="{ 'has-error': errors.has('ubicacion') }">
                        <label for="ubicacion">Ubicación</label>
                        <input id="ubicacion" name="ubicacion" rows="5" data-vv-as="ubicación" class="form-control" v-model="playaUpdate.ubicacion" v-validate="'required'" />
                        <span class="help-block" for="ubicacion" v-bind:data-error="errors.first('ubicacion')">
                                {{ errors.first('ubicacion') }}
                            </span>
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

import playasController from '../../../controllers/playas.js'

export default {
    name: 'ModalPlaya',
    props: [
        "usuario",
        "title",
        "playa",
        "contrasena",
        "id",
        "buttonMsg",
        "methodSubmit",
        "openModal",
    ],
    computed: {

    },
    created() {},
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
            playaUpdate: {},
            openModalInside: false,
            roles: [],
            rol_edit: null
        }
    },
    components: {},
    watch: {
        playa: function(val, oldVal) {
            this.openModalInside = this.openModal
            this.playaUpdate = this.playa
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
            retrieveData(id) {
                playasController.retrieve(this, id)
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
                        playasController.update(this, this.playaUpdate)
                    } else {
                        this.errMsg = 'Error revisa el formulario'
                        this.showAlert = true
                    }
                })

            }
    }
}

</script>
