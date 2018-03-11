// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const CATEGORIAS = 'categoria/'




export default {
    /*
        Use context to update vars dinamyc
    */
    /* 
        Use the context to redirect after succeded and update var to use in view
        
        Method to create users, pass object Users
    */
   create(context, categorias){
        context.showAlert = false 
         context.showSuccess = false 
          categorias.id=0;

       if( parseInt(categorias.edadMin) < parseInt(categorias.edadMax))
        {  
         
        HTTP.post(CATEGORIAS, categorias)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Categoria Creada"
                    //context.createCategorias = {}
                    //context.errors.clear()

                    if( categorias.sexo=='M'){
                        context.createCategorias.sexo='Masculino'
                      }

                    if( categorias.sexo=='F'){
                        context.createCategorias.sexo='Femenino'
                      }

                  if( categorias.sexo=='X'){
                        context.createCategorias.sexo='Mixto'
                      }
                  

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


        }

        else

           {

           context.showAlert = true
           context.errMsg = "La Edad Minima de la Categoria no puede ser Mayor o Igual que la Edad Maxima"

           if( categorias.sexo=='M'){
                        context.createCategorias.sexo='Masculino'
                      }

           if( categorias.sexo=='F'){
                        context.createCategorias.sexo='Femenino'
                      }

           if( categorias.sexo=='X'){
                        context.createCategorias.sexo='Mixto'
                      }

           } 
    }, 
    /* 
        Method to update user, pass context, object Users and user id
    */
   
    update(context, categorias){
        context.showAlert = false 
        context.showSuccess = false 

         if( parseInt(categorias.edadMin) < parseInt(categorias.edadMax))
        {  


        HTTP.put(CATEGORIAS, categorias)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                }
                context.showSuccess = true
                context.successMsg = "Categoria Actualizada"

                 if( categorias.sexo=='M'){
                        context.updateCategoria.sexo='Masculino'
                      }

                    if( categorias.sexo=='F'){
                        context.updateCategoria.sexo='Femenino'
                      }

                  if( categorias.sexo=='X'){
                        context.updateCategoria.sexo='Mixto'
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

           }

        else

           {

           context.showAlert = true
           context.errMsg = "La Edad Minima de la Categoria no puede ser Mayor o Igual que la Edad Maxima"



                 if( categorias.sexo=='M'){
                        context.updateCategoria.sexo='Masculino'
                      }

                    if( categorias.sexo=='F'){
                        context.updateCategoria.sexo='Femenino'
                      }

                  if( categorias.sexo=='X'){
                        context.updateCategoria.sexo='Mixto'
                      }


           } 



    }, 
    /* 
        Method to get user, pass only the context, id will be taken from url
    */
    show(context){
        HTTP.get(CATEGORIAS + context.$route.params.id+'/')
            .then((resp) => {
                context.categoria = resp.data


            })
            .catch((err) => {
              console.log(err)
            })
    },  
    /* 
        Method to display all users, pass only the context
    */
   index(context){
        HTTP.get(CATEGORIAS)
            .then((resp) => {
                context.categorias = resp.data
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
        HTTP.get(CATEGORIAS + id)
            .then((resp) => {
                console.log(resp)
                context.categoria = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    }, 
    /* 
        Method to delete user, pass the context and user id, use this method when you need to delete user
    */
    delete(context, id, swal) {
        HTTP.delete(CATEGORIAS + id)
            .then((resp) => {
                console.log(resp);
                swal("Deleted!", "La Categoria ha sido eliminada", "success")
                context.fetchData();
            })
            .catch((err) => {               
                swal("No se puede Eliminar!", "Es posible que la categoria ya este asociada", "error")
            }) 
    } 
    

}