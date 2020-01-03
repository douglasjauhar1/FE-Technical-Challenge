<template>
  <div class="delivery">
    <a href="#" class="backdelivery">
       <i class="fa fa-arrow-left"></i>
       <p>Back to cart</p>
    </a>
    <div class="griddelivery">
      <div class="detaildelivery">
        <h1>Delivery details</h1>
        <div class="inputdelivery">
          <div class="group" :class="{valid: valid.nameval, notvalid: notvalid.nameval}">
            <input type="text" required v-model="user.name" @keyup="nameValid" spellcheck="false">
            <label>Name</label>
              <p v-if="user.name !='' && valid.nameval==false">Name too short</p>
          </div>
          <div class="group" :class="{valid: valid.emailval, notvalid: notvalid.emailval}">
            <input type="text" required v-model="user.email"  @keyup="emailValid"  spellcheck="false">
            <label>Email</label>
            <p v-if="user.email !='' && valid.emailval==false">Email is not valid</p>
          </div>
          <div class="group" :class="{valid: valid.phoneval, notvalid: notvalid.phoneval}">
            <input type="text" required v-model="user.phone" @keyup="phoneValid" spellcheck="false">
            <label>Phone Number</label>
            <p v-if="user.phone !='' && valid.phoneval==false">Phone NUmber is not valid</p>
          </div>
          <div class="text-area" :class="{valid: valid.addressval, notvalid: notvalid.addressval}">
            <textarea spellcheck="false" placeholder="Delivery Address" required v-model="user.address" @keyup="addrValid"></textarea>
            <p>{{addrcount.used}}/{{addrcount.left}}</p>
            <p v-if="user.address == ''">Required</p>
            <p v-if="user.address !='' && addrcount.used>120">Maximum of 120 Characters</p>
          </div>
        </div>
      </div>
      <div class="dropship">
        <div class="checkbox">
          <label>Send as dropshipper <span @click="isChecked"><div v-if="checked"></div></span></label>
        </div>
        <div class="inputdelivery" v-if="checked">
          <div class="group" :class="{valid: valid.droname, notvalid: notvalid.droname}">
            <input type="text" required v-model="user.droname" @keyup="nameDropValid" spellcheck="false">
            <label>Dropshipper Name</label>
           <p v-if="user.droname !='' && valid.droname==false">Name too short</p>
          </div>
          <div class="group" :class="{valid: valid.drophone, notvalid: notvalid.drophone}">
            <input type="text" required v-model="user.drophone" @keyup="phoneDropValid" spellcheck="false">
            <label>Dropshipper Phone Number</label>
            <p v-if="user.drophone !='' && valid.drophone==false">Phone Number is not valid</p>
          </div>
        </div>
      </div>
      <div class="paymentsummary">
        <app-summary v-bind:btntitle="btntitle" v-bind:linkto="linkto"></app-summary>
      </div>
    </div>
  </div>
</template>

<script>
import summary from '../../components/Summary'
import './style.scss'
export default {
  data(){
    return {
      btntitle: 'Continue to payment',
      linkto: '/payment',
      show: false
    }
  },
  components: {
    'app-summary': summary,
  },
  computed: {
    checked(){
      return this.$store.state.checked;
    },
    dropFee(){
      return this.$store.state.dropFee;
    },
    cost(){
      return this.$store.state.cost;
    },
    totalcost(){
      return this.$store.state.totalcost;
    },
    user(){
      return this.$store.state.user;
    },
    valid(){
      return this.$store.state.valid;
    },
    notvalid(){
      return this.$store.state.notvalid;
    },
    addrcount(){
      return this.$store.state.addrcount;
    },
    purchased(){
      return this.$store.state.purchased;
    },
    btnlink(){
      return this.$store.state.btnlink;
    },
    isvalid(){
      return this.$store.state.isvalid;
    },
    
  },
  methods: {
    isChecked(){
      console.log(this.$store)
      this.$store.state.checked = this.$store.state.checked ? false: true
      if(this.checked){
        this.$store.state.dropFee.title = 'Dropshipping Fee';
        this.$store.state.dropFee.cost = 5900
        if(this.user.droname == '' || this.user.drophone == ''){
          this.$store.state.isvalid = ''
        }
      }else{
        this.$store.state.dropFee.title = '';
        this.$store.state.dropFee.cost = ''
      }
      this.$store.state.totalcost = parseInt(this.cost + this.dropFee.cost);
    },
    addrValid(){
        if(this.user.address == '' || this.user.address.length > 120){
        this.notvalid.addressval = true;
        this.valid.addressval = false;
      }else{
        this.notvalid.addressval = false;
        this.valid.addressval = true;
        this.btnCLikc()
      }
      this.addrcount.used = this.user.address.length;

    },
    emailValid() {
      const emailRegex = /^[a-z]+((_|\.|-)?[a-z\d]+)*@[a-z\d]+((-)?[a-z\d]+)*\.[a-z]{2,8}(\.[a-z]{2,8})?$/;
      let emailIsValid = emailRegex.test(this.user.email)
      if(this.user.email == '' || !emailIsValid){
        this.notvalid.emailval = true;
        this.valid.emailval= false;
      }else{
        this.notvalid.emailval = false;
        this.valid.emailval = true;
        this.btnCLikc()
      }
    },
    phoneValid() {
      const phoneRegex = /^(0|\+62|\(\d{3,4}\))[\d\-]{5,19}$/;
      let phoneIsValid = phoneRegex.test(this.user.phone);
      if(this.user.phone == '' || !phoneIsValid){
        this.notvalid.phoneval = true;
        this.valid.phoneval = false;
      }else{
        this.notvalid.phoneval = false;
        this.valid.phoneval = true;
        this.btnCLikc()
      }
    },
    nameValid(){
      // this.$store.commit('resetName')
      if(this.user.name == ''){
        this.notvalid.nameval = false;
        this.valid.nameval = false;
      }if(this.user.name.length <= 3){
        this.notvalid.nameval = true;
        this.valid.nameval = false;
      }else{
        this.notvalid.nameval = false;
        this.valid.nameval = true;
        this.btnCLikc()
      }
      },
    nameDropValid(){
    if(this.user.droname == ''){
      this.valid.droname = false;
      this.notvalid.droname = false
    }if(this.user.droname <= 3){
      this.valid.droname = false;
      this.notvalid.droname = true
    }else{
      this.valid.droname = true;
      this.notvalid.droname = false;
      this.btnCLikc()
      }
    },
    phoneDropValid(){
      const phoneRegex = /^(0|\+62|\(\d{3,4}\))[\d\-]{5,19}$/;
      let isValidPhoneDrop = phoneRegex.test(this.user.drophone);
      if(this.user.drophone =='' || !isValidPhoneDrop){
        this.valid.drophone = false;
        this.notvalid.drophone = true
      }else{
        this.valid.drophone = true;
        this.notvalid.drophone = false;
        this.btnCLikc()
      }
    },
    btnCLikc() {
      if (this.valid.nameval && this.valid.phoneval && this.valid.emailval && this.valid.addressval) {
        this.$store.commit('setValid', 'click')
      } else {
        this.$store.state.isvalid = ''
        this.$store.commit('setValid', '')
      }
      if (this.checked) {
        if (this.valid.nameval && this.valid.phoneval && this.valid.emailval && this.valid.addressval && this.valid.droname && this.valid.drophone ) {
          this.$store.commit('setValid', 'click')
        } else {
          this.$store.state.isvalid = ''
          this.$store.commit('setValid', '')
        }
      }
    }
  } 
}
</script>
