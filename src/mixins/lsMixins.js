export default {
   methods: {
       dataCheck(data) {
           if (!data) {
               data = [[]]
           }
           return data
       },
        ls_dmg() {
            let damageTimes = localStorage.getItem("damagetimesData")
            damageTimes = JSON.parse(damageTimes)
            damageTimes = this.dataCheck(damageTimes)
            return damageTimes[this.g_bossFight.id]
        },
        ls_heal() {
           return this.ls_heal_all()[this.g_bossFight.id]
        },
        ls_heal_all() {
            let healingCdsData = localStorage.getItem("healingcdsData")
            healingCdsData = JSON.parse(healingCdsData)
            healingCdsData  = this.dataCheck(healingCdsData)
            return healingCdsData
        },
        store_heal(data) {
           localStorage.setItem('healingcdsData', JSON.stringify(data))
        }



    }
}