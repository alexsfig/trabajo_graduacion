// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const USERS = 'usuario/'


export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
    create(context, user){
        context.showAlert = false 
        user.id = 0
        context.showSuccess = false 
        HTTP.post(USERS, user)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    //context.showSuccess = true
                    context.successMsg = "Usuario Creado"
                    //context.createUser = {}
                    //context.confirm_password = ""
                    context.$swal("Exito!", "Usuario Creado", "success")
                    context.volver();
                    //context.errors.clear()
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
        HTTP.put(USERS, user)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                   var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Usuario Actualizado"
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

    updatepassjuez(context, user){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(USERS, user)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    //var id = resp.data.id
                    //context.showAlert = false
                    context.$swal("Exito!", "La Contraseña ha sido Modificada", "success")
                    
                }
                else
                {
                    context.$swal("Ocurrio un error!", "La Contraseña no ha sido Modificada", "error")
                  //  context.volver();

                }
                //context.showSuccess = true
                //context.successMsg = "La Contraseña ha sido Modificada"
            })
            .catch((err) => {
                //context.showAlert = true
                context.$swal("Ocurrio un error!", "La Contraseña no ha sido Modificada", "error")
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
        HTTP.get(USERS + context.$route.params.id+'/')
            .then((resp) => {
                context.user = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to display all users, pass only the context
    */
    index(context){
        HTTP.get(USERS)
            .then((resp) => {
                context.users = resp.data
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
        HTTP.get(USERS + id)
            .then((resp) => {
                console.log(resp)
                context.usuario = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(USERS + id)
            .then((resp) => {
                console.log(resp);
                swal("Exito!", "El Usuario ha sido Eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("No se Puede Eliminar!", "Es posible que el Usuario ya este Asociado.", "error")
            })
    }
    

}