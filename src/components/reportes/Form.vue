<template>
    <div>
        <section class="content-header">
            <h1>Reporte Financiero</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/transaccion/">Transacciones</router-link>
                </li>
                <li class="active">Reporte Financiero</li>
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
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title" v-if="!id">Parametros de Reporte  </h3>
                            <h3 class="box-title" v-if="id">Editar  Transaccion</h3>
                        </div>
                        <div class="box-body">
                            <form @submit.prevent="submit" role="form">
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('inicio') }">
                                            <label for="">Fecha Inicio</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="inicio" name="inicio" class="form-control" data-vv-as="Fecha Inicio" v-model="transaccion.inicio" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('inicio') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('inicio') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="transaccion.inicio" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                            <!-- <input type="date" id="fecha" name="fecha" data-vv-as="fecha" class="form-control" v-model="transaccion.fecha" v-validate="'required'"> -->
                                            <span class="help-block" for="inicio" v-bind:data-error="errors.first('inicio')">
                                                {{ errors.first('inicio') }}
                                            </span>
                                        </div>
                                    </div>


                                     <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('fin') }">
                                            <label for="">Fecha Fin</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input placeholder="AAAA-MM-DD" type="text" id="fin" name="fin" class="form-control" data-vv-as="Fecha Fin" v-model="transaccion.fin" v-validate="'required|date_format:YYYY-MM-DD|after:inicio'" :class="{'datepicker':true,  'has-error': errors.has('fin') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('fin') }">
                                                            <i class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker" :language="'es'" v-model="transaccion.fin" :today-btn="todayBtn" :clear-btn="clearBtn" :limit-from="limitFrom" :format="format" :week-starts-with="weekStartsWith" :limit-to="limitTo" :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                                </template>
                                            </dropdown>

                                            
                                            <span class="help-block" for="fin" v-bind:data-error="errors.first('fin')">
                                                {{ errors.first('fin') }}
                                            </span>
                                        </div>
                                    </div>




                                    <div class="col-xs-12 col-sm-4">
                                     <div class="fgroup"> 
                                            <label for="formaPagoId">Forma de pago</label>
                                            <v-select :debounce="250" :options="formaPagos" v-model="transaccion.formaPagoId" placeholder="Escoja una Forma de Pago" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="formaPagoId" value="" data-vv-as="formaPagoId" v-model="transaccion.formaPagoId" >
                                          
                                        </div>  

                                    </div> 

                                                                     
                                  
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="cuentaId">Cuenta</label>
                                            <v-select :debounce="250" :options="cuentas" v-model="transaccion.cuentaId" placeholder="Escoja una Cuenta" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="cuentaId" value="" data-vv-as="cuenta" v-model="transaccion.cuentaId"  >
                                            
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="tipoTransaccionId">Tipo de Transaccion</label>
                                            <v-select :debounce="250" :options="tipoTransaccions" v-model="transaccion.tipoTransaccionId" placeholder="Escoja un Tipo de Transaccion" label="nombre" @input="changedValue">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipoTransaccionId" value="" data-vv-as="tipo Transaccion" v-model="transaccion.tipoTransaccionId" >
                                           
                                        </div>

                                    </div>                                           
                                       
                                                                
                                   <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="">Concepto de Transaccion</label>

                                            <v-select :debounce="250" :options="naturaleza" v-model="transaccion.naturaleza" placeholder="Seleccione un Concepto" label="label">
                                            </v-select>
                                             <div class="clearfix"></div>
                                            <input type="hidden" name="naturaleza" value="" data-vv-as="naturaleza" v-model="transaccion.naturaleza" >
                                           
                                        </div>
                                    </div>
                                   
                                  
                                   

                                    <div class="col-xs-12 col-sm-4" >
                                        <div class="fgroup" >
                                            <label for="patrocinadorId">Patrocinador</label>
                                            <v-select :debounce="250" :options="patrocinadors" v-model="transaccion.patrocinadorId" placeholder="Escoja un Patrocinador" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="patrocinadorId" value="" data-vv-as="patrocinadorId" v-model="transaccion.patrocinadorId" >
                                           
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4" >
                                        <div class="fgroup" >
                                            <label for="atletaId">Atleta</label>
                                            <v-select :debounce="250" :options="atletas" v-model="transaccion.atletaId" placeholder="Escoja un Atleta" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="atletaId" value="" data-vv-as="atletaId" v-model="transaccion.atletaId" >
                                            
                                        </div>
                                    </div>

                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                  
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary" ><i aria-hidden="true"
                                            class="fa fa-search"></i> Consultar</button>
                                         <button type="button" class="btn btn-flat btn-sm btn-primary" @click="reset()">  <i aria-hidden="true"  class="fa fa-eraser"></i>  Limpiar</button>
                                        <button type="button" v-if="!id" class="btn btn-flat btn-sm btn-primary" @click="createPDF()"> ><i aria-hidden="true"  class="fa fa-file"></i> Generar Reporte</button>
                                        <button type="submit" v-if="id" class="btn btn-flat btn-sm btn-primary">Editar</button>

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>



           <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Transacciones Involucradas </h3>
                        </div>
                        
                        <div class="box-body">
      
                            <vue-good-table  id="basic-table" :columns="columns" :rows="searchs" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.fecha }}</td>
