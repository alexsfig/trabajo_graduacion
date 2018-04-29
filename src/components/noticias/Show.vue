<template>
    <div>
        <section class="content-header">
            <h1>{{noticia.nombre}}</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link  to="/admin/users">Employees</router-link></li>
                <li class="active">Add Employees</li>
            </ol>
        </section>
        <section  class="content">
            <div class="row">
                <div class="col-xs-12">
               
                    <div class="box">
                        <div class="box-body">
                            <div class="box box-primary">
                                <div class="box-body box-profile">
                                       <div class="col-xs-12 col-sm-6">
                    <img :src="getImg(noticia.id)" alt="User Image" class="img-thumbnail"  /></div>

          
    <div class="col-xs-12 col-sm-6">
        <p ALIGN="justify" style="white-space: pre-line">           {{noticia.descripcion}}
          </p>

  </div>          
 

              
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

       import noticiasController from '../../controllers/noticias.js'
       const BASE_URL = process.env.BASE_URL;
    /*import ModalUser from './subcomponents/ModalUser' */
    export default {
        name: 'Employee',
        data() {
            return {
                employee:{},
                methodSubmit: 'update',
                open1: false,
                showAlert: false,
                showSuccess: false,
                noticia:'',
                id:''
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },
        components:{
           /* "modalUser": ModalUser */
        },
        methods: {
               getImg(img) {
            
            return BASE_URL+"upload/files/"+img+".png"
        },
            isChange () {
                this.open1 = false
                this.fetchData()
            },
            
            fetchData() {
       this.id = this.$route.params.id;
                noticiasController.retrieve(this,this.id)
            }
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>