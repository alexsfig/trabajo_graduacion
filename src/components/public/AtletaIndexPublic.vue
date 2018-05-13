<template>
<div>
    <section class="bg-primary pt" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <div class="col-lg-12">
                        <img class="img-responsive" align="right" src="../../assets/images/logo-dash.png" alt="">
                        <img class="img-responsive" align="left" src="../../assets/images/logo.png" alt="">
                    </div>
                    <h2 class="section-heading text-white">SWELL!</h2>
                    <hr class="my-4">
                    <p class="text-faded mb-4">
                        <i class="fa fa-trophy fa-2x"></i> Ranking de ATLETAS
                        <br>
                        Filtra por categoria para poder ver la informacion de tu atleta favorito!
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white" id="ranking">
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="box-body">
                        <hr class="hr-title" :data-content="catSelect.nombreCategoria">
                        <v-select :debounce="250" :options="categorias" v-model="catSelect" placeholder="Seleccione una categoria" label="nombreCategoria">
                        </v-select>
                        <br/>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Pos</th>
                                        <th>Nombre</th>
                                        <th v-for="(elem, key) in ranking[0].puntuaciones" :key="elem.key"> Fecha {{key + 1 }}</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="r in ranking">
                                        <td style="">
                                            <router-link :to="{ name: 'AtletasShow', params: { id: r.atleta }}"><img class="custom-img img-responsive img-circle" v-bind:src="getImg(r.atleta)" alt="User profile picture" /></router-link>
                                        </td>
                                        <td style="color:navy"><b>#{{r.posicion}}</b></td>
                                        <td>
                                            {{r.nombre}}s
                                            <router-link :to="{ name: 'AtletasShowPublic', params: { id: r.atleta }}" class="pull-right">
                                                <i class="fa fa-bookmark" ></i>
                                            </router-link>
                                        </td>
                                        <td class="text-center td-nota" v-for="(value, key) in r.puntuaciones" :title="value.puntuacion+' Puntos '  +(value.fecha==null?'':value.fecha)" >
                                            <div class="td-color" :style="{background:getColor( value.lugar==0?'--':value.lugar, key )}">&nbsp;</div>
                                            <div class="td-text">
                                                <b>{{ value.lugar == '--' ? '0' : value.lugar}}</b>
                                            </div>
                                        </td>
                                        <td style="color:navy;text-align: center; margin: 0 auto;  text-align: left;">{{r.puntos}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-secondary">

    </section>
</div>

</template>

<script>

import atletasController from '../../controllers/atletas.js'
import vSelect from "vue-select";
import rankingController from "../../controllers/ranking.js";
import categoriasController from "../../controllers/categorias.js";

const BASE_URL = process.env.BASE_URL;
//const BASE_URL = "http://192.168.1.96:8080/";
export default {
    name: 'atletas',
    data() {
        return {
            categorias: [],
            ranking: [
                { posiciones: []}
            ],
            catSelect: '',
            atletas: [],
            atleta: {}



        }
    },
    components: {
        vSelect,
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData',
        catSelect: "changeCat",
        categorias: "setDefault",
    },
    methods: {
        changeCat() {
            if (this.catSelect)
                rankingController.byCategoria(this, this.catSelect.id)

        },
        setDefault() {

            if (this.categorias.length > 0) {

                this.catSelect = this.categorias[0];

            }
        },
        getImg(img) {

            return BASE_URL + "upload/files/" + img + ".png"
        },
        clickHandler(id, atleta, nombre) {
            let swal = this.$swal
            let context = this
            swal({
                title: 'Estas Seguro?',
                html: 'No podras recuperar la informacion del atleta <b>' + nombre + '</b>',
                type: 'error',
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Mantener'
            }).then(
                function() {
                    atletasController.delete(context, id, swal)
                },
                function(dismiss) {
                    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                    if (dismiss === 'cancel') {
                        swal(
                            'Cancelado',
                            'El Atleta no se elimino',
                            'error'
                        )
                    }
                }
            )
        },
        isChange() {
            this.openModal = false
            this.fetchData()
        },
        showCallback() {
            this.showAlert = false
            this.showSuccess = false
        },
        dismissCallback(msg) {
            this.openModal = false
            atletasController.index(this)
            this.fetchData()
        },
        fetchData() {
            categoriasController.index(this);
            atletasController.index(this)
        },
        retrieveData(id, atleta) {
            atletasController.retrieve(this, id)
            this.$router.push({
                name: 'AtletasEdit',
                params: {
                    id: id,
                    atleta: atleta
                }
            });
        },
        profile(id) {
            this.$router.push({
                name: 'AtletasShowPublic',
                params: {
                    id: id
                }
            });

        },

        _calculateAge(birthday) {
            var today = new Date();
            var birthDate = new Date(birthday);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        getColor(value, key){
            var puntos = []
            for (let variable of this.ranking) {
                if (puntos.indexOf(variable.puntuaciones[key].lugar) == -1) {
                    puntos.push(variable.puntuaciones[key].lugar)
                }
            }
            if (value == '--') {
                var value2 = 1;
            }
            else{
                var value2 = value/(puntos.length+3);
            }
            var hue=((1-value2)*120).toString(10);
            return ["hsl(",hue,", 100%, 70%)"].join("");
        }
    }

}

</script>
