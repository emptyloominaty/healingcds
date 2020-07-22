<template>
  <div class="home">
    <section class="cds-table">
      <!--for each-->
      <CdTable time=0 />
      <!--  test   -->
      <CdTable time=20 />
      <CdTable time=45 />
      <CdTable time=80 />
      <CdTable time=125 />
    </section>
    <navBottom/>
    <div class="healAndDmg">
      <section class="healcds">
        <add-healing-cd/>
        <list-healing-cds/>
      </section>

      <section class="dmgtimes">
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CdTable from '@/components/CdTable.vue'
import NavBottom from '@/components/NavBottom.vue'
import AddHealingCd from '@/components/AddHealingCd.vue'
import ListHealingCds from '@/components/ListHealingCds.vue'

export default {
  name: 'Home',
  components: {
    CdTable,
    NavBottom,
    AddHealingCd,
    ListHealingCds
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
