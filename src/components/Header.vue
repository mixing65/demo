<template>
    <div>
        <div>1111</div>
        <div>{{msg}}</div>
    </div>
</template>
<script>
export default {
    name: 'headerbar',
    props:{
        msg: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>

</style>