<template>
    <li class="healingcds-main">

        <div class="healingcds-main-table" v-for="item in damageTimesProp" v-bind:key="item[2]">
            <div class="healingcds-flex">
                <span class="time-dmg">{{ secToMin(item[1]) }} </span>
                <button class="healing-use-btn"  v-bind:id="'healCdBtn-'+itemH[7]+'-'+item[2]" v-for="itemH in healData"
                        v-bind:key="itemH[7]" @click="doSomething(itemH[7],item[2],'healCdBtn-'+itemH[7]+'-'+item[2])" > {{ itemH[2] }}
                </button>
                <span class="name-dmg-cd"> {{ item[0] }} </span>
            </div>
            <hr>
        </div>

    </li>
</template>

<script>
    import appMixins from '../mixins/appMixins'

    export default {
        mixins: [appMixins],
        name: 'CdTable',
        props: ["g_bossFight", "damageTimesProp"],
        data() {
            return {
                healData: this.loadHealingCdsData()
            }
        },
        methods: {
            doSomething(heal,dmg,idEl) {
                let healBtn = document.getElementById(idEl)
                let classBtn = healBtn.className
                let healData = this.loadHealCds()

                if (classBtn=="healing-use-btn") {
                    healData[this.g_bossFight.id][heal][4][dmg] = dmg
                } else {
                    healData[this.g_bossFight.id][heal][4][dmg] = 9999
                }

                this.saveHealCds(healData)
                this.healData = healData[this.g_bossFight.id]
                this.generateHcdHtml()
            },
            generateHcdHtml() {
                this.reloadHdata()
                    setTimeout(() => {
                        /* return false if no data */
                        if (!this.healData || !this.damageTimesProp ) {
                            return false
                        }
                        let dmgCount = this.damageTimesProp.length
                        let healCount = this.healData.length
                        let timeNext = 0

                        /* dmg   0-name 1-time 2-id */
                        let dmgTkn = this.damageTimesProp

                        /* heal   0 cd time  1 value 2 name 3 cd used 4 Used at  5 background color 6 font color 7 id  */
                        let healCd = this.healData


                        /* Loop Start {*/
                        /* a = dmg / b = heal */
                        for (let a = 0; a < dmgCount; a++) {
                            let time = dmgTkn[a][1]
                            let healOnCd = []


                            /* is heal on cd? */
                            for (let i = 0; i < healCount; i++) {
                                if (healCd[i][3] > 0) {
                                    healCd[i][3] = healCd[i][3] - (time - timeNext)
                                    if (healCd[i][3] < 0) {
                                        healCd[i][3] = 0
                                    }
                                }
                                healOnCd[i] = healCd[i][3]
                            }
                            /* healing cds loop */
                            for (let b = 0; b < healCount; b++) {
                                let canUseCD = 1
                                for (let z = 0; z < dmgCount; z++) { //prev cd
                                    for (let y = 0; y < dmgCount; y++) {
                                        if (healCd[b][4][y] != undefined) {
                                            if (healCd[b][4][y] != "" && healCd[b][4][y] != 9999) {
                                                let dTime = dmgTkn[(healCd[b][4][y])][1]
                                                let hCD = healCd[b][0]
                                                if (dTime > time) {
                                                    if ((dTime - hCD) < time) {
                                                        canUseCD = 0
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                let healCdElement = document.getElementById("healCdBtn-" + b + "-" + a + "")
                                /* BUTTONS */
                                if (healCd[b][4].includes(a)) {
                                    if (healOnCd[b] == 0) {
                                        healCd[b][3] = healCd[b][0]
                                        // USED BUTTON
                                        healCdElement.className = "healing-dontuse-btn"
                                        healCdElement.style.color = healCd[b][6]
                                        healCdElement.style.backgroundColor = healCd[b][5]
                                    } else {
                                        //USED BUTTON BUT CANT USE
                                        healCdElement.className = "healing-dontuse-btn"
                                        healCdElement.style.color = "#FFF"
                                        healCdElement.style.backgroundColor = "#FF0000"
                                    }
                                } else {

                                    healCdElement.style.color = "#FFF"
                                    healCdElement.style.backgroundColor = "#AAA"
                                    if (canUseCD == 1) {
                                        if (healOnCd[b] == 0) {
                                            //USE BUTTON
                                            healCdElement.style.display = "inline"
                                            healCdElement.className = "healing-use-btn"
                                        } else {
                                            //HIDDEN
                                            healCdElement.style.display = "none"
                                            healCdElement.className = "healing-hidden-btn"
                                        }
                                    } else {
                                        //HIDDEN
                                        healCdElement.style.display = "none"
                                        healCdElement.className = "healing-hidden-btn"
                                    }
                                }
                            }

                            timeNext = time;
                        }
                        /*} Loop End */

                    } , 30);

                return true
            },
            reloadHdata() {
                this.healData = this.loadHealingCdsData()
            }
        },
        created() {
            /* listener */
            this.$root.$on('reload-cd-table', () => {this.generateHcdHtml()})
        },
        mounted() {
            this.generateHcdHtml()
        }
    }
</script>


<style scoped>
</style>
