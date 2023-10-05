import Vue from "vue";
import VueRouter  from "vue-router";
import data from "@/views/data/index.vue"
import login from "@/views/login/index.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/data', component: data},
    {path: '/login', component: login},
  ]
})

export default 
  router