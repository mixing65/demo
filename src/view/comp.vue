<template>
    <div>
        <input type="text" name="" id="" :disabled="disabled">
        <button @click="nouse">不可编辑</button>
        <button @click="use">可编辑</button>
        <!-- <div @click="show=true">1</div><div @click="show=false">2</div>
        <headerbar :msg='msginfo' v-if="show" />
        <headerbar2 :msg='info' v-else /> -->
    </div>
</template>
<script>
// import headerbar from '../components/Header'
// import headerbar2 from '../components/Header2'
export default {
    components:{
        // headerbar,
        // headerbar2
    },
    data() {
        return {
            msginfo: '组件1',
            info: '组件2',
            show: true,
            disabled: false

        }
    },
    methods: {
        nouse(){
            this.disabled = true
        },
        use(){
            this.disabled = false
        }
    }
}
</script>
<style>

</style>