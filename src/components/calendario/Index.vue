<template>
    <div>
        <section class="content-header">
            <h1></h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Calendario </li>
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

           aqui: {{fechas}}

            <div id="app">
        <calendar
                :first-day="1"
                :all-events="events"
                :canAddEvent="false"
                :canDeleteEvent="false"

              
        ></calendar>
    </div>

           
          
        </section>
    </div>
</template>
<script>
    import circuitosController from '../../controllers/circuitos.js';
    import fechasController from '../../controllers/fechas.js';
    import {Calendar} from 'vue-bootstrap4-calendar';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Calendario',
       
        data() {
            return {
                fechas: [],
                events: [],
                 circuitos: [],
                formaPagos: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false 

            }
        },

        components: {
            Calendar
        },

        created(){
            this.fetchData()
        },
         watch:{

           "fechas":"mounted"
        },
        methods:{
          
            fetchData(){
                   console.log("entssre") 
                fechasController.index(this)
                circuitosController.index(this)
            },
            
         mounted() {
              console.log("entrell") 
          
            this.fechas.forEach(element => {
                    console.log(element.fecha)
    
                  console.log("entre"+"*",element.fecha.substring(0,4),element.fecha.substring(5,7),element.fecha.substring(8,10))
                  this.events.push(
                            {id:element.id,
                            title:element.nombre,
                            description: 'Competencia ',
                            color: 'card-danger card-inverse',
                             date:new Date(element.fecha.substring(0,4),element.fecha.substring(5,7),element.fecha.substring(8,10))});
            });
             
                        /*
                            
                            
                            });});*/

         
        }
            
        }
    }
</script>
