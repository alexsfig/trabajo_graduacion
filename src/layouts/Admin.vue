<template>
    <div class="wrapper">

        <header class="main-header">
            <main-header></main-header>
        </header>

        <aside class="main-sidebar">
            <main-sidebar></main-sidebar>
        </aside>

        <div class="content-wrapper">
            <router-view/>

        </div>

        <footer class="main-footer">
            <div class="pull-right hidden-xs">
                <b>Version</b> 2.0
            </div>
            <strong>Copyright &copy; 2017-2018 <a href="#">SWELL</a>.</strong> All rights reserved.
        </footer>

        <!-- <LoginForm></LoginForm> -->
    </div>
</template>

<script>
    import mainHeader from './includes/Admin.main-header.vue'
    import mainSidebar from './includes/Admin.main-sidebar.vue'

    export default {
        name: 'app',
        components: {
            "main-header": mainHeader,
            "main-sidebar": mainSidebar
        },
        mounted: function() {
            this.resize();
            this.ready();
        },
        methods: {
            resize() {
                window.dispatchEvent(new Event('resize'));
            },
            ready() {

                $(".sidebar-menu > li").each(function(i) {
                    var li_parent = $(this);

                    if (li_parent.hasClass("treeview"))
                    {
                        li_parent.find(".treeview-menu > li > a").each(function() {
                            if ($(this).hasClass("router-link-exact-active"))
                            {
                                $(this).parent().addClass("active");
                                $(this).parent().parent().parent().addClass("active menu-open");
                                $(this).parent().parent().slideDown();
                            }
                        });
                    }
                    else
                    {
                        if (li_parent.find("a").hasClass("router-link-exact-active"))
                        {
                            li_parent.addClass("active");
                        }
                    }
                });

                FastClick.attach(document.body);

                $(document).on("click", ".sidebar-menu > li > a", function(event) {

                    var _this = $(this);

                    $(".sidebar-menu li").removeClass("active menu-open");
                    $(".treeview-menu").hide();

                    _this.parent().addClass("active");

                   if (_this.parent().hasClass("treeview")) {

                        if (_this.parent().find(".treeview-menu").is(":visible")) {
                            _this.parent().removeClass("menu-open");
                            _this.parent().find(".treeview-menu").slideUp();
                        }
                        else {
                            _this.parent().addClass("menu-open");
                            _this.parent().find(".treeview-menu").slideDown();
                        }
                   }

                });
            }
        }
    }


    import '../assets/bower_components/jquery/jquery.min.js';
    import '../assets/bower_components/bootstrap/js/bootstrap.min.js';
    import '../assets/bower_components/fastclick/fastclick.js';
    import '../assets/bower_components/AdminLTE/adminlte.min.js';



</script>


<style lang="css">
@import '../assets/bower_components/bootstrap/css/bootstrap.min.css';
@import '../assets/bower_components/font-awesome/css/font-awesome.min.css';
@import '../assets/bower_components/Ionicons/css/ionicons.min.css';
@import '../assets/bower_components/AdminLTE/AdminLTE.min.css';
@import '../assets/bower_components/AdminLTE/skins/_all-skins.min.css';

.breadcrumb > li { width: auto !important }
.active { width: 100%; }
.help-block{ color: #dd4b39 !important; }
.has-error { color: #dd4b39 !important }
.btn.has-error { border-color: #dd4b39 !important }
.table > tbody > tr > td {
     vertical-align: middle;
}
.margin { margin: 5px; }
.fgroup.required label:after {
  content:"*";
  color:#de4b39;
}
.v-select .dropdown-toggle .clear {
    font-size: 20px;
    color: #e35a38;
}
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 2.5em;
  opacity: .7   ;
}
.hr-text::before {
    content: '';
    background: linear-gradient(to right, transparent, #818078, transparent);
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
    color: black;
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
.global-search-input{
    width: calc(50%) !important;
}
.has-error .v-select.searchable .dropdown-toggle{
    border-color: #a94442;
}
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}
</style>
