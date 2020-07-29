<template>
    <li class="healingcds-main">
        <!--
        <div v-for="item in damageTimesProp" v-bind:key="item[2]">
            <div class="healingcds-flex">
                <span class="time-dmg">{{ secToMin(item[1]) }} </span>
                <button class="healing-use-btn" v-bind:id="'healCdBtn-'+itemH[7]+'-'+item[2]" v-for="itemH in healData"
                        v-bind:key="itemH[7]"> {{ itemH[2] }}
                </button>
                <span class="name-dmg-cd"> {{ item[0] }} </span>
            </div>
            <hr>
        </div>
        -->
        <div class="healingcds-main-table" v-html="cdTableHtml">
        </div>
        <button @click="generateHcdHtml()"> CLICK PLS</button>
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
                healData: this.loadHealingCdsData(),
                cdTableHtml: "<span>XD HELP ME</span>"
            }
        },
        methods: {
            generateHcdHtml() {
                let htmldata = ""

                let dmgCount = this.damageTimesProp.length
                let healCount = this.healData.length
                let timeNext = 0

                /* dmg   0-name 1-time 2-id */
                let dmgTkn = this.damageTimesProp

                /* heal   0 cd time  1 value 2 name 3 cd used 4 Used at  5 background color 6 font color 7 id  */
                let healCd = this.healData


                /* Start */
                for (let a = 0; a < dmgCount; a++) {
                    let time = dmgTkn[a][1]
                    let healOnCd = []
                    let canUseCD = 1
                    /* Time */
                    htmldata = htmldata + "<div class='healingcds-flex'> <span class='time-dmg' > " + this.secToMin(time) + " </span> "

                    /* ????????????????? */
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
                        for (let z = 0; z < healCount; z++) {
                            for (let y = 0; y < dmgCount; y++) {
                                if (healCd[b][4][y] != undefined) {
                                    if (healCd[b][4][y] != "" && healCd[b][4][y] != 9999) {
                                        let dTime = dmgTkn[(healCd[b][4][y])][0]
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


                        /* BUTTONS */
                        if (healCd[b][4].includes(a)) {

                            if (healOnCd[b] == 0) {
                                healCd[b][3] = healCd[b][0];
                                // USED BUTTON
                            } else {
                                //USED BUTTON BUT CANT USE LMAO U NOOB
                            }
                        } else {
                            if (canUseCD == 1) {
                                if (healOnCd[b] == 0) {
                                    //USE BUTTON
                                    htmldata = htmldata + "<button class='healing-use-btn'  @click='useHCd("+b+","+a+")'  >"+ healCd[b][2] +"</button>"
                                }
                            }
                        }
                    }

                    timeNext = time;
                    htmldata = htmldata + "<span class='name-dmg-cd'> " + dmgTkn[a][0] + " </span>" + "</div><hr>"
                }
                /* End */


                this.cdTableHtml = htmldata + "<p>NAM NAM DONE CUMPLETED</p>"
            },
            useHCd(heal,dmg) {
               console.log(heal+dmg);
            }
        },
        mounted() {
            /* listener */
            this.$root.$on('reload-heal-list', data => (this.healData = data))
        }
    }
</script>


<style scoped>
</style>