<td>{{ props.row.cuentaId.nombre }}</td>
<td>{{ props.row.tipoTransaccionId.nombre }}</td>
<td>{{ props.row.tipoTransaccionId.tipo==true?'Ingreso':'Gasto' }}</td>
<td>{{ props.row.referencia }}</td>
<td v-if="!props.row.tipoTransaccionId.tipo" style="color:#FF0000"><b>{{ props.row.monto }}</b></td>
<td v-if="props.row.tipoTransaccionId.tipo" style="color:green"><b>{{ props.row.monto }}</b></td>
<td>{{ props.row.formaPagoId.nombre }}</td>
<td>{{ props.row.comprobante }}</td>
<td>{{ props.row.descripcion }}</td>
                                
                                  </template>
                            </vue-good-table>





                            <form  role="form">
                                <div class="box-body">                                                   
                                  
                                   <div class="col-xs-12 col-sm-2 ">
                                        <div class="fgroup" >
                                            <label for="">Numero de Transacciones:</label>
                                            <input type="text" v-model="count" class="form-control" name="descripcion"   disabled/>

                                                                       
                                          </div>
                                    
                                          </div>                         
                                       

                                         <div class="col-xs-12 col-sm-2 ">
                                        <div class="fgroup" >
                                            <label for="">Total = Ingresos - Gastos</label>
                                          <b>  
                                              <input v-if="total.includes('-')"  style="color:#FF0000" type="text" v-model="total" class="form-control" name="descripcion"   disabled/>
                                          
 
                                              <input  v-if="!total.includes('-')"   style="color:green" type="text" v-model="total" class="form-control" name="descripcion"   disabled/>
                                          
                                          </b>
                                                                       
                                          </div>
                                    
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
import transaccionsController from "../../controllers/transacciones.js";
import vSelect from "vue-select";
import patrocinadoresController from "../../controllers/patrocinadores.js";
import atletasController from "../../controllers/atletas.js";
import formaPagosController from "../../controllers/formaPagos.js";
import cuentasController from "../../controllers/cuentas.js";
import tipoTransacionsController from "../../controllers/tipoTransaccions.js";

