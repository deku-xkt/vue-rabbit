// 导入封装好的 axios 实例（httpInstance）
import httpInstance from "@/utils/http";

// 定义获取分类数据的函数 getCategory
export function getCategoryAPI() {
  // 调用 httpInstance 发起请求，返回 Promise 对象（便于后续用 async/await 或 .then() 处理响应）
  return httpInstance({
    url: 'home/category/head'  // 请求的相对路径（结合 httpInstance 中的基础路径组成完整 URL）
  })
}