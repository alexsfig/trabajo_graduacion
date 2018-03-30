import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const RONDAS = 'ronda/'
import Toasted from 'vue-toasted';

export default {



   byRonda(context,id){
        HTTP.get("heat/byRonda/"+id)
            .then((resp) => {
                context.heats = resp.data

                console.log(resp.data)
                for (let i of  context.heats) {
                i.natletas=Object.keys(i.atletasHeatList).length;
          
            
            }
            })
            .catch((err) => {
              console.log(err)
            })
    }
     ,
     byResumen(context,id){
        HTTP.get("heat/resumen/"+id)
            .then((resp) => {
                context.resumen = resp.data

                console.log(resp.data)
           /*     for (let i of  context.heats) {
                i.natletas=Object.keys(i.atletasHeatList).length;
          
            
            }*/
            })
            .catch((err) => {
              console.log(err)
            })
    },
    finalizar(context,id){
        HTTP.get("heat/finalizar/"+id)
            .then((resp) => {
                context.resumen = resp.data
                context.showSuccess = true
                context.successMsg = "Finalizado exitosamente"
                console.log(resp.data)
           /*     for (let i of  context.heats) {
                i.natletas=Object.keys(i.atletasHeatList).length;
          
            
            }*/
            })
            .catch((err) => {
              console.log(err)
            })
    },
    retrieve(context, id){
        HTTP.get("heat/"+ id)
            .then((resp) => {
                console.log(resp)
                context.heat = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    },

    update(context, heat){
        console.log("Entre y dio true")
        context.showAlert = false 
        context.showSuccess = false 
        let req={
         id:heat.id,
         rondaId:{id:heat.rondaId.id},
         estado:heat.estado,
         numero:heat.numero



        }
        HTTP.put("heat/", req)
            .then((resp) => {
                if (resp.status>= 200 && resp.status <=300){
                    var id = resp.data.id
                    context.showAlert = false 
                    context.$toasted.show("Heat Iniciado  con exito", { 
                        theme: "primary", 
                        position: "top-right", 
                        duration : 5000
                   });
                  context.volver();
                }
               // context.showSuccess = true
               // context.successMsg = "Noticia Actualizada"
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
}