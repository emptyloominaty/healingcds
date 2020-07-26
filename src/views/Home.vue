<template>
  <div class="home">
    <!--  ******************************************** -->
    <header>
      <div class="data-buttons">

        <select class="data-name-select" @change="selectDataMethod()" v-model="selectData">
          <option   v-for="bossDat in bossData"
                    :key="bossDat.id"
                    v-bind:value="{ id: bossDat.id, name: bossDat.name}" >
           {{ bossDat.id+" - "+bossDat.name }}
                    </option>
        </select>
        <input class="input-data-name" type="text" value="" autocomplete="off" placeholder="Data Name" v-model="nameBossData" maxlength="30" v-on:keyup.enter="saveBossData()">
        <button class="btn btn-outline-dark btn-sm button-set-name" @click="saveBossData()" >Set Name</button>
        <span id="id-data"> {{ g_bossFight.id+" - "+g_bossFight.name }}</span>
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
        <add-damage-time v-bind:g_bossFight="g_bossFight" />
        <list-damage-times v-bind:g_bossFight="g_bossFight" />
      </section>
    </div>
    <flash-message class="flash-message-custom-success" ></flash-message>
  </div>
</template>

<script>
// @ is an alias to /src
import CdTable from '@/components/CdTable.vue'
import NavBottom from '@/components/NavBottom.vue'
import AddHealingCd from '@/components/AddHealingCd.vue'
import AddDamageTime from '@/components/AddDamageTime.vue'
import ListHealingCds from '@/components/ListHealingCds.vue'
import ListDamageTimes from '@/components/ListDamageTimes.vue'

export default {
  name: 'Home',
  components: {
    CdTable,
    NavBottom,
    AddHealingCd,
    AddDamageTime,
    ListHealingCds,
    ListDamageTimes
  },
  data() {
    return {
      //v-model
      selectData: "",
      nameBossData: "",
      //var
      g_bossFight: {
        id: 0,
        name: ""
      },
      bossData: this.loadBossData()
      }
    },
  methods: {
    selectDataMethod() {
      this.g_bossFight.id=this.selectData.id
      this.g_bossFight.name=this.selectData.name

      this.healingCdsDataAll = localStorage.getItem("healingcdsData") //TODO: FUNCTION PLS LOAD SAVE
      this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)
      /* emit */
      this.$root.$emit('reload-heal-list', this.healingCdsDataAll[this.g_bossFight.id])
      /* flash*/
      this.flash('Boss Fight Selected - ('+this.g_bossFight.id+') '+this.g_bossFight.name, 'info', {timeout: 3000, important: true});
    },
    generateBossData() {
      return [{id: 0,name: ""},{id: 1,name: ""},{id: 2,name: ""},{id: 3,name: ""},{id: 4,name: ""},{id: 5,name: ""},
        {id: 6,name: ""},{id: 7,name: ""},{id: 8,name: ""},{id: 9,name: ""}]
    },
    loadBossData() {
      this.bossData = localStorage.getItem("bossFightNames")
      return JSON.parse(this.bossData)
    },
    saveBossData() {
      this.bossData[this.g_bossFight.id].name = this.nameBossData
      this.g_bossFight.name = this.nameBossData

      /* load boss data*/
      this.bossData = localStorage.getItem("bossFightNames")
      this.bossData=JSON.parse(this.bossData)

      /* create data if null */
      if (this.bossData===null) {
        this.bossData= this.generateBossData()
      }

      this.bossData[this.g_bossFight.id].name =this.nameBossData

      /* store data */
      localStorage.setItem('bossFightNames', JSON.stringify(this.bossData))
      /* flash*/
      this.flash('Boss Fight Renamed - ('+this.g_bossFight.id+') '+this.nameBossData, 'info', {timeout: 3000, important: true});
      /* reset input */
      this.nameBossData = ""
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
  .healAndDmg {
    display:flex;
    justify-content: center;
  }
  #id-data {
    margin: 5px;
  }
  button:focus,button:active {
    box-shadow: none !important;
  }

  .input-data-name {
    margin:0 5px 0 5px;
  }
  .data-name-select {
    border-radius: 3px;
    height: 30px;
    background-color: rgba(0, 216, 255, 0.21);
  }
  .data-name-select option{
    background-color: #fff;
  }
</style>
