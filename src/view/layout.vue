
<template>
  <div>
    <Eharts :echartObj="echartObj"></Eharts>
    <asc :msg="title"></asc>
  </div>
</template>
<script>
import Eharts from '../components/echart.vue'
import asc from '../components/Header.vue'
  export default {
    name: 'Layout',
    components: {
      Eharts,
      asc
    },
    data () {
      return {
          title: '222222222',
          echartObj:{
            title: {
                text: 'ECharts 示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
          }
      }
    }
  }
</script>
<style scoped>

</style>
