<template>
  <div>
    <b-map-component></b-map-component>
    <div>111</div>
  </div>
</template>
<script>
// import google from 'google'
import BMapComponent from '../BMapComponent';
export default {
  name: 'GGMap',
  components: {
    BMapComponent

  },
  data () {
    return {

    }
  },
  created () {
    console.log('页面中mount方法加载')
  },

  mounted () {
    console.log('页面中mount方法加载')

  },
  methods: {

  },
}
</script>