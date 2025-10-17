<script setup>
</script>

<template>
  <!-- 一级路由出口组件 -->
  <!-- 根据当前匹配的路由规则，自动渲染对应的组件内容。可以理解为一个 “动态占位符”—— 当路由路径变化时，这个位置会自动替换成对应路径匹配的组件。 -->
  <RouterView />
  <div class="test">
    test scss
  </div>
</template>

<style scoped lang = "scss">
.test{
  color: $priceColor
}
</style>
