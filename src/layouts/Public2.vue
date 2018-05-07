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
    import mainHeader from './includes/Public.main-header.vue'
    import mainSidebar from './includes/Public.main-sidebar.vue'

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
</style>
