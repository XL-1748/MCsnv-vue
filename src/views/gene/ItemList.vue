<template>
  <div class="snvs">
    <h3>List of variations in the gene</h3>

    <!-- Filter & Search -->
    <div class="filters" style="display: flex; gap: 20px; margin-bottom: 10px;">
      <el-select v-model="filters.genotype" placeholder="Genotype" clearable style="width: 200px">
        <el-option label="homozygous reference" value="homozygous reference" />
        <el-option label="heterozygous" value="heterozygous" />
        <el-option label="homozygous variant" value="homozygous variant" />
      </el-select>

      <el-input v-model="searchText" placeholder="Search..." clearable style="width: 300px" />
    </div>

    <!-- Table -->
    <el-table 
      :data="paginatedData" 
      border 
      stripe 
      style="width: 100%" 
      :height="tableHeight"
    >
      <el-table-column prop="Snv_ID" label="Variant" width="180" />
      <el-table-column prop="REF" label="REF" />
      <el-table-column prop="ALT" label="ALT" />
      <el-table-column prop="Genotype" label="Genotype" width="180" />
      <el-table-column prop="EFFECT" label="EFFECT" width="180" />
      <el-table-column prop="IMPACT" label="IMPACT" />
      <el-table-column prop="AF" label="AF" />
    </el-table>

    <!-- Pagination -->
    <div style="text-align: right; margin-top: 15px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="filteredData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../../api/index';

// Data
const tableData = ref([]);
const route = useRoute();
const tableHeight = ref("auto");

// Filters and Search
const filters = ref({
  genotype: null,
});
const searchText = ref('');

// Pagination
const currentPage = ref(1);
const pageSize = 10;

// Fetch Data
const fetchItems = async () => {
  try {
    const query = route.query.q || '';
    const response = await axios.get('/GsearchS/', { params: { q: query } });

    const impactMap = {
      '3': 'HIGH',
      '2': 'MODERATE',
      '1': 'LOW',
      '0': 'MODIFIER'
    };

    const GenotypeMap = {
      '0/0': 'homozygous reference',
      '0/1': 'heterozygous',
      '1/1': 'homozygous variant'
    };

    tableData.value = response.data.data.map(item => ({
      ...item,
      IMPACT: impactMap[item.IMPACT] || item.IMPACT,
      Genotype: GenotypeMap[item.Genotype] || item.Genotype
    }));

    tableHeight.value = tableData.value.length > 10 ? "400px" : "auto";
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Filtering and Search
const filteredData = computed(() => {
  let data = tableData.value;

  if (filters.value.genotype) {
    data = data.filter(item => item.Genotype === filters.value.genotype);
  }

  if (searchText.value) {
    const text = searchText.value.toLowerCase();
    data = data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(text)
      )
    );
  }

  return data;
});

// Pagination Data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredData.value.slice(start, start + pageSize);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

onMounted(fetchItems);
</script>

<style scoped>
.snvs {
  margin: 20px;
}
</style>
