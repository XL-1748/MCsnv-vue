<template>
    <div class="snv-imain">
      <!-- Filter 区域 -->
      <div class="filter-section">
        <h4><el-icon><Filter /></el-icon> Filter SNVs Using Feature Selection</h4>
        <FilterSection label="Chromosome" :options="chromosomes" v-model:selected="selected.chromosome" />
        <FilterSection label="Individual" :options="individuals" v-model:selected="selected.individual" />
        <FilterSection label="Gene Feature" :options="geneFeatures" v-model:selected="selected.geneFeature" />
        <FilterSection label="Genotype" :options="genotypes" v-model:selected="selected.genotype" />
        <FilterSection label="Mutation" :options="mutations" v-model:selected="selected.mutation" />
      </div>
  
      <!-- 表格统计提示 -->
      <div class="table-header">
        <el-select v-model="pageSize" size="small" style="width: 100px">
          <el-option label="10" :value="10" />
          <el-option label="25" :value="25" />
          <el-option label="50" :value="50" />
        </el-select>
        <span>
            <span>{{ filteredData.length || 0 }} SNVs • Page {{ currentPage }} / {{ totalPages }}</span>
        </span>
      </div>
  
      <!-- 表格 -->
      <el-table :data="paginatedData" border stripe>
        <el-table-column prop="Snv_ID" label="Variant ID" />
        <el-table-column prop="Position_gene" label="Chromosome" />
        <el-table-column prop="Sample_name" label="Individual" />
        <el-table-column prop="IMPACT" label="Gene Feature" />
        <el-table-column prop="Genotype" label="Genotype" />
        <el-table-column prop="EFFECT" label="Mutation" />
        <el-table-column prop="REF" label="REF" />
        <el-table-column prop="ALT" label="ALT" />
      </el-table>
  
      <!-- 分页 -->
      <el-pagination
        class="mt-4"
        layout="prev, pager, next"
        :total="filteredData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="currentPage = $event"
      />
    </div>
  </template>
  
  <script setup>
import { ref, computed, watch } from 'vue';
import { Filter } from '@element-plus/icons-vue';
import axios from '../../api/index';
import FilterSection from '../../components/FilterSection.vue';
import debounce from 'lodash/debounce';
import { ElMessage } from 'element-plus';

const chromosomes = ['All', 'chr1', 'chr2', 'chr3', 'chr4'];
const individuals = ['All', 'SM1', 'SM2', 'PM1', 'PM2'];
const geneFeatures = ['All', 'CDS', 'EXON', "3'UTR", 'INTRON', "5'UTR"];
const genotypes = ['All', 'homozygous reference', 'heterozygous', 'homozygous variant'];
const mutations = ['All', 'non-synonymous', 'synonymous'];

const selected = ref({
  chromosome: 'All',
  individual: 'All',
  geneFeature: 'All',
  genotype: 'All',
  mutation: 'All',
  keyword: ''
});

const allData = ref([]);
const pageSize = ref(10);
const currentPage = ref(1);

const filteredData = computed(() => {
  return allData.value.filter(item => {
    const matchChromosome = selected.value.chromosome === 'All' || item.Position_gene === selected.value.chromosome;
    const matchIndividual = selected.value.individual === 'All' || item.Sample_name === selected.value.individual;
    const matchGeneFeature = selected.value.geneFeature === 'All' || item.IMPACT === selected.value.geneFeature;
    const matchGenotype = selected.value.genotype === 'All' || item.Genotype === selected.value.genotype;
    const matchMutation = selected.value.mutation === 'All' || item.EFFECT === selected.value.mutation;

    return matchChromosome && matchIndividual && matchGeneFeature && matchGenotype && matchMutation;
  });
});

// 页数
const totalPages = computed(() =>
  Math.ceil(allData.value.length / pageSize.value)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allData.value.slice(start, start + pageSize.value);
});

// 请求数据
const fetchData = debounce(async () => {
  try {
    const res = await axios.post('/searchsinglesnv/', {
      time: 200,
      data: selected.value
    });

    if (res.data.status === 'success') {
      allData.value = res.data.data || [];

      if (res.data.data.length === 0 && res.data.message) {
        ElMessage.warning(res.data.message);
      }
    } else {
      ElMessage.error(res.data.message || 'Failed to fetch SNV data.');
    }

    currentPage.value = 1; // 重置分页
  } catch (err) {
    console.error('Failed to fetch SNV data:', err);
    ElMessage.error('Error connecting to server.');
  }
}, 300);

// 自动调用
watch(selected, fetchData, { deep: true, immediate: true });
</script>

  
  <style scoped>
  .snv-imain {
    padding: 20px;
  }
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  </style>
  