
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const TIPOTRANSACCION = 'tipoTransaccion/'




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

    update(context, tipoTransaccions){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(TIPOTRANSACCION, tipoTransaccions)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Tipo de Transaccion Actualizado"
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
                context.tipoTransaccion = resp.data

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
                context.tipoTransaccions = resp.data
                 for (let i of  context.tipoTransaccions) {


                i.tipoNombre=i.tipo?'Ingreso':'Gasto'



                 }
              
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
                context.tipoTransaccion = resp.data;
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
                swal("Deleted!", "El Tipo de Transaccion ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("No se Puede Eliminar!", "Es posible que este tipo de transaccion ya este asociado.", "error")
            })
    }, 
    create(context, tipoTransaccion){
        context.showAlert = false
        context.showSuccess = false

                            HTTP.post(TIPOTRANSACCION, tipoTransaccion)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Tipo de Transaccion creado exitosamente"
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
