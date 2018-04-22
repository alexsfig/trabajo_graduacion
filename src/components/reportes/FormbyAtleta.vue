<template>
    <div>
        <section class="content-header">
            <h1>Resumen Financiero por Atleta</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>
                    <router-link to="/admin/transaccion/">Transacciones</router-link>
                </li>
                <li class="active">Resumen Financiero por Atleta</li>
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
                            <h3 class="box-title" v-if="!id">Parametros de Resumen Financiero </h3>
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


                                    <!--

                                    <div class="col-xs-12 col-sm-4">
                                     <div class="fgroup"> 
                                            <label for="formaPagoId">Forma de pago</label>
                                            <v-select :debounce="250" :options="formaPagos" v-model="transaccion.formaPagoId" placeholder="Escoja una Forma de Pago" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="formaPagoId" value="" data-vv-as="formaPagoId" v-model="transaccion.formaPagoId" >

                                            <span class="help-block" for="formaPagoId" v-bind:data-error="errors.first('formaPagoId')">
                                                {{ errors.first('formaPagoId') }}
                                            </span>    
                                          
                                        </div>  


                                    </div> 

                                                                     
                                  
                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="cuentaId">Cuenta</label>
                                            <v-select :debounce="250" :options="cuentas" v-model="transaccion.cuentaId" placeholder="Escoja una Cuenta" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="cuentaId" value="" data-vv-as="cuenta" v-model="transaccion.cuentaId"  >

                                              <span class="help-block" for="cuentaId" v-bind:data-error="errors.first('cuentaId')">
                                                {{ errors.first('cuentaId') }}
                                            </span>   
                                            
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="tipoTransaccionId">Tipo de Transaccion</label>
                                            <v-select :debounce="250" :options="tipoTransaccions" v-model="transaccion.tipoTransaccionId" placeholder="Escoja un Tipo de Transaccion" label="nombre" @input="changedValue">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="tipoTransaccionId" value="" data-vv-as="tipo Transaccion" v-model="transaccion.tipoTransaccionId" >

                                             <span class="help-block" for="tipoTransaccionId" v-bind:data-error="errors.first('tipoTransaccionId')">
                                                {{ errors.first('tipoTransaccionId') }}
                                            </span>   
                                           
                                        </div>

                                    </div>                                           
                                       
                                                                
                                   <div class="col-xs-12 col-sm-4">
                                        <div class="fgroup" >
                                            <label for="">Concepto de Transaccion</label>

                                            <v-select :debounce="250" :options="naturaleza" v-model="transaccion.naturaleza" placeholder="Seleccione un Concepto" label="label">
                                            </v-select>
                                             <div class="clearfix"></div>
                                            <input type="hidden" name="naturaleza" value="" data-vv-as="naturaleza" v-model="transaccion.naturaleza" >

                                             <span class="help-block" for="naturaleza" v-bind:data-error="errors.first('naturaleza')">
                                                {{ errors.first('naturaleza') }}
                                            </span>   
                                           
                                        </div>
                                    </div>
                                   
                                
                                   

                                    <div class="col-xs-12 col-sm-4" >
                                        <div class="fgroup" >
                                            <label for="patrocinadorId">Patrocinador</label>
                                            <v-select :debounce="250" :options="patrocinadors" v-model="transaccion.patrocinadorId" placeholder="Escoja un Patrocinador" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="patrocinadorId" value="" data-vv-as="patrocinadorId" v-model="transaccion.patrocinadorId" >

                                            <span class="help-block" for="patrocinadorId" v-bind:data-error="errors.first('patrocinadorId')">
                                                {{ errors.first('patrocinadorId') }}
                                            </span>   
                                           
                                        </div>
                                    </div>

                                      -->
                                    <div class="col-xs-12 col-sm-6" >
                                        <div class="fgroup" :class="{ 'has-error': errors.has('atletaId') }">
                                            <label for="atletaId">Atleta</label>
                                            <v-select :debounce="250" :options="atletas" v-model="transaccion.atletaId" placeholder="Seleccione un Atleta" label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="atletaId" value="" data-vv-as="Atleta" v-model="transaccion.atletaId" v-validate="'required'">

                                            <span class="help-block" for="atletaId" v-bind:data-error="errors.first('atletaId')">
                                                {{ errors.first('atletaId') }}
                                            </span>  
                                            
                                        </div>
                                    </div>

                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                  
                                        <button type="submit" v-if="!id" class="btn btn-flat btn-sm btn-primary" ><i aria-hidden="true"
                                            class="fa fa-search"></i> Consultar</button>
                                         <button type="button" class="btn btn-flat btn-sm btn-primary" @click="reset()">  <i aria-hidden="true"  class="fa fa-eraser"></i>  Limpiar</button>
                                        <button type="button" v-if="searchs.length>0" class="btn btn-flat btn-sm btn-primary" @click="createPDF(transaccion.inicio, transaccion.fin, total, count, transaccion.atletaId.nombre)"><i aria-hidden="true"  class="fa fa-file"></i> Generar Reporte</button>
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
                            <h3 class="box-title">Transacciones Registradas Desde: <b>{{transaccion.inicio}}</b> Hasta: <b>{{transaccion.fin}} </b></h3>

                        </div>
                        <div class="box-header with-border">
                            <h3 class="box-title">Atleta: <b>{{transaccion.atletaId?transaccion.atletaId.nombre:""}}</b> </h3>
                            
                        </div>
                        
                        <div class="box-body">
      
                            <vue-good-table  id="basic-table" :columns="columns" :rows="searchs" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.fecha }}</td>
