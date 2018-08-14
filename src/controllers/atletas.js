// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
import {UPLOAD} from '../common_class/http.js';
const UPLOAD_URL  = process.env.UPLOAD_URL;
// Use router
import {router} from '../router/index.js'
import moment from 'moment'

// define base url to Employees
const ATLETAS = 'atleta/'

export default {
    create(context, atleta){
        context.showAlert = false
        context.showSuccess = false
        const formData = new FormData()
        let root_path = "persona"
        let filename = context.filename
        formData.append('avatar', context.avatar)
        formData.append('filename', context.filename)
        formData.append('id', "atleta")
        formData.append('root_path', root_path)
        this.upload_avatar(context, formData, root_path)

        UPLOAD.post('upload_avatar', formData)
            .then((resp) => {
              HTTP.post('atleta', atleta)
                  .then((resp) => {
                      context.showSuccess = true
                      context.successMsg = "Atleta creado exitosamente"

                  })
                  .catch((err) => {
                      if (err.response) {
                          context.showAlert = true
                          context.errMsg = err.response.data
                      }
                  })
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })

    },


    /*
        Use context to update vars dinamyc
        Method to update user, pass context, object Users and user id
        Method to update user, pass context, object Users and user id
    */

    update(context, persona){
        context.showAlert = false
        context.showSuccess = false
      /*  if (context.changePhoto == true) {
            const formData = new FormData()
            //let filename =  atletas.rutaFoto.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")fdd
            let root_path = "persona"
            formData.append('avatar', context.avatar)
            formData.append('filename', "filename" )
            formData.append('id', context.atleta.id)

            formData.append('root_path', root_path)
            UPLOAD.post('upload/'+ context.atleta.id,context.avatar)
                .then((resp) => {})
                .catch((err) => {
                    if (err.response) {
                        context.showAlert = true
                        context.errMsg =  "Eroor servicio"
                    }
                })
        }
*/
       // atletas.rutaFoto=atletas;
        HTTP.put("persona", persona)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false

                           context.showSuccess = true
               context.successMsg = "Persona creada exitosamente"
              console.log(resp);
           //   formData.append('id', resp.data.atleta.id)
              console.log("********************");
              // upload_avatar(context, formData, root_path);
                console.log("************///********");
                console.log(String(context.avatar).indexOf(UPLOAD_URL));
                if(String(context.avatar).indexOf(UPLOAD_URL)==-1)
                UPLOAD.post('upload/'+ resp.data.atleta.id,context.avatar)

               .then((resp) => {
                   console.log("estoy en crear personaasljjsll")
                   console.log(atleta)

               })
               .catch((err) => {
                console.log(err)
                   if (err.response) {
                    console.log("estoy en crear personaasljjsllt32y9329y23y9329")
                       context.showAlert = true
                       context.errMsg = err.response.data
                   }
               })

                }
                context.showSuccess = true
                context.successMsg = "Atleta Actualizado"
            })
            .catch((err) => {
                context.showAlert = true
                console.log(err)
                if (err.response) {
                    context.errMsg = "Eroor servicio"
                    context.showAlert = true
                }
            })
    },
    /*
        Method to get user, pass only the context, id will be taken from url
    */
    show(context){
        HTTP.get(ATLETAS + context.$route.params.id+'/')
            .then((resp) => {
                context.atleta = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    edit(context){
        HTTP.get(ATLETAS + context.$route.params.id+'/edit')
            .then((resp) => {
                context.atleta = resp.data

            })
            .catch((err) => {
              console.log(err)
            })
    },
    /*
        Method to display all users, pass only the context
    */
   index(context){
       context.loading = true
        HTTP.get(ATLETAS)
            .then((resp) => {
                context.atletas = resp.data
                for (let i of  context.atletas) {
                    i.nombre = i.personaId.nombre + ", " +i.personaId.apellido;
                }
                context.loading = false
            })
            .catch((err) => {
              console.log(err)
              context.loading = false
              
            })
    },


    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(ATLETAS + id)
            .then((resp) => {
                console.log(resp)
                context.atleta = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },
    byCircuito(context, id){
        HTTP.get(ATLETAS+"byCircuito/" + id)
            .then((resp) => {
                console.log("putaaaaaaaaaaaa")
                console.log(resp)
                context.atletas = resp.data;

                for (let i of  context.atletas) {
                  //  console.log("nombre:"+ i.nombre)
                  //  console.log("Entrada:"+i.personaId.nombre+","+i.personaId.apellido)
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
        HTTP.delete(ATLETAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Eliminado!", "El Atleta ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Error!", "Ocurrio un error.", "error")
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
