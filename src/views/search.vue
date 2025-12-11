<template>
<div class = "img-container">
    <div class = 'top-part'><h1>Macaque SNV Database</h1></div>
    <div class="search-box">
        <el-input
            v-model="searchQuery"
            class="search"
            placeholder="eg.AAMP"
            clearable @clear="clear">
            <template #append>
                <el-button @click="Dsearch" ><el-icon><Search /></el-icon></el-button>
            </template>
        </el-input>
    </div>
    <div class="bottom-part"><p>Your input can not be empty and the input may be a gene name (e.g. MACSNV001000001055)</p></div>
</div> 

</template>
    
    
<script setup>
import { ref } from 'vue';
import axios from '../api/index';
import { ElMessage } from 'element-plus'; 
import { useRouter } from 'vue-router'; 

const searchQuery = ref('');
const response = ref({ data: [] });
const router = useRouter();
const errorMessage = ref('');

const clear = () => {searchQuery.value = '';errorMessage.value = '';};

const Dsearch = async () => {
    errorMessage.value = '';

    if (searchQuery.value.trim() === '') {
        ElMessage({
            message: '请输入搜索内容',
            type: 'warning',
            duration: 3000,
            center: true, 
        });
        return;
    }

    try{
        const res = await axios.get('/searchG/', { params: { q: searchQuery.value } });

        if (res.data.data.length === 0 ){
            ElMessage({
                message: '未找到相关的搜索结果',
                type: 'info',
                duration: 3000,
                center: true,
            }); 
            response.value.data = [];
        }else {
            router.push({ path: '/gene', query: { q: searchQuery.value } });
            //console.log(res)
        }
    } catch (error) {
        console.error('请求失败:', error);
        ElMessage({
            message: '请求失败，请稍后重试',
            type: 'error',
            duration: 3000,
            center: true,
        });
    }
};



</script>
    
    
<style lang="scss" scoped>
.img-container {
    display: flex;
    flex-flow: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%;
    height: 50vh; /* 高度根据需要调整 */
    background-color: #f0f0f0; /* 设置背景色 */
    /* 或者设置背景图片 */
    background-image: linear-gradient(rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.17)),url('../assets/pexels-gsn-travel-28518052.jpg');
    background-size: cover; /* 背景图片填充整个容器 */
    background-position: center; /* 背景居中 */
}
.top-part {
    /* 如果需要，可以调整顶部部分的样式 */
    text-align: center;
    margin-bottom: 0px;        /* 可选，设置顶部部分和搜索框之间的间隙 */
    color: white;
    font-size:30px;
}

.bottom-part {
    text-align: center;
    margin-top: 0px;           /* 可选，设置底部内容和搜索框之间的间隙 */
    color: white;
}
.search-box {
    display: flex;
    justify-content: center;    /* 搜索框内部水平居中 */
    align-items: center;        /* 搜索框内部垂直居中 */
    width: 40%;               /* 搜索框宽度 */
    height: auto;
    margin-bottom: 0px;
    background-color: transparent; /* 父级容器透明，突出搜索框 */
    @media (max-width: 768px) {
        width: 80%;  /* 小屏幕下搜索框宽度为80% */
        height: 50px; /* 高度增加 */
    }

    @media (max-width: 480px) {
        width: 90%;  /* 超小屏幕下搜索框宽度为90% */
        height: 50px; /* 高度保持 */
    }
}

.search {
    width: 100%;                /* 输入框占满整个搜索框宽度 */
    border-radius: 25px;        /* 设置圆角 */
    border: 0px solid #ccc;     /* 默认边框颜色 */
    background-color: #f5f5f5;  /* 默认背景颜色 */
    overflow: hidden;           /* 内容不会溢出 */
    box-shadow: none;           /* 默认无阴影 */
    transition: all 0.3s ease;  /* 添加过渡效果 */

    input {
        border: none;           /* 移除输入框的默认边框 */
        background-color: transparent;
        height: 40px;
        padding-left: 0px;     /* 内部间距 */
        outline: none; 
    }

    &:hover, &:focus-within {
        background-color: #ddd; /* 悬停或聚焦时背景色 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
    }
}

.search-button {
    background-color: #f5f5f5;  /* 和输入框背景色一致 */
    border-radius: 0 25px 25px 0; /* 圆角右侧平滑连接 */
    border: none;
    color: #666;                /* 默认按钮图标颜色 */
    height: 40px;
    box-shadow: none;           /* 默认无阴影 */
    transition: all 0.3s ease;  /* 添加过渡效果 */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    opacity: 0.7; 

    &:hover {
        background-color: #333; /* 深灰色背景 */
        color: #fff;            /* 图标变白 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
        opacity: 1;
    }
}

.top-alert {
  position: fixed;
  top: 10px;  /* 距离页面顶部的距离 */
  left: 50%;
  transform: translateX(-50%);  /* 居中 */
  z-index: 9999;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}



</style>