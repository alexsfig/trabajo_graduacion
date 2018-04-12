<template>
    <div>
        <section class="content-header">
            <h1>Resultados   Heat </h1>

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
                          
                            <h3 class="box-title">Heat  <b>{{heat.numero}}</b>   de la Ronda <b>{{heat.rondaId.numero}} </b>               
                             estado: <b>{{heat.estado}} </b> del Circuito <b>{{heat.rondaId.circuitoId.nombre}}</b> </h3>
                              </div>

                               <div class="box-body">
                           <!-- categoria: {{heat.rondaId.circuitoId.categoriaId.nombreCategoria}}-->
                                                <toggle-button  v-model="verTodo" :sync="true"
                                                 :value="verTodo" :width="130" :height="35"
                                                 id="changed-font" :labels="{checked: 'Ver todos ', unchecked: 'Solo Resumen'}" :color="{checked: '#37b53c', unchecked: '#545bb3'}"/>
                                        <div v-if="resumen[0].listNotas[0].nota>0.0">
                                         <button v-if="heat.estado=='Iniciado'" type="button" style="float:right" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="finalizar()"><i aria-hidden="true" 
                                        class="fa fa-check"></i> Finalizar heat </button></div>
                        

     
                        <!-- /.box-header -->
                       


                                          
                                         
                                         

<div v-if="verTodo">
<div v-for="value in juecesHeat">
<br/><br/><br/><br/>

<h4>Notas de Juez: <b>{{value.persona.nombre}}, {{value.persona.apellido}}</b></h4>

                           <vue-good-table :columns="columns" :rows="value.puntuacionList" :paginate="true" :globalSearch="false" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                   <td v-if="props.row.color=='Amarillo'" style="background-color:yellow;">{{ props.row.color }}</td>  
                                  
                          <td v-if="props.row.color=='Azul'"  style="background-color:#0F7AD5;">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  style="background-color:Green;">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  style="background-color:Red;">{{ props.row.color }}</td>       
           
           
            <td>{{props.row.puntuacionList[0]?props.row.puntuacionList[0][1]:0.0}}</td>
                                    <td>{{props.row.puntuacionList[1]?props.row.puntuacionList[1][1]:0.0}}</td>
                                     <td>{{props.row.puntuacionList[2]?props.row.puntuacionList[2][1]:0.0}}</td>
                                     
                                        <td>{{props.row.puntuacionList[3]?props.row.puntuacionList[3][1]:0.0}}</td>
                                           <td>{{props.row.puntuacionList[4]?props.row.puntuacionList[4][1]:0.0}}</td>
                                              <td>{{props.row.puntuacionList[5]?props.row.puntuacionList[5][1]:0.0}}</td>
                                                 <td>{{props.row.puntuacionList[6]?props.row.puntuacionList[6][1]:0.0}}</td>
                                                    <td>{{props.row.puntuacionList[7]?props.row.puntuacionList[7][1]:0.0}}</td>
                                                       <td>{{props.row.puntuacionList[8]?props.row.puntuacionList[8][1]:0.0}}</td>
                                                          <td>{{props.row.puntuacionList[9]?props.row.puntuacionList[9][1]:0.0}}</td>

                                  
                                  </template>
                            </vue-good-table>


