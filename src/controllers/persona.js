// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
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
    create(context, atleta){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.post(PERSONA, atleta)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "persona Creada"
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
    createJuez(context, juez){
        context.showAlert = false 
        context.showSuccess = false 
        HTTP.post(PERSONA, juez.personaId)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    HTTP.get(PERSONA)
                        .then((resp) => {
                            let personas = resp.data
                            let id = personas[personas.length -1]
                            context.juez_id = id.id
                            juez.personaId = id
                            context.juez.personaId = id
                            HTTP.post('juez', juez)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "persona Creada"
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

                        })
                        .catch((err) => {
                          console.log(err)
                        })
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
        HTTP.post(PERSONA, entrenador.personaId)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    HTTP.get(PERSONA)
                        .then((resp) => {
                            let personas = resp.data
                            let id = personas[personas.length -1]
                            context.juez_id = id.id
                            entrenador.personaId = id
                            context.entrenador.personaId = id
                            HTTP.post('entrenador', entrenador)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "persona Creada"
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

                        })
                        .catch((err) => {
                          console.log(err)
                        })
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
        HTTP.post(PERSONA, entrenador.personaId)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    HTTP.get(PERSONA)
                        .then((resp) => {
                            let personas = resp.data
                            let id = personas[personas.length -1]
                            context.juez_id = id.id
                            entrenador.personaId = id
                            context.entrenador.personaId = id
                            HTTP.post('entrenador', entrenador)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "persona Creada"
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

                        })
                        .catch((err) => {
                          console.log(err)
                        })
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
        HTTP.post(PERSONA, miembroJunta.personaId)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    HTTP.get(PERSONA)
                        .then((resp) => {
                            //context.miembroJuntas = resp.data
                            //return  resp.data
                            let personas = resp.data
                            let id = personas[personas.length -1]
                            miembroJunta.personaId = id
                            HTTP.post('miembroJunta', miembroJunta)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "persona Creada"
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

                        })
                        .catch((err) => {
                          console.log(err)
                        })
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
                context.successMsg = "Usuario Actualizado"
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
                console.log('mmmmmmmmmmmmm')
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
        HTTP.get(PERSONA + id)
            .then((resp) => {
                console.log(resp)
                context.atleta = resp.data;
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
                swal("Deleted!", "El usuario ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }
    

}