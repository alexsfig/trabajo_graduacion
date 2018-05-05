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
            <div class="box box-primary">
            
                <label>Club: {{ updateClub.entidadId.nombre }}</label>
                <form @submit.prevent="validateMethod" role="form"> 
                    <div class="box-body">
                       <input type="hidden" v-model="id"> 
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('nombreclub') }" >
                                <label for="">Nombre</label>
                                <input type="text" id="nombreclub" name="nombreclub" data-vv-as="Nombre del Club" class="form-control" v-model="updateClub.entidadId.nombre" v-validate="'required'" >
                                <span class="help-block" for="nombreclub" v-bind:data-error="errors.first('nombreclub')">
                                    {{ errors.first('Fechaclub') }}
                                </span>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('fundacion') }" >
                                <label for="">Fundacion</label>
                                <input type="date" id="fundacion" name="fundacion" data-vv-as="Fecha Fundacion del Club" class="form-control" v-model="updateClub.fundacion" v-validate="'required'" >
                                <span class="help-block" for="fundacion" v-bind:data-error="errors.first('fundacion')">
                                    {{ errors.first('fundacion') }}
                                </span>
                            </div>
                        </div>

                         <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('nombreplaya') }" >
                                <label for="">Playa Ubicacion</label>
                                <input type="text" id="nombreplaya" name="nombreplaya" data-vv-as="Nombre de playa" class="form-control" v-model="updateClub.playaId.nombre" v-validate="'required'" >
                                <span class="help-block" for="nombreplaya" v-bind:data-error="errors.first('nombreplaya')">
                                    {{ errors.first('nombreplaya') }}
                                </span>
                            </div>
                        </div>
         
                         <div class="col-xs-12 col-sm-6">
                            <div class="fgroup required" :class="{ 'has-error': errors.has('entrenador') }" >
                                <label for="">Entrenador</label>
                                <input type="text" id="entrenador" name="entrenador" data-vv-as="Entrenador del club" class="form-control" v-model="updateClub.entrenadorId.personaId.nombre" v-validate="'required'" >
                                <span class="help-block" for="entrenador" v-bind:data-error="errors.first('entrenador')">
                                    {{ errors.first('entrenador') }}
                                </span>
                            </div>
                        </div>

                                            
                    </div>    
                    <div class="box-footer">
                        <div class="col-xs-12 text-right">
                            <button type="submit" class="btn btn-flat btn-sm btn-primary" >{{ buttonMsg }}</button>
                            <button type="button" class="btn btn-flat btn-sm btn-primary" @click="dismissCallback()">Cerrar</button>
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
    import clubes from '../../../controllers/clubes.js'
    import moment from 'moment'
    import vSelect from "vue-select"

    export default {
        name: 'ActualizarClub',
        props:  [
           
             "title",
            "id",
            "buttonMsg",
            "methodSubmit",
            "openModal",
            "club"


        ],
        computed: {

        },
        created(){
            this.retrieveRoles()
        },
        data() {
            return {
                openValue: "",
                errMsg:  '',
                successMsg:  '',
                success: false,
                isLogin: false,
                show: false,
                showAlert: false,
                showSuccess: false,
                updateClub: {entidadId:' ', playaId: ' ', entrenadorId: {personaId: ' '


                }, personaId: ' '},
                openModalInside: false,
                roles: [],
                rol_edit: null
            }
        },
        components:{
            vSelect
        },
        watch: {
            '$route': 'fetchData',
            club: function(val, oldVal){
                this.openModalInside = this.openModal
                this.updateClub = this.club
                
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
                clubes.retrieve(this, id)
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
                        clubes.update(this, this.updateClub)
                       


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