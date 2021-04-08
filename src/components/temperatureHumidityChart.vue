<template>
  <div class="h-line">
    <div class="chartsTitle">
      <i></i>
      <span>温湿度监测</span>
    </div>
    <div class="liquidfillContent">
      <ve-liquidfill :data="chartData"
                     :settings="chartSettings"
                     class="liquidfill">
      </ve-liquidfill>
      <!-- <div class="right">
        <span>总数 100</span>
        <span>工作中 75</span>
        <span>停止工作 25</span>
      </div> -->
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      seriesMap: {
        '温度': {
          color: ['#74A0FA'],
          itemStyle: {
            opacity: 0.7,
          },
          emphasis: {
            itemStyle: {
              opacity: 0.8
            }
          },
          outline: {
            show: true, //是否显示轮廓 布尔值
            borderDistance: 0, //外部轮廓与图表的距离 数字
            itemStyle: {
              borderColor: '#74A0FA', //边框的颜色
              borderWidth: 2,  //边框的宽度
            }
          },
          backgroundStyle: {
            color: 'none'
          },
          label: {
            formatter (options) {
              const {
                value,
                seriesName
              } = options
              return `${parseInt((value * 100).toFixed(2))}%\n${seriesName}`
            },
            fontSize: 30,
            // fontWeight: 'bold',
            color: '#fff',
            insideColor: '#fff',
          },
        }
      }
    }
    return {
      chartData: {
        columns: ['name', 'percent'],
        rows: [{
          name: '温度',
          percent: 0.57
        }]
      }
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
  .liquidfillContent {
    display: grid;
    grid-template-columns: 2fr 1fr;
    // justify-content: space-between;
    .liquidfill {
      background: #008;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        color: #ffffff;
      }
      :nth-child(1) {
        display: inline;
        // border: 1px solid #32c5ff;
        // background: #32c5ff;
      }
    }
  }
}
</style>