</div>
</div>
<br/><br/><br/><br/><br/><br/>
<h4><b>Resultados del Heat</b></h4> 



                                         <vue-good-table :columns="columnsResult" :rows="resumen" :paginate="true" :globalSearch="false" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                   <td v-if="props.row.color=='Amarillo'" style="background-color:yellow;">{{ props.row.color }}</td>  
                                  
                          <td v-if="props.row.color=='Azul'"  style="background-color:#0F7AD5;">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  style="background-color:Green;">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  style="background-color:Red;">{{ props.row.color }}</td>       
               <td><router-link :to="{ name: 'AtletasShow', params: { id: props.row.atletaId }}">
                  {{ props.row.nombre }},{{props.row.apellido}}</router-link></td>  
            <td v-if="props.row.listNotas[0].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[0].nota}}</td>
            <td v-if="!props.row.listNotas[0].mayor"   >{{props.row.listNotas[0].nota}}</td>

               <td v-if="props.row.listNotas[1].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[1].nota}}</td>
            <td v-if="!props.row.listNotas[1].mayor"   >{{props.row.listNotas[1].nota}}</td>

              <td v-if="props.row.listNotas[2].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[2].nota}}</td>
            <td v-if="!props.row.listNotas[2].mayor"   >{{props.row.listNotas[2].nota}}</td>

                           <td v-if="props.row.listNotas[3].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[3].nota}}</td>
            <td v-if="!props.row.listNotas[3].mayor"   >{{props.row.listNotas[3].nota}}</td>

                           <td v-if="props.row.listNotas[4].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[4].nota}}</td>
            <td v-if="!props.row.listNotas[4].mayor"   >{{props.row.listNotas[4].nota}}</td>

                           <td v-if="props.row.listNotas[5].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[5].nota}}</td>
            <td v-if="!props.row.listNotas[5].mayor"   >{{props.row.listNotas[5].nota}}</td>


                         <td v-if="props.row.listNotas[6].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[6].nota}}</td>
            <td v-if="!props.row.listNotas[6].mayor"   >{{props.row.listNotas[6].nota}}</td>

                           <td v-if="props.row.listNotas[7].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[7].nota}}</td>
            <td v-if="!props.row.listNotas[7].mayor"   >{{props.row.listNotas[7].nota}}</td>
                    <td v-if="props.row.listNotas[8].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[8].nota}}</td>
            <td v-if="!props.row.listNotas[8].mayor"   >{{props.row.listNotas[8].nota}}</td>
             <td v-if="props.row.listNotas[9].mayor"   style="background-color:#D9EFD4;" >{{props.row.listNotas[9].nota}}</td>
            <td v-if="!props.row.listNotas[9].mayor"   >{{props.row.listNotas[9].nota}}</td>
       
      <td  style="background-color:#D9EFD4;" >{{props.row.notaFinal}}</td>
      
            
                                  
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

 <modalNota 
  :title="'Calificar'"
  :buttonMsg="'Actualizar'"
  :openModal="openModal" 
    :atletaHeat="atletaHeat" 

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
import juecesHeatController from "../../controllers/juezHeat.js";

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
      verTodo:false,
      juezLider: null,
      heat: { rondaId: {} },
      juezCircuitos: [],
      id: "",
      atletasHeat: [],
      atletaHeat: {},
       resumen: [],
      juecesHeat:[],
       juecesHeat2:[],
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
        }
      ],
      columnsResult: [
        {
          label: "Color",
          field: "color"
        },  {
          label: "Nombre",
          field: "o1"
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
      /*juecesHeat: function(val) {
  
  /*console.log("TYYYYYRERERERYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        console.log("Tamaño maximo "+this.juecesHeat.length)
             console.log(JSON.stringify(this.juecesHeat[0]))
 console.log(this.juecesHeat[0].puntuacionList) 
this.juecesHeat[0].puntuacionList.array.forEach(element => {
      console.log("Entre al resumen")
  this.resumen.push({color:element.color})


},



);
        
    let  n=0;
    if( val)
        for (let i of  this.juecesHeat) {
   console.log("*************************")
                  this.juecesHeat2.push( atletasHeatController.byHeatAndJuez2(i,this.id,i.id,n));
                     console.log("*********************´´´´****")
         console.log(this.juecesHeat2)            
                    n=n+1;
                }
    },
    */
  },
  methods: {
    ponerLider(lider) {
      this.juezLider = lider;
    },
    fetchData() {
      this.id = this.$route.params.id;

      juecesHeatController.byHeat(this, this.id);
      heatsController.retrieve(this, this.id);
  heatsController.byResumen(this, this.id);
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
            calcularNota(a,r){
let total=0;

a.forEach(f=>{

total=total+f;

})
console.log("total:"+total+ "  :"+Math.max.apply(null,a)+"  :"+Math.min.apply(null,a))
if(r.total)
r.total+=total;
else
r.total=total;
return  (total-Math.max.apply(null,a)-Math.min.apply(null,a))/(a.length-2)
            },
    finalizar() {

      heatsController.finalizar(this,this.id)
     // if(this.resumen[0])
   /*   if(this.resumen[0].tfinal.nota){
            console.log("pujjktasss" +this.resumen[0].tfinal.nota);
      }
  else{
this.showAlert=true;
this.errMsg="El heat aun no tiene calificaciones "

  }
  else{

this.showAlert=true;
this.errMsg="El heat aun no tiene calificaciones "

  }
     */
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
