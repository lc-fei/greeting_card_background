import Vue from "vue";
import VueRouter  from "vue-router";
import data from "@/views/data/index.vue"
import login from "@/views/login/index.vue"
import look from "@/views/look/index.vue"
import store from "@/store"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
    {
      path: '/look',
      name: 'look',
      component: look,
      meta: {
        title: '查看'
      }
    }
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
      if(!store.state.token)store.commit('addtoken', localStorage.getItem('token'))
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