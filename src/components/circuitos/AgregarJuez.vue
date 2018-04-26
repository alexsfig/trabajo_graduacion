<template>
    <div>
        <section class="content-header">
            <h1>Agregar Jueces Evaluadores</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li>Manejo de Circuitos </li>
            </ol>
        </section>
        <section class="content" >

            <div class="row">
                <div class="col-xs-12">
                    <div class="wrapper-alert">
                        <alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
                            <h4><i class="icon fa fa-ban"></i> Error!</h4>
                            <p>{{ errMsg }}</p>
                        </alert>
                        <alert type="success" :closable="true" v-if="showSuccess" @close="showSuccess=false">
                            <h4><i class="icon fa fa-check"></i> Exito!</h4>
                            <p>{{ successMsg }}</p>
                        </alert>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Jueces Participantes en la Fecha: <b>{{circuito.fechaId.nombre}}</b>   del Circuito: <b>{{circuito.nombre }}</b> </h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
      <div class="box-action">

                            <form @submit.prevent="submit"  role="form"> 
                                <div v-if="numjueces<8">
           <div class="col-xs-12 col-sm-6">
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('juez') }">
                                            <label for="juez">Juez</label>
                                            <v-select
                                                :debounce="250"
                                                :options="jueces"
                                                v-model="juez"
                                                placeholder="Seleccione un juez" 
                                                label="nombre">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="juez" value="" data-vv-as="juez"  v-model="juez" v-validate="'required'">
                                            <span class="help-block" for="juez" v-bind:data-error="errors.first('juez')">
                                                {{ errors.first('juez') }}
                                            </span>
                   
                                        <div class="fgroup"  :class="{ 'has-error': errors.has('juezRol') }">
                                            <label for="juezRol">Rol </label>
                                            <v-select
                                                :debounce="250"
                                                :options="juecesRoles"
                                                v-model="juezRol"
                                                placeholder="Seleccione Rol de Inicio" 
                                                label="rol">
                                            </v-select>
                                            <div class="clearfix"></div>
                                            <input type="hidden" name="juezRol" value="" data-vv-as="juezRol"  v-model="juez" v-validate="'required'">
                                            <span class="help-block" for="juezRol" v-bind:data-error="errors.first('juezRol')">
                                                {{ errors.first('juezRol') }}
                                            </span>
                                            
                                        </div>
                                             <button type="submit"  class="btn btn-flat btn-sm btn-primary"><i aria-hidden="true" 
                                        class="fa fa-check-circle"></i> Agregar</button>
                                        </div>
                                         
                                    </div>
                                    </div> 
                            </form> 
                             <!--   <router-link to="/admin/circuitos/form" class="btn btn-default btn-flat">
                                    <i class="fa fa-plus"></i> Nueva Circuito
                                </router-link>-->
                            </div>
                            </div>
                       
                        <div class="box-body">
                         <vue-good-table :columns="columns" :rows="juezCircuitos" :paginate="true" :globalSearch="true" globalSearchPlaceholder="Search" styleClass="table table-striped table-condensed">
                                <template slot="table-row" scope="props"> 
                                       <td>{{props.row.juezId.personaId.nombre}}</td>                                    
                                   <td>{{props.row.juezId.personaId.apellido}}</td> 
                                    <td>{{props.row.juezId.descripcion}}</td> 
                                     <td>{{props.row.juezId.personaId.telefono}}</td> 
                                      <td>{{props.row.juezId.personaId.correo}}</td> 
                                     <td>{{ props.row.rolJuezId.rol}}</td> 
                                                     
                                         <td class="nowrap">
                                 <!--    <router-link :to="{ name: 'circuitosEdit', params: { id: props.row.id }}">
                                        <button type="button" class="margin btn btn-flat btn-sm btn-primary"
                                       ><i aria-hidden="true"
                                         class="fa fa-pencil-square-o"></i> Actualizar</button>
                                        </router-link>               -->
                                        <button type="button" class="margin btn btn-flat btn-sm btn-danger" 
                                        @click="deleteCircuito(props.row.id, props.row.juezId.personaId.nombre+','+props.row.juezId.personaId.apellido)"><i aria-hidden="true" 
                                        class="fa fa-times"></i> Dar de baja</button>
                                
                                    </td>
                                  </template>
                            </vue-good-table>

                        </div>

                         <div class="box-body">
                               
                              <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar a Circuitos
                                </div>

                                </div>
                                
                                  
                    </div>
                   </div>
            </div>
           <!-- <modalPlaya :methodSubmit="methodSubmit" :title="'Actualizar Usuario'" :buttonMsg="'Actualizar'" :openModal="openModal" :playa="playa" v-on:openChange="isChange"></modalPlaya> -->
        </section>
    </div>
