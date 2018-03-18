<template>
    <div>
        <section class="content-header">
            <h1>Calificar  Heat </h1>

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
                            <h3 class="box-title">Heat  {{heat.numero}}   de la ronda {{heat.rondaId.numero}} </h3>
                                         <button :disabled="!juezLider" type="button" style="float:right" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="juezLider=null"><i aria-hidden="true" 
                                        class="fa fa-check"></i> Finalizar heat </button>
                        </div>

     
                        <!-- /.box-header -->
                        <div class="box-body">


                 



                            <vue-good-table :columns="columns" :rows="atletasHeat" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                   <td v-if="props.row.color=='Amarillo'" style="background-color:yellow;">{{ props.row.color }}</td>  
                                  
                          <td   v-if="props.row.color=='Azul'"  style="background-color:#0F7AD5;">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  style="background-color:Green;">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  style="background-color:Red;">{{ props.row.color }}</td>       
           
           
            <td  v-tooltip="'tdfddsdssss'" @click="agregarNota(props.row)">{{props.row.puntuacionList[0]?props.row.puntuacionList[0][1]:0.0}}</td>
                                    <td>{{props.row.puntuacionList[1]?props.row.puntuacionList[1][1]:0.0}}</td>
                                     <td>{{props.row.puntuacionList[2]?props.row.puntuacionList[2][1]:0.0}}</td>
                                     
                                        <td>{{props.row.puntuacionList[3]?props.row.puntuacionList[3][1]:0.0}}</td>
                                           <td>{{props.row.puntuacionList[4]?props.row.puntuacionList[4][1]:0.0}}</td>
                                              <td>{{props.row.puntuacionList[5]?props.row.puntuacionList[5][1]:0.0}}</td>
                                                 <td>{{props.row.puntuacionList[6]?props.row.puntuacionList[6][1]:0.0}}</td>
                                                    <td>{{props.row.puntuacionList[7]?props.row.puntuacionList[7][1]:0.0}}</td>
                                                       <td>{{props.row.puntuacionList[8]?props.row.puntuacionList[8][1]:0.0}}</td>
                                                          <td>{{props.row.puntuacionList[9]?props.row.puntuacionList[9][1]:0.0}}</td>

                                                          <td>0.0</td>
                                    <td class="nowrap">
                                      <div>
                                        <button v-if="!props.row.puntuacionList[9]" type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="agregarNota(props.row)"><i aria-hidden="true" 
                                        class="fa fa-at"></i> Agregar Ola</button>
                                      </div>
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
                   </div>
            </div>

 <modalNota 
  :title="'Calificar'"
  :buttonMsg="'Actualizar'"
  :openModal="openModal" 
    :atletaHeat="atletaHeat" 
:idjuez="idjuez" 
    v-on:openChange="isChange">
    </modalNota>

           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
import ModalNota from "./Nota";
import heatsController from "../../controllers/heats.js";
import rondaController from "../../controllers/rondas.js";
import juezCircuitoController from "../../controllers/JuezCircuito.js";
import atletasHeatController from "../../controllers/atletaHeat";
import vSelect from "vue-select";
import moment from "moment";
import VTooltip from 'v-tooltip'
export default {
  name: "Heats",
  data() {
    return {
       isActive: false,
      heats: [],
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      circuito: {},
      myClass:'btn-success',
      juezLider: null,
      heat: { rondaId: {} },
      juezCircuitos: [],
      id: "",
      idjuez:'',
      atletasHeat: [],
      atletaHeat: {},
      juezHeat: { id: 1 },
      ronda: "",
      columns: [
        {
          label: "Color",
          field: "color"
        },
        {
          label: "Ola 1",
          field: "o1"
        },
        {
          label: "Ola 2",
          field: "o2"
        },
        {
          label: "Ola 3",
          field: "o3"
        },
        {
          label: "Ola 4",
          field: "o4"
        },

        {
          label: "Ola 5",
          field: "o5"
        },
        {
          label: "Ola 6",
          field: "o6"
        },
        {
          label: "Ola 7",
          field: "o7"
        },

        {
          label: "Ola 8",
          field: "o8"
        },
        {
          label: "Ola 9",
          field: "o9"
        },
        {
          label: "Ola 10",
          field: "o10"
        },
        {
          label: "Promedio",
          field: "o10"
        },

        {
          label: "Acciones",
          field: "",
          filterable: true
        }
      ]
    };
  },
  components: {
     "modalNota": ModalNota

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
this.idjuez=42;
             
      atletasHeatController.byHeatAndJuez(this, this.id,this.idjuez);
      heatsController.retrieve(this, this.id);

      //   a.retrieve(this,this.id);
    },
 showCallback () {
                this.showAlert = false
                this.showSuccess = false
            },
            dismissCallback (msg) {
                this.openModal =false
             
                this.fetchData()
            },
    agregarNota(row) {
      this.atletaHeat=row;
      console.log("putasss");
      this.openModal = true;
    },
    isChange() {
      this.openModal = false;

      this.fetchData();
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
    }
  }
};
</script>
