// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
import {UPLOAD} from '../common_class/http.js';

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

    update(context, atletas){
        context.showAlert = false
        context.showSuccess = false
        if (context.changePhoto == true) {
            const formData = new FormData()
            let filename =  atletas.rutaFoto.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")
            let root_path = "persona"
            formData.append('avatar', context.avatar)
            formData.append('filename', filename )
            formData.append('id', "atleta")
            formData.append('root_path', root_path)
            UPLOAD.post('upload_avatar', formData)
                .then((resp) => {})
                .catch((err) => {
                    if (err.response) {
                        context.showAlert = true
                        context.errMsg = err.response.data
                    }
                })
        }
        HTTP.put(ATLETAS, atletas)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Atleta Actualizado"
            })
            .catch((err) => {
                context.showAlert = true
                if (err.response) {
                    context.errMsg = err.response.data
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
        HTTP.get(ATLETAS)
            .then((resp) => {
                context.atletas = resp.data
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
        HTTP.get(ATLETAS + id)
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
        HTTP.delete(ATLETAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El Atleta ha sido eliminado", "success")
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
