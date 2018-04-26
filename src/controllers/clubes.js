// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const ESCUELAS = 'club/'
const ASOCIAR = 'atleta/asociar/'
const SINCLUB = 'atleta/byNoClub/'
const CONCLUB = 'atleta/byClub/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
    create(context, clubs){
        context.showAlert = false 
         context.showSuccess = false 
          //clubs.id= 0;
          /* console.log(localStorage.getItem('entidadId'));
          clubs.entidadId= parseInt(localStorage.getItem('entidadId'));
           console.log(localStorage.getItem('playaId'));
          clubs.playaId= parseInt(localStorage.getItem('playaId'));
           console.log(localStorage.getItem('entrenadorId'));
          clubs.entrenadorId= parseInt(localStorage.getItem('entrenadorId'));
          //noticias.fechaInicio = moment(noticias.fechaInicio).format('YYYY-MM-DD');*/

          let request={
              
            celular:clubs.celular,
            direccion:clubs.direccion,
            correo:clubs.correo,
            entrenadorId:{id:clubs.entrenadorId.id},
            playaId:{id:clubs.playaId.id},
            fundacion:clubs.fundacion,
            nombre:clubs.nombre,
            representante:clubs.representante,
            telefonoFijo:clubs.telefonoFijo
          }
        HTTP.post(ESCUELAS, request)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Club Creado"
                    context.createClubs = {}
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
    asociar(context, atletaClub){
        context.showAlert = false
        context.showSuccess = false
        
                            HTTP.post(ASOCIAR, atletaClub)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.atleta={id:-1,nombre:'Seleciona un atleta'};
                                    context.successMsg = "Se Agrego Correctamente el Atleta al Club"
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
            club:0
          }
        
                            HTTP.post(ASOCIAR, request)
                            .then((resp) => {
                            console.log(resp);
                            swal("Deleted!", "El Atleta ha sido Dado de baja en el Club", "success")
                            context.fetchData();
                                   })
                              .catch((err) => {   
                              console.log(err)            
                                swal("Error!", "Es posible que el atleta ya este asociado", "error")
                                      }) 

            //



    },
   
    update(context, clubs){
        context.showAlert = false 
        context.showSuccess = false 
        let request={
            id:clubs.id,
            celular:clubs.celular,
            direccion:clubs.direccion,
            correo:clubs.correo,
            entrenadorId:{id:clubs.entrenadorId.id},
            playaId:{id:clubs.playaId.id},
            fundacion:clubs.fundacion,
            nombre:clubs.nombre,
            representante:clubs.representante,
            telefonoFijo:clubs.telefonoFijo
          }
        HTTP.put(ESCUELAS, request)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Club actualizado"
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
                context.club = resp.data


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
                context.clubs = resp.data
                console.log(resp.data)
                for (let i of  context.clubs) {
                    i.entrenadorId.nombre=i.entrenadorId.personaId.nombre+"," +i.entrenadorId.personaId.apellido;

                }
            })
            .catch((err) => {
              console.log(err)
            })
    },

    sinclub(context){
        HTTP.get(SINCLUB)
            .then((resp) => {
                context.sinclubes = resp.data
                console.log(resp.data)
                for (let i of  context.sinclubes) {
                    i.nombre=i.personaId.nombre+"," +i.personaId.apellido;

                }
            })
            .catch((err) => {
              console.log(err)
            })
    },

    conclub(context, id){
        HTTP.get(CONCLUB + id)
            .then((resp) => {
                context.conclubes = resp.data
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
                context.club = resp.data;
                context.club.entrenadorId.nombre= context.club.entrenadorId.personaId.nombre+"," + context.club.entrenadorId.personaId.apellido;
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
                swal("Deleted!", "La Club ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("Oh snap!", "Ocurrio un error.", "error")
            }) 
    } 
    

}