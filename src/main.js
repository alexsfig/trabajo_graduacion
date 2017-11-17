// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as uiv from 'uiv'
import moment from 'moment'
import {HTTP} from './common_class/http.js';
import esp from 'vee-validate/dist/locale/es';
import VueGoodTable from 'vue-good-table'
/* eslint-disable no-new */
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VueGoodTable)

import VueSweetAlert from 'vue-sweetalert'
Vue.use(VueSweetAlert)
Vue.use(uiv)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        
        if (localStorage.authorization == null) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } 
  else {
    next() // make sure to always call next()!
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD hh:mm')
  }
})

// Merge the locales.
Validator.addLocale(esp);

const config = {
    locale: 'es'
};

Vue.use(VeeValidate, config);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: () => ({
    email: '',
    phone: ''
  }),
})
