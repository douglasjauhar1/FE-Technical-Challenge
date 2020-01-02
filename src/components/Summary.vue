<template>
  <div class="summary">
      <div class="purchased">
        <h1>Summary</h1>
        <p>{{purchased}} items purchased</p>
      </div>
         <div class="estimation">
             <p>{{estimation}}</p>
             <h2>{{estimate}} {{by}} {{courierchose}}</h2>
         </div>
         <div class="summarypayment">
            <p>{{paytitle}}</p>
            <h2>{{paymethod}}</h2>
         </div>
      <div class="total">
        <div class="cost">
            <p>Cost of goods</p>
            <p>{{cost}}</p>
            <p>{{dropTitle}}</p>
            <p>{{dropFee}}</p>
            <p>{{courierchose}} {{shipment}}</p>
            <p>{{pricechose}}</p>
            <h1>Total</h1>
            <h1>{{totalcomp}}</h1>
        </div>
        <router-link v-bind:class="{hide: hide}" v-bind:to="linkto" v-bind:event="isvalid"><button @click="changebtn">{{btntitle}}</button></router-link>
      </div>
  </div>
</template>

<script>
import './style.scss'
export default {
    props:{
        btntitle: {
            type: String
        },
        estimation: {
            type: String
        },
        linkto: {
            type: String
        },
        hide: {
            type: Boolean
        },
        paytitle: {
            type: String
        },
        paymethod: {
            type: String
        }
    },
    computed: {
        by(){
            return this.$store.state.by
        },
        shipment(){
            return this.$store.state.shipment
        },
        estimate(){
            return this.$store.state.estimate
        },
        courierchose(){
            return this.$store.state.courierchose
        },
        pricechose(){
            if(this.$store.state.pricechose > 0){
                return this.$store.state.pricechose.toLocaleString()
            }
        },
        purchased(){
            return this.$store.state.purchased;
        },
        cost(){
            return this.$store.state.cost.toLocaleString()
        },
        dropTitle(){
            return this.$store.state.dropFee.title
        },
        dropFee(){
            return this.$store.state.dropFee.cost.toLocaleString()
        },
        totalcomp(){
            return this.$store.state.totalcost.toLocaleString()
        },
        link(){
            return this.$store.state.btnlink;
        },
        isvalid(){
            return this.$store.state.isvalid;
        },
    },

    methods:{
        changebtn(){
            console.log(this.$store.state.isvalid)
            if(this.isvalid == 'click'){
                this.$store.state.btnlink = 'Pay with e-Wallet'
                this.$store.state.linkto = '/done'
            }else if(this.isvalid == ''){
                //show error via store (push an error message to state)
            }
            
        }
    },
    
}
</script>

<style scoped lang="scss">

</style>
