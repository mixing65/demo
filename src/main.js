// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueGridLayout from 'vue-grid-layout';
import echarts from 'echarts'
// 导入全局样式表
import '../src/assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'
import axios from 'axios'

import { Button,
  Select,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Message,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane
} from 'element-ui'
Vue.prototype.echarts = echarts
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Select)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Row)
  .use(Col)
  .use(Menu)
  .use(Submenu)
  .use(MenuItemGroup)
  .use(MenuItem)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Table)
  .use(TableColumn)
  .use(Switch)
  .use(Pagination)
  .use(Dialog)
  .use(Tag)
  .use(Tree)
  .use(Option)
  .use(ZkTable)
  .use(Cascader)
  .use(Alert)
  .use(Tabs)
  .use(TabPane)

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// axios.defaults.baseURL = 'https://easy-mock.com/mock/5f16da6dee31c413514f6419/study'
Vue.config.productionTip = false
// Vue.component('zk-table', ZkTable)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
