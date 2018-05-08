<style lang="css">

@import '../assets/bower_components/font-awesome/css/font-awesome.min.css';
@import '../assets/bower_components/Ionicons/css/ionicons.min.css';
@import '../assets/bower_components/bootstrap/css/creative.css';
@import '../assets/bower_components/AdminLTE/AdminLTE.min.css';
@import '../assets/bower_components/AdminLTE/skins/_all-skins.min.css';
.breadcrumb > li {
    width: auto !important
}

.help-block {
    color: #dd4b39 !important;
}

.has-error {
    color: #dd4b39 !important
}

.btn.has-error {
    border-color: #dd4b39 !important
}

.table > tbody > tr > td {
    vertical-align: middle;
}

.margin {
    margin: 5px;
}

</style>

<template>

<div id="">
    <div class="container-fluid">
        <nav id="mainNav" class="navbar navbar-expand-lg navbar-light navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <i class="fa fa-bars"></i>
                    </button>
                    <router-link :to="{ name: 'DashboardRoot2'}" class="navbar-brand" >
                        fesasurf
                    </router-link>
                </div>

                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <router-link :to="{ name: 'DashboardRoot2'}">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'AtletasIndexPublic'}">
                                Ranking
                            </router-link>
                        </li>
                        <li><a href="#contact">Contact</a></li>

                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </nav>
        <router-view/>
        <footer class="main-footer1 navbar-fixed-bottom">
            <div class="container">
                <div class="pull-right hidden-xs">
                    <b>Version</b> 2.0
                </div>
                <strong>Copyright &copy; 2017-2018 <a href="#">SWELL</a>.</strong> All rights reserved.
            </div>

        </footer>
    </div>

</div>

</template>

<script>

export default {
    name: 'app',
    mounted: function() {
        this.resize();
    },
    methods: {
        resize() {
            window.dispatchEvent(new Event('resize'));
        },
    }
}
import '../assets/bower_components/jquery/jquery.min.js';
import '../assets/bower_components/bootstrap/js/bootstrap.min.js';
import '../assets/bower_components/fastclick/fastclick.js';
import '../assets/bower_components/AdminLTE/adminlte.min.js'

</script>
