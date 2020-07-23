export default {
    data() {
        return {
            healingCdsDataAll:[],
            g_bossFight:  {
                id:0,
                name:""
            }
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
            /* TODO METHODS LOAD SAVE local storage */
            /* load data from local storage */
            this.healingCdsDataAll = localStorage.getItem("healingcdsData")
            this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)

            /* delete hcd */
            this.healingCdsDataAll[this.g_bossFight.id].splice(id, 1);

            /* reindex  */
            this.healingCdsDataAll[this.g_bossFight.id].forEach((item,index) => {
                this.healingCdsDataAll[this.g_bossFight.id][index][7]=index
            })

            /* sender */
            this.$root.$emit('reloead-heal-list', this.healingCdsDataAll[this.g_bossFight.id])
            console.log(this.healingCdsDataAll)
            /*  save data to local storage */
            localStorage.setItem('healingcdsData', JSON.stringify(this.healingCdsDataAll))

        }
    }
}