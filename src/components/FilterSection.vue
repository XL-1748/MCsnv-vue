<template>
    <div class="filter-section">
      <label class="filter-label">{{ label }}</label>
      <div class="filter-options">
        <el-button
          v-for="option in options"
          :key="option"
          :type="selected === option ? 'primary' : 'default'"
          size="small"
          @click="selected = option"
        >
          {{ option }}
        </el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: { type: String, required: true },
    options: { type: Array, required: true }
  });
  const selected = defineModel('selected'); // 使用 defineModel 实现 v-model:selected
  </script>
  
  <style scoped>
  .filter-section {
    margin-bottom: 16px;
  }
  .filter-label {
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
  }
  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  </style>
  