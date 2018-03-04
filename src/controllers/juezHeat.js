// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
import atletas from './atletaHeat'
// define base url to Employees
const JUECESHEAT = 'juecesHeat/'




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

    create(context, juecesHeat){
      
                            HTTP.post(JUECESHEAT, juecesHeat)
                            .then((resp) => {
                                if (resp.status>= 200 && resp.status <=300){
                                    context.showSuccess = true
                                    context.successMsg = "Se agrego correctamente el juez al circuito"
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



    },
    byHeat(context,id){
      var promises=[];
        HTTP.get('/juecesHeat/byHeatAll/'+id)
            .then((resp) => {
                context.juecesHeat = resp.data
                console.log(resp.data)
                context.juecesHeat.forEach(element => {
                    console.log("promesas")
                    promises.push(HTTP.get("atletaHeat/byHeatAndJuez/"+id+"/"+element.id))
                });
                let n=0;
                axios.all(promises).then(function(results) {
                    results.forEach(function(response) {
                        console.log("promesas2"+  context.juecesHeat+"   dkss")
                        context.juecesHeat[n].puntuacionList = response.data;
                        n++;
                    })
                });
                
              //  context.juecesHeat=[]
            })
            .catch((err) => {
              console.log(err)
            })
    }
}