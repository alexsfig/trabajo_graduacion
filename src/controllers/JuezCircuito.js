
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const FECHAS = 'juezCircuito/'




export default {
    /*
        Use context to update vars dinamyc
    */

    /*
        Method to update user, pass context, object Users and user id
    */

    /*
        Method to update user, pass context, object Users and user id
    */

    update(context, juezCircuitos){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FECHAS, juezCircuitos)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Entrenador Actualizado"
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
        HTTP.get(FECHAS + context.$route.params.id+'/')
            .then((resp) => {
                context.juezCircuito = resp.data

            })
            .catch((err) => {
                console.log("Error en el servicio")
              console.log(err)
            })
    },
    /*
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(FECHAS)
            .then((resp) => {
                console.log(resp.data)
                context.juezCircuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },
    indexByCircuito(context,id){
        HTTP.get("/juezCircuito/byCircuito/"+id)
            .then((resp) => {
                console.log(resp.data)
                context.juezCircuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(FECHAS + id)
            .then((resp) => {
                console.log(resp)
                context.juezCircuito = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(FECHAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El JuezCircuito ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }, 
    create(context, juezCircuito){
        context.showAlert = false
        context.showSuccess = false
        juezCircuito.circuitoId={id:   juezCircuito.circuitoId.id}
        juezCircuito.juezId={id:   juezCircuito.juezId.id}
                            HTTP.post(FECHAS, juezCircuito)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Se agrego correctamente el juez al circuito"
                                    context.fetchData()
                                    context.resetForm()
                                }
                            })
                            .catch((err) => {
                                if (err.response) {
                                    context.showAlert = true
                                    context.errMsg = err.response.data
                                }
                            })

            //



    }


}
