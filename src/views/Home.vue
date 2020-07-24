<template>
  <div class="home">
    <!--  ******************************************** -->
    <header>
      <div id="data-buttons">

        <select id="saved-data" @change="selectDataMethod()" v-model="selectData">
          <option id="0">-</option>
          <option   v-for="bossDat in bossData"
                    :key="bossDat.id"
                    v-bind:value="{ id: bossDat.id, name: bossDat.name}" >
           {{ bossDat.id }}
                    </option>
        </select>

        <span id="id-data">0</span>
        <input id="name-data" type="text" value="" autocomplete="off" placeholder="Data Name">
        <button class="btn btn-outline-dark btn-sm">Set Name</button>
        <span id="loadinfo"></span>
      </div>

    </header>
    <!--  ********************************************  -->
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
      <section class="healcds" >
        <add-healing-cd v-bind:g_bossFight="g_bossFight"  />
        <list-healing-cds v-bind:g_bossFight="g_bossFight" />
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
  },
  data() {
    return {
      //v-model
      selectData: "",
      //var
      g_bossFight: {
        id: 5,
        name: ""
      },
      bossData: [
        {id: 0,name: ""},{id: 1,name: ""},{id: 2,name: ""},{id: 3,name: ""},{id: 4,name: ""},{id: 5,name: ""},
        {id: 6,name: ""},{id: 7,name: ""},{id: 8,name: ""},{id: 9,name: ""}
      ]
      }
    },
  methods: {
    selectDataMethod() {
      this.g_bossFight.id=this.selectData.id
      this.g_bossFight.name=this.selectData.name
    }
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
