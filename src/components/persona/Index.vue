<template>
    <div>
        <section class="content-header">
            <h1>Manejo de Personas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Personas </li>
            </ol>
        </section>
        <section class="content" >

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
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Personas Registradas y Funciones que Desempeñan</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">

                            <vue-good-table :columns="columns" :rows="personas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                    <td class="nowrap">{{ props.row.nombre }}</td>
                                    <td>{{ props.row.apellido }}</td>
                                    <td>{{ props.row.correo }}</td>
                                    <td >
                                       <!--! <i :class=" props.row.atleta == null ? 'text-red fa fa-times-circle-o':'fa fa-check-square-o text-info' "></i>-->
                                    
                                     <button class="btn btn-primary-outline" :title="props.row.atleta == null? 'Crear':'Eliminar'" dat-toggle="tooltip" @click="(props.row.atleta == null?  _atleta(0, props.row) : deleteAtleta(props.row.atleta.id,props.row.nombre+','+props.row.apellido))">
                                            <i class="fa" :class="props.row.atleta == null? 'fa-plus':'text-red fa fa-times-circle-o'"  aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td>
                                       <!-- <i :class=" props.row.miembroJunta == null ? 'text-red fa fa-times-circle-o':'fa fa-check-square-o text-info' "></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <button class="btn btn-primary-outline" :title="props.row.miembroJunta == null? 'Crear':'Eliminar'" dat-toggle="tooltip" @click="(props.row.miembroJunta == null?  _miembro(0, props.row) : deleteMiembro(props.row.miembroJunta.id,props.row.nombre+','+props.row.apellido))">
                                            <i class="fa" :class="props.row.miembroJunta == null? 'fa-plus':'text-red fa fa-times-circle-o'" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td>
                                     <!--    <i :class=" props.row.juez == null ? 'text-red fa fa-times-circle-o':'fa fa-check-square-o text-info' "></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;-->
<div v-if="!props.row.juez"> 
                                         <router-link :to="{ name: 'juezAdd', params: { id: props.row.id }}">
                                        <button type="button" :title="'Crear'"  class="btn btn-primary-outline" 
                                       ><i aria-hidden="true" 
                                         class="fa fa-plus"></i> </button>
                                        </router-link>     
</div>  
                                        <div v-if="props.row.juez"> 
                                        <button class="btn btn-primary-outline" :title="'Eliminar'" dat-toggle="tooltip" @click="deleteJuez(props.row.juez.id,props.row.nombre+','+props.row.apellido)">
                                            <i class="fa" :class="props.row.juez == null? 'fa-plus':'text-red fa fa-times-circle-o'" aria-hidden="true"></i>
                                        </button>
                                        </div>
                                    </td>
                                    <td>
                                     <!--    <i :class=" props.row.entrenador == null ? 'text-red fa fa-times-circle-o':'fa fa-check-square-o text-info' "></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <button class="btn btn-primary-outline" :title="props.row.entrenador == null? 'Crear':'Eliminar'" dat-toggle="tooltip" @click="(props.row.entrenador == null?  _entrenador(0, props.row) : deleteEntrenador(props.row.entrenador.id,props.row.nombre+','+props.row.apellido))">
                                            <i class="fa" :class="props.row.entrenador == null? 'fa-plus':'text-red fa fa-times-circle-o'" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td class="nowrap">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary" @click="openModal=true, retrieveData(props.row.id)"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deletePersona(props.row.id, props.row.nombre)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
                </div>
            </div>
            <ModalPersona :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Actualizar'" :openModal="openModal" :persona="persona" v-on:openChange="isChange"></ModalPersona>
            <ModalJuntaMiembros :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Crear'" :id="persona.id" :openModal="openModal2" :persona="persona" v-on:openChange="isChange"></ModalJuntaMiembros>
         <ModalEntrenadores :methodSubmit="methodSubmit"  :title="'Actualizar'" :buttonMsg="'Crear'" :id="persona.id" :openModal="openModal3" :persona="persona" v-on:openChange="isChange"></ModalEntrenadores>

       
        </section>
    </div>
