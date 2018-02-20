// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const JUNTAMIEMBROS = 'miembroJunta/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /*
        Use the context to redirect after succeded and update var to use in view

        Method to create users, pass object Users
    */
    create(context, miembroJunta){
        context.showAlert = false
        context.showSuccess = false
        miembroJunta.personaId.fechaNacimiento = moment(miembroJunta.personaId.fechaNacimiento ).format('YYYY-MM-DD');
       if (miembroJunta.personaId.atleta)
        miembroJunta.personaId.atleta={id:miembroJunta.personaId.atleta.id};
       
        if (miembroJunta.personaId.entrenador)
        miembroJunta.personaId.entrenador={id:miembroJunta.personaId.entrenador.id};

        if (miembroJunta.personaId.juez)
        miembroJunta.personaId.juez={id:miembroJunta.personaId.juez.id};

        if (miembroJunta.personaId.miembroJunta)
        miembroJunta.personaId.miembroJunta={id:miembroJunta.personaId.miembroJunta.id};
       
/* if (miembroJunta.personaId.entrenador)
        miembroJunta.personaId.entrenador=null;
        miembroJunta.personaId.juez=null;
        miembroJunta.personaId.miembroJunta=null;*/
        HTTP.post(JUNTAMIEMBROS, miembroJunta)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Miembro Junta Creado"
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

    update(context, juntamiembros){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(JUNTAMIEMBROS, juntamiembros)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Miembro Actualizado"
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
        HTTP.get(JUNTAMIEMBROS + context.$route.params.id+'/')
            .then((resp) => {
                context.miembrojunta = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(JUNTAMIEMBROS)
            .then((resp) => {
                context.juntamiembros = resp.data
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
        HTTP.get(JUNTAMIEMBROS + id)
            .then((resp) => {
                console.log(resp)
                context.miembrojunta = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(JUNTAMIEMBROS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El miembro ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }


}
