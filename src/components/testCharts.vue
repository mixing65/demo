<template>
  <div class="h-line">
    <ve-line :data="chartData"
             :settings="chartSettings"
             height="100%"
             width="100%"
             :extend="chartExtend"></ve-line>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = { // 图表基础配置 横纵坐标名
      metrics: ['新增门店'],
      dimension: ['日期'],
      scale: [true, true], // 默认为[false, false]，表示上下两个轴都不会脱离0值比例。设置成 true 后坐标刻度不会强制包含零刻度
      area: true,//是否显示为面积图
      yAxisName: ['日期'], // y轴名称
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
    }
    return {
      chartExtend: {
        series: {
          label: {
            normal: {
              show: true,
              color: '#90E23C', // 折线数字展示颜色
              fontSize: 18
            }
          },
          symbolSize: 10,
          color: ['#44F0FF'] // 折线颜色
        },
        legend: {
          show: false // 标题展示
        },
        grid: { // x 为直角坐标系内绘图网格左上角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心) y 为左上纵坐标，x2为右下横坐标，y2为右下纵坐标。
          y: 10,
          y2: 10,
          left: 10,
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          splitLine: {
            show: false
          },
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        }
      }
    }
  },

  props: {
    chartData: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.h-line {
  border: 1px solid pink;
  width: 500px;
  height: 300px;
}
</style>