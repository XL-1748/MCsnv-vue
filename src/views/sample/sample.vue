<template>
    <div class="common-layout">
        <el-container>
            <!-- 菜单栏 -->
            <el-header>
                <Header />
            </el-header>
            <!-- 主体 -->
            <el-main>
                <Samain/>
            </el-main>
            <!-- footer -->
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>
    </div>
    </template>
    
    <script setup>
    import Header from '../../components/header.vue'
    import Footer from '../../components/footer.vue'
    import Samain from './Samain.vue';
    
    </script>
    
    <style lang="scss" scoped>
    .el-header {
        --el-header-padding: 0 0px;
    }
    .el-main {
        width: 90%; /* 设置内容区域宽度为90% */
        margin: 0 auto; /* 居中内容 */
    }
    .el-footer {
        --el-header-padding: 0 0px;
        height: 100%;
    }
    </style>