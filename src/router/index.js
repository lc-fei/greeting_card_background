import Vue from "vue";
import VueRouter  from "vue-router";
import data from "@/views/data/index.vue"
import login from "@/views/login/index.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/data'
    },
    {
      path: '/data',
      name: 'data',
      component: data,
      meta: {
        needLogin: true,
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to.name)
  // console.log(from)
  // console.log(next)
  if(to.name === 'login' || to.name === null) next()
  else 
  {
    if(localStorage.getItem('token')) 
    {
      next()
    }
    else 
    {
      next(
        {
          path: '/login'
        }
      )
      alert('请先登录')
    } 
  }
})
export default 
  router