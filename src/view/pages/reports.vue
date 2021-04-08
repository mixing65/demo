<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chartBox">
      <!-- <powerLine :chartData="chartsData"></powerLine> -->
      <!-- <eventStatisticsChart :chartData="chartsData"></eventStatisticsChart> -->
      <!-- <leakageProtectionChart :chartData="chartsData"></leakageProtectionChart> -->
      <!-- <temperatureHumidityChart></temperatureHumidityChart> -->
      <!-- <mainSwitchChart :chartData="chartsData"></mainSwitchChart> -->
      <!-- <equipmentStatisticsChart :chartData="chartsData"
                                :percentage="percentage"
                                :text="titleText"></equipmentStatisticsChart> -->

    </div>
    <!-- 内容区 -->
    <!-- <div id="echarts" style="width: 1000px;height:700px;"></div> -->

  </div>
</template>
<script>
import echarts from 'echarts'
import hRing from '../../components/hRing'
import hLine from '../../components/hLine'
import testCharts from '../../components/testCharts'
import powerLine from '../../components/powerLine'
import eventStatisticsChart from '../../components/eventStatisticsChart'
import leakageProtectionChart from '../../components/leakageProtectionChart'
import temperatureHumidityChart from '../../components/temperatureHumidityChart'
import mainSwitchChart from '../../components/mainSwitchChart'
import equipmentStatisticsChart from '../../components/equipmentStatisticsChart'
export default {
  name: 'users',
  components: {
    hRing,
    hLine,
    testCharts,
    powerLine,
    eventStatisticsChart,
    leakageProtectionChart,
    temperatureHumidityChart,
    mainSwitchChart,
    equipmentStatisticsChart
  },
  data () {
    this.chartExtend = {
      series: {
        radius: ['50%', '70%'],
        label: {
          normal: {
            show: false,
            formatter: "{d}%",
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
      legend: {
        data: [],
      },
      color: ['#3399FF', '#B8B8B8']
    }
    return {
      titleText: '测试数据',
      percentage: '15',
      chartsData: {
        columns: ["name", "value"],
        rows: [
          { name: "正常", value: 80 },
          { name: "感冒", value: 20 },
          // { name: "发烧", value: 50 },
          // { name: "肺炎", value: 100 }

        ]
      },
      chartData: {
        columns: ['日期', '销售额'],
        rows: [
          { '日期': '1月1日', '销售额': 123 },
          { '日期': '1月2日', '销售额': 1223 },
          { '日期': '1月3日', '销售额': 2123 },
          { '日期': '1月4日', '销售额': 4123 },
          { '日期': '1月5日', '销售额': 3123 },
          { '日期': '1月6日', '销售额': 7123 }
        ]
      },
      studentDate: {
        columns: ['title', 'count'],
        rows: [
          { title: '正常', count: 400 },
          { title: '感冒', count: 50 },
          { title: '发烧', count: 100 },
          { title: '咳嗽', count: 210 },
        ]
      },
      chartsDatas: {
        columns: ['name', 'num'],
        rows: [
          { name: '电流过高', num: 120 },
          { name: '高温警告', num: 230 },
          { name: '地线丢性报警', num: 103 },
          { name: '绝缘报警', num: 230 },
          { name: '电压过高', num: 183 },
          { name: '功率过高', num: 89 }
        ]
      },
      vchartData: {
        columns: ['状态', '完成量'],
        rows: [
          { '状态': '已完成', '完成量': 80 },
          { '状态': '未完成', '完成量': 20 },
        ]
      },
      chartDataLine: {
        columns: ['日期', '金额'],
        rows: [
          { '日期': '01/11', '金额': '22' },
          { '日期': '01/12', '金额': '50' },
          { '日期': '01/13', '金额': '56' },
          { '日期': '01/14', '金额': '36' },
          { '日期': '01/15', '金额': '25' }
        ],
      },

      chartSettings: {
        yAxisName: ['金额'], // y轴名称
        // 值区域填充样式
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, // 0% 位置颜色
            color: '#61C2FF'
          }, {
            offset: 1, // 100% 位置颜色
            color: '#fff'
          }])
        },
      },

      // 配置项
      chartExtends: {
        // 图标展示区域 离上下左右边界的距离string number
        /* 	left: 8,
          right: 15,
          top: 35,
          bottom: 10,*/
        grid: {
          x: 8,
          x2: 15,
          y: 35,
          y2: 10,
        },
        // x轴配置
        xAxis: {
          axisLabel: {
            interval: 0 // x轴数据分割间隔,0 为全部展示
          },
        },
      },
      // 图表颜色
      colors: ['#0063FF'],
      zschartData: {//数据
        columns: ['saleDate', 'num',],
        rows: [
          {
            'saleDate': '1/1',
            'num': 1393,
          },
          {
            'saleDate': '1/2',
            'num': 3530,
          },
          {
            'saleDate': '1/3',
            'num': 2923,
          },
          {
            'saleDate': '1/4',
            'num': 1723,
          },
          {
            'saleDate': '1/5',
            'num': 3792,
          },
          {
            'aleDate': '1/6',
            'num': 4593,
          }
        ]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''

    }
  },
  mouted () {
  },
  created () {
    // this.getEchartData()
  },
  methods: {
    // echart图表
    getEchartData () {
      this.$http.get('reports/type/1').then(res => {
        console.log(res.data.data)
        let echartInfo = res.data.data
        let myChart = echarts.init(document.getElementById('echarts'))
        let option = {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: echartInfo.legend.data
          },
          xAxis: {
            data: echartInfo.xAxis[0].data
          },
          yAxis: {
            type: echartInfo.yAxis[0].type
          },
          series: echartInfo.series
        }
        myChart.setOption(option)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // changeSelect (value) {
    //   if (value === 'week') {
    //     this.chartsDatas.rows = [
    //       { name: '电流过高', num: 110 },
    //       { name: '高温警告', num: 200 },
    //       { name: '地线丢性报警', num: 133 },
    //       { name: '绝缘报警', num: 230 },
    //       { name: '电压过高', num: 183 },
    //       { name: '功率过高', num: 100 }
    //     ]
    //   }
    // },
    clickDom () {
      console.log('000')
    },
    selectChanged (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>
.chartBox {
  background: rgba(4, 21, 49, 0.8);
}
/deep/ .el-alert--info.is-light {
  margin-top: 20px;
}
.imgClass {
  width: 100%;
}
/deep/.ql-editor {
  min-height: 300px;
}
.btn {
  margin-top: 10px;
}
#echarts {
  margin-top: 20px;
}
</style>
