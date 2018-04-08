<template>
    <div>
        <section class="content-header">
            <h1>Rondas</h1>

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
                            <h3 class="box-title">Manejo de Rondas del Circuito <b>{{this.circuito.nombre}},{{this.circuito.estado}}</b> para la Fecha <b>{{this.circuito.fechaId.nombre}} </b></h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                           <div  v-if="circuito.estado!='Finalizado'">
                          <div  v-if="circuito.estado!='Calificado'">
                           <router-link v-if="nuevoHabilitar" :to="{ name: 'circuitosNuevaRonda', params: { id: id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Nueva Ronda </button>
                                        </router-link>   
                          </div></div>
                            <div  v-if="circuito.estado=='Calificado'">
                             <router-link v-if="nuevoHabilitar" :to="{ name: 'CircuitosFinalizar', params: { id: id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Finalizar Circuito </button>
                                        </router-link>   
 </div>

                     <div  v-if="circuito.estado=='Finalizado'">
                             <router-link v-if="nuevoHabilitar" :to="{ name: 'CircuitosFinalizar', params: { id: id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Ver Circuito </button>
                                        </router-link>   
 </div>

                            </div>
                       
                        <div class="box-body">   

                            <vue-good-table :columns="columns" :rows="rondas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                  
                                  
                                    <td class="nowrap">{{ props.row.id }}</td>
                                 
                                    <td>{{ props.row.numero }}</td>
                                    <td>{{ props.row.atletasRonda }}</td>
                                   <td>{{ props.row.estado }}</td>
                                  
                                    <td class="nowrap">
                                        <router-link :to="{ name: 'heat', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Gestionar Ronda</button>
                                        </router-link>
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteRonda(props.row.id, props.row.numero)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar Ronda</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

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
import circuitoController from "../../controllers/circuitos.js";
import vSelect from "vue-select";
import moment from "moment";
export default {
  name: "Rondas",
  data() {
    return {
      rondas: [],
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      circuito: {fechaId:{}},
      nuevoHabilitar:false,
      id: "",
      columns: [
        {
          label: "Id",
          field: "id"
        },

        {
          label: "Numero",
          field: "numero"
        },
        {
          label: "Numero de Atletas",
          field: "atletasRonda"
        },
        {
          label: "Estado",
          field: "estado"
        },

        {
          label: "",
          field: "",
          filterable: true
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  watch:{
rondas:function(val){
    this.nuevoHabilitar=true;
       if(val)
       {
      for(let i of val )
{
if(i.estado=="No iniciada"||i.estado=="En progreso")
    this.nuevoHabilitar=false;

}
       }
   /* else
    this.nuevoHabilitar=true;*/
}
 


  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id;
      rondasController.byCircuito(this, this.id);
      circuitoController.retrieve(this, this.id);
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
          rondasController.delete(context, id, swal);
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            swal("Cancelado", "La ronda no se elimino", "error");
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
