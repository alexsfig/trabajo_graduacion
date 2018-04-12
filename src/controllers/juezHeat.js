// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
import mismo from './juezHeat'
// define base url to Employees
const JUECESHEAT = 'juecesHeat/'
import Toasted from 'vue-toasted';



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
    calcularNota(a){
        let total=0;
        
        a.forEach(f=>{
        
        total=total+f;
        
        })
        console.log("total:"+total+ "  :"+Math.max.apply(null,a)+"  :"+Math.min.apply(null,a))
       /* if(r.total)
        r.total+=total;
        else
        r.total=total;*/
        return  (total-Math.max.apply(null,a)-Math.min.apply(null,a))/(a.length-2)
                    },
    byHeat(context,id){
      var promises=[];
        HTTP.get('/juecesHeat/byHeatAll/'+id)
            .then((resp) => {
               
                console.log(resp.data)
                resp.data.forEach(element => {
                    console.log("promesas")
                    promises.push(HTTP.get("atletaHeat/byHeatAndJuez/"+id+"/"+element.id))
                });
                let n=0;
                axios.all(promises).then(function(results) {
                    results.forEach(function(response) {
                      //  console.log("promesas2"+  context.juecesHeat+"   dkss")
                  //    if(n==0){
                     //     for(let m of response.data){
                            //context.resumen.push({color:m.color,nota:{ola1:[],ola2:[],ola3:[],ola4:[],ola5:[],ola6:[],
                       //         ola7:[],ola8:[],ola9:[],ola10:[]}});
                     //     }
                       
                    
                //    }

                    resp.data[n].puntuacionList = response.data
                       
                    n++;
                })});

                 /*   console.log("caronte")
                    console.log(response.data)
                    let au=0;
                    /*context.resumen.forEach(
                        function(opt) {
                     opt.persona=   response.data[au];
                      opt.nota.ola1.push(response.data[au].puntuacionList[0]?response.data[au].puntuacionList[0][1]:0);
           
                      opt.nota.ola2.push(response.data[au].puntuacionList[1]?response.data[au].puntuacionList[1][1]:0);
                      opt.nota.ola3.push(response.data[au].puntuacionList[2]?response.data[au].puntuacionList[2][1]:0);
                      opt.nota.ola4.push(response.data[au].puntuacionList[3]?response.data[au].puntuacionList[3][1]:0);
                      opt.nota.ola5.push(response.data[au].puntuacionList[4]?response.data[au].puntuacionList[4][1]:0);
                      opt.nota.ola6.push(response.data[au].puntuacionList[5]?response.data[au].puntuacionList[5][1]:0);
                      opt.nota.ola7.push(response.data[au].puntuacionList[6]?response.data[au].puntuacionList[6][1]:0);
                      opt.nota.ola8.push(response.data[au].puntuacionList[7]?response.data[au].puntuacionList[7][1]:0);
                      opt.nota.ola9.push(response.data[au].puntuacionList[8]?response.data[au].puntuacionList[8][1]:0);
                      opt.nota.ola10.push(response.data[au].puntuacionList[9]?response.data[au].puntuacionList[9][1]:0);
                          

                      au++;
                        }
                    );
*/

                //    context.resumen[n].nota.ola1.push(response.data[0].puntuacionList)
                 
                  

              /*      context.resumen.forEach(r=>{
                        let max1=0;
                          let max2=1;
                          let max1v=0;
                          let max2v=0;
                        console.log("Entre al final")
                      r.final=[];  
                      r.final.push({nota:mismo.calcularNota(r.nota.ola1)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola2)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola3)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola4)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola5)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola6)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola7)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola8)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola9)});
                      r.final.push({nota:mismo.calcularNota(  r.nota.ola10)});
                      if(r.final[0].nota>=r.final[1].nota)
                      {
                           max1=0;
                           max2=1;
                           max1v=r.final[0].nota;
                           max2v=r.final[1].nota;
    
    
                      }
                      else{
                         max1=1;
                         max2=0;
                         max1v=r.final[1].nota;
                         max2v=r.final[0].nota;
    
                      }
                     for(let i=2;i<r.final.length;i++){
               if( r.final[i].nota> max2v){
                 max2=i;
                 max2v=r.final[i].nota;
    
               }
    
               if( r.final[i].nota> max1v){
                max2=max1;
                max2v=max2v;
            
                max1=i;
                max1v=r.final[i].nota;
    
                
    
              }}
              if(max2v>0)
              {
                let nfinal=(max1v+max2v)/2
                r.tfinal={nota:nfinal}
                r.final[max1].max=true;
                r.final[max2].max=true;
              }
              else
              {
                r.final[max1].max=true;
                r.tfinal={nota:max1v};  
              }
                  });
                context.resumen.sort(function(a, b) {
                   console.log("ordenando");
                return parseFloat(b.tfinal.nota) - parseFloat(a.tfinal.nota);
            });


            context.resumen[0].tfinal.max=true;
            
            context.resumen[1].tfinal.max=true;



                    });


                    */
                     
             
                  context.juecesHeat = resp.data
              //  context.juecesHeat=[]
            })
            .catch((err) => {
              console.log(err)
            })
    }
}