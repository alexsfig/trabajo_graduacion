// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const ENTRENADORES = 'entrenador/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
   /* create(context, noticias){
        context.showAlert = false 
         context.showSuccess = false 
          noticias.id=0;
          noticias.usuarioId= 1;
          //noticias.fechaInicio = moment(noticias.fechaInicio).format('YYYY-MM-DD');
        HTTP.post(NOTICIAS, noticias)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Noticia Creada"
                    context.createNoticias = {}
                    context.errors.clear()
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    }, */
    /* 
        Method to update user, pass context, object Users and user id
    */
    create(context, miembroJunta){
        context.showAlert = false
        context.showSuccess = false
      
   
        
        HTTP.post('persona', miembroJunta)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Entrenador Creado"
                    context.createNoticias = {}
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

    update(context, entrenadores){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put('persona', entrenadores)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Entrenador Actualizado"
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
    update2(context, entrenadores){
        context.showAlert = false 
        context.showSuccess = false 
        console.log(JSON.stringify(entrenadores.personaId))
        let request={
        id:entrenadores.id,
       // personaId:{id:entrenadores.personaId.id}
        descripcion:entrenadores.descripcion,
        personaId:{id:entrenadores.personaId.id}

        }
        HTTP.put(ENTRENADORES, request)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Entrenador Actualizado"
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
        HTTP.get(ENTRENADORES + context.$route.params.id+'/')
            .then((resp) => {
                context.entrenador = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(ENTRENADORES)
            .then((resp) => {

                console.log("nombre: kdks")
                context.entrenadores = resp.data
                console.log(resp.data)
                

                for (let i of  context.entrenadores) {
                    console.log("nombre:"+ i.nombre)
                    console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
                    i.nombre=i.personaId.nombre+","+i.personaId.apellido;
                
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
        HTTP.get(ENTRENADORES + id)
            .then((resp) => {
                console.log(resp)
                context.entrenador = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(ENTRENADORES + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El entrenador ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            }) 
    } 
    

}