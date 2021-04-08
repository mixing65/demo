<template>
  <div class="h-line">
    <ve-line :data="chartData"
             :settings="chartSettings"
             height="250px"
             width="348px"
             :extend="chartExtend"></ve-line>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      metrics: ['新增门店'],
      dimension: ['日期'],
      scale: [true, true]
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
          show: true // 标题展示
        },
        grid: {
          y: 10,
          y2: 50,
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