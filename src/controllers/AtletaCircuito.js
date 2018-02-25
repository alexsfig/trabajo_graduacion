
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const FECHAS = 'atletaCircuito/'




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

    update(context, atletaCircuitos){
        context.showAlert = false
        context.showSuccess = false
        HTTP.put(FECHAS, atletaCircuitos)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false
                }
                context.showSuccess = true
                context.successMsg = "Entrenador Actualizado"
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
                context.atletaCircuito = resp.data

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
                context.atletaCircuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },
    indexByCircuito(context,id){
        HTTP.get("/atletaCircuito/byCircuito/"+id)
            .then((resp) => {
                console.log(resp.data)
                context.atletaCircuitos = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },
  




 getheat(context,id){  
        
    const color = ['Amarillo', 'Rojo', 'Azul', 'Verde']


        HTTP.get("/atletaCircuito/byCircuito/"+id)
            .then((resp) => {

    
                console.log(resp.data)
                let atletaCircuitos = resp.data

            let n= Math.trunc(Object.keys(atletaCircuitos).length/4)

            
           if(Object.keys(atletaCircuitos).length%4!=0)
              n=n+1;
       let heat=[];
       for (let i=0;i<n;i++) {
        heat[i]=[];
       }
       let aux=0;
       let aux2=0;
       let autoincrement =1;

    for (let i of  atletaCircuitos) {
        i.color = color[aux2]
        i.autoincrement = autoincrement;
          autoincrement++;
        
        heat[aux].push(i);
        aux++;
        if(aux==n){
        aux=0;
        aux2++;
      
}




    }
    context.listheat=heat;

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
                context.atletaCircuito = resp.data;
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
                swal("Deleted!", "El AtletaCircuito ha sido eliminado", "success")
                context.fetchData();
            })
            .catch((err) => {
                swal("Oh snap!", "Ocurrio un error.", "error")
            })
    }, 
    create(context, atletaCircuito){
        context.showAlert = false
        context.showSuccess = false
        atletaCircuito.circuitoId={id:   atletaCircuito.circuitoId.id}
        atletaCircuito.atletaId={id:   atletaCircuito.atletaId.id}
                            HTTP.post(FECHAS, atletaCircuito)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Se agrego correctamente el atleta al circuito"
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