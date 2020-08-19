import Vue from 'vue'
import Router from 'vue-router'
import login from '../view/manage/login'
import home from '../view/manage/home'
import users from '../view/pages/user'
import rights from '../view/pages/rights'
import roles from '../view/pages/roles'
import goodsSort from '../view/pages/goodsSort'
import params from '../view/pages/params'
// import index from '../view/index'
// import test from '../view/test'
// import arr from '../view/arr'
// import list from '../view/list'
// import comp from '../view/comp'
// import news from '../view/news'
// import layout from '../view/layout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/users',
      children: [
        {
          path: 'users',
          name: 'users',
          component: users
        },
        {
          path: 'rights',
          name: 'rights',
          component: rights
        },
        {
          path: 'roles',
          name: 'roles',
          component: roles
        },
        {
          path: 'categories',
          name: 'goodsSort',
          component: goodsSort
        },
        {
          path: 'params',
          name: 'params',
          component: params
        }
      ]
    }
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test
    // },
    // {
    //   path: '/arr',
    //   name: 'arr',
    //   component: arr
    // },
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: list
    // },
    // {
    //   path: '/comp',
    //   name: 'comp',
    //   component: comp
    // },
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: news
    // },
    // {
    //   path: '/layout',
    //   name: 'layout',
    //   component: layout
    // }
  ]
})
// to 将要访问的路径，form代表从哪个路径跳转来 next 是一个函数，表示放行
// next()放行 next('/login)强制跳转页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
