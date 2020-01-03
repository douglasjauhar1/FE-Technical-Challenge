<template>
    <div class="payment">
       <router-link to="/" class="payment__out" @click.native="changelink">
            <i class="fa fa-arrow-left"></i>
            <p>Back to delivery</p>
       </router-link>
       <div class="gridpayment">
           <div class="detailspayment">
               <h1>Shipment</h1>
               <div class="servicepayment">
                   <div class="courir" @click="activate(1)" :class="{active: active_el == 1}">
                    <div>
                       <p>GO-SEND</p>
                       <P>{{this.$store.state.courierprices[0].toLocaleString()}}</P>
                    </div>
                   </div>
                   <div class="courir"  @click="activate(2)" :class="{active: active_el == 2}">
                    <div>
                       <p>JNE</p>
                       <P>{{this.$store.state.courierprices[1].toLocaleString()}}</P>
                    </div>
                   </div>
                   <div class="courir"  @click="activate(3)" :class="{active: active_el == 3}">
                    <div>
                       <p>Personal Courier</p>
                       <P>{{this.$store.state.courierprices[2].toLocaleString()}}</P>
                    </div>
                   </div>
               </div>
               <h1>Payment</h1>
               <div class="shipment">
                   <div class="courirship" @click="payfunc(1)" :class="{activepay: active_ship == 1}">
                       <div>
                         <p>e-wallet</p>
                         <p>{{ewalletsaldo.toLocaleString()}} left</p>
                       </div>
                   </div>
                   <div class="courirship" @click="payfunc(2)" :class="{activepay: active_ship == 2}">
                       <div><p>Bank Transfer</p></div>
                   </div>
                   <div class="courirship" @click="payfunc(3)" :class="{activepay: active_ship == 3}">
                       <div><p>Virtual Account</p></div>
                   </div>
               </div>
           </div>
           <div class="paymentsummary">
               <app-summary v-bind:btntitle="btntitle" v-bind:estimation="estimation" v-bind:linkto="linkto"></app-summary>
           </div>
       </div>
    </div>
</template>

<script>
import summary from '../../components/Summary'
import './style.scss'
export default {
    components: {
        'app-summary': summary
    },
    data(){
        return {
           active_el: 1,
           active_ship: 1,
           btntitle:  'Pay with e-Wallet',
           changebtn: ['Pay with e-Wallet', 'Pay with Bank Transfer', 'Pay with Virtual Account'],
           estimation: 'Delivery estimation',
           totalall: this.$store.state.totalcost,
           linkto: '/done'
        }
    },
    computed: {
        ewalletsaldo(){
          return this.$store.state.ewalletsaldo
        }
    },
    methods: {
        activate(el){
            this.active_el = el;
            this.$store.state.estimate = this.$store.state.dayestimate[el-1];
            this.$store.state.courierchose = this.$store.state.courier[el-1];
            this.$store.state.pricechose = this.$store.state.courierprices[el-1];
            // this.$store.commit('setPayment', this.$store.state.courier[el-1], this.$store.state.courierprices[el-1])
        },
        payfunc(el){
            this.active_ship = el;
            this.btntitle = this.changebtn[el-1]
            this.$store.state.payment = this.$store.state.paymethod[el-1]
       
        },
        changelink(){
            //console.log(this.$store.state.linkto = '/payment')
            this.$store.state.estimate = '';
            this.$store.state.courierchose = '';
            this.$store.state.by = ''
            this.$store.state.shipment = ''
            this.$store.state.totalcost -= this.$store.state.pricechose
            this.$store.state.pricechose = ''
            this.$store.state.linkto = '/payment';
            this.$store.state.btnlink = 'Continue to payment';
        },
    },
    beforeUpdate(){
      this.$store.state.totalcost = this.totalall + this.$store.state.pricechose
    },
    mounted(){
       this.$store.state.pricechose = 15000
       this.$store.state.totalcost = this.totalall + this.$store.state.pricechose
    //    this.$store.state.courierchose = 'GO-SEND'
       this.$store.commit('setCourir')
       this.$store.state.by = 'by'
       this.$store.state.shipment = 'shipment'
       this.$store.state.payment = 'e-Wallet'
    }
}
</script>


