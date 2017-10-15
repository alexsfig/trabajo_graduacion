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
                                <table class="table table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Rol</th>
                                            <th>Accion</th>
                                        </tr>
                                        <tr v-for="user in users">
                                            <td>{{ user.usuario }} {{ user.usuario }}</td>
                                            <td>{{ user.rolId.descripcion}}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary" @click="open1=true, retrieveData(user.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actuzlizar</button>
                                                <!-- <modalUser title="Edit Employee" v-bind:id="user.id" buttonMsg="Update" methodSubmit="update"></modalUser> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalUser :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :open1="open1" :usuario="usuario" :rol="rol" :id="id" v-on:openChange="isChange"></modalUser>
            

        </section>
    </div>
</template>

<script>
    import users from '../../controllers/users.js'
    import ModalUser from './subcomponents/ModalUser'
    export default {
        name: 'Employee',
        data() {
            return {
                methodSubmit: 'update',
                buttonMsg: "Actualizar",
                users:{},   
                open1: false,
                errMsg:  '',
                success: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                usuario: ' ',
                rol: ' ',
            }
        },
        components:{
            "modalUser": ModalUser
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            isChange () {
                this.open1 = false
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false 
                this.showSuccess = false 
            },
            dismissCallback (msg) {
                users.index(this)
            },
            fetchData() {
                users.index(this)
            },
            retrieveData(id) {
                users.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>