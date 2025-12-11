<template>
<div class="Gmmcontent">
    <div class="summary">
        <Summary />
    </div>
    <br>
    <div class="igv">
        <igv />
    </div>
    <br>
    <div>
        <ItemList />
    </div>

</div>
</template>


<script setup>
import Summary from './Summary.vue';
import ItemList from './ItemList.vue';
import igv from './igv.vue';

</script>


<style lang="scss" scoped>

</style>





