// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const CERTIFICACION = 'certificacion/'


export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create certificacions, pass object Users
    */
    create(context, certificacion){
        context.showAlert = false 
        certificacion.id = 0
        context.showSuccess = false 
        HTTP.post(CERTIFICACION, certificacion)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.errors.clear()
                    context.fetchData();
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
        Method to update certificacion, pass context, object Users and certificacion id
    */
    
    update(context, certificacion){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(CERTIFICACION, certificacion)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    //var id = resp.data.id
                    //context.showAlert = false 
                    context.$swal("Exito!", "La Certificación fue Actualizada", "success")
                    context.volver();
                }                
                else
                {
                    context.$swal("Ocurrio un error!", "La Certificación no fue Actualizada", "error")
                  //  context.volver();

                }
                //context.showSuccess = true
                //context.successMsg = "Certificacion Actualizada"
            })
            .catch((err) => {
                //context.showAlert = true
                context.$swal("Ocurrio un error!", "La Certificación no fue Actualizada", "error")
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
        Method to get certificacion, pass only the context, id will be taken from url
    */
    show(context){
        HTTP.get(CERTIFICACION + context.$route.params.id+'/')
            .then((resp) => {
                context.certificacion = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to display all certificacions, pass only the context
    */
    index(context){
        HTTP.get(CERTIFICACION)
            .then((resp) => {
                context.certificacions = resp.data
                console.log(resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to retrieve certificacion, pass the context and certificacion id, use this method when you need to edit certificacion
    */
    retrieve(context, id){
        HTTP.get(CERTIFICACION + id)
            .then((resp) => {
                console.log(resp)
                context.Certificacion = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /* 
        Method to delete certificacion, pass the context and certificacion id, use this method when you need to delete certificacion
    */
    delete(context, id, swal) {
        HTTP.delete(CERTIFICACION + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminado!", "El Certificacion ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Error!", "Ocurrio un error.", "error")
            })
    }
    

}