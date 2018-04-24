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
                            <h4><i class="icon fa fa-ban"></i> Error!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Exito!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Heat: <b>{{heat.numero}}</b>   de la Ronda: <b>{{heat.rondaId.numero}}</b> en el Circuito: <b>{{heat.rondaId.circuitoId?heat.rondaId.circuitoId.nombre:''}}</b></h3>
                                        
                        </div>
                         <div class="box-header with-border">
                            <h3 class="box-title">Descripción del Circuito: <b>{{heat.rondaId.circuitoId?heat.rondaId.circuitoId.descripcion:''}}</b></h3>
                                        
                        </div>

     
                        <!-- /.box-header -->
                        <div class="box-body">


                 



                            <vue-good-table :columns="columns" :rows="atletasHeat" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                   <td v-if="props.row.color=='Amarillo'" style="background-color:yellow;">{{ props.row.color }}</td>  
                                  
                          <td   v-if="props.row.color=='Azul'"  style="background-color:#0F7AD5;">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  style="background-color:Green;">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  style="background-color:Red;">{{ props.row.color }}</td>       
           
           
            <td  :title="props.row.puntuacionList[0]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[0]?props.row.puntuacionList[0]:null)">{{props.row.puntuacionList[0]?props.row.puntuacionList[0][1]:0.0}}</td>
                                         <td  :title="props.row.puntuacionList[1]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[1]?props.row.puntuacionList[1]:null)">{{props.row.puntuacionList[1]?props.row.puntuacionList[1][1]:0.0}}</td>
                                        <td  :title="props.row.puntuacionList[2]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[2]?props.row.puntuacionList[2]:[])">{{props.row.puntuacionList[2]?props.row.puntuacionList[2][1]:0.0}}</td>
                                     
                                             <td  :title="props.row.puntuacionList[3]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[3]?props.row.puntuacionList[3]:null)">{{props.row.puntuacionList[3]?props.row.puntuacionList[3][1]:0.0}}</td>
                                                <td  :title="props.row.puntuacionList[4]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[4]?props.row.puntuacionList[4]:null)">{{props.row.puntuacionList[4]?props.row.puntuacionList[4][1]:0.0}}</td>
                                                  <td  :title="props.row.puntuacionList[5]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[5]?props.row.puntuacionList[5]:null)">{{props.row.puntuacionList[5]?props.row.puntuacionList[5][1]:0.0}}</td>
                                                      <td  :title="props.row.puntuacionList[6]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[6]?props.row.puntuacionList[6]:null)">{{props.row.puntuacionList[6]?props.row.puntuacionList[6][1]:0.0}}</td>
                                                        <td  :title="props.row.puntuacionList[7]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[7]?props.row.puntuacionList[7]:null)">{{props.row.puntuacionList[7]?props.row.puntuacionList[7][1]:0.0}}</td>
                                                            <td  :title="props.row.puntuacionList[8]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[8]?props.row.puntuacionList[8]:null)">{{props.row.puntuacionList[8]?props.row.puntuacionList[8][1]:0.0}}</td>
                                                               <td  :title="props.row.puntuacionList[9]?'Editar':''" @click="agregarNota2(props.row,props.row.puntuacionList[9]?props.row.puntuacionList[9]:null)">{{props.row.puntuacionList[9]?props.row.puntuacionList[9][1]:0.0}}</td>

                                    <td class="nowrap">
                                      <div>
                                        <button v-if="!props.row.puntuacionList[9]" type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="agregarNota(props.row)"><i aria-hidden="true" 
                                        class="fa fa-pencil-square-o"></i> Agregar Nota Ola</button>
                                      </div>
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                        <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Heats Asignados
                                </div>

                                </div> 
                    </div>
                   </div>
            </div>

 <modalNota 
  :title="'Calificar'"
  :buttonMsg="'Actualizar'"
  :openModal="openModal" 
    :atletaHeat="atletaHeat" 
:idjuez="idjuezheat" 
    v-on:openChange="isChange"
    :nota="nota"
    :idnota="idnota"
    >
    
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
import juezHeatController from "../../controllers/juezHeat.js";

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
      idnota:null,
      nota:'',
      idjuezheat:'',
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
          label: "Acción",
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
    },
    idjuezheat:function(val) {

atletasHeatController.byHeatAndJuez(this, this.id,val);
    }
  },
  methods: {
    ponerLider(lider) {
      this.juezLider = lider;
    },
    fetchData() {
      this.id = this.$route.params.id;
this.idjuez=localStorage.getItem('juezid');
             
      
      heatsController.retrieve(this, this.id);
      juezHeatController.findIdJuezHead(this,this.id,this.idjuez)
atletasHeatController.byHeatAndJuez(this, this.id,this.idjuezheat);
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
         
           this.nota='';
           this.idnota='';
      this.atletaHeat=row;

      this.openModal = true;
    },
      agregarNota2(row,cal) {
        if(cal!=null){
          this.idnota=cal[0];
        this.nota=cal[1];
          this.atletaHeat=row;
   
      this.openModal = true;
        
        }
       
      
    
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
