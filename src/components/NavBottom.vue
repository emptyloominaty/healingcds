<template>
    <div id="nav-bottom">
        <button id="hide-button" class="btn btn-outline-dark" @click="hideUnusedCds()">Hide Unused CDs</button>
        <button class="btn btn-outline-dark" @click="generateErtNote()">Generate ERT Note</button>
        <div style="display:none" id="ert-note">
            <div class="head-ert"></div>
            <button type="button" class="hide-ert" @click="toggleErt('none')">×</button>
            <button id="copy-ert-button" @click="copyErt()">Copy </button>
            <h5>ERT Note</h5>

            <hr>
            <div id="ert-text"></div>
        </div>
        <button class="btn btn-outline-dark" @click="resetCdTable()"> Reset </button>
    </div>
</template>

<script>
    import lsMixins from '../mixins/lsMixins'

    export default {
        props: ["g_bossFight","displayHide"],
        mixins: [lsMixins],
        name: "NavBottom",
        methods: {
            resetCdTable() {
                if(confirm("Do you want to reset CDs?")){
                let healDataAll = this.ls_heal_all()
                let healData = healDataAll[this.g_bossFight.id]
                let healDataCount = healData.length
                for (let a = 0; a < healDataCount; a++) {
                    let healDataCount2 = healData[a][4].length
                    if (healDataCount2 > 0) {
                        for (let i = 0; i < healDataCount2; i++) {
                            healData[a][4][i] = 9999
                        }
                    }
                }
                healDataAll[this.g_bossFight.id] = healData
                this.store_heal(healDataAll)
                this.$root.$emit('reload-cd-table')
                }
            },
            copyErt() {
                window.getSelection().selectAllChildren(
                    document.getElementById("ert-text")
                );
                document.execCommand("copy");
                this.flash('Ert Note - Copied', 'success', {timeout: 3000, important: true});
            },
            hideUnusedCds() {
                let items = document.getElementsByClassName("healing-use-btn")
                let button = document.getElementById("hide-button")
                if (items.length == 0) {
                    return false
                }
                let changeDisplay = ""
                let opacityDisplay = 1

                if (items[0].style.display === "none" || items[0].style.opacity === "0" ) {
                    changeDisplay = "inline"
                    opacityDisplay = 1
                    button.innerText = "Hide Unused CDs"
                } else {
                    changeDisplay = "none"
                    opacityDisplay = 0
                    button.innerText = "Show Unused CDs"
                }
                for (let i = 0; i < items.length; i++) {
                    if (this.displayHide===0) {
                        items[i].style.display = changeDisplay
                    } else {
                        items[i].style.opacity = opacityDisplay
                    }
                }
            },
            generateErtNote() {
                let ertText = ""
                let healData = this.ls_heal()
                let damageData = this.ls_dmg()
                let damageCount = damageData.length

                for (let dd = 0; dd < damageCount; dd++) {
                    let time = damageData[dd][1]
                    if ((time % 60) < 10) {
                        ertText += (Math.floor(time / 60)) + ":0" + (time % 60)
                    } else {
                        ertText += (Math.floor(time / 60)) + ":" + (time % 60)
                    }
                    ertText += " - "

                    let healCount = healData.length
                    for (let cc = 0; cc < healCount; cc++) {
                       if (healData[cc][4].includes(dd)) {
                           let color = healData[cc][5].replace("#", "")
                            ertText +="|cff"+color+healData[cc][2]+"|r , "
                        }
                    }
                    ertText += "<br>"
                }

                document.getElementById("ert-text").innerHTML = ertText
                this.toggleErt("inline")
                return ertText
            },
            toggleErt(display) {
                let divEl = document.getElementById("nav-bottom")
                let ert = document.getElementById("ert-note")

                ert.style.top = divEl.offsetTop
                ert.style.left = divEl.offsetLeft
                ert.style.display = display
            }
        }
    }
</script>

<style scoped>
    div {
        margin-top: 20px;
        text-align: left;
    }

    h5 {
        padding: 3px 2px 3px 3px;
        text-align: center;
    }

    button {
        margin-right: 6px;
    }

    button:focus, button:active {
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3) !important;
    }

    button:hover {
        cursor: pointer;
    }
    .head-ert {

    }

    #ert-note {
        padding: 10px;
        position: absolute;
        margin: 0 auto;
        width: 300px;
        height: 300px; /* TEST */
        background-color: #fff;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
    }
    #ert-text {
        width: 100%;
        height: 75%;
        padding: 5px;
        margin-top: 5px;
        background-color: #f0f0f0;
        overflow: auto;
        display:inline-block;
    }

    #copy-ert-button {
        line-height: 22px;
        float: right;
        box-shadow: 0 0 0 0 !important;
        outline: none !important;
        background-color: #a7a7a7;
        color: rgba(0, 0, 0, 0.68);
    }

    .hide-ert {
        border-radius: 0px;
        font-size: 30px;
        line-height: 22px;
        float: left;
        box-shadow: 0 0 0 0 !important;
        outline: none !important;
        background-color: #FF8986;
        color: rgba(0, 0, 0, 0.68);
    }

    .hide-ert:hover {
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3) !important;
    }

</style>