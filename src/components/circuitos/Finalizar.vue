<template>
    <div>
        <section class="content-header">
            <h1>Resultados de las Rondas</h1>

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
                            <h3 class="box-title">Puntuaciones finales</h3>
                        </div>
                              <button @click="asignar()"  v-if="circuito.estado=='Calificado'" class="btn btn-flat btn-sm btn-primary"><i aria-hidden="true" 
                                        class="fa fa-check-circle"></i> Asignar Puntuaciones </button> 
                        <!-- /.box-header -->
                        <div class="box-body">
    
                            </div>
                            <div class="box-body">

<!--<iframe width="600" height="450" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/place?q=san%20salvador%20&key=AIzaSyCNn7bkHEwBaqj_G343JmzQmGUrSCqqT0M" allowfullscreen></iframe>-->
                            <vue-good-table :columns="columns" :rows="atletasranking" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">

<td>{{ props.row.lugar }}</td>
<td>{{ props.row.atletasCircuitoId.atletaId.personaId.nombre }},{{ props.row.atletasCircuitoId.atletaId.personaId.apellido }}</td>
<td>{{ props.row.puntos }}</td>
<td v-if="props.row.monto<=0" style="color:#FF0000"><b>{{ roundToTwo(props.row.monto) }}</b></td>
<!--<td v-if="props.row.monto>0" style="color:green"><b>{{roundToTwo( props.row.monto) }}</b></td>
                                  <td class="nowrap">
 <router-link :to="{ name: 'cuentasEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteCuenta(props.row.id, props.row.nombre)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>
                                
                                    </td>-->
                                  </template>
                            </vue-good-table>

                        </div>

                        <div class="box-body">
                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div></div>
                    </div>
                    </div>
            </div>
         
 
        
        </section>
    </div>
</template>
<script>
  
    import circuitoController from '../../controllers/circuitos.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Cuentas',
        data() {
            return {
            
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
                circuito:'',
                atletasranking:[],
                id:'',
 columns: [ 
 {
                        label: "Lugar",
                        field: "nombre",
                    }, {
                        label: "Atleta",
                        field: "descripcion",
                    }, {
                        label: "Puntos",
                        field: "monto",
                    }
                    ]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                  this.id = this.$route.params.id;
                circuitoController.byRanking(this,this.id)

                 circuitoController.retrieve(this,this.id)
            },

            asignar(){


              circuitoController.finalizar(this,this.id);
            },
                volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
            
        }
    }
</script>