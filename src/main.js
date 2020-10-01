import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import Preloader from './components/ui-kit/Preloader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Preloader', Preloader)

firebase.initializeApp({
  apiKey: 'AIzaSyBlg1fr0r1V4c2OabhpeWhTlifuCA0-Zg0',
  authDomain: 'vue-bookkeeping-vadim.firebaseapp.com',
  databaseURL: 'https://vue-bookkeeping-vadim.firebaseio.com',
  projectId: 'vue-bookkeeping-vadim',
  storageBucket: 'vue-bookkeeping-vadim.appspot.com',
  messagingSenderId: '32818428142',
  appId: '1:32818428142:web:23f86625f9296bc4965bff',
  measurementId: 'G-5PBZ795RM1'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
