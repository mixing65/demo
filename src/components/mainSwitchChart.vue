<template>
  <div class="h-line">
    <div class="chartsTitle">
      <i></i>
      <span>总闸开关</span>
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
      label: {
        color: '#ffffff',
        show: true,
      },
      itemStyle: {
        normal: {
          color: (params) => {
            return this.colorList[params.dataIndex]
          }
        }
      }

    }
    return {
      colorList: ['#0088FF', '#CCCCCC'],
      chartExtend: {
        grid: { // 图标区域距离xy轴距离
          y: 10,
          y2: 10,
          left: 10,
          containLabel: true
        },
        legend: {
          top: 'middle',
          right: '10%', //位置
          orient: 'vertical',
          icon: "circle",//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 15,  // 设置宽度
          itemHeight: 15, // 设置高度
          itemGap: 20, // 设置间距
          // legend: {
          //   selectedMode: true,
          //   data: [],
          //   icon: 'circle',
          //   itemHeight: 9
          // },
          // color: ['#3399FF', '#B8B8B8'],
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