<style lang="stylus" rel="stylesheet/stylus">
.mainApp
  position absolute
  height 100%
  width 100%
</style>

<template>
<div class="mainApp">
    <CanvasBackground />
    <router-view class="router-view"></router-view>
</div>

</template>

<script>
import axios from 'axios'
import CanvasBackground from './components/CanvasBackground'

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {},
  components: {
    CanvasBackground
  }
}


</script>
