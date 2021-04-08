<template>
  <div class="h-line">
    <div class="chartsTitle">
      <i></i>
      <span>设备统计</span>
    </div>
    <ve-ring class="ring-box"
             :data="chartData"
             :settings="chartSettings"
             height="400px"
             width="100%"
             :tooltip="tooltip"
             :extend="chartExtend"
             ref="chart_ring"></ve-ring>
    <span class="desc">{{percentage}}</span>
    <p class="title">{{text}}</p>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      label: {
        normal: {
          show: true,
          formatter (options) {
            const {
              value,
            } = options
            return `${parseInt((value).toFixed(2))}%\n\n在线`
          },
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '20',
            fontWeight: 'bold'
          }
        }
      },
      color: ['#1DD6CF', '#ED8DD0'],
    }
    return {
      tooltip: {
        show: false,
        trigger: 'none'
      },
      chartExtend: {
        legend: {
          top: 'middle',
          right: '10%', //位置
          orient: 'vertical',
          icon: "circle",//形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 15,  // 设置宽度
          itemHeight: 15, // 设置高度
          itemGap: 20, // 设置间距
        },
        color: ['#44F0FF', '#19355A']
      }
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    percentage: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      let chart = this.$refs['chart_ring'].echarts;
      setTimeout(function () {
        chart.dispatchAction({
          type: 'highlight',
          // 可选，系列 index，可以是一个数组指定多个系列
          seriesIndex: 0,
          dataIndex: 0
        });
      }, 0);
      //鼠标放置时高亮，移开后取消高亮
      chart.on('mouseover', function (params) {
        var options = this.getOption();
        var data = options.series[params.seriesIndex].data;
        for (var i = 0; i < data.length; i++) {
          if (i !== params.dataIndex) {
            this.dispatchAction({
              type: 'downplay',
              dataIndex: i
            });
          }
        }
      });
      // 鼠标单击时选中
      chart.on('click', function (params) {
        chart.dispatchAction({
          type: 'highlight',
          // 可选，系列 index，可以是一个数组指定多个系列
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
      });
    });
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