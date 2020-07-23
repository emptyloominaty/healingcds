export default {
    data() {
        return {
            healingCdsDataAll:[]
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

            /*  create empty array if null  */
            if (this.healingCdsDataAll === null) {
                this.healingCdsDataAll = []
            }

            /* delete hcd */
            this.healingCdsDataAll.splice(id, 1);

            /* reindex  */
            this.healingCdsDataAll.forEach((item,index) => {
                this.healingCdsDataAll[index][7]=index
            })

            /* sender */
            this.$root.$emit('reloead-heal-list', this.healingCdsDataAll)
            /*  save data to local storage */
            localStorage.setItem('healingcdsData', JSON.stringify(this.healingCdsDataAll))

        }
    }
}