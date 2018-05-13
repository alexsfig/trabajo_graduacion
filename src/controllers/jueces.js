// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const JUECES = 'juez/'




export default {
    
   
    update(context, jueces){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.put("persona", jueces)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Juez Actualizado"


                if(  jueces.sexo=='M'){
                        context.persona.sexo='Masculino'
                      }

                    if( jueces.sexo=='F'){
                        context.persona.sexo='Femenino'
                      }
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
        HTTP.get(JUECES + context.$route.params.id+'/')
            .then((resp) => {
                context.juez = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(JUECES)
            .then((resp) => {
                context.jueces = resp.data
                console.log(resp.data)
                for (let i of  context.jueces) {
                   // console.log("nombre:"+ i.nombre)
                  //  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
                    i.nombre=i.personaId.nombre+","+i.personaId.apellido;}
            })
            .catch((err) => {
              console.log(err)
            })
    },

    getRoles(context){
        HTTP.get("rolJuez")
            .then((resp) => {
                context.juecesRoles = resp.data
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
        HTTP.get(JUECES + id)
            .then((resp) => {
                console.log(resp)
                context.juez = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    byCircuito(context, id){
        HTTP.get(JUECES+"byCircuito/" + id)
            .then((resp) => {
                
                console.log(resp)
                context.jueces = resp.data;

                console.log(resp.data)
                for (let i of  context.jueces) {
                    console.log("nombre:"+ i.nombre)
                    console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
                    i.nombre=i.personaId.nombre+","+i.personaId.apellido;}
            }
        )
            .catch((err) => {
              console.log(err)
            })

    },
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(JUECES + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminado!", "El Juez ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {   
                          
                swal("No se puede Eliminar!", "Es posible que el Juez este asociado.", "error")
            }) 
    },
     
    

}