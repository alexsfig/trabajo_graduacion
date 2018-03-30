<template>
<div>
    <modal :size="'md'" title="Agregar Nota" :footer="false" id="modal-demo-3" ref="modal3" v-model="openModalInside" @show="showCallback" @hide="dismissCallback">
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
                        <!--<div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('nota') }" >
                                <label for="">Nota</label>
                                <input type="text" id="nota" name="nota" data-vv-as="Nota" class="form-control" 
                                v-model="nota" v-validate="'required'" >
                                <span class="help-block" for="nota" v-bind:data-error="errors.first('nota')">
                                    {{ errors.first('nota') }}
                                </span>
                            </div>
                        </div> -->


                        <div class="col-xs-12 col-sm-6">
                             <div class="fgroup" :class="{ 'has-error': errors.has('nota') }">
                                <label for=""></label>
                                     <div class="input-group">
                                                <span class="input-group-addon"><b>Nota: </b></span>
                                                <input type="number" id="nota" name="nota" data-vv-as="Nota" class="form-control" v-model="nota" v-validate="'required|min_value:0.01|max_value:10.00'" step="0.01">
                                                    
                                            </div>
                                            <span class="help-block" for="nota" v-bind:data-error="errors.first('nota')">
                                                {{ errors.first('nota') }}
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

import moment from 'moment'
import vSelect from "vue-select"
import puntuacionController from "../../controllers/puntuacion.js";
export default {
    name: 'AgregarNota',
    props: [

        "title",

        "buttonMsg",
        "openModal",
        "atletaHeat",
        "juezHeat",
        "idjuez"

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
            nota:'',
         
            title2:'',

        }
    },
    components: {
        vSelect
    },
    watch: {
        atletaHeat:function(newd, old) {
          
                 this.errors.clear()
           this.showAlert = false
                this.showSuccess = false
         console.log("Entresss")
                this.openModalInside = true
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
             //   roles.index(this)
            },
            retrieveData() {
             //   persona.retrieve(this, this.id)
            },
            validateMethod() {
      
             
                    this.updateUsuario();
           
            },
            updateUsuario() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                        let puntuacion={
                          atletasHeatId:{id:this.atletaHeat.id},
                          juecesHeatId:{id:this.idjuez},
                          nota:this.nota
  
                        }
                       puntuacionController.create(this,puntuacion)
                       this.openModalInside=false
                         this.nota='';
                        console.log("Entre al modal morro")
                    } else {
                        this.errMsg = 'Error revisa el formulario'
                        this.showAlert = true
                    }
                })

            }
    }
}

</script>
