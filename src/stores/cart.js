// 封装购物车模块

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import { useUserStore } from './user'
import { findNewCartListAPI } from '@/apis/cart'
import { insertCartAPI } from '@/apis/cart'
import { delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 1. 定义state - cartList
  const cartList = ref([])
  //获取最新购物车列表
  const updateNewList = async() => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 2. 定义action - addCart
  const addCart = async (goods) => {
    console.log('添加', goods)
    const { skuId,count } = goods
    //已经登录,登录之后的加入购物车逻辑
    if(isLogin.value){
       // 登录之后的加入购车逻辑
      await insertCartAPI({ skuId, count })
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
      updateNewList()
    }else{
      //未登录
      // 添加本地购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if(isLogin.value){
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
      updateNewList()
    }else{
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }

  }

  const clearCart = ()=>{
    cartList.value = []
  }

  //计算属性
  //1.总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count, 0))
  //总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price, 0))

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能action
  // 当用户操作全选框（勾选或取消）时，allCheck 会将所有列表项的 selected 同步为全选框的状态（比如全选框勾选 → 所有项都勾选）。
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }


  // 是否全选计算属性
  // 当用户单独勾选 / 取消某个列表项时，需要自动更新全选框的状态（比如所有项都勾选 → 全选框自动勾选；只要有一项未勾选 → 全选框自动取消）。
  const isAll = computed(() => cartList.value.every((item) => item.selected))


  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    allCheck,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  persist: true,
})
