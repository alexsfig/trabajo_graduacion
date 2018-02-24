<template>
    <div>
        <section class="content-header">
            <h1>TipoTransaccions</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link to="/admin/tipoTransaccions">TipoTransaccions</router-link></li>
                <li class="active">Formulario de  TipoTransaccions</li>


            </ol>
        </section>
       <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="wrapper-alert">
                        <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                            <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Success!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title" v-if="!id">Agregar  Nuevo juez </h3>
                             <h3 class="box-title" v-if="id">Editar  Juez </h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body"> 
                             


                                    <h3>Información del Juez</h3>
                                    <div class="col-xs-12 col-sm-12">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('form-3.descripcion') }">
                                            <label for="">Descripcion del juez</label>
                                            <textarea v-model="juez.descripcion" class="form-control" name="descripcion" rows="2" data-vv-as="Descripcion del juez" v-validate="'required'">

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
                                        <form @submit.prevent="add_certificacion('form-4')" action="" data-vv-scope="form-4">

                                            <div class="col-sm-5">

                                                <div class="col-xs-12">
                                                    <div class="fgroup">
                                                        <label for="">Titulo</label>
                                                        <input v-model="newCert.titulo" name="titulo" type="text" data-vv-as="titulo" class="form-control" v-validate="'required'">
                                                        <span class="help-block" for="titulo" v-bind:data-error="errors.first('form-4.titulo')">
                                                                {{ errors.first('form-4.titulo') }}
                                                            </span>
                                                    </div>
                                                </div>
                                                    <div class="col-xs-12">
                                                    <div class="fgroup">
                                                        <label for="">Fecha</label>
                                                        <input v-model="newCert.fecha" name="fecha" type="date" data-vv-as="fecha" class="form-control" v-validate="'required'">
                                                        <span class="help-block" for="fecha" v-bind:data-error="errors.first('form-4.fecha')">
                                                                {{ errors.first('form-4.fecha') }}
                                                            </span>
                                                    </div>
                                                </div>
                                               
                                                <div class="clearfix"></div>
                                                <div class="col-xs-12">
                                                    <div class="fgroup">
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
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit"  v-if="!id" class="btn btn-flat btn-sm btn-primary">Agregar</button>
                                            <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar</button>

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
import juecesController from "../../controllers/jueces.js";
import vSelect from "vue-select";
export default {
  name: "TipoTransaccion",
  data() {
    return {
      errMsg: "",
      errorMsg: "",
      showAlert: false,
      showSuccess: false,
      successMsg: "",
      id: "",
      creaCert:[],
      newCert:{},
          
      createPersona:{},
      errMsg: "",
      isLogin: false,
      juez: {},
        columns: [{
                label: "titulo",
                field: "titulo",
            }, {
                label: "fecha",
                field: "fecha",
            }, {
                label: "lugar",
                field: "lugar",
            }, {
                label: "Action"
            }]
    };
  },
  components: {
    vSelect
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) juecesController.retrieve(this, this.id);
    console.log("id:" + this.id);
  },
  methods: {
    submit() {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll().then(success => {
        if (success) {
          console.log("Error en el servicio");
          if (!this.id) juecesController.create(this, this.tipoTransaccion);
          else juecesController.update(this, this.tipoTransaccion);
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Form error";
        }
      });
    } ,   add_certificacion(scope) {
            this.$validator.validateAll(scope).then(success => {
                if (success) {
                    this.creaCert.push(this.newCert)
                    this.newCert = {
                        fecha: null,
                    }
                } else {
                    this.showAlert = true
                    this.errMsg = "Por favor complete el formulario"
                }
            });
        }
  },  deleteCert(id) {
            this.creaCert.splice(id, 1);
        }
};
</script>
<style scoped>

