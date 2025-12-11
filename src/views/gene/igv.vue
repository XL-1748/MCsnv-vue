<template>
  <div class="igv-viewer">
    <div id="igv-container" class="igv-container"></div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import igv from "../../../node_modules/igv/dist/igv.esm"
const browser = ref(null);

// 配置 IGV.js 的选项
const options = {
  locus: "chr12:105666595-105672616", 
  reference: {
    id: "rhemac10", 
    name: "Macaque", 
    fastaURL: "../data/rheMac10.fa", 
    indexURL: "../data/rheMac10.fa.fai",
    tracks: [
      {
        name: "Refseq Genes", 
        format: "refgene",
        url: "../../data/ncbiRefSeq.txt.gz", 
        indexed: false,
        removable: false,
        order: 1,
      },
      {
        name: "Ensembl Genes", 
        format: "refgene",
        url: "../../data/ensGene.txt.gz", 
        indexed: false,
        removable: false,
        order: 2,
      },
    ],
  },
  // tracks: [
  //   {
  //     url: "../../../data/chr_Y.vcf.gz", // 变异数据路径
  //     indexURL: "../../../data/chr_Y.vcf.gz.tbi", // 变异索引路径
  //     name: "mCED Variants", // 变异轨道名称
  //     displayMode: "COLLAPSED", // 展示模式
  //     colorBy: "Mmul_10 Category", // 按变异类别着色
  //     colorTable: {
  //       missense_variant: "green",
  //       synonymous_variant: "orange",        
  //       frameshift_variant: "purple",
  //       stop_gained: "red",
  //       splice_region_variant: "blue",
  //       "*": "grey", // 默认颜色
  //     },
  //     visibilityWindow: -1, // 显示所有变异
  //   },
  // ],
};

// 初始化 IGV.js 浏览器
const initIGV = async () => {
  const container = document.getElementById('igv-container'); // 获取 IGV 容器
  if (container) {
    try {
      // 创建 IGV 浏览器实例
      browser.value = await igv.createBrowser(container, options);
      console.log('IGV Browser created:', browser.value); // 输出 IGV 浏览器实例
    } catch (error) {
      console.error('Failed to create IGV browser:', error); // 捕获错误
    }
  } else {
    console.error('IGV container not found');
  }
};

// 在组件挂载后初始化 IGV 浏览器
onMounted(() => {
  initIGV();
});
</script>

<style scoped>
/* 自定义样式 */
.igv-container {
  width: 100%; /* 占满容器宽度 */
  height: auto; /* 高度 */
  border: 1px solid #ccc; /* 边框样式 */
}
</style>
 
  
  
  
  