export default {
  name: "Transaccion",
  data() {
    return {
      errMsg: "",
      errorMsg: "",
      showAlert: false,
      showSuccess: false,
      successMsg: "",
      id: "",
      errMsg: "",
      enapatro: false,
      enaatle: false,
      isLogin: false,
      naturaleza: [
        {
          label: "Ingreso",
          value: true
        },
        {
          label: "Gasto",
          value: false
        }
      ],
      // comprobantev:null,
      transaccion: {
        fecha: null
      },
      searchs: [],
      patrocinadors: [],
      atletas: [],
      formaPagos: [],
      cuentas: [],
      tipoTransaccions: [],
      limitTo: "",
      limitFrom: "",
      format: "yyyy-MM-dd",
      weekStartsWith: 0,
      clearBtn: true,
      todayBtn: true,
      total: "",
      count: "",
      closeOnSelected: true,

      columns: [
        {
          label: "Fecha",
          field: "fecha",
          filterable: true
        },
        {
          label: "Cuenta",
          field: "cuentaId.nombre",
          filterable: true
        },
        {
          label: "Tipo de Transaccion",
          field: "tipoTransaccionId.nombre",
          filterable: true
        },
        {
          label: "Concepto",
          field: "tipoTransaccionId.tipo",
          filterable: true
        },
        {
          label: "Referencia",
          field: "referencia",
          filterable: true
        },
        {
          label: "Monto($)",
          field: "monto",
          filterable: true
        },
        {
          label: "Forma de Pago",
          field: "formaPagoId.nombre",
          filterable: true
        },
        {
          label: "Comprobante",
          field: "comprobante",
          filterable: true
        },
        {
          label: "Descripcion",
          field: "descripcion",
          filterable: true
        }
      ]
    };
  },
  components: {
    vSelect
  },

  watch: {
    showSuccess: function(val) {
      transaccionsController.retrieve(this, this.entrada);
    },

    searchs: function(value) {
      let total = [];
      let count = [];

      console.log("Sumando");

      Object.entries(value).forEach(([key, val]) => {
        total.push(val.tipoTransaccionId.tipo ? val.monto : -val.monto); // the value of the current key.
        count.push(1);
      });

      this.total = this.formatPrice(
        total.reduce(function(total, num) {
          return total + num;
        }, 0)
      );
      this.count = count.reduce(function(count, num) {
        return count + num;
      }, 0);
    }
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      transaccionsController.retrieve(this, this.id);
      transaccionsController.retrieve(this, this.entrada);
      //this.comprobantev.value = this.transaccion.comprobante;
    }
    //this.transaccion.fecha=new Date();

    console.log("id:" + this.id);
    patrocinadoresController.index(this);
    atletasController.index(this);
    formaPagosController.index(this);
    cuentasController.index(this);
    tipoTransacionsController.index(this);
  },
  methods: {
    roundToTwo(num) {
      return formatPrice(+(Math.round(num + "e+2") + "e-2"));
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    changedValue() {
      this.enaatle = false;
      this.enapatro = false;
      console.log("ejemplo hhhhhhhhhhh");
      if (this.transaccion.tipoTransaccionId) {
        if (this.transaccion.tipoTransaccionId.tipo) {
          if (this.transaccion.tipoTransaccionId.asociar) {
          }

          this.enapatro = true;
        } else {
          if (this.transaccion.tipoTransaccionId.asociar) {
            this.enaatle = true;
          }
        }
      }
    },
    submit() {
      this.showAlert = false;
      this.showSuccess = false;
      this.$validator.validateAll().then(success => {
        if (success) {
          let entrada = "?";
          entrada += "inicio=" + this.transaccion.inicio;
          entrada += "&fin=" + this.transaccion.fin;
          entrada += this.transaccion.atletaId
            ? "&atleta=" + this.transaccion.atletaId.id
            : "";
          entrada += this.transaccion.patrocinadorId
            ? "&patrocinador=" + this.transaccion.patrocinadorId.id
            : "";
          entrada += this.transaccion.formaPagoId
            ? "&formaPago=" + this.transaccion.formaPagoId.id
            : "";
          entrada += this.transaccion.cuentaId
            ? "&cuenta=" + this.transaccion.cuentaId.id
            : "";
          entrada += this.transaccion.tipoTransaccionId
            ? "&tipo=" + this.transaccion.tipoTransaccionId.id
            : "";
          entrada += this.transaccion.naturaleza
            ? "&naturaleza=" + this.transaccion.naturaleza.value
            : "";

          if (!this.id) transaccionsController.reporte(this, entrada);
          else transaccionsController.update(this, this.transaccion);
        } else {
          console.log("Error enn el formulario");
          this.showAlert = true;
          this.errMsg = "Form error";
        }
      });
    },

    reset() {
      this.transaccion = {};
      this.searchs = [];
    },
    createPDF2(){
         let jsPDF = require("jspdf");
      require("jspdf-autotable");
    var doc = new jsPDF();
    doc.text("From HTML", 14, 16);
    var elem = document.getElementById("basic-table");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data, {startY: 20});
    return doc;
},
    createPDF() {

                                
let filas=[];
for(let aux of this.searchs){
let fila={
fecha:aux.fecha,
cuenta:aux.cuentaId.nombre,
tipo:aux.tipoTransaccionId.tipo==true?'Ingreso':'Gasto',
monto:aux.monto,
forma:aux.formaPagoId.nombre

}

filas.push(fila)
}
      let jsPDF = require("jspdf");
      require("jspdf-autotable");
      var item = {
        Name: "XYZ",
        Age: "22",
        Gender: "Male"
      };
      var doc = new jsPDF();
      var columns = [

        { title: "Fecha", dataKey: "fecha" },
        { title: "Cuenta", dataKey: "cuenta" },
        

        { title: "Tipo", dataKey: "tipo" },
        
     
        { title: "Forma", dataKey: "forma" },
           { title: "Monto", dataKey: "monto" }
      ];
      var rows = [];
      for (let row of this.searchs) {
        rows.push(row);
      }
      doc.autoTable(columns, filas, {
        styles: {
          cellPadding: 5, // a number, array or object (see margin below)
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor: 200,
          lineWidth: 0,
          fontStyle: "normal", // normal, bold, italic, bolditalic
          overflow: "ellipsize", // visible, hidden, ellipsize or linebreak
          fillColor: false, // false for transparent or a color as described below
          textColor: 20,
          halign: "left", // left, center, right
          valign: "middle", // top, middle, bottom
          columnWidth: "auto" // 'auto', 'wrap' or a number
        },
        columnStyles: {
          id: { fillColor: 255 }
        },
        margin: { top: 30 },
        addPageContent: function(data) {
          doc.text("<b>Reporte de Transacciones</b>", 10, 10);
        }
      });

      doc.save("Test.pdf");
    }
  }
};
</script>
