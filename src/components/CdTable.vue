<template>
  <div class="healingcds-main">
    <span class="time-dmg" >Time: {{ secToMin(time) }} test xd</span>
  </div>
</template>

<script>
import appMixins from '../mixins/appMixins'

export default {
  mixins: [appMixins],
  name: 'Healing-Cds',
  props: {
    time: String   // TODO FIX Number
  }
}





</script>


<style scoped lang="scss">
  .time-dmg {
    font-size:20px
  }

a {
  color: #42b983;
}
</style>
