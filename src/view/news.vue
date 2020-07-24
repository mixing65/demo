<template>
  <div class="home">
    <headerbar></headerbar>
    <footerbar></footerbar>
  </div>
</template>

<script>
import headerbar from "../components/headerbar";
import footerbar from "../components/footerbar";
export default {
  name: "home",
  components: {
    headerbar,
    footerbar
  },
  created() {
    console.log(this.$route.query.img);
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>