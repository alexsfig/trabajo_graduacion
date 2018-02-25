
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const PATROCINADOR_ATLETA = 'patrocinadorAtleta/'




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

    update(context, patrocinador_atleta){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(PATROCINADOR_ATLETA, patrocinador_atleta)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Patrocinio Actualizado"
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
        HTTP.get(PATROCINADOR_ATLETA + context.$route.params.id+'/')
            .then((resp) => {
                context.patrocinadoratleta = resp.data

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
        HTTP.get(PATROCINADOR_ATLETA)
            .then((resp) => {
                console.log(resp.data)
                context.patrocinadoresAtletas = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(PATROCINADOR_ATLETA + id)
            .then((resp) => {
                console.log(resp)
                context.patrocinadorAtleta = resp.data;
                
             context.patrocinadorAtleta.atletaId.nombre= context.patrocinadorAtleta.atletaId.personaId.nombre+","+ context.patrocinadorAtleta.atletaId.personaId.apellido;


             

            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(PATROCINADOR_ATLETA + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El Patrocinio ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("No se Puede Eliminar!", "Es posible que este Patrocinio ya este Asociado.", "error")
            })
    }, 
    create(context, patrocinadoratleta){
        context.showAlert = false
        context.showSuccess = false
        patrocinadoratleta.id=0;
                            HTTP.post(PATROCINADOR_ATLETA, patrocinadoratleta)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Patrocinio creado exitosamente"
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
