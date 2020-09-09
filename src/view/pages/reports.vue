<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 内容区 -->
      <div id="echarts" style="width: 1000px;height:700px;"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'users',
  data () {
    return {

    }
  },
  mouted () {
  },
  created () {
    this.getEchartData()
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
    }
  }
}
</script>
<style lang="less" scoped>
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
