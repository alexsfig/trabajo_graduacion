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
                circuitos: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false 

            }
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