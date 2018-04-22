<template>
    <div>
        <section class="content-header">
            <h1>Finalizar ronda {{ronda.numero}}</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Rondas  </li>
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
                            <!--<h3 class="box-title">Manejo de Rondas del Circuito <b>{{this.circuito.nombre}}</b> para la Fecha <b>{{this.circuito.fechaId.nombre}} </b></h3>-->
                       {{ultima}}
                        
    <button v-if="ronda.estado=='Calificada'" type="button" @click="finalizar()"   class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Finalizar Ronda</button>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                                
                           <router-link v-if="nuevoHabilitar" :to="{ name: 'circuitosNuevaRonda', params: { id: id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Nueva Ronda </button>
                                        </router-link>   

                            </div>
             
                        <div class="box-body">   
       <div v-for="value in heats">
                            <vue-good-table :columns="columns" :rows="value.atletasHeatList" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                          <td v-if="props.row.color=='Amarillo'" style="background-color:yellow;">{{ props.row.color }}</td>  
                                  
                          <td v-if="props.row.color=='Azul'"  style="background-color:#0F7AD5;">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  style="background-color:Green;">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  style="background-color:Red;">{{ props.row.color }}</td>       
                                 
                                    <td>{{ props.row.promedio }}</td>
                                    <td>{{ props.row.lugar }}</td>

                                   
                        <td  v-if="props.row.estado=='Clasificado'"  style="background-color:Green;">{{ props.row.estado }}</td>      
                                  <td  v-if="props.row.estado=='Eliminado'"  style="background-color:Red;">{{ props.row.estado }}</td>  
                          <td  v-if="props.row.estado=='Repechaje'"  style="background-color:Yellow;">{{ props.row.estado }}</td>      
                                  <td  v-if="props.row.estado=='Descalificado'"  style="background-color:Red;">{{ props.row.estado }}</td>  
                              
                                 
                                                                 


    <td  v-if="ronda.estado=='Calificada'">
    <button  type="button" @click="change(props.row)" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Cambiardd</button>
                                        
        
                                 </td>

   
    
                                  </template>
                            </vue-good-table>
</div>
                        </div>

                         <div class="box-body">
                              
                              <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Circuitos
                                </div>

                                </div> 


                    </div>
                   </div>
            </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
import rondasController from "../../controllers/rondas.js";
import heatController from "../../controllers/heats.js";
import vSelect from "vue-select";
import moment from "moment";
export default {
  name: "Rondas",
  data() {
    return {
      ronda:{},
      rondas: [],
      heats:[],
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      circuito: {fechaId:{}},
      nuevoHabilitar:false,
      ultima:false,
      id: "",
      columns: [
        {
          label: "Color",
          field: "color"
        },

        {
          label: "Puntuacion",
          field: "puntiacion"
        },
        {
          label: "Lugar",
          field: "lugar"
        },
        {
          label: "Estado",
          field: "estado"
        }

      ]
    };
  },
  created() {
    this.fetchData();
  },watch:{
            "ronda":"addCol"
        },
  methods: {
     addCol(){

      if(atletasHeatList.atletasHeatList.length==1)
      this.ultima=true;

       if(this.ronda)
       {
       if(this.columns.length==4)
{
    if(this.ronda.estado==="Calificada")

     {
        this.columns.push({label: 'Acciones',
                      field: '',
                      filterable: true,})             
                    }
}
       }

            },
      change(row){

          console.log(row)
if(row.estado==='Clasificado'){
row.estado='Descalificado';
return;
}
if(row.estado==='Descalificado'){
row.estado='Eliminado'
return;
}
if(row.estado==='Eliminado'){
row.estado='Repechaje'

console.log("eentesssssk"+row.estado)
return;
}
if(row.estado==='Repechaje'){
row.estado='Clasificado'
return;
}
      },
    fetchData() {
      this.id = this.$route.params.id;
      rondasController.retrieve(this, this.id);
      heatController.endRonda(this, this.id);
    },
    deleteRonda(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion de la ronda <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion a la misma ya que no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          rondasController.delete(context, this.id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La ronda no se elimino", "error");
          }
        }
      );
    },
    finalizar(){

    let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion de la ronda " +
         
          " y toda la informacion relacion a la misma ya que no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Finalizar!",
        cancelButtonText: "No"
      }).then(
        function() {
          
          rondasController.finalizar(context, context.id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La ronda no se finalizo", "error");
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
