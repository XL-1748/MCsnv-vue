<template>
    <div class="gene-info">
        <div class="gene-name"><h1>Gene: {{ data.Gene_name || 'NULL' }}</h1></div>
        <el-row class="info-row" :gutter="20">
            <!-- Genome Build -->
            <el-col :span="4" class="label">
                Genome build：
            </el-col>
            <el-col :span="20" class="value">
                {{ data.Genome_build || 'NULL' }}
            </el-col>
            </el-row>
            <el-row class="info-row" :gutter="20">
            <!-- Number of Variants -->
            <el-col :span="4" class="label">
                Number of variants：
            </el-col>
            <el-col :span="20" class="value">
                {{ data.Num || 'NULL' }}
            </el-col>
            </el-row>
            <el-row class="info-row" :gutter="20">
            <!-- Ensembl -->
            <el-col :span="4" class="label">
                Ensembl：
            </el-col>
            <el-col :span="20" class="value">
                {{ data.Gene_ID || 'NULL' }}
            </el-col>
            </el-row>
            <el-divider></el-divider>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../../api/index';

const data = reactive({
  Gene_ID: null,
  Gene_name: null,
  Genome_build: null,
  Num: null,
});

const route = useRoute();
const query = route.query.q || '';

onMounted(async () => {
  try {
    const response = await axios.get('/searchGI/', { params: { q: query } });
    if (response.data.status === 'success' && response.data.data.length > 0) {
      Object.assign(data, response.data.data[0]);
    } else {
      console.error('Data not found or empty array');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
.gene-name h1 {
  margin-top: 0;
  font-size: 36px; /* 调整字体大小 */
  font-weight: bold;
  text-align: 5px;
}

</style>