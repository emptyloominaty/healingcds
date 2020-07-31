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
                    <CdTable :g_bossFight="g_bossFight" :damageTimesProp="damageTimes"/>
                </ul>

            </section>

            <navBottom v-bind:g_bossFight="g_bossFight" />
        </section>
        <div class="healAndDmg">

                <add-healing-cd class="add-healingcd" v-bind:g_bossFight="g_bossFight"/>
                <add-damage-time class="add-damagetime" v-bind:g_bossFight="g_bossFight"
                                 @reloadHealingCdsMain="damageTimes=loadDamageTimesData(g_bossFight.id)"/>

                <list-healing-cds class="list-healing" v-bind:g_bossFight="g_bossFight"/>
                <list-damage-times class="list-damage" v-bind:g_bossFight="g_bossFight"
                                   @reloadHealingCdsMain="damageTimes=loadDamageTimesData(g_bossFight.id)"/>
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
                healingCdsDataAll: "",
                bossData: this.loadBossData(),
                damageTimes: this.loadDamageTimesData(0)
            }
        },
        methods: {
            selectDataMethod() {
                this.g_bossFight.id = this.selectData.id
                this.g_bossFight.name = this.selectData.name

                this.healingCdsDataAll = localStorage.getItem("healingcdsData")
                this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)

                /* update table */
                this.damageTimes = this.loadDamageTimesData(this.g_bossFight.id)
                /* emit */
                this.$root.$emit('reload-heal-list', this.healingCdsDataAll[this.g_bossFight.id])
                this.$root.$emit('reload-damage-list', this.damageTimes)
                this.$root.$emit('reload-cd-table')
                /* flash */
                this.flash('Boss Fight Selected - (' + this.g_bossFight.id + ') ' + this.g_bossFight.name, 'info', {
                    timeout: 3000,
                    important: true
                });
            },
            generateBossData() {
                let bossdata = []
                for(let i = 0; i < 50; i++) {
                    bossdata.push({
                        id: i,
                        name: ""
                    })
                }
                return bossdata
            },
            loadBossData() {
                this.bossData = localStorage.getItem("bossFightNames")
                this.bossData = JSON.parse(this.bossData)
                /* create data if null */
                if (this.bossData === null) {
                    this.bossData = this.generateBossData()
                }

                return this.bossData
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
        padding-right: 5px;
        max-width: 1170px;
        margin: 0 auto;
        text-align: left;
    }

    .healAndDmg {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .add-damagetime,.list-healing,.list-damage {
        align-self: flex-start;
    }

    .add-healingcd {
        order:2;
    }
    .add-damagetime {
        order:3;
    }
    .list-healing {
        order:1;
    }
    .list-damage {
        order:4;
    }


    @media screen and (max-width: 1300px) {
        .healAndDmg {
            margin: 0 auto;
            display: flex;
            justify-content: center;
            max-width:917px;
          /* flex-direction: column;*/
            flex-wrap:wrap;
        }
        .add-healingcd {
            order:1;
        }
        .add-damagetime {
            order:2;
        }
        .list-healing {
            order:3;
        }
        .list-damage {
            order:4;
        }
    }


    #id-data {
        margin: 10px;
    }

    .main-section-app button {
        background-color: #fff;
        border: 1px transparent;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
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
