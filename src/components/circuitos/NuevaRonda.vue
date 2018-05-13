<template>
    <div>
        <section class="content-header">
            <h1>Rondas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Rondas </li>
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
                            <h3 class="box-title"><b>Generacion de Heats para Nueva Ronda</b></h3>
                        </div>
                        <div class="box-header with-border">
                            <h3 class="box-title">Atletas en la Fecha <b>{{circuito.fechaId.nombre}}</b>  del Circuito <b>{{circuito.nombre }} </b></h3>
                        </div>
                       
                       
                               
    <form @submit.prevent="submit"  role="form"> 
    <div class="box-body">
        
 <button type="button" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="submit()"><i aria-hidden="true" 
                                        class="fa fa-check"></i> Crear Ronda</button> </div>
              {{listheat}}                       
<div v-for="value in listheat">
 <div class="box-body">
        
 <h4 class="box-title"> <b> Heat {{value[0].numeroHeat}} </b> </h4> 
       

        <vue-good-table :columns="columns" :rows="value" :paginate="true" :globalSearch="false" globalSearchPlaceholder="Search"  styleClass="table table-striped table-condensed">

                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.atletaId.personaId.nombre}}</td>                                   
                                       <td>{{props.row.atletaId.personaId.apellido}}</td> 
                                       <td>{{ props.row.atletaId.aniosPracticando}} años</td> 
                                        <td>{{ props.row.atletaId.ladoPie}}</td>  
                                          <td>{{ props.row.atletaId.olaPreferida}}</td>   
                                     <td v-if="props.row.color=='Amarillo'" class="yellowBG">{{ props.row.color }}</td>  
                                  
                          <td   v-if="props.row.color=='Azul'"  class="blueBG">{{ props.row.color }}</td>  
                                 <td  v-if="props.row.color=='Verde'"  class="greenBG">{{ props.row.color }}</td>      
                                  <td  v-if="props.row.color=='Rojo'"  class="redBG">{{ props.row.color }}</td>       
           
                                                             
                                         <td class="nowrap">
                                        
                                        
                                        
                                        <div v-if="!changeAtleta">
                                        <button type="button" v-if="!props.row.selected" class="margin btn btn-flat btn-sm btn-warning" 
                                        @click="cambioInit(props,value[0].numeroHeat-1)"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Re-Asignar</button>
                                        </div>

                                        <div v-if="changeAtleta">
                                   
                                   
                                      <button type="button" v-if="!props.row.selected" class="margin btn btn-flat btn-sm btn-success" 
                                        @click="cambioRealizar(props,value[0].numeroHeat-1)"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> cambiar</button>

 <button type="button" v-if="props.row.selected" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="cambioCancelar(props.row)"><i aria-hidden="true" 
                                        class="fa fa-retweet"></i> Cancelar</button>

                                        </div>
                                    </td>
                                  </template>
                            </vue-good-table>


        </div>

       

                        </div>
    </form>

     <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Rondas
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
import circuitosController from "../../controllers/circuitos.js";
import atletaController from "../../controllers/atletas.js";
import atletaCircuitoController from "../../controllers/AtletaCircuito.js";
import rondasController from "../../controllers/rondas.js";
import vSelect from "vue-select";
import moment from "moment";
export default {
  name: "AgregarAtleta",
  data() {
    return {
      circuito: { atletasCircuitoList: [], fechaId: {} },
      datos: [],
      aux: null,
      atletaCircuito: {},
      atletas: [],
      atletaCircuitos: [],
      listheat: [],
      totalAtletas: 0,
      atleta: null,
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      changeAtleta: false,
      id: "",
      numTable: "",
      numIndex: "",
      columns: [
        {
          label: "Nombre",
          field: "atletaId.personaId.nombre",
          filterable: false
        },
        {
          label: "Apellido",
          field: "atletaId.personaId.apellido",
          filterable: false
        },

        {
          label: "Años Practicando",
          field: "aniosPracticando",
          filterable: false
        },
        {
          label: "Lado de Pie",
          field: "ladoPie",
          filterable: false
        },
        {
          label: "Ola Preferida",
          field: "olaPreferida",
          filterable: false
        },
        {
          label: "Accion",
          field: "",
          filterable: false
        },
        {
          label: "Color",
          field: "color",
          filterable: false
        }
      ]
    };
  },
  components: {
    vSelect
  },
  created() {
    this.id = this.$route.params.id;

    this.fetchData();
  },
  methods: {
    fetchData() {
      // circuitosController.index(this)
      atletaCircuitoController.indexByCircuitoClasificados(this, this.id);
      atletaCircuitoController.getheat(this, this.id);
      circuitosController.retrieve(this, this.id);
      atletaController.index(this);

      /*
  for (let i of this.atletas) {
  i.nombre=i.personaId.nombre+","+i.personaId.apellido;
  console.log("nombre:"+ i.nombre)
  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
}*/
    },

    cambioInit(props, num) {
      //row.personaId.apellido="jdksks";

      props.row.selected = true;
      this.changeAtleta = true;
      this.aux = props.row;
      this.numTable = num;
      this.numIndex = props.index ;
    },
    cambioRealizar(props, num) {
      console.log(props.row);
      console.log(this.aux)
      console.log(this.numTable)
        console.log(this.numIndex)
        
      //console.log(this.listheat[list[0].numeroHeat - 1][0]);
        let aux5=props.row.atletaId;
         let aux6=props.row.id;
      //row.personaId.apellido="jdksks";
           this.listheat[num][props.index].atletaId=this.aux.atletaId;
       this.listheat[num][props.index].id=this.aux.id;

       this.listheat[this.numTable][this.numIndex].atletaId=aux5;
        this.listheat[this.numTable][this.numIndex].id=aux6;
      let aux2 = props.row.atletaId;
      props.row.atletaId = this.aux.atletaId;
      this.aux.atletaId = aux2;
      props.row.selected = false;
      this.aux.selected = false;
      this.changeAtleta = false;
       console.log( this.listheat[num][props.index])
      console.log(this.listheat[this.numTable][this.numIndex])
   
  
          console.log( this.listheat)
    },

    cambioCancelar(row) {
      row.selected = false;
      this.changeAtleta = false;
      this.numTable = "";
      this.numIndex = "";
    },
    submit() {
      this.showAlert = false;
      this.showSuccess = false;

      this.$validator.validateAll().then(success => {
        if (success) {
          /* this.atletaCircuito.circuitoId=this.circuito;
                        this.atletaCircuito.atletaId=this.atleta;
                        this.atletaCircuito.estado=0;

                        console.log(JSON.stringify(  
                        this.atletaCircuito));
                        atletaCircuitoController.create(this,this.atletaCircuito)
                        */

          rondasController.create(this, this.listheat);
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Error revisa el formulario";
        }
      });
    },
    deleteCircuito(id, nombre) {
      let context = this;
      let swal = this.$swal;
      this.$swal({
        title: "Estas Seguro?",
        html:
          "No podras recuperar la informacion de la circuito <b>&laquo;" +
          nombre +
          "&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Mantener"
      }).then(
        function() {
          atletaCircuitoController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La circuito no se elimino", "error");
          }
        }
      );
    },

    volver() {
      console.log("entre");
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style scoped>
td.greenBG {
  background-color: lightgreen;
}
td.redBG {
  background-color: #dd4b39;
}
td.blueBG {
  background-color: #3c8dbc;
}
td.yellowBG {
  background-color: #ffff97;
}
.view-all {
  padding: 30px 0;
}
.heat-notes {
  padding: 50px 0;
}
.notes-per-heat {
  padding: 20px 0;
}
</style>