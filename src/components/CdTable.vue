<template>
  <div class="healingcds-main">
    <span class="time-dmg" >{{ secToMin(time) }} </span> <hr>
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

  hr {
    margin: 1px auto;
    margin-top: 3px;
    border: none;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
</style>
