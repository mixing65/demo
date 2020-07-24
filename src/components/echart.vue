<template>
    <div>
        <div id="echart" ></div>
    </div>
</template>
 
<script>
import echarts from 'echarts'
export default {
    data() {
        return{
            myChart: {},
            height: 400,
        }
    },
    props: {
        echartObj: {
            type: Object,
            default: {}
        },
    },
    mounted(){
        this.loadEchart()
        console.log(this.echartObj.title.text)
    },
    methods: {
        loadEchart() {
            let myChart = echarts.init(document.getElementById("echart"));
            // myChart.style.height = this.height + 'px';
            myChart.resize()
            myChart.setOption({
                title: {
                    text: this.echartObj.title.text
                },
                tooltip: {},
                xAxis: {
                    data: this.echartObj.xAxis.data
                },
                yAxis: {},
                series: this.echartObj.series
            })
        }
    }
}
</script>
 
<style>
#echart {
    width: 50%;
    height: 300px;
}
</style>