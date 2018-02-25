import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const RONDAS = 'ronda/'


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


}