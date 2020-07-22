<template>
  <div class="healingcds-main">
    <span class="time-dmg" >Time: {{ getTime(time) }} test xd</span>
  </div>
</template>

<script>
export default {
  name: 'Healing-Cds',
  props: {
    time: Number
  },
  methods:{
    getTime(time) {
      if ((time % 60) < 10) {
        return (Math.floor(time / 60)) + ":0" + (time % 60)
      }
      else
      {
        return (Math.floor(time / 60)) + ":" + (time % 60)
      }
    }

  }
}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .time-dmg {
    font-size:20px
  }

a {
  color: #42b983;
}
</style>
