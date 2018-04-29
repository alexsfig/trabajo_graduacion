
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const PATROCINADORES = 'patrocinador/'




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

    update(context, patrocinadors){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(PATROCINADORES, patrocinadors)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                     //var id = resp.data.id
                    //context.showAlert = false
                    context.$swal("Exito!", "El Patrocinador fue Actualizado", "success")
                    context.volver();
                }
                else
                {
                    context.$swal("Ocurrio un error!", "El Patrocinador no fue Actualizado", "error")
                  //  context.volver();

                }
                //context.showSuccess = true
                //context.successMsg = "Patrocinador Actualizado"
            })
            .catch((err) => {
                //context.showAlert = true
                context.$swal("Ocurrio un error!", "El Patrocinador no fue Actualizado", "error")
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
        HTTP.get(PATROCINADORES + context.$route.params.id+'/')
            .then((resp) => {
                context.patrocinador = resp.data

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
        HTTP.get(PATROCINADORES)
            .then((resp) => {
                console.log(resp.data)
                context.patrocinadors = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(PATROCINADORES + id)
            .then((resp) => {
                console.log(resp)
                context.patrocinador = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(PATROCINADORES + id)
            .then((resp) => {
                console.log(resp);
                swal("Exito!", "El Patrocinador ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("No se puede Eliminar!", "Es posible que el patrocinador ya este Asociado.", "error")
            })
    }, 
    create(context, patrocinador){
        context.showAlert = false
        context.showSuccess = false
        patrocinador.id=0;
                            HTTP.post(PATROCINADORES, patrocinador)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    //context.showSuccess = true
                                    context.successMsg = "Patrocinador creado exitosamente"
                                    context.$swal("Exito!", "Patrocinador creado exitosamente", "success")
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
