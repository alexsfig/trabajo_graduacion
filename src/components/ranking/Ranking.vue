<template>
    <div>
        <section class="content-header">
            <h1>Ranking por categoria</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Ranking </li>
      
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
                          <!--  <h3 class="box-title">Atletas Inscritos en la Fecha: <b>{{circuito.fechaId.nombre}}</b>   del Circuito: <b>{{circuito.nombre }} </b></h3>-->
                        </div>
                       
                        <div class="box-body">
      <div class="box-action">
 
                            <form @submit.prevent="submit"  role="form"> 
           <div class="col-xs-12 col-sm-6">

            
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('categoria') }">
                                          
                                            <label for="categoria">Categoria</label>
                                            <v-select
                                                :debounce="250"
                                                :options="categorias"
                                                v-model="categoria"
                                                placeholder="Selecciona un categoria" 
                                                label="nombreCategoria">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="categoria" value="" data-vv-as="categoria"  v-model="categoria" v-validate="'required'">
                                            <span class="help-block" for="categoria" v-bind:data-error="errors.first('categoria')">
                                                {{ errors.first('categoria') }}
                                            </span>
                                              <button type="submit"  class="btn btn-flat btn-sm btn-primary"><i aria-hidden="true" 
                                        class="fa fa-search"></i>  Buscar </button> 
                                        </div>
                                        
                                    </div>
                                      
                            </form> 
                             <!--   <router-link to="/admin/circuitos/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Circuito
                                </router-link>-->
                            </div>

                              </div>
                       
                        <div class="box-body">
                         <vue-good-table   theme="nocturnal" :columns="columns" :rows="ranking" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props"> 

                               <td style=""><router-link :to="{ name: 'AtletasShow', params: { id: props.row.atleta }}"><img class="custom-img img-responsive img-circle" v-bind:src="getImg(props.row.atleta)" alt="User profile picture"/></router-link></td>

                                       <td style="color:navy"><b>#{{props.row.posicion}}</b></td> 
                                   <td><router-link :to="{ name: 'AtletasShow', params: { id: props.row.atleta }}">{{props.row.nombre}}</router-link></td> 


    <td v-for="value in props.row.puntuaciones" :title="value.puntuacion+' Puntos '  +value.fecha" :style="value.lugar==1?{background:'#FFD700'}:value.lugar==2?{background:'#a8a8a8'}:value.lugar==3?{background:'#cd7f32'}:{}"><div  >{{value.lugar}}</div></td> 
                               

  



                                           <td  style="color:navy;text-align: center; margin: 0 auto;  text-align: left;">{{props.row.puntos}}</td>       

                                  </template>
                            </vue-good-table>


                        </div>



                    </div>
                   </div>
            </div>
          
        </section>
    </div>
</template>
<script>
import circuitosController from "../../controllers/circuitos.js";
import categoriaController from "../../controllers/categorias.js";
import rankingController from "../../controllers/ranking.js";
import atletaCircuitoController from "../../controllers/AtletaCircuito.js";
import vSelect from "vue-select";
import moment from "moment";
const BASE_URL = process.env.BASE_URL;
export default {
  name: "AgregarAtleta",
  data() {
    return {
      circuito: { atletasCircuitoList: [], fechaId: {} },
      datos: [],
      atletaCircuito: {},
      categorias: [],
      atletaCircuitos: [],
      listheat: [],
      categoria: null,
      showAlert: false,
      showSuccess: false,
      methodSubmit: "editar",
      openModal: false,
      id: "",
      ranking: "",
      columns: []
    };
  },
  components: {
    vSelect
  },
  created() {
    this.id = this.$route.params.id;

    this.fetchData();
  },
  watch: {
    ranking: "loadData"
  },
  methods: {
    fetchData() {
      // circuitosController.index(this)
      /*      atletaCircuitoController.indexByCircuito(this,this.id);
                       atletaCircuitoController.getheat(this,this.id);
                circuitosController.retrieve(this,this.id)
                 atletaController.byCircuito(this, this.id)
*/
      console.log("son :" + Object.keys(this.atletaCircuitos).length);
      /*
  for (let i of this.atletas) {
  i.nombre=i.personaId.nombre+","+i.personaId.apellido;
  console.log("nombre:"+ i.nombre)
  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
}*/

      categoriaController.index(this);
    },
    submit() {
      console.log("son :" + Object.keys(this.atletaCircuitos).length);
      this.showAlert = false;
      this.showSuccess = false;

      this.$validator.validateAll().then(success => {
        if (success) {
          if (this.categoria.id > 0) {
            rankingController.byCategoria(this, this.categoria.id);
          } else {
            this.showAlert = true;
            this.errMsg = "Debe seleccionar un categoria";
          }
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Error revisa el formulario";
        }
      });
    },
  getImg(img) {
            
            return BASE_URL+"upload/files/"+img+".png"
        },
    loadData() {
      if (this.ranking) {
        this.columns = [];
        this.columns.push({
          label: "",
          field: "",
          filterable: true
        });
        this.columns.push({
          label: "Lugar",
          field: "posicion",
          filterable: true
        });

      
        this.columns.push({
          label: "Nombre",
          field: "nombre",
          filterable: true
        });

        let nfecha = 0;
        if (this.ranking[0]) {
          this.ranking[0].puntuaciones.forEach(element => {
            nfecha++;
            this.columns.push({
              label: "Fecha " + nfecha + "",
              field: "atletaId.personaId.apellido",
              filterable: true
            });
          });
        }
      }

      this.columns.push({
        label: "Total",
        field: "puntos",
        filterable: true
      });
    },

    volver() {
      console.log("entre");
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    _calculateAge(birthday) {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
};
</script>

<style>
.active {
  width: 100%;
}
.custom-img{
    width: 75px;
    margin:auto;
}


</style>