// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import {UPLOAD} from '../common_class/http.js';
import moment from 'moment'
// define base url to Employees
const NOTICIAS = 'noticias/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
    create(context, noticias){
        context.showAlert = false 
         context.showSuccess = false 
   
           console.log(localStorage.getItem('iduser'));
          noticias.usuarioId= parseInt(localStorage.getItem('iduser'));
          //noticias.fechaInicio = moment(noticias.fechaInicio).format('YYYY-MM-DD');
        HTTP.post(NOTICIAS, noticias)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                 //   context.showSuccess = true
                  //  context.successMsg = "Noticia Creada"
                  //  context.createNoticias = {}
            //        context.errors.clear()
            console.log("estoy en crear personaasljjslldd")
            if(context.changePhoto)
                    UPLOAD.post('upload/noticia/'+ resp.data.id,context.avatar)

                    .then((resp) => {
                        context.$swal("Creado!", "La Noticia fue Creada", "success")
                        context.volver();
                 
                    })
                    .catch((err) => {

                        context.$swal("Ocurrio un error!", "La Noticia no fue creada  ", "error")
                        if (err.response) {
                         console.log("estoy en crear personaasljjsllt32y9329y23y9329")
                         //   context.showAlert = true
                         ///   context.errMsg = err.response.data
                        }
                    })
                    else{

                        context.$swal("Creado!", "La Noticia fue  Creada", "success")
                        context.volver();
                    }

                    
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    }, 
    /* 
        Method to update user, pass context, object Users and user id
    */
   
    update(context, noticias){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put(NOTICIAS, noticias)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                //    var id = resp.data.id
                //    context.showAlert = false 
                   if(context.changePhoto)
                    UPLOAD.post('upload/noticia/'+ context.noticia.id,context.avatar)
                    .then((resp) => {
                        context.$swal("Exito!", "La Noticia fue Actualizada", "success")
                        context.volver();


                    })
                    .catch((err) => {
                        if (err.response) {
                            context.$swal("Ocurrio un error!", "La Noticia fue Actualizada pero la Imagen No", "error")  
                        }
                    })
                    else{

         

                            context.$swal("Exito!", "La Noticia fue actualizada", "success")
                            context.volver();
                        
    
                    }
                }
           //     context.showSuccess = true
              //  context.successMsg = "Noticia Actualizada"
            })
            .catch((err) => {
                context.$swal("Ocurrio un error!", "La Noticia no fue actualizada", "error")
                
            //    context.showAlert = true
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
        HTTP.get(NOTICIAS + context.$route.params.id+'/')
            .then((resp) => {
                context.noticia = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(NOTICIAS)
            .then((resp) => {
                context.noticias = resp.data
                console.log(resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    },
    indexActuales(context){
        HTTP.get(NOTICIAS+"actuales")
            .then((resp) => {
                context.noticias = resp.data
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
        HTTP.get(NOTICIAS + id)
            .then((resp) => {
                console.log(resp)
                context.noticia = resp.data;
                context.create = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(NOTICIAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminado!", "La Noticia ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("No se puede Eliminar!", "Es posible que la noticia ya este asociada.", "error")
            }) 
    } 
    

}