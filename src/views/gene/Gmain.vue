<template>
    <div class="common-layout">
      <el-container>
        <!-- <el-aside width="200px" style="background-color: #d3d3d3;">
            <Gms />
        </el-aside> -->
        <el-main style="background-color: #f3f3f3;">
            <Gmm />
        </el-main>
      </el-container>
    </div>
  </template>  

<script setup>
import Gmm from './Gmm.vue';
// import Gms from './Gms.vue';
</script>

<style lang="scss" scoped>
/* 主容器设置为flex布局，确保子项高度同步 */
.el-container {
  display: flex;
  flex-direction: row; /* 横向排列 */
  align-items: stretch; /* 子元素高度保持一致 */
}

// .el-aside {
//   flex-shrink: 0; /* 侧边栏宽度固定 */
// }

.el-main {
  flex-grow: 1; /* 主内容区填满剩余空间 */

}
</style>