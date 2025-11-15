<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

</script>

<template>
  <!-- 根容器，使用class="home-category"用于样式定位 -->
  <div class="home-category">
    <!-- 分类菜单列表容器，使用class="menu"定义菜单样式 -->
    <ul class="menu">
      <!--
        v-for指令：遍历categoryStore中的categoryList数组
        :key绑定唯一标识item.id，提高列表渲染性能
        作用：将数组中的每个元素渲染为一个li标签
      -->
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <!--
          RouterLink组件：Vue Router提供的路由链接组件，替代a标签
          to="/"：指定跳转的路由路径，点击后URL会变为"/"
          作用：实现单页应用的无刷新跳转
        -->
        <RouterLink to="/">{{ item.name }}</RouterLink>

        <!--
          嵌套v-for：遍历当前分类的子分类（只取前2个）
          item.children.slice(0, 2)：截取子分类数组的前2个元素
        -->
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i" to="/">{{ i.name }}</RouterLink>

        <!-- 弹层容器，用于展示分类推荐商品，通过CSS控制显示/隐藏 -->
        <div class="layer">
          <!-- 弹层标题，small标签用于显示辅助文字 -->
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>

          <!-- 推荐商品列表 -->
          <ul>
            <!-- 遍历当前分类下的商品列表 -->
            <li v-for="i in item.goods" :key="i.id">
              <!-- 商品链接，点击跳转到商品详情页（此处暂用"/"） -->
              <RouterLink to="/">
                <!--
                  商品图片：:src是v-bind:src的简写，动态绑定图片路径
                  作用：根据数据中的i.picture动态加载图片
                -->
                <img :src="i.picture" alt="" />

                <!-- 商品信息容器 -->
                <div class="info">
                  <!--
                    商品名称：ellipsis-2是自定义类，用于实现两行文本溢出省略
                    {{ i.name }}：插值表达式，显示商品名称
                  -->
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>

                  <!-- 商品描述：ellipsis类实现单行文本溢出省略 -->
                  <p class="desc ellipsis">{{ i.desc }}</p>

                  <!-- 商品价格：i标签用于显示人民币符号 -->
                  <p class="price"><i>¥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
