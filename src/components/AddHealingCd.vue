<template>
    <div class="input-group-hcd">
        <form id="add-healing" @submit.prevent="addCd()">
            <h5 class="">Add New Healing CD </h5>

            <!-- Main Form -->
            <div class="form-group" id="heal-user-input">
                <select id="select-heal" @change="selectCd()" v-model="healSelect" >
                    <option
                            v-for="healingCooldown in healingCooldowns"
                            :key="healingCooldown.id"
                            v-bind:value="{ id: healingCooldown.id, name: healingCooldown.name, cooldown: healingCooldown.cooldown,
                            cdValue: healingCooldown.healValue , colorB: healingCooldown.colorB , colorF: healingCooldown.colorF , spellId: healingCooldown.spellId}">
                        {{ healingCooldown.name + " | " + healingCooldown.cooldown + " s " }}
                    </option>
                </select>
                <button  id="form-heal-submit" type='submit' name='submit' >Add Heal CD</button>
            </div>

            <!-- Custom CD -->
            <div id="heal-user-input2">
                <h5> Custom Healing CD </h5>
                <label for="form-heal-name" >Heal Name</label>
                <input class="form-control text-center"  maxlength="20" id="form-heal-name" type="text" name="text" value="()"
                       v-model="healName"
                       autocomplete="off" >
                <label for="form-heal-cd">Heal Cd (Sec)</label>
                <input class="form-control text-center" id="form-heal-cd" type="number" name="text" v-model="healCdTime"
                       autocomplete="off" >
             <!--   <label for="form-heal">Heal Value</label>
                <input class="form-control" id="form-heal" type="number" name="text" placeholder="Heal Value" value="50" v-model="healVal"
                       autocomplete="off" >-->
                <label for="form-heal-color">Heal Background Color</label>
                <input class="form-control text-center" id="form-heal-color" type="text" name="text"  value="#000"
                       v-model="healColor"
                       autocomplete="off"  >
                <label for="form-heal-font-color">Heal Font Color</label>
                <input class="form-control text-center" id="form-heal-font-color" type="text" name="text"  value="#FFF"
                       v-model="healFontColor"
                       autocomplete="off"  >
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddHealingCd",
        props: ["g_bossFight"],
        data() {
            return {
                //v-model
                healerName: "",
                healSelect: "",
                healName: "",
                healCdTime: "",
                healVal: "",
                healColor: "",
                healFontColor: "",
                spellId: "",
                //var
                healingCdsDataAll: [],
                healingCdsData1: [],
                healingCdsLength: "",
                healingCooldowns: [
                    {id: 0, name: "Revival", cooldown: 180, healValue: 10, colorB: "#00FF96", colorF: "#0f0f0f", spellId:"115310"},
                    {id: 1, name: "Chi-Ji", cooldown: 180, healValue: 10, colorB: "#00FF96", colorF: "#0f0f0f" , spellId:"325197"},
                    {id: 2, name: "Yu'lon", cooldown: 180, healValue: 10, colorB: "#00FF96", colorF: "#0f0f0f", spellId:"343655"},
                    {id: 3, name: "HTT", cooldown: 180, healValue: 10, colorB: "#0070DE", colorF: "#fff", spellId:"108280"},
                    {id: 4, name: "SLT", cooldown: 180, healValue: 10, colorB: "#0070DE", colorF: "#fff", spellId:"98008"},
                    {id: 5, name: "Fluorish", cooldown: 90, healValue: 10, colorB: "#FF7D0A", colorF: "#fff", spellId:"197721"},
                    {id: 6, name: "Tree", cooldown: 180, healValue: 10, colorB: "#FF7D0A", colorF: "#fff", spellId:"33891"},
                    {id: 7, name: "Tranquility", cooldown: 180, healValue: 10, colorB: "#FF7D0A", colorF: "#fff", spellId:"740"},
                    {id: 8, name: "AW", cooldown: 120, healValue: 10, colorB: "#F58CBA", colorF: "#fff", spellId:"31884"},
                    {id: 9, name: "Aura", cooldown: 180, healValue: 10, colorB: "#F58CBA", colorF: "#fff", spellId:"31821"},
                    {id: 10, name: "Divine Hymn", cooldown: 180, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"64843"},
                    {id: 11, name: "Salvation", cooldown: 720, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"265202"},
                    {id: 12, name: "Apotheosis", cooldown: 120, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"200183"},
                    {id: 13, name: "Barrier", cooldown: 180, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"62618"},
                    {id: 14, name: "Evangelism", cooldown: 90, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"246287"},
                    {id: 15, name: "Rapture", cooldown: 90, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"47536"},
                    {id: 16, name: "Spirit Shell", cooldown: 60, healValue: 10, colorB: "#ffffff", colorF: "#0f0f0f", spellId:"109964"},
                    {id: 17, name: "Darkness", cooldown: 180, healValue: 10, colorB: "#A330C9", colorF: "#fff", spellId:"196718"},
                    {id: 18, name: "RallyingCry", cooldown: 180, healValue: 10, colorB: "#C79C6E", colorF: "#fff", spellId:"97462"},
                    {id: 19, name: "AMZ", cooldown: 120, healValue: 10, colorB: "#C41E3A", colorF: "#fff", spellId:"51052"}

                ]
            }
        },
        methods: {
            addCd() {
                /* load data from local storage */
                this.healingCdsDataAll = localStorage.getItem("healingcdsData")
                this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)

                /*  create empty array if null  */
                if (this.healingCdsDataAll===null) {
                  this.healingCdsDataAll = [[]]
                }
                if(typeof this.healingCdsDataAll[this.g_bossFight.id] === 'undefined' || this.healingCdsDataAll[this.g_bossFight.id] === null  ) {
                    this.healingCdsDataAll[this.g_bossFight.id] = []
                }

                /*  check length of array  */
                this.healingCdsLength = this.healingCdsDataAll[this.g_bossFight.id].length

                /* add hCd data to the array */
                if (this.healCdTime>0) {
                    this.healingCdsData1 = [this.healCdTime, this.healVal, this.healName, 0, [], this.healColor, this.healFontColor, this.healingCdsLength, this.spellId]
                    /* 0 cd time  1 value 2 name 3 ???cd used???????? 4 Used at  5 background color 6 font color 7 id  // 8 =SPELLID*/
                    this.healingCdsDataAll[this.g_bossFight.id][this.healingCdsLength] = (this.healingCdsData1)
                    /*  store data */
                    localStorage.setItem('healingcdsData', JSON.stringify(this.healingCdsDataAll))
                    /* sender */
                    this.$root.$emit('reload-cd-table')
                    this.$root.$emit('reload-heal-list',this.healingCdsDataAll[this.g_bossFight.id])

                    /* flash */
                    this.flash('Heal CD Added - '+this.healName, 'success', {timeout: 3000, important: true});
                } else {
                    this.flash('Choose CD', 'failure', {timeout: 3000, important: true});
                }
                /* reset inputs */
                this.healName = ""
                this.healCdTime = ""
                this.healVal = ""
                this.healColor = "#4CAF50"
                this.healFontColor = "#FFF"
                this.healSelect = ""
            },
            selectCd() {
                this.healName = this.healSelect.name
                this.healCdTime = this.healSelect.cooldown
                this.healVal = this.healSelect.healValue
                this.healColor = this.healSelect.colorB
                this.healFontColor = this.healSelect.colorF
                this.spellId = this.healSelect.spellId
            }
        }
    }
