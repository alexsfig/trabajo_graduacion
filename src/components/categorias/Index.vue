<template>
    <div>
        <section class="content-header">
            <h1>
                Categorias
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Categorias</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Categorias</h3>
                        </div>

                        <div class="box-body">

                            <div class="box-action">
                                <router-link to="/admin/categorias/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Categoria
                                </router-link>
                            </div>

                            <div class="table-responsive">

                                <vue-good-table
                                  title="Categorias"
                                  :columns="columns"
                                  :rows="categorias"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.nombreCategoria }}</td>
                                    <td>{{ props.row.edadMin}} años</td>
                                    <td>{{ props.row.edadMax}} años</td>
                                    <td>{{ props.row.descripcionCategoria}}</td>
                                    <td>{{
                                      (props.row.sexo == 'F') ? 'Femenino' : ((props.row.sexo == 'M') ? 'Masculino' : 'Mixto')
                                    }}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>

                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id, categoria, props.row.nombreCategoria)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <modalCategorias :methodSubmit="methodSubmit"  :title="'Actualizar Categoria'" :buttonMsg="'Actualizar'" :openModal="openModal" :categoria="categoria" v-on:openChange="isChange"></modalCategorias>



        </section>
    </div>
</template>

<script>
    import categoriasController from '../../controllers/categorias.js'

    import ModalCategorias from './subcomponents/ModalCategorias'

    export default {
        name: 'categorias',
        data() {
            return {
                columns: [
                    {
                      label: 'Nombre Categoria',
                      field: 'nombreCategoria',
                      filterable: true,
                    },
                    {
                      label: 'Edad Minima',
                      field: 'edadMin',
                     filterable: true,
                    },
                    {
                      label: 'Edad Maxima',
                      field: 'edadMax',
                      filterable: true,
                    },
                    {
                      label: 'Descripción',
                      field: 'descripcionCategoria',
                      filterable: true,
                    },
                    {
                      label: 'Sexo',
                      field: this.fnSexo,
                      filterable: true,
                    },
                     {
                      label: 'Acción',
                      field: '',
                      filterable: true,
                    }
                ],
                methodSubmit: 'update',
                buttonMsg: "Actualizar",

                openModal: false,

                errMsg:  '',
                success: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                categorias: [],
                categoria: {}



            }
        },
        components:{
            "modalCategorias": ModalCategorias

        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {

            fnSexo(rowObj)
            {
              let sexo;
              if(rowObj.sexo == 'F')
                return 'Femenino'
              else if(rowObj.sexo == 'M')
                return 'Masculino'
              else if (rowObj.sexo == 'X')
                return 'Mixto'


            },


            clickHandler(id, categoria, nombre) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la Categoria <b>' + nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        categoriasController.delete(context, id, swal)
                    },
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Categoria no se elimino',
                          'error'
                        )
                      }
                    }
                )
            },
            isChange () {
                this.openModal = false
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false
                this.showSuccess = false
            },
            dismissCallback (msg) {
                this.openModal =false
                categoriasController.index(this)
                this.fetchData()
            },
            fetchData() {
                categoriasController.index(this)
            },
            retrieveData(id) {
                categoriasController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>
