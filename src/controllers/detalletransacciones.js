// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const DETALLETRANSACCIONES = 'detalleTransaccion/'


export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create PLAYAS, pass object Users
    */
    create(context, detalletransacciones){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.post(DETALLETRANSACCIONES, detalletransacciones)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Detalle de Transaccion Creado"
                    context.fetchData()
                    context.reset()
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    },
    /* 
        Method to update user, pass context, object Users and user id
    */
    
    update(context, user){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(PLAYAS, user)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Playa Actualizada"
            })
            .catch((err) => {
                context.showAlert = true
                console.log(err)
                if (err.response) {
                    context.errMsg = err.response.data
                    console.log(err.response.data);
                    console.log(err.response);
                    context.showAlert = true 
                }
            })
    },
    /* 
        Method to get user, pass only the context, id will be taken from url
    */
    show(context){
        HTTP.get(PLAYAS + context.$route.params.id+'/')
            .then((resp) => {
                context.user = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to display all PLAYAS, pass only the context
    */
    index(context){
        HTTP.get(DETALLETRANSACCIONES)
            .then((resp) => {
                context.detalletransacciones = resp.data
                console.log(resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(PLAYAS + id)
            .then((resp) => {
                console.log(resp)
                context.playa = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(PLAYAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "La playa ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }
    

}