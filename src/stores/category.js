// 从Vue中导入ref，用于创建响应式数据
import { ref } from 'vue'
// 从Pinia中导入defineStore，用于定义Store（状态管理容器）
import { defineStore } from 'pinia'
// 导入获取分类数据的接口函数（从布局相关的API文件中导入）
import { getCategoryAPI } from '@/apis/layout'

// 定义一个名为'category'的Store，使用函数式写法（Setup Store）
// 参数1：Store的唯一标识（'category'）；参数2：包含状态和方法的函数
export const useCategoryStore = defineStore('category', () => {
  // 定义响应式数据categoryList，作为Store的state（存储导航列表数据，初始为空数组）
  const categoryList = ref([])

  // 定义异步方法getCategory，作为Store的action（用于获取导航数据）
  const getCategory = async () => {
    // 调用接口函数，等待返回结果
    const res = await getCategoryAPI()
    // 将接口返回的result数据赋值给categoryList（更新状态）
    categoryList.value = res.result
  }

  // 返回需要暴露给外部的状态和方法（外部通过Store实例访问）
  return {
    categoryList,  // 导航列表数据
    getCategory    // 获取导航数据的方法
  }
})