<td>{{ props.row.cuentaId.nombre }}</td>
<td>{{ props.row.tipoTransaccionId.nombre }}</td>
<td>{{ props.row.tipoTransaccionId.tipo==true?'Ingreso':'Gasto' }}</td>
<td>{{ props.row.referencia }}</td>
<td v-if="!props.row.tipoTransaccionId.tipo" style="color:#FF0000"><b>{{ roundToTwo(props.row.monto) }}</b></td>
<td v-if="props.row.tipoTransaccionId.tipo" style="color:green"><b>{{roundToTwo( props.row.monto) }}</b></td>
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
                                            <label for="">Total Gastos: </label>
                                          <b>  
                                              <input  style="color:#FF0000" type="text" v-model="total" class="form-control" name="descripcion"   disabled/>                                          
 
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
 
   // base64Img :'',

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
          label: "Tipo de Transacción",
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
          label: "Descripción",
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
        total.push(val.monto); // the value of the current key.
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

     /*   this.imgToBase64('logo2.png', function(base64) {
            console.log("khsdjdswskjjskdkjsda imagen")
    this.base64Img = base64; 
});  */
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
      return this.formatPrice(+(Math.round(num + "e+2") + "e-2"));
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    
    createPDF(fechaini, fechafin, total, count, atleta) {                             
let filas=[];
for(let aux of this.searchs){
let fila={
fecha:aux.fecha,
cuenta:aux.cuentaId.nombre,
tipo: aux.tipoTransaccionId.nombre,
concepto:aux.tipoTransaccionId.tipo==true?'Ingreso':'Gasto',
referencia:aux.referencia,
monto:this.roundToTwo(aux.monto),
forma:aux.formaPagoId.nombre,
comprobante:aux.comprobante,
descripcion:aux.descripcion

}

filas.push(fila)
}
      let jsPDF = require("jspdf");
      var totalPagesExp = "{total_pages_count_string}";
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
        { title: "Tipo de Transaccion", dataKey: "tipo" },
        

        { title: "Concepto", dataKey: "concepto" },
        
       
        
     
        { title: "Forma de Pago", dataKey: "forma" },
        { title: "Comprobante", dataKey: "comprobante" },
         { title: "Monto($)", dataKey: "monto" }
       
           
      ];
      var rows = [];
      for (let row of this.searchs) {
        rows.push(row);
      }

      

     // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        /*if (this.base64Img) {
            console.log("agregue una imgToBase64")
            doc.addImage("", 'png', data.settings.margin.left, 15, 10, 10);
        } */

        doc.setFontStyle("bold"); 
        doc.text("Federacion Salvadoreña de Surf", 53, 20); 
        doc.setFontSize(13); 
        doc.text("Resumen Financiero por Atleta", 10, 35);
        doc.setFontStyle("normal"); 
        doc.setFontSize(10);
        doc.text("Transacciones Registradas Desde: ", 10, 45);
        doc.setFontStyle("bold");          
        doc.text(fechaini, 66, 45);
        doc.setFontStyle("normal"); 
        doc.text(" Hasta: ", 85, 45);
        doc.setFontStyle("bold"); 
        doc.text(fechafin, 97, 45);
       
        doc.setFontStyle("normal");  
        doc.text("Atleta:", 10, 55);
        doc.setFontStyle("bold"); 
        doc.text(atleta, 21, 55);
        doc.setFontStyle("normal");  



      var pageContent = function (data) {
        

        // FOOTER

        var str = "Pagina " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " de " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
    };



// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript




      doc.autoTable(columns, filas, {
          addPageContent: pageContent,
         theme:'striped',
        startY: 60/*, showHeader: 'firstPage'*/
      });
doc.setFontStyle("bold");      
var linea='Total Gastos:                 ($) '+total;
var linea2='Numero de Transacciones:   '+count;
       doc.text(linea, 130, doc.autoTable.previous.finalY + 10);
       doc.text(linea2, 130, doc.autoTable.previous.finalY + 20);
       //doc.text(this.count,  20, doc.autoTable.previous.finalY + 10);


      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }

      doc.save("Resumen_Financiero_Atleta.pdf");
    },

  /*imgToBase64: function imgToBase64(url, callback) {
    console.log("en el conver")
    if (!window.FileReader) {
        callback(null);
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result.replace('text/xml', 'image/png'));
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
} */

  }
};
</script>
