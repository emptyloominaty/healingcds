<template>
  <div class="home">
    <!--for each-->
    <CdTable time=0 />
    <!--  test   -->
    <CdTable time=20 />
    <CdTable time=45 />
    <CdTable time=80 />
    <CdTable time=125 />

  <navBottom/>
    <add-healing-cd/>

  </div>
</template>

<script>
// @ is an alias to /src
import CdTable from '@/components/CdTable.vue'
import NavBottom from '@/components/NavBottom.vue'
import AddHealingCd from '@/components/AddHealingCd.vue'

export default {
  name: 'Home',
  components: {
    CdTable,
    NavBottom,
    AddHealingCd
  }
}
</script>


<style>
  .home {
    padding-left: 5px;
    max-width: 1170px;
    margin: 0 auto;
    text-align: left;
  }

</style>
