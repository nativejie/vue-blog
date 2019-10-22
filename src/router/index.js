import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import Layout from '@/components/Layout'
import Index from '@/views/client/'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */  '../views/admin/login.vue')
    },
    {
      path: '/admin/',
      component: Layout,
      children: [
        {
          path: 'article/list',
          name: 'managerArticle',
          component: () => import(/* webpackChunkName: "managerArticle" */  '../views/admin/article/managerArticle.vue') 
        },
        {
          path: 'article/create',
          name: 'createArticle',
          component: () => import(/* webpackChunkName: "createArticle" */ '../views/admin/article/createArticle.vue')
        },
        {
          path: 'article/edit/:id',
          name: 'createArticle',
          component: () => import(/* webpackChunkName: "createArticle" */ '../views/admin/article/createArticle.vue')
        },
        {
          path: 'article/type',
          name: 'articleType',
          component: () => import(/* webpackChunkName: "articleType" */ '../views/admin/article/articleType.vue')
        }
      ]
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import(/* webpackChunkName: "articleList" */ '../views/client/article/indexArticle.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "articleList" */ '../views/client/about.vue')
        },
        {
          path: 'article/archive',
          name: 'archive',
          component: () => import(/* webpackChunkName: "articleList" */ '../views/client/article/archive.vue')
        },
        {
          path: 'article/list',
          name: 'articleList',
          component: () => import(/* webpackChunkName: "articleList" */ '../views/client/article/articleList.vue')
        },
        {
          path: 'article/detail/:id',
          component: () => import(/* webpackChunkName: "articleDetail" */ '../views/client/article/articleDetail.vue')
        }
      ]
    }
  ]
})
