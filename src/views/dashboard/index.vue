<template>
  <div class="dashboard">
    <!-- 统计卡片区 -->
    <a-row :gutter="16" class="stat-row">
      <a-col :span="6" v-for="(stat, index) in stats" :key="index">
        <a-card class="stat-card fin-card" :bordered="false">
          <a-statistic :title="stat.title" :value="stat.value" :suffix="stat.suffix" :value-style="{ color: stat.color, fontWeight: 'bold' }">
            <template #prefix>
              <component :is="stat.icon" style="margin-right: 8px" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区 -->
    <a-row :gutter="16">
      <a-col :span="16">
        <a-card title="资产趋势分析" class="chart-card fin-card" :bordered="false">
          <v-chart class="chart" :option="lineOption" autoresize />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="资产分布" class="chart-card fin-card" :bordered="false">
          <v-chart class="chart" :option="pieOption" autoresize />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import request from '@/utils/request';
import { UserOutlined, DollarOutlined, WarningOutlined, TeamOutlined } from '@ant-design/icons-vue';

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);

const stats = ref([
  { title: '总资产', value: 0, suffix: '元', color: '#1890ff', icon: DollarOutlined },
  { title: '今日盈亏', value: 0, suffix: '元', color: '#52c41a', icon: 'stock' },
  { title: '风险指数', value: '0%', suffix: '', color: '#faad14', icon: WarningOutlined },
  { title: '活跃用户', value: 0, suffix: '人', color: '#722ed1', icon: TeamOutlined },
]);

const lineOption = ref({});
const pieOption = ref({});

onMounted(async () => {
  // 获取统计数据
  const data = await request({ url: '/dashboard/stats', method: 'get' });
  stats.value[0].value = data.totalAssets;
  stats.value[1].value = data.todayProfit;
  stats.value[2].value = data.riskRate;
  stats.value[3].value = data.activeUsers;

  // 获取图表数据
  const chartData = await request({ url: '/dashboard/chart', method: 'get' });
  
  // 配置折线图
  lineOption.value = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: chartData.map((i: any) => i.month) },
    yAxis: { type: 'value' },
    series: [{ data: chartData.map((i: any) => i.value), type: 'line', smooth: true, areaStyle: { color: '#1890ff', opacity: 0.1 } }],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  };

  // 配置饼图
  pieOption.value = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['50%', '70%'],
      data: [
        { value: 1048, name: '股票' },
        { value: 735, name: '债券' },
        { value: 580, name: '现金' },
      ]
    }]
  };
});
</script>

<style scoped>
.dashboard { padding: 0; }
.stat-row { margin-bottom: 24px; }
.stat-card { text-align: left; }
.chart-card { height: 400px; }
.chart { height: 320px; width: 100%; }
</style>
