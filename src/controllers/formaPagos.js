
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const FORMAPAGO = 'formaPago/'




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

    update(context, formaPagos){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FORMAPAGO, formaPagos)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    //var id = resp.data.id
                    //context.showAlert = false
                    context.$swal("Exito!", "La Forma de Pago fue Actualizada", "success")
                    context.volver();
                }
                else
                {
                    context.$swal("Ocurrio un error!", "La Forma de Pago no fue Actualizada", "error")
                  //  context.volver();

                }
                //context.showSuccess = true
                //context.successMsg = "Forma de Pago Actualizada"
            })
            .catch((err) => {
                //context.showAlert = true
                context.$swal("Ocurrio un error!", "La Forma de Pago no fue Actualizada", "error")
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
        HTTP.get(FORMAPAGO + context.$route.params.id+'/')
            .then((resp) => {
                context.formaPago = resp.data

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
        HTTP.get(FORMAPAGO)
            .then((resp) => {
                console.log(resp.data)
                context.formaPagos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(FORMAPAGO + id)
            .then((resp) => {
                console.log(resp)
                context.formaPago = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(FORMAPAGO + id)
            .then((resp) => {
                console.log(resp);
                swal("Exito!", "La Forma de Pago ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Error!", "Es Posible que la forma de pago ya este Asociada.", "error")
            })
    }, 
    create(context, formaPago){
        context.showAlert = false
        context.showSuccess = false

                            HTTP.post(FORMAPAGO, formaPago)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    //context.showSuccess = true
                                    context.successMsg = "Forma de Pago creada exitosamente"
                                    context.$swal("Exito!", "Forma de Pago creada exitosamente", "success")
                                    context.volver();
                               //     context.fetchData()
                               //    context.resetForm()
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
