import Vue from 'vue'
import VueMoment from 'vue-moment'
const moment = require('moment')
require('moment/locale/id')
// import moment from 'moment-timezone'

// Vue.use(VueMoment, {
//     moment,
// })
Vue.use(require('vue-moment'), { moment });