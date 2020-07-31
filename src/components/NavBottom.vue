<template>
    <div id="nav-bottom">
        <button class="btn btn-outline-dark" @click="hideUnusedCds()">Hide/Show Unused CDs</button>
        <button class="btn btn-outline-dark" @click="generateErtNote()">Generate ERT Note</button>
        <div style="display:none" id="ert-note">
            <button type="button" class="hide-ert" @click="toggleErt('none')">×</button>
            <h5>ERT Note</h5>
            <hr>
            <div id="ert-text"></div>
        </div>
    </div>
</template>

<script>
    import lsMixins from '../mixins/lsMixins'

    export default {
        props: ["g_bossFight"],
        mixins: [lsMixins],
        name: "NavBottom",
        methods: {
            hideUnusedCds() {
                let items = document.getElementsByClassName("healing-use-btn");
                if (!items) {
                    return false
                }
                let changeDisplay = ""

                if (items[0].style.display === "none") {
                    changeDisplay = "inline"
                } else {
                    changeDisplay = "none"
                }

                for (let i = 0; i < items.length; i++) {
                    items[i].style.display = changeDisplay;
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
                        ertText += "NOT WORKING XD "
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
        padding: 3px 32px 5px 3px;
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
        width:100%;
        min-height:75%;
        padding:5px;
        background-color: #f0f0f0;
        overflow: auto;
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