import { createApp } from 'vue'
import './style.css'
import CryptoApi from './components/CryptoApi.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(CryptoApi)
.use(VueAxios, axios)
.mount('#app')

