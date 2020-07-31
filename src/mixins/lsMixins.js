export default {
   methods: {
        ls_dmg() {
            /* load damage data from local storage */
            let damageTimes = localStorage.getItem("damagetimesData")
            damageTimes = JSON.parse(damageTimes)

            return damageTimes[this.g_bossFight.id]
        },
        ls_heal() {
            /* load heal data from local storage */
            let healingCdsData = localStorage.getItem("healingcdsData")
            healingCdsData = JSON.parse(healingCdsData)

            return healingCdsData[this.g_bossFight.id]
        }

    }
}