// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const CUENTAS = 'cuenta/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
   create(context, cuentas){
        context.showAlert = false 
         context.showSuccess = false 
          cuentas.id=0;
         
        HTTP.post(CUENTAS, cuentas)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Cuenta Creada"
                    context.createCuenta = {}
                    context.errors.clear()
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
   
    update(context, cuentas){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(CUENTAS, cuentas)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Cuenta Actualizada"
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
        HTTP.get(CUENTAS + context.$route.params.id+'/')
            .then((resp) => {
                context.cuenta = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(CUENTAS)
            .then((resp) => {
                context.cuentas = resp.data
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
        HTTP.get(CUENTAS + id)
            .then((resp) => {
                console.log(resp)
                context.cuenta = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(CUENTAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "La Cuenta ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            }) 
    } 
    

}