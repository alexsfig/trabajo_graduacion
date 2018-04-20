<template>
    <div>
        <section class="content-header">
            <h1></h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Calendario </li>
            </ol>
        </section>

         <section class="content-header">
            
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
                  
                   

            
                   <div class="box">
                        

                        <div class="box-body">

                        <div class="col-xs-12">

   <div id="calendario">
    <full-calendar :config="config" :events="events"/>
  </div>

  </div>
    </div>
    </div>
    </div>
    </div>


           
        </section>    
    </div>
</template>
<script>
    import circuitosController from '../../controllers/circuitos.js';
    import fechasController from '../../controllers/fechas.js';
    import vSelect from "vue-select"
    import moment from "moment"
    import { FullCalendar } from 'vue-full-calendar'

    export default {
        name: 'Calendario',
        data() {
            return {
                fechas: [],
                circuitos: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,



                events: [
                {
                    title: 'test',
                    allDay: true,
                    start: moment(),
                    end: moment().add(1, 'd'),
                },
                {
                    title: 'another test',
                    start: moment().add(2,'d'),
                    end: moment().add(2, 'd').add(2, 'h'),
                },
            ],
            config: {
        defaultView: 'month',
                eventRender: function(event, element) {
            console.log(event)
            }
      }

            }
        },

        components : {
 
    FullCalendar
  
  },

        created(){
            this.fetchData()
        },
        methods:{
           
            fetchData(){
                fechasController.index(this)
                circuitosController.index(this)
            }
            
        }
        
    }
</script>

<style>
    #calendario {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>