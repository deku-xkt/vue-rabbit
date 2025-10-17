<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 在嵌套路由（children 配置）中，父组件<RouterView> 负责渲染子路由对应的组件。
  例：Layout 组件中通常会放一个 <RouterView>，当访问 / 时，这个位置显示 Home 组件；访问 /category 时，显示 Category 组件（因为这两个是 Layout 的子路由）。 -->
  <RouterView />
  <LayoutFooter />
</template>
