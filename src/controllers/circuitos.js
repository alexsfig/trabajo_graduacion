
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const FECHAS = 'circuito/'




export default {
    /*
        Use context to update vars dinamyc
    */

    /*
        Method to update user, pass context, object Users and user id
    */

    /*
        Method to update user, pass context, object Users and user id
    */

    update(context, circuitos){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FECHAS, circuitos)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Circuito Actualizado"
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


    updatebyfecha(context, circuitos){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FECHAS, circuitos)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Circuito Actualizado"
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
        HTTP.get(FECHAS + context.$route.params.id+'/')
            .then((resp) => {
                context.circuito = resp.data

            })
            .catch((err) => {
                console.log("Error en el servicio")
              console.log(err)
            })
    },
    /*
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(FECHAS)
            .then((resp) => {
                console.log(resp.data)
                context.circuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },

    byFecha(context,id){
        HTTP.get("circuito/byFecha/"+id)
            .then((resp) => {
                console.log(resp.data)
                context.circuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },
    
    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    retrieve(context, id){
        HTTP.get(FECHAS + id)
            .then((resp) => {
                console.log(resp)
                context.circuito = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },
    /*
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(FECHAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "El Circuito ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("No se puede Eliminar!", "Es posible que el Circuito ya contenga Atletas y Jueces Asignados", "error")
            })
    }, 
    create(context, circuito){
        context.showAlert = false
        context.showSuccess = false
        circuito.id=0;
        //circuito.fechaId={id:circuito.fechaId.id}
        //circuito.categoriaId={id:circuito.categoriaId.id}


         let request={
        fechaId:{id:circuito.fechaId.id},
        categoriaId:{id:circuito.categoriaId.id},
        nombre:circuito.nombre,
        descripcion:circuito.descripcion,
        estado: 'Abierta'

          }


                            HTTP.post(FECHAS, request)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Circuito creado exitosamente"
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

            //



    }

    , 
    createbyfecha(context, circuito){
        context.showAlert = false
        context.showSuccess = false
        circuito.id=0;
   

        let request={
fechaId:{id:context.id},
categoriaId:{id:circuito.categoriaId.id},
nombre:circuito.nombre,
descripcion:circuito.descripcion,
        estado: 'Abierta'

        }
                            HTTP.post(FECHAS, request)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Circuito creado exitosamente"
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

            //



    }


}
