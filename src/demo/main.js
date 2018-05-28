/**
 * Created by Doma on 2016/11/22.
 */
import Vue from 'vue'
import VueAPlayer from '../vue-aplayer.vue'
Vue.config.devtools = true
// VueAPlayer.disableVersionBadge = true

import App from './App.vue'
new Vue({
    el: '#app',
    render: h => h(App)
})
