// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const ENTIDAD = 'entidad/'


export default {
    /*
        Use context to update vars dinamyc
    */
    /*
        Use the context to redirect after succeded and update var to use in view

        Method to create users, pass object Users
    */
    create(context, entidad){
        context.showAlert = false
        context.showSuccess = false
        HTTP.post(ENTIDAD, entidad)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    console.log(resp)
                    var id = resp.data.id
                    // redirect to show entidad view
                    context.showSuccess = true
                    context.successMsg = "Entidad Creada"
                }
            })
            .catch((err) => {
                context.showAlert = true
                context.errMsg = err.response.data
                console.log(err)
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response);
                }
            })
    },
    /*
        Method to update entidad, pass context, object Users and entidad id
    */

    update(context, entidad){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(ENTIDAD, entidad)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Users updated successfully"
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
        Method to get entidad, pass only the context, id will be taken from url
    */
    show(context){
        HTTP.get(ENTIDAD + context.$route.params.id+'/')
            .then((resp) => {
                context.role = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to display all users, pass only the context
    */
    index(context){
        HTTP.get(ENTIDAD)
            .then((resp) => {
                context.entidades = resp.data
                console.log(resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to retrieve entidad, pass the context and entidad id, use this method when you need to edit entidad
    */

    retrieve(context, id){
        HTTP.get(ENTIDAD + id)
            .then((resp) => {
                console.log(resp)
                context.usuario = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },


}
