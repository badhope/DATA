import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/global.css';
import { setupMock } from './mock';

const app = createApp(App);

// 启动 Mock 数据
setupMock();

app.use(pinia);
app.use(router);
app.use(Antd);

app.mount('#app');
