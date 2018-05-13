<template>
    <div>
        <section class="content-header">
            <h1>Clubes</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li>Manejo de Clubes </li>
            </ol>
        </section>
        <section class="content" >

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
                            <h3 class="box-title">Manejo de clubes </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">
                                <router-link to="/admin/clubs/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nuevo
                                </router-link>
                            </div>
                            <vue-good-table :columns="columns" :rows="clubs" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props">
<td>{{ props.row.nombre }}</td>
<td>{{ props.row.fundacion }}</td>
<td>{{ props.row.correo }}</td>
<td>{{ props.row.representante }}</td>
<td>{{ props.row.celular }}</td>
<td>{{ props.row.telefonoFijo }}</td>
<td>{{ props.row.playaId.nombre }}</td>
<td>{{ props.row.entrenadorId.nombre }}</td> 
<td>{{ props.row.direccion }}</td>
<td style="text-align:right;">{{ props.row.atletas }}</td>         

                          <td class="nowrap">
 <router-link :to="{ name: 'clubsEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteClub(props.row.id, props.row.nombre)"><i aria-hidden="true" 
                                        class="fa fa-trash-o"></i> Eliminar</button>

                                          <button type="button" class="margin btn btn-flat btn-sm bg-navy margin" 
                                        @click="agregarAtletas(props.row.id, props.row)"><i aria-hidden="true" 
                                        class="fa fa-male"></i> Agregar Atletas</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>
                    </div>
                    </div>
            </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
  
    import clubsController from '../../controllers/clubes.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'Clubs',
        data() {
            return {
                clubs: [],
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
 columns: [ 
 {
                        label: "Nombre",
                        field: "nombre",
                    }, {
                        label: "Fundación",
                        field: "fundacion",
                    }, {
                        label: "Correo Electronico",
                        field: "correo",
                    }, {
                        label: "Representante",
                        field: "representante",
                    }, {                        
                        label: "Celular",
                        field: "celular",
                    }, {
                        label: "Telefono Fijo",
                        field: "telefonoFijo",
                    }, {
                        label: "Playa",
                        field: "playaId.nombre",
                    }, {
                        label: "Entrenador",
                        field: "entrenadorId.nombre",
                    },{
                        label: "Dirección",
                        field: "direccion",
                    }
                    ,
                    {
                        label: "Atletas",
                        field: "atletas",
                        type: "number"
                    },{
                        label: "Acciones",
                        field: "",
                    }]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
             agregarAtletas(id, club) {
            clubsController.retrieve(this, id)
            this.$router.push({
                name: 'clubesAgregarAtleta',
                params: {
                    id: id,
                    club: club
                }
            });
            },
            fetchData(){
                clubsController.index(this)
            },
            deleteClub(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del club <b>&laquo;' + nombre + '&raquo</b><br>y toda la informacion en relacion al mismo ya que no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    clubsController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La club no se elimino',
                          'error'
                        )
                    }
                })
            },
        }
    }
</script>