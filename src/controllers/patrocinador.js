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
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
    create(context, patrocinador){
        context.showAlert = false 
         context.showSuccess = false 
          patrocinadores.id= 0;
           console.log(localStorage.getItem('entidadId'));
          patrocinadores.entidadId= parseInt(localStorage.getItem('entidadId'));
           console.log(localStorage.getItem('playaId'));
          patrocinadores.playaId= parseInt(localStorage.getItem('playaId'));
           console.log(localStorage.getItem('entrenadorId'));
          patrocinadores.entrenadorId= parseInt(localStorage.getItem('entrenadorId'));
          //noticias.fechaInicio = moment(noticias.fechaInicio).format('YYYY-MM-DD');
        HTTP.post(PATROCINADORES, patrocinadores)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Escuela Creada"
                    context.createEscuelas = {}
                    context.errors.clear()
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
   
    update(context, patrocinadores){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(PATROCINADORES, patrocinadores)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Patrocinador actualizado"
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
        HTTP.get(PATROCINADORES + context.$route.params.id+'/')
            .then((resp) => {
                context.patrocinador = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(PATROCINADORES)
            .then((resp) => {
                context.patrocinadores = resp.data
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
                swal("Deleted!", "El patrocinador ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            }) 
    } 
    

}