<template>
    <div class="wrapper-navbar">
        
        <!-- Logo -->
        <router-link to="" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>INS</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg">INSENSE</span>
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
                            <img src="../../assets/images/user2-160x160.jpg" class="user-image" alt="User Image">
                            <span class="hidden-xs">Alexander Pierce</span>
                        </router-link>
                    
                        <ul class="dropdown-menu">
                            
                            <!-- User image -->
                            <li class="user-header">
                                <img src="../../assets/images/user2-160x160.jpg" class="img-circle" alt="User Image">

                                <p>
                                Alexander Pierce - Web Developer
                                <small>Member since Nov. 2012</small>
                                </p>
                            </li>
                    
                            <!-- Menu Body -->
                            <li class="user-body">
                                <div class="row">
                                    <div class="col-xs-4 text-center">
                                        <router-link to="">Followers</router-link>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <router-link to="">Sales</router-link>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <router-link to="">Friends</router-link>
                                    </div>
                                </div>
                                <!-- /.row -->
                            </li>

                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <router-link to="" class="btn btn-default btn-flat">Profile</router-link>
                                </div>
                                <div class="pull-right">
                                    <button @click="signOut" class="btn btn-default btn-flat">Sing Out</button>
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
    methods: {
        signOut() {
            auth.signOut(this)
        }
    }
};
</script>