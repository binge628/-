import { createApp } from 'vue'
import App from './App.vue'
//引入模版的全局样式
import './styles/index.scss'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from './components';
//配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
//获取应用实例对象
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn//element-plus
});
//安装自定义插件
app.use(gloalComponent);
//注册模版路由
app.use(router);
//注册仓库
app.use(pinia);
//引入路由鉴权文件
import './permission';
//引入自定义指令文件
import { isHasButton } from './directive/has';
isHasButton(app);
//将应用挂载到挂载点上
app.mount('#app')

