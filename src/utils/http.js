// 导入axios库，用于发送HTTP请求
import axios from 'axios'
// 导入Element Plus的ElMessage组件，用于显示消息提示
// import { ElMessage } from 'element-plus'
// 导入用户状态管理的pinia仓库，用于获取用户相关数据（如token）
// import { useUserStore } from '@/stores/userStore'

// 创建axios实例，对请求进行基础配置
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', // 基础请求地址，所有请求都会拼接在此地址后
  timeout: 5000 // 请求超时时间，5秒内未响应则中断请求
})

// 配置请求拦截器：在请求发送前执行一些操作
httpInstance.interceptors.request.use(
  // 请求成功的回调函数（配置请求信息）
  config => {
    // 1. 从pinia仓库中获取用户状态实例
    // const userStore = useUserStore()
    // 2. 获取用户的token（后端用于身份验证的凭证）
    // const token = userStore.userInfo.token
    // 如果token存在，往请求头中添加身份验证信息
    // if (token) {
    //   // 按照后端要求的格式拼接token（通常为"Bearer + 空格 + token"）
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // 返回处理后的配置，继续发送请求
    return config
  },
  // 请求失败的回调函数（如网络错误）
  e => Promise.reject(e) // 将错误传递给调用者处理
)

// 配置响应拦截器：在接收响应后执行一些操作
httpInstance.interceptors.response.use(
  // 响应成功的回调函数（处理返回数据）
  res => res.data, // 直接返回响应体中的data部分，简化调用者处理
  // 响应失败的回调函数（如接口报错、404、500等）
  e => {
    // 统一错误提示：显示后端返回的错误信息
    // ElMessage({
    //   type: 'warning', // 提示类型为警告
    //   message: e.response.data.message // 错误信息来自响应体的message字段
    // })
    // 将错误传递给调用者处理
    return Promise.reject(e)
  }
)

// 导出配置好的axios实例，供其他文件使用
export default httpInstance