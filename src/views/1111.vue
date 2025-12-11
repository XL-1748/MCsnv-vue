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
        {{ filteredData.length }} SNVs • Page {{ currentPage }} / {{ totalPages }}
      </span>
    </div>

    <!-- 表格 -->
    <el-table :data="paginatedData" border stripe>
      <el-table-column prop="Snv_ID" label="Variant ID" />
      <el-table-column prop="Chromosome" label="Chromosome" />
      <el-table-column prop="Individual" label="Individual" />
      <el-table-column prop="GeneFeature" label="Gene Feature" />
      <el-table-column prop="Genotype" label="Genotype" />
      <el-table-column prop="Mutation" label="Mutation" />
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
import { ref, computed, onMounted } from 'vue';
import { Filter } from '@element-plus/icons-vue';
import axios from '../../api/index';
import FilterSection from './FilterSection.vue';

// 下拉按钮项
const chromosomes = ['All', 'chr1', 'chr2', 'chr3', 'chr4'];
const individuals = ['All', 'SM1', 'SM2', 'PM1', 'PM2'];
const geneFeatures = ['All', 'CDS', 'EXON', "3'UTR", 'INTRON', "5'UTR"];
const genotypes = ['All', 'homozygous reference', 'heterozygous', 'homozygous variant'];
const mutations = ['All', 'non-synonymous', 'synonymous'];

// 选中的过滤项
const selected = ref({
  chromosome: 'All',
  individual: 'All',
  geneFeature: 'All',
  genotype: 'All',
  mutation: 'All'
});

// 数据
const allData = ref([]);

// 分页
const pageSize = ref(10);
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / pageSize.value)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

// 获取数据
onMounted(async () => {
  try {
    const res = await axios.get('/GsearchS/', {
      params: { q: '' }
    });

    // 转换 Genotype 字段
    const GenotypeMap = {
      '0/0': 'homozygous reference',
      '0/1': 'heterozygous',
      '1/1': 'homozygous variant'
    };

    allData.value = res.data.data.map(item => ({
      ...item,
      Genotype: GenotypeMap[item.Genotype] || item.Genotype
    }));
  } catch (err) {
    console.error('Failed to fetch SNV data:', err);
  }
});

// 过滤逻辑
const filteredData = computed(() => {
  const { chromosome, individual, geneFeature, genotype, mutation } = selected.value;

  return allData.value.filter(item =>
    (chromosome === 'All' || item.Chromosome === chromosome) &&
    (individual === 'All' || item.Individual === individual) &&
    (geneFeature === 'All' || item.GeneFeature === geneFeature) &&
    (genotype === 'All' || item.Genotype === genotype) &&
    (mutation === 'All' || item.Mutation === mutation)
  );
});
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
