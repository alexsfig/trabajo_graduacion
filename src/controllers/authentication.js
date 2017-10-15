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
    params: {email: 'jdoe@foo.com', password: '123456'}
    */
    authenticate(context, params){
        context.showAlert = false;
        HTTP.post(LOGIN_URL, params )
        .then((resp) => {
            // Use localStorage to save access token, to use in each request
            localStorage.setItem('authorization', resp.data.Authorization)
            let param = unescape(location.search.split('redirect=')[1])
            if (param !== "undefined") {
                // context.$router.push(param) 
                window.location.replace(param); 

            }else{
                //context.$router.push('/login') 
                window.location.replace('/admin'); 
                  
            }
        })
        .catch((err) => {
            context.showAlert = true;
            context.errMsg = err.response.data.message;
        })
    },
    signOut(context){
        localStorage.removeItem('access_token');
        //context.$router.push('/login')
        window.location.replace('/login');
    }

}
    