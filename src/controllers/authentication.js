// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router
import {router} from '../router/index.js'
// Define URL to authenticate
const LOGIN_URL = 'login'

export default {

    // Create method to authenticate Users
    /*
    Use the context to redirect after succeded login
    */
    authenticate(context, params){
        context.showAlert = false;

        console.log(params)
        HTTP.post(LOGIN_URL, params )
        .then((resp) => {
            // Use localStorage to save access token, to use in each request
            localStorage.setItem('authorization', resp.data.Authorization)
            var items=resp.data.iduser.split(",");
            localStorage.setItem('iduser', items[0])
            localStorage.setItem('rol', items[1])
            localStorage.setItem('usuario', params.usuario)
            let param = unescape(location.search.split('redirect=')[1])
            if (param !== "undefined") {
                // context.$router.push(param)

                window.location.replace(param);

            }else{
                if( items[1]==1)
                context.$router.push({name: 'Dashboard'})
                if( items[1]==2)
                context.$router.push({name: 'Dashboard2'})

//                window.location.replace('/admin');

            }
        })
        .catch((err) => {
            context.showAlert = true;
            context.errMsg = err.response.data.message;
        })
    },
    signOut(context){
        context.$router.push({name: 'Login'})
        //window.location.replace('/login');
    }

}
