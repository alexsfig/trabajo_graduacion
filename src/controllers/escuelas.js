// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const ESCUELAS = 'escuela/'
const ASOCIAR = 'atleta/asociar/'
const SINESCUELA = 'atleta/byNoEscuela/'
const CONESCUELA = 'atleta/byEscuela/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
    create(context, escuelas){
        context.showAlert = false 
         context.showSuccess = false 
          //escuelas.id= 0;
          /* console.log(localStorage.getItem('entidadId'));
          escuelas.entidadId= parseInt(localStorage.getItem('entidadId'));
           console.log(localStorage.getItem('playaId'));
          escuelas.playaId= parseInt(localStorage.getItem('playaId'));
           console.log(localStorage.getItem('entrenadorId'));
          escuelas.entrenadorId= parseInt(localStorage.getItem('entrenadorId'));
          //noticias.fechaInicio = moment(noticias.fechaInicio).format('YYYY-MM-DD');*/
          let request={
            celular:escuelas.celular,
            direccion:escuelas.direccion,
            correo:escuelas.correo,
            entrenadorId:{id:escuelas.entrenadorId.id},
            playaId:{id:escuelas.playaId.id},
            fundacion:escuelas.fundacion,
            nombre:escuelas.nombre,
            representante:escuelas.representante,
            telefonoFijo:escuelas.telefonoFijo
          }
        HTTP.post(ESCUELAS, request)
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

     

     asociar(context, atletaEscuela){
        context.showAlert = false
        context.showSuccess = false
        
                            HTTP.post(ASOCIAR, atletaEscuela)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.atleta={id:-1,nombre:'Seleciona un atleta'};
                                    context.successMsg = "Se Agrego Correctamente el Atleta a la Escuela"
                                    context.fetchData()
                            //  context.$router.go()
                                  //  contextvm.$forceUpdate();
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

    desasociar(context, idatleta,swal){
        
        

        let request={
            atleta:idatleta,
            escuela:0
          }
        
                            HTTP.post(ASOCIAR, request)
                            .then((resp) => {
                            console.log(resp);
                            swal("Deleted!", "El Atleta ha sido Dado de baja en la Escuela", "success")
                            context.fetchData();
                                   })
                              .catch((err) => {   
                              console.log(err)            
                               swal("Error!", "Es posible que el atleta ya este asociado", "error")
                                      }) 

            //



    },
    /* 
        Method to update user, pass context, object Users and user id
    */
   
    update(context, escuelas){
        context.showAlert = false 
        context.showSuccess = false 
        let request={
            id:escuelas.id,
            celular:escuelas.celular,
            direccion:escuelas.direccion,
            correo:escuelas.correo,
            entrenadorId:{id:escuelas.entrenadorId.id},
            playaId:{id:escuelas.playaId.id},
            fundacion:escuelas.fundacion,
            nombre:escuelas.nombre,
            representante:escuelas.representante,
            telefonoFijo:escuelas.telefonoFijo
          }
        HTTP.put(ESCUELAS, request)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Escuela actualizada"
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
        HTTP.get(ESCUELAS + context.$route.params.id+'/')
            .then((resp) => {
                context.escuela = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(ESCUELAS)
            .then((resp) => {
                context.escuelas = resp.data
                console.log(resp.data)
                for (let i of  context.escuelas) {
                    i.entrenadorId.nombre=i.entrenadorId.personaId.nombre+"," +i.entrenadorId.personaId.apellido;

                }
            })
            .catch((err) => {
              console.log(err)
            })
    },

    sinescuela(context){
        HTTP.get(SINESCUELA)
            .then((resp) => {
                context.sinescuelas = resp.data
                console.log(resp.data)
                for (let i of  context.sinescuelas) {
                    i.nombre=i.personaId.nombre+"," +i.personaId.apellido;

                }
            })
            .catch((err) => {
              console.log(err)
            })
    },

    conescuela(context, id){
        HTTP.get(CONESCUELA + id)
            .then((resp) => {
                context.conescuelas = resp.data
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
        HTTP.get(ESCUELAS + id)
            .then((resp) => {
                console.log(resp)
                context.escuela = resp.data;
                context.escuela.entrenadorId.nombre= context.escuela.entrenadorId.personaId.nombre+"," + context.escuela.entrenadorId.personaId.apellido;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(ESCUELAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "La Escuela ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            }) 
    }
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */


}