</template>
<script>
  
    import circuitosController from '../../controllers/circuitos.js';
        import juezController from '../../controllers/jueces.js';
      import  juezCircuitoController  from '../../controllers/JuezCircuito.js';
     import vSelect from "vue-select"
    import moment from "moment"
    export default {
        name: 'AgregarJuez',
        data() {
            return {
                circuito: {juezsCircuitoList:[],fechaId:{}},
                datos:[],
                juezRol:null,
                juezCircuito:{},
                jueces:[],
                numjueces:0,
                juecesRoles:[],
                juezCircuitos:[],
                juez:null,
                showAlert: false,
                showSuccess: false,
                methodSubmit: 'editar',
                openModal: false ,
                id:'',
 columns: [ 
 
                       {
                      label: 'Nombre',
                      field: 'juezId.personaId.nombre',
                      filterable: true
                    },
                    {
                      label: 'Apellido',
                      field: 'juezId.personaId.apellido',
                      filterable: true
                    },
                     {
                      label: 'Descripcion del Juez',
                      field: 'descripcion',
                      filterable: true
                    },
                     {
                      label: 'Telefono',
                      field: 'juezId.personaId.telefono',
                      filterable: true
                    },
                     {
                      label: 'Correo',
                      field: 'juezId.personaId.correo',
                      filterable: true
                    },

                    {
                      label: 'Rol',
                      field: 'rol',
                      filterable: true
                    },
                   
                     {
                      label: 'Acción',
                      field: '',
                      filterable: false
                    }
                    ]
            }
        }, components:{
            vSelect
        },
        watch:{

'juezCircuitos': 'calcularSize'


        },
        created(){
              this.id = this.$route.params.id;
        
            this.fetchData()
        },
        methods:{
            restarerror(){this.errors.clear()},
            calcularSize(

               
            ){


                this.numjueces= Object.keys(this.juezCircuitos).length;
                console.log("tamañooooooo eexitoso" + this.numjueces)
            },

            fetchData(){
               // circuitosController.index(this)
               juezCircuitoController.indexByCircuito(this,this.id);
                circuitosController.retrieve(this,this.id)
                 juezController.byCircuito(this,this.id)
                 juezController.getRoles(this)
                  this.restarerror();
/*
  for (let i of this.juezs) {
  i.nombre=i.personaId.nombre+","+i.personaId.apellido;
  console.log("nombre:"+ i.nombre)
  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
}*/
            },
                  submit() {
                this.showAlert = false
                this.showSuccess = false

                this.$validator.validateAll().then(success => {
                    if (success) {
                 
                    
                        this.juezCircuito.circuitoId=this.circuito;
                        this.juezCircuito.juezId=this.juez;
                        this.juezCircuito.rolJuezId=this.juezRol
                        this.juezCircuito.estado=0;

                        console.log(JSON.stringify(  
                        this.juezCircuito));
                        juezCircuitoController.create(this,this.juezCircuito)
                        
                     
                     
                    }
                    else{
                          console.log("Error enn el formulario")
                        this.showAlert = true
                        this.errMsg = "Error revisa el formulario"
                    }
                });
            },
            deleteCircuito(id, nombre) {
                let context = this;
                let swal = this.$swal;
                this.$swal({
                    title: 'Estas Seguro?',
                    html: 'No podras recuperar la informacion del Juez <b>&laquo;' + nombre + '&raquo</b><br> en el Circuito y toda la informacion en relacion al mismo ya no sera accesible',
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Mantener'
                }).then(function() {
                    juezCircuitoController.delete(context, id, swal);
                },function(dismiss) {
                    if (dismiss === 'cancel') {
                        swal(
                          'Cancelado',
                          'El Juez en el Circuito no se dio de baja',
                          'error'
                        )
                    }
                })
            },

            volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            }
             
        }
    }
</script>