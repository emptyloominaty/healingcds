<template>
    <div class="home">
        <section class="main-section-app">
            <!--  ******************************************** -->
            <section class="top-section">
                <div class="data-buttons">

                    <select class="data-name-select" @change="selectDataMethod()" v-model="selectData">
                        <option v-for="bossDat in bossData"
                                :key="bossDat.id"
                                v-bind:value="{ id: bossDat.id, name: bossDat.name}">
                            {{ bossDat.id+" - "+bossDat.name }}
                        </option>
                    </select>
                    <input class="input-data-name" type="text" value="" autocomplete="off" placeholder="Data Name"
                           v-model="nameBossData" maxlength="30" v-on:keyup.enter="saveBossData()">
                    <button class="btn btn-outline-dark btn-sm button-set-name" @click="saveBossData()">Set Name
                    </button>
                    <span id="id-data"> {{ g_bossFight.id+" - "+g_bossFight.name }}</span>
                </div>

            </section>
            <!--  ********************************************  -->
            <section class="cds-table pt-2">
                <ul>
                    <CdTable v-for="item in damageTimes" v-bind:key="item[2]" :idProp="item[2]" :time="item[1]" :g_bossFight="g_bossFight" :damageTimesProp="damageTimes" />
                </ul>

            </section>

            <navBottom/>
        </section>
        <div class="healAndDmg">
            <section class="healcds">
                <add-healing-cd v-bind:g_bossFight="g_bossFight"/>
                <add-damage-time class="add-damagetime" v-bind:g_bossFight="g_bossFight"
                                 @reloadHealingCdsMain="damageTimes=loadDamageTimesData(g_bossFight.id)"/>

            </section>

            <section class="dmgtimes">
                <list-healing-cds v-bind:g_bossFight="g_bossFight"/>
                <list-damage-times v-bind:g_bossFight="g_bossFight"
                                   @reloadHealingCdsMain="damageTimes=loadDamageTimesData(g_bossFight.id)"/>
            </section>
        </div>
        <flash-message class="flash-message-custom-success"></flash-message>
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
                bossData: this.loadBossData(),
                damageTimes: this.loadDamageTimesData(0)
            }
        },
        methods: {
            selectDataMethod() {
                this.g_bossFight.id = this.selectData.id
                this.g_bossFight.name = this.selectData.name

                this.healingCdsDataAll = localStorage.getItem("healingcdsData") //TODO: FUNCTION PLS LOAD SAVE
                this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)

                /* update table */
                this.damageTimes = this.loadDamageTimesData(this.g_bossFight.id)
                /* emit */
                this.$root.$emit('reload-heal-list', this.healingCdsDataAll[this.g_bossFight.id])
                this.$root.$emit('reload-damage-list', this.damageTimes)
                /* flash */
                this.flash('Boss Fight Selected - (' + this.g_bossFight.id + ') ' + this.g_bossFight.name, 'info', {
                    timeout: 3000,
                    important: true
                });
            },
            generateBossData() {
                return [{id: 0, name: ""}, {id: 1, name: ""}, {id: 2, name: ""}, {id: 3, name: ""}, {
                    id: 4,
                    name: ""
                }, {id: 5, name: ""},
                    {id: 6, name: ""}, {id: 7, name: ""}, {id: 8, name: ""}, {id: 9, name: ""}]
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
                this.bossData = JSON.parse(this.bossData)

                /* create data if null */
                if (this.bossData === null) {
                    this.bossData = this.generateBossData()
                }

                this.bossData[this.g_bossFight.id].name = this.nameBossData

                /* store data */
                localStorage.setItem('bossFightNames', JSON.stringify(this.bossData))
                /* flash*/
                this.flash('Boss Fight Renamed - (' + this.g_bossFight.id + ') ' + this.nameBossData, 'info', {
                    timeout: 3000,
                    important: true
                });
                /* reset input */
                this.nameBossData = ""
            },
            loadDamageTimesData(id) {
                /* load data from local storage */
                this.damageTimes = localStorage.getItem("damagetimesData")
                this.damageTimes = JSON.parse(this.damageTimes)
                return this.damageTimes[id]
            }
        },
        created() {
            /* listener */
            this.$root.$on('reloadHealingCdsMain', this.damageTimes = this.loadDamageTimesData(0))
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
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .healcds, .dmgtimes {
        display: flex;
        flex-direction: row;
        align-self: center;
    }

    .add-damagetime {
        align-self: flex-start;
    }

    #id-data {
        margin: 10px;
    }
   .main-section-app button {
        background-color:#fff;
        border: 1px transparent;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
    }

    button:focus, button:active {
        box-shadow: none !important;
    }

    .input-data-name {
        margin: 0 5px 0 5px;
    }

    .data-name-select {
        border-radius: 3px;
        height: 30px;
        background-color: rgba(0, 216, 255, 0.21);
    }

    .data-name-select option {
        background-color: #fff;
    }
</style>
