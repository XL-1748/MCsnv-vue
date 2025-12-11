<template>
    <div>
        <h3>Population Frequencies</h3>
        <el-table 
        :data="tableData" 
        border 
        stripe 
        style="width: 100%"
        :height="tableHeight">
        <el-table-column prop="Snv_ID" label="Specie" width="180" />
        <el-table-column prop="REF" label="Allele Count" />
        <el-table-column prop="ALT" label="Allele Number" />
        <el-table-column prop="EFFECT" label="Number of Homozygotes" width="180" />
        <el-table-column prop="IMPACT" label="Number of Heterozygotes" width="180" />
        <el-table-column prop="Genotype" label="Allele Frequency" />
        </el-table>

    </div>
</template>

<script setup>

</script>

<style scoped>

</style>