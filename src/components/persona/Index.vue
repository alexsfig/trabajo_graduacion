<template>
    <div>
        <section class="content-header">
            <h1>Playas</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Playas </li>
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
                            <h3 class="box-title">Management</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            
                            <vue-good-table :columns="columns" :rows="personas" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
                                    <td class="nowrap">{{ props.row.nombre }}</td>
                                    <td>{{ props.row.apellido }}</td>
                                    <td class="nowrap">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary" @click="openModal=true, retrieveData(props.row.id)"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" @click="deleteLocation(props.row.id, props.row.nombre)"><i aria-hidden="true" class="fa fa-trash-o"></i> Eliminar</button>
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>    
                </div>
            </div>  
            <!--<modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
    import users from '../../controllers/users.js'
    import playasController from '../../controllers/playas.js'
    import personaController from '../../controllers/persona.js'
    import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Usuarios',
        data() {
            return {
                personas: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false,
                columns: [
                    {
                        label: "Nombre",
                        field: "nombre",
                    },
                    {
                        label: "Apellido",
                        field: "apellido",
                    },
                    {
                        label: "Action"
                    }
                ]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                personaController.index(this)
            }
        }
    }
</script>