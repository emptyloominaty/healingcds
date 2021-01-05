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
       ls_dmg_all() {
           let damageTimes = localStorage.getItem("damagetimesData")
           damageTimes = JSON.parse(damageTimes)
           damageTimes = this.dataCheck(damageTimes)
           return damageTimes
       },
        store_heal(data) {
           localStorage.setItem('healingcdsData', JSON.stringify(data))
        },
       store_damage(data) {
           localStorage.setItem('damagetimesData', JSON.stringify(data))
       },
       copy_cds(copyTo) {
           copyTo= +copyTo-1
           if (copyTo >= 0 && copyTo < 50) {
               let copyFrom = this.g_bossFight.id
               let heals = this.ls_heal_all()
               let damages = this.ls_dmg_all()

               heals[copyTo] = heals[copyFrom]
               damages[copyTo] = damages[copyFrom]

               this.store_heal(heals)
               this.store_damage(damages)
               /* flash */
               this.flash('Healing Cds Copied from '+ (copyFrom+1) +' to '+ (copyTo+1), 'success', {timeout: 3000, important: true});
           }
       }



    }
}