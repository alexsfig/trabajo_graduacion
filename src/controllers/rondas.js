import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const RONDAS = 'ronda/'


export default {


    create(context,heats){
        context.showAlert = false 
        context.showSuccess = false 

        let request={};
        request.circuitoId=context.circuito;
        request.atletasRonda=context.totalAtletas;
        request.numero=1;
        let heatlist=[];
  


        for (let i of  heats) {
           
           let heat={};
            heat.numero=i[0].numeroHeat;
           // c//onsole.log("numero de heat:::::::" +i[0].numeroHeat)
            heat.atletas=i;
           // console.log(heat.atletas[0])
            if( heat.atletas[0])
            heat.atletas[0]={id:heat.atletas[0].id,color:heat.atletas[0].color};
            if( heat.atletas[1])
            heat.atletas[1]={id:heat.atletas[1].id,color:heat.atletas[1].color};
            if( heat.atletas[2])
            heat.atletas[2]={id:heat.atletas[2].id,color:heat.atletas[2].color};
            if( heat.atletas[3])
            heat.atletas[3]={id:heat.atletas[3].id,color:heat.atletas[3].color};


            heatlist.push(heat)


        }
       request.heatList=heatlist;
  

       console.log(JSON.stringify(request));

        HTTP.post(RONDAS, request)
            .then((resp) => {


                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Ronda Creada con exito Creada"
                    context.fetchData()
                    context.reset()
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    },



   byCircuito(context,id){
        HTTP.get("ronda/byCircuito/"+id)
            .then((resp) => {
                context.rondas = resp.data
                console.log(resp.data)
            })
            .catch((err) => {
              console.log(err)
            })
    }
     


}