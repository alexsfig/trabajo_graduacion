// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
import {UPLOAD} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'

// define base url to Employees
const ATLETAS = 'atleta/'

export default {


    /*
        Method to retrieve user, pass the context and user id, use this method when you need to edit user
    */
    byCategoria(context, id){
        HTTP.get("ranking/byCategory/" + id)
            .then((resp) => {
                console.log(resp)
                context.ranking = resp.data;
            })
            .catch((err) => {
              console.log(err)
            })

    }}