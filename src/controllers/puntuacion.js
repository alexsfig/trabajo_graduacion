// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const PUNTUACION = 'puntuacion/'




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
    create(context, puntuacion){
                            HTTP.post(PUNTUACION, puntuacion)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Puntuacion  creada exitosamente"
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



    },
    update(context, puntuacion){
        HTTP.put(PUNTUACION, puntuacion)
        .then((resp) => {
            if (resp.status>= 200 && resp.status <=300){
                context.showSuccess = true
                context.successMsg = "Puntuacion  creada exitosamente"
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