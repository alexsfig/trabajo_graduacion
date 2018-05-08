<style>

@import '../assets/bower_components/font-awesome/css/font-awesome.min.css';
@import '../assets/bower_components/Ionicons/css/ionicons.min.css';
@import '../assets/bower_components/bootstrap/css/creative.css';
@import '../assets/bower_components/AdminLTE/AdminLTE.min.css';
@import '../assets/bower_components/AdminLTE/skins/_all-skins.min.css';
.active{
    width: auto;
}
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
body,
html {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Merriweather', 'Helvetica Neue', Arial, sans-serif;
}

hr {
  max-width: 40%;
  border-width: 3px;
  border-color: #F05F40;
}

hr.light {
  border-color: #fff;
}

a {
  color: #F05F40;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

a:hover {
  color: #f05f40;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

.bg-primary {
  background-color: #222d32 !important;
}

.bg-dark {
  background-color: #212529 !important;
}

.bg-white {
  background-color: #FFFFFF !important;
}

.text-faded {
  color: rgba(255, 255, 255, 0.7);
}

section {
  padding: 8rem 0;
}

.section-heading {
  margin-top: 0;
}

::-moz-selection {
  color: #fff;
  background: #212529;
  text-shadow: none;
}

::selection {
  color: #fff;
  background: #212529;
  text-shadow: none;
}

img::selection {
  color: #fff;
  background: transparent;
}

img::-moz-selection {
  color: #fff;
  background: transparent;
}

.service-box {
  max-width: 400px;
  margin: auto;
  margin-top: 50px;
}

.portfolio-box {
  position: relative;
  display: block;
  max-width: 650px;
  margin: 0 auto;
}

.portfolio-box .portfolio-box-caption {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  opacity: 0;
  color: #fff;
  background: rgba(240, 95, 64, 0.9);
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

.portfolio-box .portfolio-box-caption .portfolio-box-caption-content {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
}

.portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-category,
.portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-name {
  padding: 0 15px;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

.portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-category {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-name {
  font-size: 18px;
}

.portfolio-box:hover .portfolio-box-caption {
  opacity: 1;
}

.portfolio-box:focus {
  outline: none;
}

@media (min-width: 768px) {
  .portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-category {
    font-size: 16px;
  }
  .portfolio-box .portfolio-box-caption .portfolio-box-caption-content .project-name {
    font-size: 22px;
  }
}

.text-primary {
  color: #F05F40 !important;
}

.btn {
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  border-radius: 300px;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

.btn-xl {
  padding: 1rem 2rem;
}

.btn-primary {
  background-color: #F05F40 !important;
  border-color: #ef5230 !important;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active {
  color: #fff;
  background-color: #ee4b28 !important;
}

.btn-primary:active, .btn-primary:focus {
  box-shadow: 0 0 0 0.2rem rgba(240, 95, 64, 0.5) !important;
}

.fa-3x{
    font-size: 3em !important;
}
.fa-2x{
    font-size: 2em !important;
}

.table-bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>tbody>tr>td, .table-bordered>tfoot>tr>td{
    border: 0px !important;
}
.table > tbody > tr > td{
    vertical-align: middle !important;
}
.td-color{
    display: inline-block;
    height: 20px;
    float: unset;
    width: 20px;
    padding: 0 0;
}
@media only screen and (min-width:960px){
    .td-color{
        float: left;

    }
}

.td-text{
    display: inline-block;
    padding: 0 20px;
}
.td-nota{
    width: 100px;
}
.custom-img{
    width: 60px;
}


.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: #f05e40;
  text-align: center;
  height: 2.5em;
  max-width: 80%;
}
.hr-text::before {
    content: '';
    background: linear-gradient(to right, transparent, #f05e40 , transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
}
.hr-text::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: #f05e40;
    padding: 0 .5em;
    line-height: 1.5em;
    background-color: #fcfcfa;
    font-size: 22px;
    text-transform: uppercase;
}

.hr-title {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: #0072b5;
  text-align: center;
  height: 3.5em;
  opacity: .8;
  max-width: 60%
}
.hr-title::before {
    content: '';
    background: linear-gradient(to right, transparent, #0072b5, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 2px;
}
.hr-title::after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: #0072b5;
    padding: 0 .5em;
    line-height: 1.5em;
    background-color: #fcfcfa;
    font-size: 32px;
    text-transform: uppercase;
}
.profile-img {
    margin: 0 auto;

}
.logros i.fa.fa-star {
    color: #f05e3f;
}

.about-atl strong{
    color: #f05e40;
}

.about-atl .text-muted{
    font-weight: bold;
    color: black !important;
}


.nav.navbar-nav a{
    color: white;
}

@media (min-width: 992px){
    .navbar-nav>li.nav-item>a.nav-link, #mainNav .navbar-nav>li.nav-item>a.nav-link:focus {
        color: rgba(255,255,255,0.7);
    }
}
#mainNav .navbar-brand, #mainNav .navbar-brand:focus, #mainNav .navbar-brand:hover{
    color: white;
}

.fc-button-group{
    display: none;
}

.notice-img img{
    margin: auto;
    width: 60px;
}
.notice-img-full img{
    margin: auto;
}
@media (min-width: 768px) {
  .col-container {
    display: flex;
    flex-wrap: wrap;
  }
}
.service-box {
    margin-top: 10px;
}
.pt{
    padding-top: 100px !important;
}

.footer {
    height: 20px;
    background-color: #f05e40;
}
.main-footer1 {
    background: #fff;
    padding: 15px;
    color: #444;
    border-top: 1px solid #d2d6de;
    width: 100%;
    -webkit-transition: -webkit-transform .3s ease-in-out,margin .3s ease-in-out;
    -moz-transition: -moz-transform .3s ease-in-out,margin .3s ease-in-out;
    -o-transition: -o-transform .3s ease-in-out,margin .3s ease-in-out;
    transition: transform .3s ease-in-out,margin .3s ease-in-out;
    /* margin-left: 230px; */
    z-index: 820;
}

</style>

<template>

<div id="" class="row">
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
