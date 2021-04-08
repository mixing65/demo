<template>
  <div class="h-ring">
    <div class="ring-relative">
      <ve-ring class="ring-box"
               :data="chartData"
               :settings="chartSettings"
               height="400px"
               width="400px"
               :tooltip="tooltip"
               :extend="chartExtend"></ve-ring>
      <span class="desc">{{percentage}}</span>
    </div>
    <p class="title">{{text}}</p>
  </div>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      dimension: 'name',
      metrics: 'value',
      label: {
        normal: {
          show: true
        }
      },
      radius: [
        '25', '40'
      ],
      offsetY: 56
    }
    return {
      tooltip: {
        trigger: 'none'
      },
      chartExtend: {
        legend: {
          show: false
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
  }
}
</script>