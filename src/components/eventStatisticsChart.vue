<template>
  <div class="h-line">
    <div class="chartsTitle">
      <i></i>
      <span>事件统计</span>
    </div>
    <ve-pie :data="chartData"
            :settings="chartSettings"
            :extend="chartExtend"></ve-pie>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      roseType: 'area',
      label: {
        color: '#ffffff',
        show: true,
      },
      labelLine: {
        show: false
      },
      width: '80%',
      itemStyle: {
        normal: {
          color: (params) => {
            return this.colorList[params.dataIndex]
          }
        }
      }

    }
    return {
      colorList: ['#32C5FF', '#FFD74D', '#4DDE6D', '#0088FF', '#01C1B2', '#5584FF', '#8272EC'],
      chartExtend: {
        grid: { // 图标区域距离xy轴距离
          y: 10,
          y2: 10,
          left: 10,
          containLabel: true
        },
        legend: {
          bottom: "7%",
          left: '10'
        },
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
<style lang="scss" scoped>
.h-line {
  border: 1px solid pink;
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