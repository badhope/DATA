<template>
  <a-card title="用户管理" class="fin-card">
    <template #extra>
      <a-button type="primary">添加用户</a-button>
    </template>
    <a-table :dataSource="dataSource" :columns="columns" />
  </a-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Mock from 'mockjs';
const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '住址', dataIndex: 'address' },
];
const dataSource = ref([]);
onMounted(() => {
  dataSource.value = Mock.mock({
    'list|10': [{ 'id': '@id', 'name': '@cname', 'age': '@integer(18, 60)', 'address': '@city' }]
  }).list;
});
</script>
