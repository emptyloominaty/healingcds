export default {
    props: {"g_bossFight": Object
    },
    data() {
        return {
            healingCdsDataAll: [],
            damageTimes: [],
        }
    },
    methods: {
        secToMin(timeSec) {
            if ((timeSec % 60) < 10) {
                return (Math.floor(timeSec / 60)) + ":0" + (timeSec % 60)
            } else {
                return (Math.floor(timeSec / 60)) + ":" + (timeSec % 60)
            }
        },
        deleteHealCd(id) {
            /* load data from local storage */
            this.healingCdsDataAll = localStorage.getItem("healingcdsData")
            this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)

            /* delete hcd */
            this.healingCdsDataAll[this.g_bossFight.id].splice(id, 1);

            /* reindex  */
            this.healingCdsDataAll[this.g_bossFight.id].forEach((item,index) => {
                this.healingCdsDataAll[this.g_bossFight.id][index][7]=index
            })
            /* flash */
            this.flash('Healing CD Deleted ', 'success', {timeout: 3000, important: true});
            /* sender */
            this.$root.$emit('reload-heal-list', this.healingCdsDataAll[this.g_bossFight.id])
            /*  save data to local storage */
            localStorage.setItem('healingcdsData', JSON.stringify(this.healingCdsDataAll))

        },
        deleteDamageTimes(id) {
            /* load data from local storage */
            this.damageTimes = localStorage.getItem("damagetimesData")
            this.damageTimes = JSON.parse(this.damageTimes)

            /* delete dtime */
            this.damageTimes[this.g_bossFight.id].splice(id, 1);

            /* reindex  */
            this.damageTimes[this.g_bossFight.id].forEach((item,index) => {
                this.damageTimes[this.g_bossFight.id][index][2]=index
            })
            /* flash */
            this.flash('Damage Time Deleted ', 'success', {timeout: 3000, important: true});
            /* sender */
            this.$root.$emit('reload-damage-list', this.damageTimes[this.g_bossFight.id])
            /*  save data to local storage */
            localStorage.setItem('damagetimesData', JSON.stringify(this.damageTimes))
            return id
        }
    }
}