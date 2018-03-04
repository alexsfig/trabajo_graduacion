// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
import {UPLOAD} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const PERSONA = 'persona/'


export default {
    /*
        Use context to update vars dinamyc
    */
    /*
        Use the context to redirect after succeded and update var to use in view

        Method to create PERSONA, pass object Users
    */
    createAtleta(context, atleta){
        context.showAlert = false
        context.showSuccess = false
        const formData = new FormData()
        let root_path = "persona"
        let filename = context.filename
        formData.append('avatar', context.avatar)
        formData.append('filename', context.filename)
        
        formData.append('root_path', "C:\\data\\images")
       // this.upload_avatar(context, formData, root_path)
       HTTP.post('persona', atleta)
       .then((resp) => {
           if (resp.status>= 200 && resp.status <=300){


               context.showSuccess = true
               context.successMsg = "Persona creada exitosamente333"
              console.log(resp);
              formData.append('id', resp.data.atleta.id)
              console.log("********************");
              // upload_avatar(context, formData, root_path);
                console.log("************///********");
               UPLOAD.post('upload_avatar', formData)


               .then((resp) => {
                   console.log("estoy en crear personaasljjsll")
                   console.log(atleta)
            
               })
               .catch((err) => {
                   if (err.response) {
                    console.log("estoy en crear personaasljjsllt32y9329y23y9329")
                       context.showAlert = true
                       context.errMsg = err.response.data
                   }
               })
   
               
               context.fetchData()
               context.resetForm()
               console.log("Saliendo");
           }
       })
       .catch((err) => {
           if (err.response) {
               context.showAlert = true
               context.errMsg = err.response.data
           }
       })
    
    },
    createJuez(context, juez){
        context.showAlert = false
        context.showSuccess = false
        HTTP.post('persona', juez)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Persona creada exitosamente"
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
    },
    createEntrenador(context, entrenador){
        context.showAlert = false
        context.showSuccess = false
    /*let temp=entrenador;

   
    let obj =temp.personaId;


    obj.entrenador=entrenador;
    console.log("locuraas");
console.log(obj);
        */
            HTTP.post('persona', entrenador)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Persona creada exitosamente"
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
    },
    createMiembroJunta(context, miembroJunta){
        context.showAlert = false
        context.showSuccess = false
        HTTP.post('persona', miembroJunta)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Persona creada exitosamente"
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
    },
    /*
        Method to update user, pass context, object Users and user id
    */

    update(context, user){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(PERSONA, user)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Persona Actualizada exitosamente"
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
        HTTP.get(PERSONA + context.$route.params.id+'/')
            .then((resp) => {
                context.user = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to display all PERSONA, pass only the context
    */
    index(context){
        HTTP.get(PERSONA)
            .then((resp) => {
                context.personas = resp.data
                //return  resp.data
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(PERSONA + id)
            .then((resp) => {
                console.log(resp)
                context.persona = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },

    patch(context, persona){
        HTTP.get(PERSONA + persona.id)
            .then((resp) => {
                resp.data.nombre=persona.nombre;
                resp.data.apellido=persona.apellido;
                resp.data.correo=persona.correo;
                resp.data.telefono=persona.apellido;
                resp.data.dui=persona.dui;
                resp.data.nit=persona.apellido;
                resp.data.fechaNacimiento=persona.fechaNacimiento;
                resp.data.direccion=persona.direccion;
                this.update(context,resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(PERSONA + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminacion exitosa!", "La persona ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    },
    upload_avatar(context, formData, root_path){
        UPLOAD.post('upload_avatar', formData)
            .then((resp) => {
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    }


}
