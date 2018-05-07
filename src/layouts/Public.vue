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
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Project name</a>
                </div>

                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header">Nav header</li>
                                <li><a href="#">Separated link</a></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </nav>
    </div>

    <header class="masthead text-center text-white d-flex">
        <div class="container my-auto">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <h1 class="text-uppercase">
                        <strong>Swell</strong>
                    </h1>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h1 class="text-uppercase">
                        <strong>Federacion Salvadoreña de SURF</strong>
                        </h1>
                    <p class="text-faded mb-5">
                        <img class="img-responsive" align="right" src="../assets/images/logo-dash.png" alt="">
                        <img class="img-responsive"  align="left" src="../assets/images/logo.png" alt="">
                    </p>
                </div>
            </div>
        </div>
    </header>
    <section class="bg-primary" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading text-white">SWELL!</h2>
                    <hr class="light my-4">
                    <p class="text-faded mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!</p>
                    <a class="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a>
                </div>
            </div>
        </div>
    </section>

    <section id="services">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">At Your Service</h2>
                    <hr class="my-4">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box mt-5 mx-auto">
                        <i class="fa fa-4x fa-star-o text-primary mb-3 sr-icons"></i>
                        <h3 class="mb-3">Ranking de atletas</h3>
                        <p class="text-muted mb-0">Our templates are updated regularly so they don't break.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box mt-5 mx-auto">
                        <i class="fa fa-4x fa-paper-plane text-primary mb-3 sr-icons"></i>
                        <h3 class="mb-3">Fechas</h3>
                        <p class="text-muted mb-0">You can use this theme as is, or you can make changes!</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box mt-5 mx-auto">
                        <i class="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons"></i>
                        <h3 class="mb-3">Noticias</h3>
                        <p class="text-muted mb-0">We update dependencies to keep things fresh.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box mt-5 mx-auto">
                        <i class="fa fa-4x fa-heart text-primary mb-3 sr-icons"></i>
                        <h3 class="mb-3">Informacion dela Federacion</h3>
                        <p class="text-muted mb-0">You have to make your websites with love these days!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
