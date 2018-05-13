
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const TIPOTRANSACCION = 'transaccion/'




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

    update(context, transaccions){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(TIPOTRANSACCION, transaccions)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Transaccion Actualizada"
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
        HTTP.get(TIPOTRANSACCION + context.$route.params.id+'/')
            .then((resp) => {
                context.transaccion = resp.data

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
        HTTP.get(TIPOTRANSACCION)
            .then((resp) => {
                console.log(resp.data)
                context.transaccions = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(TIPOTRANSACCION + id)
            .then((resp) => {
                console.log(resp)
                
                
                
                
                context.transaccion = resp.data;
                context.transaccion.atletaId.nombre=context.transaccion.atletaId.personaId.nombre+","+context.transaccion.atletaId.personaId.apellido;
                console.log("hey:::"+context.transaccion.atletaId.nombre)
            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(TIPOTRANSACCION + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminado!", "La Transaccion ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }, 
    create(context, transaccion){
        context.showAlert = false
        context.showSuccess = false
        if( transaccion.atletaId)
        transaccion.atletaId={id:transaccion.atletaId.id,nombre:transaccion.atletaId.nombre}
        if( transaccion.patrocinadorId)
         transaccion.patrocinadorId={id:transaccion.patrocinadorId.id,nombre:transaccion.patrocinadorId.nombre}
                            HTTP.post(TIPOTRANSACCION, transaccion)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Transaccion creada exitosamente"
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
