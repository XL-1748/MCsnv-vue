<script setup>
import Header from '../../components/header.vue'
import Smain from './Smain.vue'
import Footer from '../../components/footer.vue'
</script>


<template>
<div class="common-layout">
    <el-container>
        <!-- 菜单栏 -->
        <el-header>
            <Header />
        </el-header>
        <!-- 主体 -->
        <el-main>
            <Smain />
        </el-main>
        <!-- footer -->
        <el-footer>
            <Footer />
        </el-footer>
    </el-container>
</div>
</template>
  

<style lang="scss" scoped>
.el-header {
    --el-header-padding: 0 0px;
}
.el-main {
    width: 90%;
    margin: 0 auto;
}
.el-footer {
    --el-header-padding: 0 0px;
    height: 100%;
}
</style>