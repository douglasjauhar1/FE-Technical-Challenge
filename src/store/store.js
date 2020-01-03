import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VuexPersist from 'vuex-persist'


Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

export const store = new Vuex.Store({
    state: {
        btnlink: 'Continue to payment',
        linkto: '/payment',
        purchased: 10,
        isvalid: '',
        cost: 500000,
        dropFee:{
          title: '',
          cost: ''
        },
        totalcost: 500000,
        checked: false,
        addrcount:{
          used: 0,
          left: 120
        },
        valid: {
          nameval: false,
          emailval: false,
          phoneval: false,
          addressval: false,
          droname: false,
          drophone: false
        },
        notvalid: {
          nameval: false,
          emailval: false,
          phoneval: false,
          addressval: false,
          droname: false,
          drophone: false
        },
        user: {
          name: '',
          phone: '',
          email: '',
          address: '',
          droname: '',
          drophone: ''
        },
        ewalletsaldo: 1500000,
        estimate: '',
        dayestimate: ['today', '2 days', '1 day'],
        daysCome : '',
        courierchose: '',
        courier: ['GO-SEND', 'JNE', 'Personal Courier'],
        courierprices: [15000, 9000, 29000],
        pricechose: '',
        payment: '',
        paymethod: ['e-Wallet', 'Bank Transfer', 'Virtual Account'],
        by: '',
        shipment: ''
      },
      mutations: {
        setValid (state, arg) {
          state.isvalid = arg
        },
        resetState (state){
          state.user.phone = ''
          state.user.email = ''
          state.user.address = ''
          state.user.droname = ''
          state.user.drophone = ''
        },
        resetName (state) {
          state.user.name = ''
          state.valid.nameval = false
          state.notvalid.nameval = false
        },
        setPayment (state, priceChoice, courier){
          state.pricechose = priceChoice
          state.courierchose = courier
        },
        setEstimate(state){
          state.estimate = ''
          state.daysCome = ''
        },
        dayCome(state){
          state.daysCome = ''
        },
        setCourir(state){
          state.courierchose = ''
        }
      },
    plugins: [createPersistedState()]
})