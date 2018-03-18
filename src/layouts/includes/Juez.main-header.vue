<template>
    <div class="wrapper-navbar">

        <!-- Logo -->
        <router-link to="" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>SW</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg">SWELL</span>
        </router-link>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">

            <!-- Sidebar toggle button-->
            <router-link to="" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </router-link>

            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">

                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <router-link to="" class="dropdown-toggle" data-toggle="dropdown">
                            <!-- <img src="../../assets/images/logo3.png" class="user-image" alt="User Image"> -->
                            <span class="hidden-xs">{{usuario.toUpperCase()}} <i class="fa fa-chevron-down"></i></span>

                        </router-link>

                        <ul class="dropdown-menu">

                            <!-- User image -->
                            <li class="user-header">
                                <!-- <img src="../../assets/images/logo4.png" class="img-circle" alt="User Image"> -->
                                <i class="fa fa-user fa-4x"></i>
                                <p> Usuario: {{usuario}}
                                <small>Fesasurf Copyright © 2014-2016 SWELL</small>
                                </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <!-- <div class="pull-left">
                                    <router-link to="" class="btn btn-default btn-flat">Perfil</router-link>
                                </div> -->
                                <div class="pull-right">
                                    <button @click="signOut" class="btn btn-danger  btn-flat">Cerrar Sesión <i class="fa fa-power-off"></i></button>
                                    <!-- <router-link to="" class="btn btn-default btn-flat">Sign out</router-link> -->
                                </div>
                            </li>

                        </ul>
                    </li>

                </ul>
            </div>

        </nav>

    </div>
</template>
<script>
import auth from '../../controllers/authentication.js'

export default {

    computed: {
             usuario() {
                 return localStorage.getItem('usuario');
                      }
                  },


    methods: {
        signOut() {
            auth.signOut(this)
        }
    }
};


</script>
