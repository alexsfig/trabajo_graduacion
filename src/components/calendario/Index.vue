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

           aqui: {{events[1]}

            <div id="app">
        <calendar
                :first-day="1"
                :all-events="events"
                :canAddEvent="false"
                :canDeleteEvent="false"
                @eventAdded="eventAdded"
                @eventDeleted="eventDeleted"
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
        methods:{
            eventAdded(event) {
                this.events.push(event);
            },
            eventDeleted(event) {
                this.events.splice(this.events.indexOf(event), 1);
            },
            fetchData(){
                fechasController.index(this)
                circuitosController.index(this)
            }
            
        },
         mounted() {
            let me = this;
            this.fechas.forEach(function(item) {
                        me.events.push(item.id);
                        me.events.push(item.nombre);
                        me.events.push(item.fecha);
                        me.events.push(item.playaId.nombre);
                         });

            /*          console.log(array);
                setTimeout(function () {
               me.events = [ // you can make ajax call here
                    {
                     id:1,
                        title:'Event 1',
                        description: 'Dummy Desc',
                        color: 'card-danger card-inverse',
                        date: new Date() 

                     }
                    
                ];
            }, 1000); */
        }
    }
</script>