<template>
    <div>
        <section class="content-header">
            <h1>{{ employee.first_name }} {{ employee.last_name }} Profile</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><router-link  to="/admin/users">Employees</router-link></li>
                <li class="active">Add Employees</li>
            </ol>
        </section>
        <section  class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="wrapper-alert">
                        <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                            <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Success!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                    <div class="box">
                        <div class="box-body">
                            <div class="box box-primary">
                                <div class="box-body box-profile">
                                    <img class="profile-user-img img-responsive img-circle" src="../../assets/images/user2-160x160.jpg" alt="User profile picture">
                                    <h3 class="profile-username text-center">{{ employee.first_name }} {{ employee.last_name }}</h3>
                                    <p class="text-muted text-center">Software Engineer</p>
                                    <div class="col-md-6 col-md-offset-3 col-xs-12 col-sm-4 col-sm-offset-4">
                                        
                                        <ul class="list-group list-group-unbordered">
                                            <li class="list-group-item">
                                                <b>Email</b> <a class="pull-right">{{ employee.email }}</a>
                                            </li>
                                            <li class="list-group-item">
                                                <b>Birth Date</b> <a class="pull-right">{{ employee.birth_date | formatDate}}</a>
                                            </li>
                                            <li class="list-group-item">
                                                <b>SSN</b> <a class="pull-right">{{ employee.ssn }}</a>
                                            </li>
                                            <li class="list-group-item">
                                                <b>Phone Number</b> <a class="pull-right">{{ employee.phone_number }}</a>
                                            </li>
                                            <li class="list-group-item">
                                                <b>Apply Incentives</b> <a class="pull-right">{{ employee.apply_incentives == true ? 'Yes' : 'No' }}</a>
                                            </li>
                                        </ul>
                                        <button type="button" class="btn btn-primary" @click="open1=true" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button>
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
            <modalEmployee :methodSubmit="methodSubmit" :title="'Update Employee'" :buttonMsg="'Update'" :open1="open1" :first_name="employee.first_name" :last_name="employee.last_name" :ssn="employee.ssn" :email="employee.email" :phone_number="employee.phone_number" :birth_date="employee.birth_date" :apply_incentives="employee.apply_incentives" :profile_picture="employee.profile_picture" :id="employee.id"v-on:openChange="isChange"></modalEmployee>
        </section>
    </div>
</template>

<!-- app -->
<div id="app">
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
  <modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">custom header</h3>
  </modal>
</div>
<script>
    import users from '../../controllers/users.js'
    import ModalUser from './subcomponents/ModalUser'
    export default {
        name: 'Employee',
        data() {
            return {
                employee:{},
                methodSubmit: 'update',
                open1: false,
                showAlert: false,
                showSuccess: false
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },
        components:{
            "modalUser": ModalUser
        },
        methods: {
            isChange () {
                this.open1 = false
                this.fetchData()
            },
            
            fetchData() {
                users.show(this)
            }
        }

    }
</script>
<style scoped>
.active {
  width: 100%;
}
</style>