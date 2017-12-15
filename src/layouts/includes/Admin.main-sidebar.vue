<template>
	<div class="wrapper-sidebar">
		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">
		    
		    <!-- Sidebar user panel -->
		    <div class="user-panel">
		        <div class="pull-left image">
		            <img src="../../assets/images/user2-160x160.jpg" class="img-circle" alt="User Image">
		        </div>
		        
		        <div class="pull-left info">
		            <p>Alexander Pierce</p>
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
		            <router-link to="#">
		                <i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span>
		            </router-link>
		        </li>
		        <li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-users" aria-hidden="true"></i>
		                <span>Usuarios</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>                    
		            </router-link>
		            <ul class="treeview-menu">
		                <li>
		                    <router-link to="/admin/users/">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Manejo de usuarios</span>
		                    </router-link>
		                </li>
		                <li>
		                    <router-link to="/admin/users/create">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Agregar usuario</span>
		                    </router-link>
		                </li>
		            </ul>
		        </li>
				
				 <li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-newspaper-o" aria-hidden="true"></i>
		                <span>Noticias</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>                    
		            </router-link>
		            <ul class="treeview-menu">
		                <li>
		                    <router-link to="/admin/noticias/">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Manejo de Noticias</span>
		                    </router-link>
		                </li>
		                <li>
		                    <router-link to="/admin/noticias/create">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Agregar Noticia</span>
		                    </router-link>
		                </li>
		            </ul>
		        </li>
				

				<li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-address-card-o" aria-hidden="true"></i>
		                <span>Perfiles Personales</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>                    
		            </router-link>
		            <ul class="treeview-menu">
		                <li>
		                    <router-link to="/admin/juntamiembros/">
		                        <i class="fa fa-male" aria-hidden="true"></i> <span>Manejo Miembros de Junta</span>
		                    </router-link>
		                </li>
		                <li>
		                    <router-link to="/admin/entrenadores/">
		                        <i class="fa fa-male" aria-hidden="true"></i> <span>Manejo Entrenadores</span>
		                    </router-link>
		                </li>
		              <!--  <li>
		                    <router-link to="/admin/juntamiembros/create">
		                        <i class="fa fa-male" aria-hidden="true"></i> <span>Agregar Miembro Junta</span>
		                    </router-link>
		                </li> -->
		            </ul>
		        </li>
				
				
				
		        <li>
		            <router-link to="/admin/playas">
		                <i class="fa fa-pagelines" aria-hidden="true"></i> <span>Playas</span>
		            </router-link>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-user-plus" aria-hidden="true"></i> <span>Roles</span>
		            </router-link>
		        </li>
		        <!-- <li class="treeview">
		            <router-link to="#">
		                <i class="fa fa-tasks" aria-hidden="true"></i>
		                <span>Duties & Areas</span>
		                <span class="pull-right-container">
		                    <i class="fa fa-angle-left pull-right"></i>
		                </span>                    
		            </router-link>
		            <ul class="treeview-menu">
		                <li>
		                    <router-link to="#">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Areas Management</span>
		                    </router-link>
		                </li>
		                <li>
		                    <router-link to="#">
		                        <i class="fa fa-circle-o" aria-hidden="true"></i> <span>Duties Management</span>
		                    </router-link>
		                </li>
		            </ul>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-sign-out" aria-hidden="true"></i> <span>Attendances & Leaves</span>
		            </router-link>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-usd" aria-hidden="true"></i> <span>Salary Rules</span>
		            </router-link>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-credit-card" aria-hidden="true"></i> <span>Payroll</span>
		            </router-link>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-area-chart" aria-hidden="true"></i> <span>Reports</span>
		            </router-link>
		        </li>
		        <li>
		            <router-link to="#">
		                <i class="fa fa-cogs" aria-hidden="true"></i> <span>Configuration</span>
		            </router-link>
		        </li> -->
		    </ul>

		</section>
	</div>
</template>