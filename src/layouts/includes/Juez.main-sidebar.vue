<template>
	<div class="wrapper-sidebar">
		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">

		    <!-- Sidebar user panel -->
		    <div class="user-panel">
		        <div class="pull-left image">
		            <img src="../../assets/images/logo3.png" class="img-circle" alt="User Image">
		        </div>

		        <div class="pull-left info">
		            <p>{{usuario}}</p>
		            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
		        </div>
		    </div>

		    <!-- search form -->
		    <form action="#" method="get" class="sidebar-form">
		        <div class="input-group">
		            <input type="text" name="q" class="form-control" placeholder="Search...">
		            <span class="input-group-btn">
		                <button type="submit" name="search" id="search-btn" class="btn btn-flat">
		                    <i class="fa fa-search"></i>
		                </button>
		            </span>
		        </div>
		    </form>
		    <!-- /.search form -->

		    <!-- sidebar menu: : style can be found in sidebar.less -->
		    <ul class="sidebar-menu" data-widget="tree">

		        <li class="header">Navegación principal</li>
	        <li>
		            <router-link to="/juez">
		                <i class="fa fa-tachometer" aria-hidden="true"></i> <span>Inicio</span>
		            </router-link>
		        </li>
		    
		        <li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-flag-checkered" aria-hidden="true"></i>
		                <span>Competencias</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>
		            </router-link>
		            <ul class="treeview-menu">
		               
		                <li>
		                    <router-link to="/juez/heat/">
		                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> <span>Heats Asignados</span>
		                    </router-link>
		                </li>
		                 <li>
		                    <router-link to="/juez/ranking">
		                        <i class="fa fa-list-ol" aria-hidden="true"></i> <span>Ranking</span>
		                    </router-link>
		                 </li> 
		            </ul>
		        </li>


		        <li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-user" aria-hidden="true"></i>
		                <span>Usuario</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>
		            </router-link>
		            <ul class="treeview-menu">
		               
		                <li>
		                    <router-link to="/juez/userjuez/">
		                        <i class="fa fa-retweet" aria-hidden="true"></i> <span>Modificar Contraseña</span>
		                    </router-link>
		                </li>
		            </ul>
		        </li>

			
	
		    </ul>


		</section>
	</div>
</template>

<script>


export default {

    computed: {
             usuario() {
                 return localStorage.getItem('usuario');
                      }
                  },


    };


</script>
