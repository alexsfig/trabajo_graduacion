import {HTTP} from '../common_class/http.js';
// Use router 
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const RONDAS = 'ronda/'


export default {
/*

    create(context,heats){
        context.showAlert = false 
        context.showSuccess = false 

        let request={};
        request.circuitoId={id:context.circuito.id};


        request.atletasRonda=context.totalAtletas;
        request.numero=1;
        let heatlist=[];

        let dataheat="";
  

      let num=1;
        for (let i of  heats) {
           
           let heat={};
            heat.numero=num;
            dataheat+=num+",";

            heat.estado="estado"
           // c//onsole.log("numero de heat:::::::" +i[0].numeroHeat)
            heat.atletas=i;
           // console.log(heat.atletas[0])
            if( heat.atletas[0])
            dataheat+= heat.atletas[0].id+"<"+heat.atletas[0].color+"&";
           // heat.atletas[0]={id:heat.atletas[0].id,color:heat.atletas[0].color,estado:0};
            if( heat.atletas[1])
            dataheat+= heat.atletas[1].id+"<"+heat.atletas[1].color+"&";
          //  heat.atletas[1]={id:heat.atletas[1].id,color:heat.atletas[1].color,estado:0};
            if( heat.atletas[2])
            dataheat+= heat.atletas[2].id+"<"+heat.atletas[2].color+"&";
            //heat.atletas[2]={id:heat.atletas[2].id,color:heat.atletas[2].color,estado:0};
            if( heat.atletas[3])
            dataheat+= heat.atletas[3].id+"<"+heat.atletas[3].color+"&";
          //  heat.atletas[3]={id:heat.atletas[3].id,color:heat.atletas[3].color,estado:0};

          dataheat+=">";
            heatlist.push(heat)

            num++;
        }
       request.arrayHeat=dataheat;
  

       console.log(JSON.stringify(request));

        HTTP.post(RONDAS, request)
            .then((resp) => {


                if (resp.status>= 200 && resp.status <=300){
                    context.showSuccess = true
                    context.successMsg = "Ronda Creada con exito Creada"
                  //  context.fetchData()
                   // context.reset()
                    context.$toasted.show("Ronda creada   con exito", { 
                        theme: "primary", 
                        position: "top-right", 
                        duration : 5000
                   });
                  context.volver();
                }
            })
            .catch((err) => {
                if (err.response) {
                    context.showAlert = true
                    context.errMsg = err.response.data
                }
            })
    },


*/

create(context,heats){
    context.showAlert = false 
    context.showSuccess = false 

    let request={};
    request.circuitoId={id:context.circuito.id};


    request.atletasRonda=context.totalAtletas;
    request.numero=1;
    let heatlist=[];

    let dataheat="";


  let num=1;
    for (let i of  heats) {
       
       let heat={};
        heat.numero=num;
        dataheat+=num+",";

        heat.estado="estado"
       // c//onsole.log("numero de heat:::::::" +i[0].numeroHeat)
        heat.atletas=i;
       // console.log(heat.atletas[0])
        if( heat.atletas[0])
        dataheat+= heat.atletas[0].id+"<"+heat.atletas[0].color+"&";
       // heat.atletas[0]={id:heat.atletas[0].id,color:heat.atletas[0].color,estado:0};
        if( heat.atletas[1])
        dataheat+= heat.atletas[1].id+"<"+heat.atletas[1].color+"&";
      //  heat.atletas[1]={id:heat.atletas[1].id,color:heat.atletas[1].color,estado:0};
        if( heat.atletas[2])
        dataheat+= heat.atletas[2].id+"<"+heat.atletas[2].color+"&";
        //heat.atletas[2]={id:heat.atletas[2].id,color:heat.atletas[2].color,estado:0};
        if( heat.atletas[3])
        dataheat+= heat.atletas[3].id+"<"+heat.atletas[3].color+"&";
      //  heat.atletas[3]={id:heat.atletas[3].id,color:heat.atletas[3].color,estado:0};

      dataheat+=">";
        heatlist.push(heat)

        num++;
    }
   request.arrayHeat=dataheat;


   console.log(JSON.stringify(request));

    HTTP.post(RONDAS+"createNew/"+context.circuito.id, dataheat)
        .then((resp) => {


            if (resp.status>= 200 && resp.status <=300){
                context.showSuccess = true
                context.successMsg = "Ronda Creada con exito Creada"
              //  context.fetchData()
               // context.reset()
                  context.$swal("Exito!", "Se genero una nueva ronda", "success")
              context.volver();
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

    ,

    retrieve(context, id){
        HTTP.get("ronda/" + id)
            .then((resp) => {
                console.log(resp)
                context.ronda = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })
    },
    finalizar(context, id, swal) {
   let data=[];
        context.heats.forEach(element => {
            element.atletasHeatList.forEach(item => {


             data.push(item.id+"-"+item.estado);
            });
        });
        HTTP.post("heat/finishRonda/" + id,data)
            .then((resp) => {
                console.log(resp);
                swal("Finalizada!", "La Ronda ha sido finalizada", "success")
                context.volver();
               // context.fetchData();
            })
            .catch((err) => {
                swal("Error!", "Ocurrio un error.", "error")
            })
    }, 
     


}