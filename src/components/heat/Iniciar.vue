<template>
    <div>
        <section class="content-header">
            <h1>Iniciar Heat </h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Heats  </li>
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
                            <h3 class="box-title">Manejo del Heat  <b>{{heat.numero}}</b>  de la Ronda <b>{{heat.rondaId.numero}}</b>  Estado <b>{{heat.estado}}</b></h3>
                                        <div v-if="juezLider">
                                         <button v-if="heat.estado='Por iniciar'" type="button" style="float:right" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="iniciarHeat()"><i aria-hidden="true" 
                                        class="fa fa-flag-checkered"></i> Iniciar heat </button></div>
                        </div>

     
                        <!-- /.box-header -->
                        <div class="box-body" v-if="heat.estado!='Iniciado'" >
                            

<div v-if="juezLider" >
    Lider de jueces: 
    {{
        juezLider.juezId.personaId.nombre}},{{
        juezLider.juezId.personaId.apellido}}

<button v-if="juezLider" type="button" class="margin btn btn-flat btn-sm btn-warning" 
                                        @click="juezLider=null"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Cambiar</button>


     </div>           

     <div v-if="!juezLider" >

                                        
<h3>Seleccione un lider </h3>
     </div>                  



                            <vue-good-table :columns="columns" :rows="juezCircuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                      
                                  <td>{{ props.row.juezId.personaId.nombre }}, {{ props.row.juezId.personaId.apellido }}</td>
                                         <td>{{ props.row.rolJuezId.rol }}</td>
                                    
                                        
                                   
                                    <td class="nowrap">
                                      <div v-if=" props.row.rolJuezId.rol=='Evaluador'">
                                        <button v-if="!juezLider" type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="ponerLider(props.row)"><i aria-hidden="true" 
                                        class="fa fa-at"></i> Lider</button>
                                      </div>
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>

                          <div class="box-body">
                              
                              <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Heats
                                </div>

                                </div> 


                    </div>
                    </div>
            </div>

             <div class="box-body" v-if="heat.estado=='Iniciado'" >
                <h1>Este heat ya fui iniciado     </h1>
             </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
import heatsController from "../../controllers/heats.js";
import rondaController from "../../controllers/rondas.js";
import juezCircuitoController from "../../controllers/JuezCircuito.js";
import juezHeatController from "../../controllers/juezHeat.js";
import vSelect from "vue-select";
import moment from "moment";
export default {
  name: "Heats",
  data() {
    return {
      heats: [],
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      circuito: {},
      juezLider: null,
      heat: { rondaId: {} },
      juezCircuitos: [],
      id: "",

      ronda: "",
      columns: [
        {
          label: "Nombre",
          field: "nombre"
        },

        {
          label: "Rol",
          field: "rol"
        },

        {
          label: "Acciones",
          field: "",
          filterable: true
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    heat: function(val) {
      juezCircuitoController.indexByCircuito(this, val.rondaId.circuitoId.id);
    }
  },
  methods: {
    ponerLider(lider) {
      this.juezLider = lider;
    },
    fetchData() {
      this.id = this.$route.params.id;
      heatsController.retrieve(this, this.id);

      //   a.retrieve(this,this.id);
    },
    iniciarHeat() {
      let rol;
      for (let i of this.juezCircuitos) {
        if (i.id != this.juezLider.id) rol = i.rolJuezId.rol;
        else rol = "Lider";
        let request = {
          heatId: { id: this.heat.id },

          juezCircuitoId: { id: i.id },
          rol: rol
        };
        juezHeatController.create(this, request);
      }
      this.heat.estado="Iniciado";
      heatsController.update(this,this.heat)
    },
    deleteHeat(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion de la heat <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          heatsController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La heat no se elimino", "error");
          }
        }
      );
    },


    volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
  }
};
</script>
