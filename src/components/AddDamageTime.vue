<template>
    <div class="input-group-hcd">
        <div class="add-damage-div">
            <form id="add-damage"  @submit.prevent="addDamage()" >
                <h5>Add New Raid Damage </h5>
                <div id="damage-user-input">

                    <input class="form-control text-center" type="text" name="text" placeholder="Damage Name"
                           autocomplete="off" v-model="vDamageName">
                    <input class="form-control text-center"  type="time" placeholder="Time" value="00:00"
                           autocomplete="off" v-model="vDamageTime">
                    <button id="form-damage-submit" type='submit' name='submit'>Add Damage</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddDamageTime",
        props: ["g_bossFight"],
        data() {
            return {
                //v-models
                vDamageName: "",
                vDamageTime: "00:00",
                //var
                damageTimes: "",
                damageTimesLength: 0
            }
        },
        methods: {
            addDamage() {
                /* load data from local storage */
                this.damageTimes = localStorage.getItem("damagetimesData")
                this.damageTimes = JSON.parse(this.damageTimes)

                /*  create empty array if null  */
                if (this.damageTimes===null) {
                    this.damageTimes = []
                }
                if(typeof this.damageTimes[this.g_bossFight.id] === 'undefined' || this.damageTimes[this.g_bossFight.id] === null  ) {
                    this.damageTimes[this.g_bossFight.id] = []
            }

                /*  check length of array  */
                this.damageTimesLength = this.damageTimes[this.g_bossFight.id].length
                /* add new data */
                this.damageTimes[this.g_bossFight.id][this.damageTimesLength]=[this.vDamageName,this.getTimeInput(this.vDamageTime),this.damageTimesLength]
                /* sort array */
                this.damageTimes[this.g_bossFight.id].sort(function(a, b) {
                    return a[1] - b[1];
                })
                /*  store data */
                localStorage.setItem('damagetimesData', JSON.stringify(this.damageTimes))

                /* sender */
                this.$root.$emit('reload-damage-list',this.damageTimes[this.g_bossFight.id])
                /* flash */
                this.flash('Damage Time Added - '+this.vDamageName+" ("+this.vDamageTime+")", 'success', {timeout: 3000, important: true});
                /* reset inputs */
                this.vDamageName=""
                this.vDamageTime="00:00"
            },
            getTimeInput(value) {
                let timevalues = value.split(":")
                return (parseInt(timevalues[0])*60)+parseInt(timevalues[1])
            }
        }
    }
</script>

<style scoped>
    h5 {
        color: #444;
        text-align:center;
        margin-bottom:18px;
    }
    label {
        color: #777;
        font-size:12px;
        margin-top:5px;
        margin-bottom: 2px;
    }
    form input {
        font-weight: 600;
    }
    #damage-user-input {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
    }
    input:focus {
        box-shadow: none !important;
        border: 2px solid #FF8991 !important;
        transition: border-width 0.07s ease-in-out;
    }

    /* Buttons */
    button {
        width: 150px;
        border-radius: 3px;
        border: 1px solid #bbb;
        padding: 6px 24px;
        font-weight: 600;
        margin: 0 auto;
        color: #444;
        background-color: #FF8991;
    }

    button:hover {
        transition-duration: 75ms;
        background-color: #ff9595;
        box-shadow: 0 0 4px 1px rgba(0,0,0,0.2);
    }

    /* Input Time   */
    input[type="time"] {
        width:100px;
        margin:5px auto 5px auto;
    }
    input[type="time"]::-webkit-calendar-picker-indicator {
        display:none;
    }

</style>