<template>
    <div class="content">
        <div class="row">
            <div class="col-xs-12 text-left">
                                              
                             <div @click="volver()" class="btn btn-flat btn-sm btn-warning margin">
                                    <i class="fa fa-arrow-circle-left" ></i> Regresar
                                </div>

            </div>
            <div class="col-md-8 col-md-offset-2">
                <div class="box box-primary">
                    <div class="box-body box-profile">

                    <div class="profile-username text-center">

                    <h3>Detalle de Transacción</h3> </div>
                       </div>
                             <div class="box-body box-profile"> 
                        <h3 class="profile-username text-center"></h3>
                  
                        <div class="col-sm-8 col-sm-offset-2">
                            <ul class="list-group list-group-unbordered">
                                <li class="list-group-item">
                                     <b>Fecha</b> <a class="pull-right"> {{transaccion.fecha}}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Cuenta</b> <a class="pull-right"> {{transaccion.cuentaId?transaccion.cuentaId.nombre:'Sin Cuenta'}} </a>
                                </li>
                                <li class="list-group-item">
                                     <b>Tipo de Transacción</b> <a class="pull-right"> {{transaccion.tipoTransaccionId?transaccion.tipoTransaccionId.nombre:'Sin Tipo Transacción'}}</a>
                                </li>
                                 <li class="list-group-item">
                                     <b>Concepto</b> <a class="pull-right"> {{transaccion.tipoTransaccionId?transaccion.tipoTransaccionId.tipo==true?'Ingreso':'Gasto':'Sin Concepto Transaccion'}}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Monto</b> <a class="pull-right"> $ {{ roundToTwo(transaccion.monto)}}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Forma de Pago</b> <a class="pull-right">  {{transaccion.formaPagoId?transaccion.formaPagoId.nombre:'Sin Forma de Pago'}}</a>
                                </li>
                                <li class="list-group-item">
                                     <b>Comprobante</b> <a class="pull-right"> {{transaccion.comprobante}}</a>
                                </li>
                                 <li class="list-group-item">
                                     <b>Referencia</b> <a class="pull-right"> {{transaccion.referencia}}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Patrocinador</b> <a class="pull-right"> {{transaccion.patrocinadorId?transaccion.patrocinadorId.nombre:'No Asociado'}}</a>
                                </li>
                                <li class="list-group-item">
                                     <b>Atleta</b> <a class="pull-right"> {{transaccion.atletaId?transaccion.atletaId.nombre:'No Asociado'}}</a>
                                </li>
                               
                            </ul>
                        </div>

                    </div>
                    <!-- /.box-body -->
                </div>
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"> </h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Descripción de la Cuenta</strong>

                        <p class="text-muted">
                           {{transaccion.cuentaId?transaccion.cuentaId.descripcion:'Sin Descripcion'}}
                        </p>
                        <hr>
                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Descripcion de la Transacción</strong>
                        <p class="text-muted">{{transaccion.descripcion}}</p>
                        <hr>
                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Descripcion del Tipo de Transacción</strong>
                        <p class="text-muted">{{transaccion.tipoTransaccionId?transaccion.tipoTransaccionId.descripcion:'Sin Descripcion Tipo Transacción'}}</p>
                        <hr>

                        <strong><i class="fa fa-file-text-o margin-r-5"></i> Descripcion de Forma de Pago</strong>
                        <p class="text-muted">{{transaccion.formaPagoId?transaccion.formaPagoId.descripcion:'Sin Descripción Forma de Pago'}}</p>
                        <hr>
                                              
                    </div>
                    <!-- /.box-body -->
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import transaccionsController from '../../controllers/transacciones.js';
import moment from "moment"


export default {
    name: "ShowTransaccion",
    data: () => ({
        transaccion: {},
        
    }),
    created() {
        this.fetchData()
        console.log(moment)
    },
    watch: {
        '$route': 'fetchData',
           },
    methods: {
        _calculateAge(birthday) {
            var today = new Date();
            var birthDate = new Date(birthday);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
       },
        fetchData() {
            transaccionsController.retrieve(this, this.$route.params.id)
      },
      volver(){
                console.log("entre")
 window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    

            },
             roundToTwo(num) {
      return this.formatPrice(+(Math.round(num + "e+2") + "e-2"));
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    }
}

</script>
