<style>

@import '../assets/bower_components/font-awesome/css/font-awesome.min.css';
@import '../assets/bower_components/bootstrap/css/creative.css';

#mainNav {
  border-bottom: 1px solid rgba(33, 37, 41, 0.1);
  background-color: #f05e40 !important;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

#mainNav .navbar-brand {
  font-weight: 700;
  text-transform: uppercase;
  color: #F05F40;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

#mainNav .navbar-brand:focus, #mainNav .navbar-brand:hover {
  color: #f05f40;
}

#mainNav .navbar-nav > li.nav-item > a.nav-link,
#mainNav .navbar-nav > li.nav-item > a.nav-link:focus {
  font-size: .9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #212529;
}

#mainNav .navbar-nav > li.nav-item > a.nav-link:hover,
#mainNav .navbar-nav > li.nav-item > a.nav-link:focus:hover {
  color: #F05F40;
}

#mainNav .navbar-nav > li.nav-item > a.nav-link.active,
#mainNav .navbar-nav > li.nav-item > a.nav-link:focus.active {
  color: #F05F40 !important;
  background-color: transparent;
}

#mainNav .navbar-nav > li.nav-item > a.nav-link.active:hover,
#mainNav .navbar-nav > li.nav-item > a.nav-link:focus.active:hover {
  background-color: transparent;
}

@media (min-width: 992px) {
  #mainNav {
    border-color: transparent;
    background-color: transparent;
  }
  #mainNav .navbar-brand {
    color: rgba(255, 255, 255, 0.7);
  }
  #mainNav .navbar-brand:focus, #mainNav .navbar-brand:hover {
    color: #fff;
  }
  #mainNav .navbar-nav > li.nav-item > a.nav-link {
    padding: 0.5rem 1rem;
  }
  #mainNav .navbar-nav > li.nav-item > a.nav-link,
  #mainNav .navbar-nav > li.nav-item > a.nav-link:focus {
    color: rgba(255, 255, 255, 0.7);
  }
  #mainNav .navbar-nav > li.nav-item > a.nav-link:hover,
  #mainNav .navbar-nav > li.nav-item > a.nav-link:focus:hover {
    color: #fff;
  }
  #mainNav.navbar-shrink {
    border-bottom: 1px solid rgba(33, 37, 41, 0.1);
    background-color: #fff;
  }
  #mainNav.navbar-shrink .navbar-brand {
    color: #F05F40;
  }
  #mainNav.navbar-shrink .navbar-brand:focus, #mainNav.navbar-shrink .navbar-brand:hover {
    color: #f05f40;
  }
  #mainNav.navbar-shrink .navbar-nav > li.nav-item > a.nav-link,
  #mainNav.navbar-shrink .navbar-nav > li.nav-item > a.nav-link:focus {
    color: #212529;
  }
  #mainNav.navbar-shrink .navbar-nav > li.nav-item > a.nav-link:hover,
  #mainNav.navbar-shrink .navbar-nav > li.nav-item > a.nav-link:focus:hover {
    color: #F05F40;
  }
}

section.bg-primary {
    padding: 1rem 0;
}
header.masthead hr {
  margin-top: 30px;
  margin-bottom: 30px;
}

header.masthead h1 {
  font-size: 2rem;
}

header.masthead p {
  font-weight: 300;
}

@media (min-width: 768px) {
  header.masthead p {
    font-size: 1.15rem;
  }
}

@media (min-width: 992px) {
    .bg-secondary {
      height: 25vh;
      min-height: 100px;
      padding-top: 0;
      padding-bottom: 0;
    }
  header.masthead {
    height: 50vh;
    min-height: 400px;
    padding-top: 0;
    padding-bottom: 0;
  }
  header.masthead h1 {
    font-size: 3rem;
  }
}

@media (min-width: 1200px) {
  header.masthead h1 {
    font-size: 4rem;
  }
}

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

.text-primary {
  color: #F05F40 !important;
}

.btn {
  font-weight: 700;
  border: none;
  border-radius: 300px;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
}

.btn-xl {
  padding: 1rem 2rem;
}

.btn-primary2 {
  text-transform: uppercase;
  background-color: #F05F40 !important;
  border-color: #ef5230 !important;
}

.btn-primary2:hover, .btn-primary2:focus, .btn-primary2:active {
  color: #fff;
  background-color: #ee4b28 !important;
}

.btn-primary2:active, .btn-primary2:focus {
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
                        <li class="">
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
