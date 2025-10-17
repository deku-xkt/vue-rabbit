// 从vue-router库中导入创建路由实例的函数(createRouter)和history模式路由的创建函数(createWebHistory)
import { createRouter, createWebHistory } from 'vue-router'
// 导入Login组件（登录页面），@表示是src目录的别名
import Login from '@/views/Login/index.vue'
// 导入Layout组件（布局容器，通常包含导航栏、侧边栏等公共部分）
import Layout from '@/views/Layout/index.vue'
// 导入Home组件（首页内容）
import Home from '@/views/Home/index.vue'
// 导入Category组件（分类页面内容）
import Category from '@/views/Category/index.vue'

// 创建路由实例对象
const router = createRouter({
  // 配置路由模式为history模式，基于HTML5的history API实现（地址栏无#）
  // import.meta.env.BASE_URL是项目的基础路径（从环境变量中获取，通常在vite.config.js中配置）
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置路由规则：path（路径）和component（对应组件）的映射关系
  routes: [
    {
      // 父路由路径为根路径（/）
      path: '/',
      // 根路径对应的组件是Layout（布局容器）
      component: Layout,
      // 子路由（嵌套路由）：Layout组件内部显示的内容
      children: [
        {
          // 子路由默认路径（空字符串），当访问/时显示Home组件
          path: '',
          component: Home
        },
        {
          // 子路由路径为/category（完整路径是父路径+子路径：/category）
          path: 'category',
          component: Category
        }
      ]
    },
    {
      // 登录页路径为/login
      path: '/login',
      component: Login
    }
  ]
})

// 导出路由实例，供main.js等入口文件使用（挂载到Vue实例上）
export default router
