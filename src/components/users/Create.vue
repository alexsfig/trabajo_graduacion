<template>
    <div>
        <section class="content-header">
            <h1>Employees</h1>
            <ol class="breadcrumb">
                
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a href="">Employees</a></li>
                <li class="active">Add Employees</li>
            </ol>
        </section>
       <section class="content">
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
                        <div class="box-header">
                            <h3 class="box-title">Add Employees</h3>
                        </div>
                        
                        <div class="box-body">
        
                            <form @submit.prevent="submit"  role="form"> 
                                <div class="box-body">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('first_name') }" >
                                            <label for="">First Name</label>
                                            <input type="text" id="first_name" name="first_name" data-vv-as="First Name" class="form-control" v-model="first_name" v-validate:first_name="'required'" >
                                            <span class="help-block" for="first_name" v-bind:data-error="errors.first('first_name')">
                                                {{ errors.first('first_name') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('last_name') }">
                                            <label for="">Last Name</label>
                                            <input type="text" id="last_name" name="last_name" data-vv-as="Last Name" class="form-control" v-model="last_name" v-validate:last_name="'required'" >
                                            <span class="help-block" for="last_name" v-bind:data-error="errors.first('last_name')">
                                                {{ errors.first('last_name') }}
                                            </span>
                                        </div>          
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('ssn') }">
                                            <label for="">SSN</label>
                                            <input type="text" id="ssn" name="ssn" class="form-control" data-vv-as="SSN"  v-model="ssn" v-validate:ssn="'required'" >
                                            <span class="help-block" for="ssn" v-bind:data-error="errors.first('ssn')">
                                                {{ errors.first('ssn') }}
                                            </span>

                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('email') }">
                                            <label for="">Email</label>
                                            <input type="email" id="email" name="email" class="form-control" data-vv-as="Email" v-model="email" v-validate:email="'required|email'" >
                                            <span class="help-block" for="email" v-bind:data-error="errors.first('email')">
                                                {{ errors.first('email') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup" :class="{ 'has-error': errors.has('phone_number') }">
                                            <label for="">Phone Number</label>
                                            <input type="text" id="phone_number" name="phone_number" class="form-control" data-vv-as="Phone Number" v-model="phone_number" v-validate:phone_number="'required'" >
                                            <span class="help-block" for="phone_number" v-bind:data-error="errors.first('phone_number')">
                                                {{ errors.first('phone_number') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('birth_date') }">
                                            <label for="">Birth Date</label>
                                            <dropdown class="form-group">
                                                <div class="input-group">
                                                    <input type="text" id="birth_date" name="birth_date" class="form-control" data-vv-as="Birth Date" v-model="birth_date" v-validate:birth_date="'required|date_format:YYYY-MM-DD'" :class="{'datepicker':true,  'has-error': errors.has('birth_date') }">
                                                    <div class="input-group-btn">
                                                        <button class="btn btn-default" type="button" data-role="trigger" :class="{'has-error': errors.has('birth_date') }" >
                                                            <i  class="glyphicon glyphicon-calendar"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <template slot="dropdown">
                                                    <li>
                                                        <date-picker class="date-picker"
                                                          v-model="birth_date"
                                                          :today-btn="todayBtn"
                                                          :clear-btn="clearBtn"
                                                          :limit-from="limitFrom"
                                                          :format="format"
                                                          :week-starts-with="weekStartsWith"
                                                          :limit-to="limitTo"
                                                          :close-on-selected="closeOnSelected">
                                                        </date-picker>
                                                    </li>
                                              </template>
                                            </dropdown>
                                            <span class="help-block" for="birth_date" v-bind:data-error="errors.first('birth_date')">
                                                {{ errors.first('birth_date') }}
                                            </span>

                                        </div>  
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('apply_incentives') }">
                                            <div class="checkbox">
                                              <label>
                                                <input type="checkbox"  id="apply_incentives" name="apply_incentives" v-model="apply_incentives" :class="{'has-error': errors.has('apply_incentives') }"> 
                                                Apply Incentives
                                              </label>
                                            </div>        
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="col-xs-12 text-right">
                                        <button type="submit" class="btn btn-flat btn-sm btn-primary">ADD NEW</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import users from '../../controllers/users.js'
    export default {
        name: 'Employees',
        data() {
            return {
                errMsg:  '',
                errorMsg: '',
                showAlert: false,
                showSuccess: false,
                isLogin: false,
                // We need to initialize the component with any
                // properties that will be used in it
                first_name: '',
                last_name: '',
                ssn: '',
                email: '',
                phone_number: '',
                birth_date: '',
                apply_incentives: false,
                profile_picture: '',
                show: false,
                clearBtn: true,
                todayBtn: true,
                closeOnSelected: true,
                limitFrom: '',
                limitTo: '',
                format: 'yyyy-MM-dd',
                weekStartsWith: 0
            }
        },
        methods: {
            submit() {
                this.showAlert = false
                this.showSuccess = false
                this.$validator.validateAll().then(success => {
                    if (success) {
                      
                        var object_data = {
                            first_name: this.first_name,
                            last_name: this.last_name,
                            position: this.position,
                            ssn: this.ssn,
                            email: this.email,
                            phone_number: this.phone_number,
                            birth_date: this.birth_date,
                            status: this.status,
                            apply_incentives: this.apply_incentives,
                            profile_picture: 'wfer',
                            status: true,
                            position: 'sdfasgfsd'
                        }
                        users.create(this, object_data)
                    }
                    else{
                        this.showAlert = true
                        this.errMsg = "Form error"
                    }
                });
            }
        }

    }
</script>
<style scoped>
