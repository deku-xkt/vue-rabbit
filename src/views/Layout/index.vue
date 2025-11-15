<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// Store 的使用流程
// 定义：通过 defineStore 创建 Store（如上述代码）。
// 引入：在组件中通过 import { useCategoryStore } from '@/stores/category' 导入。
// 调用：const categoryStore = useCategoryStore() 获取 Store 实例，然后访问 categoryStore.categoryList（状态）或 categoryStore.getCategory()（方法）
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
const categoryStore = useCategoryStore()
onMounted( () => categoryStore.getCategory())

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 在嵌套路由（children 配置）中，父组件<RouterView> 负责渲染子路由对应的组件。
  例：Layout 组件中通常会放一个 <RouterView>，当访问 / 时，这个位置显示 Home 组件；访问 /category 时，显示 Category 组件（因为这两个是 Layout 的子路由）。 -->
  <RouterView />
  <LayoutFooter />
</template>
