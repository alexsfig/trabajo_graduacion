
import {HTTP} from '../common_class/http.js';

import {router} from '../router/index.js'
import moment from 'moment'
const FECHAS = 'fecha/'

export default {
    update(context, fechas){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FECHAS, fechas)
        .then((resp) => {
            if (resp.status>= 200 && resp.status <=300){
                var id = resp.data.id
                context.showAlert = false
                context.$swal("Exito!", "Fecha actualizada  con exito", "success")                   
                context.volver();          
            }
        })
        .catch((err) => {
            context.showAlert = true
            if (err.response) {
                context.errMsg = err.response.data
                context.showAlert = true
            }
        })
    },
    /*
        Method to get user, pass only the context, id will be taken from url
        */
        show(context){
            HTTP.get(FECHAS + context.$route.params.id+'/')
            .then((resp) => {
                context.fecha = resp.data

            })
            .catch((err) => {
            })
        },
    /*
        Method to display all users, pass only the context
        */
        index(context){
            HTTP.get(FECHAS)
            .then((resp) => {
                context.fechas = resp.data

            })
            .catch((err) => {
            })
        },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
        */
        retrieve(context, id){
            HTTP.get(FECHAS + id)
            .then((resp) => {
                context.fecha = resp.data;
            })
            .catch((err) => {
            })

        },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
        */
        delete(context, id, swal) {
            HTTP.delete(FECHAS + id)
            .then((resp) => {
                swal("Eliminado!", "La Fecha ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("No se puede Eliminar!", "Es posible que la Fecha contenga circuitos", "error")
            })
        }, 
        create(context, fecha){
            context.showAlert = false
            context.showSuccess = false
            HTTP.post(FECHAS, fecha)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Fecha creada exitosamente"
                    context.$swal("Exito!", "Fecha creada", "success")
                    context.volver();
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
        }
    }
