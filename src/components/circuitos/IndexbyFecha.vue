<template>
<div>
    <section class="content-header">
        <h1>Circuitos</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
            <li>Manejo de Circuitos </li>
        </ol>
    </section>
    <section class="content">
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
                        <hr class="hr-title" :data-content="'Circuitos de la Fecha: ' + fecha.nombre">
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="box-action">
                        </div>
                        <vue-good-table :columns="columns" :rows="circuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                            <template slot="table-row" scope="props">
                                <td>{{ props.row.nombre }}</td>
                                <td>{{ props.row.descripcion }}</td>
                                <td>{{ props.row.categoriaId.nombreCategoria }}</td>
                                <td>{{ props.row.numJueces+' ( '+props.row.numJuecesEval+')'}} </td>
                                <td>{{ props.row.numAtletas}} </td>
                                <td>{{ props.row.estado }}</td>
                                <td class="nowrap">
                                    <router-link :to="{ name: 'circuitosEditbyfecha', params: { idcircuito: props.row.id, idfecha: props.row.fechaId.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Actualizar</button>
                                    </router-link>
                                    <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteCircuito(props.row.id, props.row.nombre)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>
                                    <button type="button" v-if="props.row.estado=='Creado'" class="margin btn btn-flat btn-sm bg-navy margin" @click="agregarAtletas(props.row.id, props.row)"><i aria-hidden="true" class="fa fa-male"></i> Agregar Atletas</button>

                                    <button type="button" v-if="props.row.estado=='Creado'" class="margin btn btn-flat btn-sm bg-navy margin" @click="agregarJueces(props.row.id, props.row)"><i aria-hidden="true" class="fa fa-gavel"></i> Agregar Jueces</button>

                                    <button type="button" v-if="props.row.numJuecesEval>3?props.row.numAtletas>3?true:false:false" class="margin btn btn-flat btn-sm btn-success" @click="llamaRonda(props.row.id, props.row)"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Gestionar Circuito</button>
                                </td>
                            </template>
                        </vue-good-table>
                        <div class="box-body">
                            <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                <i class="fa fa-arrow-circle-left"></i> Regresar
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
export default {
    name: 'CircuitosByFecha',
    data() {
        return {
            fecha: [],
            circuitos: [],
            showAlert: false,
            showSuccess: false,
            methodSubmit: 'editar',
            openModal: false,
            columns: [{
                    label: "Nombre",
                    field: "nombre",
                }, {
                    label: "Descripción",
                    field: "descripcion",
                }, {
                    label: "Categoria",
                    field: "categoriaId.nombre",
                }, {
                    label: "Jueces(Evaluadores)",
                    field: "categoriaId.nombre",
                }, {
                    label: "Atletas",
                    field: "categoriaId.nombre",
                },

                {
                    label: "Estado",
                    field: "estado",
                }, {
                    label: 'Acciones',
                    field: '',
                    filterable: true,
                }
            ]
        }
    },
    created() {
        this.fetchData()
    },
    methods: {

        agregarAtletas(id, circuito) {
                circuitosController.retrieve(this, id)
                this.$router.push({
                    name: 'circuitosAgregarAtleta',
                    params: {
                        id: id,
                        circuito: circuito
                    }
                });
            },


            agregarJueces(id, circuito) {
                circuitosController.retrieve(this, id)
                this.$router.push({
                    name: 'circuitosAgregarJuez',
                    params: {
                        id: id,
                        circuito: circuito
                    }
                });
            },

            llamaRonda(id, circuito) {
                circuitosController.retrieve(this, id)
                this.$router.push({
                    name: 'rondaIndex',
                    params: {
                        id: id,
                        circuito: circuito
                    }
                });
            },

            fetchData() {
                circuitosController.byFecha(this, this.$route.params.id)
                fechasController.retrieve(this, this.$route.params.id)
            },
            deleteCircuito(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del circuito <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    circuitosController.delete(context, id, swal);
                }, function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                            'Cancelado',
                            'La circuito no se elimino',
                            'error'
                        )
                    }
                })
            },
            volver() {
                console.log("entre")
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')


            }
    }
}

</script>
