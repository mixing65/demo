<template>
  <div class="h-line">
    <div class="chartsTitle">
      <span>
        <i></i>
        <span>事件统计</span>
      </span>
      <el-select v-model="radio"
                 size="mini"
                 @change="changeSelect"
                 class="selectBox">
        <el-option v-for="item in radioType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
    </div>
    <ve-histogram :data="chartData"
                  height="100%"
                  width="100%"
                  :loading="loading"
                  :extend="chartExtend"
                  :settings="chartSettings"
                  :legend-visible="false">
    </ve-histogram>
  </div>

</template>
<script>
export default {
  name: "event",
  data () {
    this.chartSettings = {
      // yAxisName: [`(${this.$t("dashboard.eventType.since")})`]
    };
    return {
      radio: "year",
      // 时间
      radioType: [
        {
          label: '过去一周',
          value: "week"
        },
        {
          label: '过去一年',
          value: "year"
        }
      ],
      chartExtend: {
        grid: { // 图标区域距离xy轴距离
          y: 10,
          y2: 10,
          left: 10,
          containLabel: true
        },
        series: {
          barWidth: "25%",
          barGap: 0
        },
        yAxis: {
          position: "left",
          splitLine: {
            show: true,
            lineStyle: {
              color: '#444444'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#666666"
            }
          }
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#666666"
            }
          },
          axisLabel: {
            fontSize: 12
          }
        },
        color: ["#74A0FA"],
      },
      // 是否有数据
      loading: true
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log('222')
  },
  methods: {
    changeSelect (radio) {
    }
  }
};
</script>
<style lang="scss" scoped>
.h-line {
  border: 1px solid pink;
  width: 100%;
  height: 100%;
  .chartsTitle {
    display: flex;
    justify-content: space-between;
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
    .selectBox {
      background: pink;
    }
  }
}
</style>