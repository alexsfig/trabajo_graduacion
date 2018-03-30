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
            
                <label>Usuarioss {{ usuario }}</label>
                <form @submit.prevent="validateMethod" role="form"> 
                    <div class="box-body">
                        <input type="hidden" v-model="id">
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup" :class="{ 'has-error': errors.has('usuario') }" >
                                <label for="">Usuario</label>
                                <input type="text" id="usuario" name="usuario" data-vv-as="Nombre de usuario" class="form-control" v-model="updateUser.usuario" v-validate="'required'" >
                                <span class="help-block" for="usuario" v-bind:data-error="errors.first('usuario')">
                                    {{ errors.first('usuario') }}
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="fgroup"  :class="{ 'has-error': errors.has('rol_edit') }">
                                <label for="">Position</label>
                                <v-select
                                    :debounce="250"
                                    :options="roles"
                                    v-model="updateUser.rolId"
                                    placeholder="Rol Usuario" 
                                    label="nombre" @input="changedValue">
                                </v-select>
                                <div class="clearfix"></div>
                                <input type="hidden" name="rol_edit" value="" data-vv-as="Position Employee"  v-model="updateUser.rolId" v-validate="'required'">
                                <span class="help-block" for="rol_edit" v-bind:data-error="errors.first('rol_edit')">
                                    {{ errors.first('rol_edit') }}
                                </span>
                            </div>
                        </div>


                        <div class="col-xs-12 col-sm-6" v-if="enapatro">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('personaId') }">
                                            <label for="">Juez Asociado</label>
                                            <v-select
                                                :debounce="250"
                                                :options="jueces"
                                                v-model="personaId"
                                                placeholder="Juez Asociado" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="personaId" value="" data-vv-as="Juez Asociado"  v-model="personaId" v-validate="'required'">
                                            <span class="help-block" for="personaId" v-bind:data-error="errors.first('personaId')">
                                                {{ errors.first('personaId') }}
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
    import moment from 'moment'
    import vSelect from "vue-select"
    import juecesController from '../../../controllers/jueces.js'

    export default {
        name: 'Employee',
        props:  [
            "usuario",
            "title",
            "usuario",
            "id",
            "buttonMsg",
            "methodSubmit",
            "openModal",
        ],
        computed: {

        },
        created(){
            this.retrieveRoles()
            juecesController.index(this)
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
                updateUser: {},
                openModalInside: false,
                roles: [],
                rol_edit: null,
                personaId : null,
                enapatro  : null
            }
        },
        components:{
            vSelect
        },
        watch: {
            '$route': 'fetchData',
            usuario: function(val, oldVal){
                this.openModalInside = this.openModal
                this.updateUser = this.usuario
                this.updateUser.rolId = this.usuario.rolId   
             

                if(this.updateUser.rolId.descripcion=="Juez"){
                for(let i of this.jueces)
                    if(i.personaId.id==this.usuario.personaId.id )
            this.personaId=i;      }

                
               
            }
        },
        methods:{

               changedValue() {
    
      this.enapatro = false;
      if(this.updateUser.rolId){
         console.log(this.updateUser.rolId)
if(this.updateUser.rolId.descripcion=='Juez'){
 this.enapatro = true;
  console.log("fffffffffffffffff hhhhhhhhhhh");

}    }  },


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
                users.retrieve(this, id)
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

                        
                        
                        
                        
                        
                         if(this.updateUser.rolId.descripcion=="Juez")
                         this.updateUser.personaId = {id:this.personaId.personaId.id}
                         users.update(this, this.updateUser)
                        this.errors.clear()
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