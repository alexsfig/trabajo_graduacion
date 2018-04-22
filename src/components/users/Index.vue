<template>
    <div>
        <section class="content-header">
            <h1>
                Usuarios
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de usuarios</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de usuarios</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">

                            <div class="box-action">
                                <router-link to="/admin/users/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Agregar nuevo
                                </router-link>
                            </div>

                            <div class="table-responsive">

                                <vue-good-table
                                  title="Listado"
                                  :columns="columns"
                                  :rows="users"
                                  :globalSearch="true"
                                  :paginate="true"
                                  styleClass="table table-striped table-condensed">
                                  <template slot="table-row" scope="props">
                                    <td>{{ props.row.usuario }}</td>
                                    <td>{{ props.row.rolId.descripcion}}</td>
                                    <td>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModalPassword=true, retrieveData(props.row.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar Contraseña</button>
                                        <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(props.row.id,  props.row )" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                    </td>
                                  </template>
                                </vue-good-table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <modalUser :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :usuario="usuario"  v-on:openChange="isChange"></modalUser>
            <modalUserPassword :methodSubmit="methodSubmit" :title="'Actualizar Contraseña'" :buttonMsg="'Actualizar'" :openModal="openModalPassword" :usuario="usuario" v-on:openChange="isChange"></modalUserPassword>


        </section>
    </div>
</template>

<script>
    import usersController from '../../controllers/users.js'
    import ModalUser from './subcomponents/ModalUser'
    import ModalUserPassword from './subcomponents/ModalUserPassword'
    export default {
        name: 'Employee',
        data() {
            return {
                columns: [
                    {
                      label: 'Usuario',
                      field: 'usuario',
                      filterable: true,
                    },
                    {
                      label: 'Rol',
                      field: 'rolId.descripcion',
                     filterable: true,
                    },
                    {
                      label: 'Acciones',
                      field: '',
                      filterable: true,
                    }
                ],
                methodSubmit: 'update',
                buttonMsg: "Actualizar",
                users: [],
                openModal: false,
                openModalPassword: false,
                errMsg:  '',
                success: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                usuario: {},
                rol: ' ',
            }
        },
        components:{
            "modalUser": ModalUser,
            "modalUserPassword": ModalUserPassword
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, user) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del usuario <b>' + user.usuario + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        usersController.delete(context, id, swal)
                    },
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El usuario no se elimino',
                          'error'
                        )
                      }
                    }
                )
            },
            isChange () {
                this.openModal = false
                this.openModalPassword = false
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false
                this.showSuccess = false
            },
            dismissCallback (msg) {
                this.openModal =false
                this.openModalPassword =false
                usersController.index(this)
                this.fetchData()
            },
            fetchData() {
                usersController.index(this)
            },
            retrieveData(id) {
                usersController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>