</script>

<style scoped>
    h5 {
        color: #444;
        text-align:center;
    }
    label {
        color: #777;
        font-size:12px;
        margin-top:5px;
        margin-bottom: 2px;
    }
    form, #heal-user-input {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
    }
    form input {
        font-weight:600;
    }

    select, button {
        border-radius: 3px;
    }

    button:focus,button:active {
        outline: none !important;
    }

    select {
        padding: 5px 7px 5px 7px;
        margin: 10px auto 10px auto;
        width:200px;
        color: #444;
        font-weight:600;
        border-color: #ced4da;
        background-color: rgb(184, 255, 203);

    }
    select option{
        background-color: #fff;
    }

    button {
        width: 150px;
        border-radius: 3px;
        border: 1px solid #bbb;
        padding: 6px 24px;
        font-weight: 600;
        margin: 0 auto;
        color: #444;
        background-color: #01FF70;
    }

    button:hover {
        transition-duration: 75ms;
        background-color: #49F493;
        box-shadow: 0 0 4px 1px rgba(0,0,0,0.2);
    }

    #heal-user-input2,#form-heal-healer {
        width: 200px;
        margin: 0 auto;
    }

    input:focus {
        box-shadow: none !important;
        border: 2px solid #01FF70 !important;
        transition: border-width 0.07s ease-in-out;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }






</style>