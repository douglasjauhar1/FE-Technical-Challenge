import Delivery from './screens/Delivery/Delivery.vue'
import Payment from './screens/Payment/Payment.vue'
import Done from './screens/Done/Done.vue'
export default [
    {path: '/', component: Delivery },
    {path: '/payment', component: Payment},
    {path: '/done', component: Done}
]