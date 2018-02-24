// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const RONDAS = 'ronda/'
const HEATS = 'heat/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
   create(context, rondas){
        context.showAlert = false 
         context.showSuccess = false 
          //rondas.id=0;
         
        HTTP.post(RONDAS, rondas)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Ronda Creada"
                    context.idronda = rondas.id
                     context.fetchData()
                     context.reset()
                    
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    }, 

     heat(context, heats){
        context.showAlert = false 
         context.showSuccess = false 
          heats.id=0;
         
        HTTP.post(HEATS, heats)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Heat Creado"
                     context.fetchData()
                     context.reset()
                    
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    }
    /* 
        Method to update user, pass context, object Users and user id
    */
   
  
    

}