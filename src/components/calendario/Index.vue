<style>
#calendario {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
a.fc-day-grid-event{
    background-color: #3e9dbd !important;
    border-color: #31b6e4 !important;
    height: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
}

</style>
<template>
<div>
    <section class="content-header">
        <h1></h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
            <li>Calendario </li>
        </ol>
    </section>
    <section class="content-header">
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
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

                <div class="box">
                    <div class="box-body">
                        <div class="col-xs-12">
                            <hr class="hr-title" data-content="Calendario de Actividades">
                            <div id="calendario">
                                <full-calendar :config="config" :events="events" eventClick="eventClick" />
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

import circuitosController from "../../controllers/circuitos.js";
import fechasController from "../../controllers/fechas.js";
import vSelect from "vue-select";
import moment from "moment";
import {
    FullCalendar
}
from "vue-full-calendar";
import {
    Common
}
from "../../common_class/http";
export default {
    name: "Calendario",
    data() {
        return {
            fechas: [],
            circuitos: [],
            showAlert: false,
            showSuccess: false,
            methodSubmit: "editar",
            openModal: false,
            events: [],
            config: {
                   locale: 'es',
                defaultView: "month",
                eventRender: function(event, element) {
                    console.log(event);
                }
            }
        };
    },
    components: {
        FullCalendar
    },
    created() {
        this.fetchData();
    },
    watch: {
        fechas: "mounted"
    },
    methods: {
        fetchData() {
                console.log("entssre");
                fechasController.index(this);
                circuitosController.index(this);
            },
            eventClick(event) {
                console.log(event);


            },
            mounted() {
                console.log("entrell");

                this.fechas.forEach(element => {
                    console.log(element.fecha);

                    console.log(
                        "entre" + "*",
                        element.fecha.substring(0, 4),
                        element.fecha.substring(5, 7),
                        element.fecha.substring(8, 10)
                    );
                    this.events.push({
                        title: element.nombre,
                        start: moment(
                            new Date(
                                element.fecha.substring(0, 4),
                                element.fecha.substring(5, 7),
                                element.fecha.substring(8, 10)
                            )
                        ),
                        end: moment(
                            new Date(
                                element.fecha.substring(0, 4),
                                element.fecha.substring(5, 7),
                                element.fecha.substring(8, 10)
                            )
                        ).add(1, "d"),
                        // description: 'Competencia ',
                        color: "red",
                        url: "/admin/circuitofecha/" + element.id


                        // date:new Date(element.fecha.substring(0,4),element.fecha.substring(5,7),element.fecha.substring(8,10))});
                    });
                });
            }
    }
};

</script>
