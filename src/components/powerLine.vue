<template>
  <div class="h-line">
    <div class="chartsTitle">
      <i></i>
      <span>用电量</span>
      <slot name="name"></slot>
      <div v-for="(item,i) in testList"
           :key="i">
        <slot name="test"
              up="上"
              v-bind:todo="item.name"></slot>
      </div>
    </div>
    <ve-line :data="chartData"
             :settings="chartSettings"
             width="100%"
             height="100%"
             :extend="chartExtend"></ve-line>
    <!-- <slot></slot> -->
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      area: true,//是否显示为面积图
      itemStyle: { //面积图颜色设置
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(124, 106, 242, 1)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 0, 0, 0)' // 100% 处的颜色
            },
          ],
          globalCoord: false // 缺省为 false
        },
        borderColor: '#ffffff'
      },
    }
    return {
      chartExtend: {
        series: {
          label: {
            normal: {
              show: false, // 折现点上是否显示数据
            }
          },
          symbol: 'circle',
          symbolSize: 4, // 折现点鼠标移入显示大小
        },
        legend: {
          show: false // 标题展示
        },
        grid: { // 图标区域距离xy轴距离
          y: 10,
          y2: 10,
          left: 10,
          containLabel: true
        },
        xAxis: {
          axisLabel: {  // x轴坐标值颜色
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14
            }
          },
          axisLine: { // x轴颜色
            show: true,
            lineStyle: {
              color: 'rgba(124, 106, 242, 1)'
            }
          }
        },
        yAxis: {
          axisLabel: { // y轴坐标值颜色
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14
            }
          },
          splitLine: { // y轴背景折线
            show: true,
            lineStyle: {
              color: '#444444'
            }
          },
          position: 'left',
          axisLine: {  // y轴数据不展示
            show: false,
          }
        }
      },
      testList: [
        { id: 1, name: '123' },
        { id: 2, name: '223' },
        { id: 3, name: '323' }
      ]
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
<style lang="scss" scoped>
.h-line {
  // border: 1px solid pink;
  width: 100%;
  height: 100%;
  .chartsTitle {
    margin: 18px 10px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    i {
      border-left: 4px solid #0088ff;
      height: 16px;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
}
</style>