</template>
<script>
import ModalJuntaMiembros from "../juntamiembros/subcomponents/ModalJuntaMiembrosCrear";
import ModalPersona from "./subcomponents/ModalPersona";
import ModalEntrenadores from "../entrenadores/subcomponents/ModalEntrenadoresCrear";
import users from "../../controllers/users.js";
import playasController from "../../controllers/playas.js";
import personaController from "../../controllers/persona.js";
import atletaController from "../../controllers/atletas.js";
import juezController from "../../controllers/jueces.js";

import miembroController from "../../controllers/juntamiembros.js";

import entrenadorController from "../../controllers/entrenadores.js";

import vSelect from "vue-select";
import moment from "moment";
export default {
  name: "Usuarios",
  components: {
    ModalPersona: ModalPersona,
    ModalJuntaMiembros: ModalJuntaMiembros,
    ModalEntrenadores: ModalEntrenadores
  },
  data() {
    return {
      personas: [],
      persona: {},
      miembroJunta: {},
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      // control de modales
      openModal: false,
      openModal2: false,
      openModal3: false,
      columns: [
        {
          label: "Nombre",
          field: "nombre"
        },
        {
          label: "Apellido",
          field: "apellido"
        },
        {
          label: "Correo",
          field: "correo"
        },
        {
          label: "Atleta",
          field: ""  

        },
        {
          label: "Miembro",
          field: ""
        },
        {
          label: "Juez",
          field: ""
        },
        {
          label: "Entrenador",
          field: ""
        },
        {
          label: "Acción",
          field: ""
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      personaController.index(this);
    },
    retrieveData(id) {
      personaController.retrieve(this, id);
    },
    _atleta(val, row) {
      let context = this;
      let swal = this.$swal;
      let config1 = {},
        config2 = {},
        config3 = {};

      if (val != 0) {
        config1 = {
          title: "Editar?",
          html:
            "Deseas editar la informacion de atleta de la persona <b>&laquo;" +
            row.nombre +
            "&raquo</b>",
          type: "success",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No!"
        };
        config2 = "No se modifico la informacion";
        config3 = {
          name: "AtletasEdit",
          params: {
            id: row.atleta.id
          }
        };
      } else {
        config1 = {
          title: "Crear?",
          html:
            "Deseas crear la informacion de atleta a partir de la persona <b>&laquo;" +
            row.nombre +
            "&raquo</b>",
          type: "success",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No!"
        };
        config2 = "No se creo la informacion";
        config3 = {
          name: "AtletasCreate",
          params: {
            id: row.id
          }
        };
      }
      this.$swal(config1).then(
        function() {
          context.$router.push(config3);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", config2, "error");
          }
        }
      );
    },
    _juez(val) {
      alert(val);
    },
    _miembro(val, row) {
      this.openModal2 = true;
      this.retrieveData(row.id);
      if ((val = 0)) {
      } else {
      }
    },
    _entrenador(val, row) {
      this.openModal3 = true;
      this.retrieveData(row.id);
      //alert(val)
    },
    deletePersona(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion de la Persona <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion en relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          personaController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La Persona no se elimino", "error");
          }
        }
      );
    },
    isChange() {
      this.openModal = false;
      this.openModal2 = false;
      this.openModal3 = false;
      this.fetchData();
    },
    showCallback() {
      this.showAlert = false;
      this.showSuccess = false;
    },
    dismissCallback(msg) {
      this.openModal = false;
      this.openModal2 = false;
      this.openModal3 = false;
      juntamiembrosController.index(this);
      this.fetchData();
    },
    deleteAtleta(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion del Atleta <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion en relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          atletaController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "El Atleta no se elimino", "error");
          }
        }
      );
    },

       deleteEntrenador(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion del entrenador <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          entrenadorController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "El entrenador no se elimino", "error");
          }
        }
      );
    },
       deleteMiembro(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion del miembro de junta <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          miembroController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "El miembro de junta no se elimino", "error");
          }
        }
      );
    }
    ,
       deleteJuez(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion del juez <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          juezController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "El juez no se elimino", "error");
          }
        }
      );
    }
  }
};
</script>
<style >
.btn.btn-primary-outline {
  background-color: transparent;
  color: navy;
}
</style>
