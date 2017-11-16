<template>
    <div>
        <section class="content-header">
            <h1>
                Noticias
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Noticias</li>
            </ol>
        </section>
        <section class="content" >
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Manejo de Noticias</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            
                            <div class="box-action">
                                <router-link to="/admin/noticias/create" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Noticia
                                </router-link>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Descripcion</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin</th>
                                            <th>Publicada Por:</th>
                                          <!--   <th>Accion</th -->
                                     </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="noticias in noticias">
                                            <td>{{ noticias.nombre }}</td>
                                            <td>{{ noticias.descripcion }}</td>
                                             <td>{{ noticias.fechaInicio }}</td>
                                              <td>{{ noticias.fechaFin }}</td>
                                             <td>{{ noticias.usuarioId.usuario }}</td>
                                          <td>
                                                <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModal=true, retrieveData(noticias.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</button>
                                               <!-- <button type="button" class="margin btn btn-sm btn-flat btn-primary" @click="openModalPassword=true, retrieveData(user.id)" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar Contraseña</button> -->
                                                <button type="button" class="margin btn btn-sm btn-flat btn-danger" @click="clickHandler(noticias.id, noticias)" ><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                                            </td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <modalNoticias :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :noticias="noticias" v-on:openChange="isChange"></modalNoticias>
         <!--   <modalUserPassword :methodSubmit="methodSubmit" :title="'Actualizar Contraseña'" :buttonMsg="'Actualizar'" :openModal="openModalPassword" :usuario="usuario" v-on:openChange="isChange"></modalUserPassword> -->
            

        </section>
    </div>
</template>

<script>
    import noticiasController from '../../controllers/noticias.js'
    /*import ModalUser from './subcomponents/ModalUser' */
    import ModalNoticias from './subcomponents/ModalNoticias'
   /* import ModalUserPassword from './subcomponents/ModalUserPassword' */
    export default {
        name: 'noticias',
        data() {
            return {
                methodSubmit: 'update',
                buttonMsg: "Actualizar",
                /*users:{},  */ 
                openModal: false,
                /*openModalPassword: false, */
                errMsg:  '',
                success: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                noticias: {}
                /*usuario: ' ' */

            
            }
        },
        components:{
            "modalNoticias": ModalNoticias
            /*"modalUserPassword": ModalUserPassword */
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            clickHandler(id, noticias) {
                let swal = this.$swal
                let context = this
                swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion de la Noticia <b>' + noticias.nombre + '</b>',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(
                    function() {
                        noticiasController.delete(context, id, swal)
                    }, 
                    function(dismiss) {
                      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'La Noticia no se elimino',
                          'error'
                        )
                      }
                    }
                )
            },
            isChange () {
                this.openModal = false
                /*this.openModalPassword = false */
                this.fetchData()
            },
            showCallback () {
                this.showAlert = false 
                this.showSuccess = false 
            },
            dismissCallback (msg) {
                this.openModal =false
                /*this.openModalPassword =false */
                noticiasController.index(this)
                this.fetchData()
            },
            fetchData() {
                noticiasController.index(this)
            },
            retrieveData(id) {
                noticiasController.retrieve(this, id)
            },
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>