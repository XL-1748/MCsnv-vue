<template>
    <div>
        <h3>Population Frequencies</h3>
        <el-table 
        :data="tableData" 
        border 
        stripe 
        style="width: 100%"
        :height="tableHeight">
        <el-table-column prop="Snv_ID" label="ID" width="180" />
        <el-table-column prop="REF" label="Type" />
        <el-table-column prop="ALT" label="Source" />
        </el-table>

    </div>
</template>

<script setup>

</script>

<style scoped>

</style>