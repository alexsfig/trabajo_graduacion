<template>
<div>
    <section class="bg-primary pt" id="about">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-left">
                    <div @click="volver()" class="btn btn-primary2 margin">
                        <i class="fa fa-arrow-circle-left"></i> Regresar
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <div class="service-box mt-5 mx-auto">
                        <i class="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons"></i>
                        <hr >
                        <h3 class="mb-3">Noticias</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white">
        <div class="row">
          
            <div class="col-md-10 col-md-offset-1">
                <div class="col-xs-12 col-sm-6 notice-img-full " style="margin-top: 25px;">
                    <img :src="getImg(noticia.id)" alt="User Image" class="img-responsive" />
                </div>
                <div class="col-xs-12 col-sm-6">
                    
             <h2 align="center">{{noticia.nombre}}</h2>
        
                    <p align="justify" style="white-space: pre-line">
                        {{noticia.descripcion}}
                    </p>

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
            employee: {},
            methodSubmit: 'update',
            open1: false,
            showAlert: false,
            showSuccess: false,
            noticia: '',
            id: ''
        }
    },

    created() {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },
    components: {
        /* "modalUser": ModalUser */
    },
    methods: {
        getImg(img) {
            return BASE_URL + "upload/files/noticia/" + img + ".png"
        },
        isChange() {
            this.open1 = false
            this.fetchData()
        },

        fetchData() {
            this.id = this.$route.params.id;
            noticiasController.retrieve(this, this.id)
        },
        volver() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }

}

</script>
