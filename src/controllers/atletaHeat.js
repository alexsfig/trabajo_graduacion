// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const FECHAS = 'atletaHeat/'




export default {
    /*
        Use context to update vars dinamyc
    */

    /*
        Method to update user, pass context, object Users and user id
    */

    /*2
        Method to update user, pass context, object Users and user id
    */

    byHeat(context,id){
        HTTP.get("atletaHeat/byHeat/"+id)
            .then((resp) => {
                console.log(resp.data)
                context.atletasHeat = resp.data
              
            })
            .catch((err) => {
              console.log(err)
            })
    },
    

    byHeatAndJuez(context,idheat,idJuez){
        HTTP.get("atletaHeat/byHeatAndJuez/"+idheat+"/"+idJuez)
            .then((resp) => {
                console.log(resp.data)
                context.atletasHeat = resp.data
               
            })
            .catch((err) => {
              console.log(err)
            })
    },
    byHeatAndJuez2(val,idheat,idJuez,n){
        HTTP.get("atletaHeat/byHeatAndJuez/"+idheat+"/"+idJuez)
            .then((resp) => {

                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  "+Number(n))
                console.log(resp.data)
                val.atletasHeatList= resp.data;
                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
                console.log( JSON.stringify(val))
                return resp.data;


            })
            .catch((err) => {
              console.log(err)
            })
    }


}
