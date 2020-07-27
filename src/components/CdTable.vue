<template>
    <li class="healingcds-main">
        <div class="healingcds-flex">
            <span class="time-dmg">{{ secToMin(time) }} </span>
            <button class="healing-use-btn" v-for="item in healData[g_bossFight.id]" v-bind:key="item[7]">{{ item[2]}}</button>  <!-- v-bind:style="{  backgroundColor: item[5], color: item[6] }" -->
            <span class="name-dmg-cd">{{ damageTimesProp[idProp][0] }}</span>
        </div>
        <hr>
    </li>
</template>

<script>
    import appMixins from '../mixins/appMixins'

    export default {
        mixins: [appMixins],
        name: 'CdTable',
        props: ["time", "g_bossFight", "damageTimesProp", "idProp"],
        data() {
            return {
                healData: this.loadHealCds(),
                healingCdsDataAll: []
            }
        },
        methods: {
            loadHealCds() {
                this.healingCdsDataAll = localStorage.getItem("healingcdsData")
                this.healingCdsDataAll = JSON.parse(this.healingCdsDataAll)
                return this.healingCdsDataAll
            }
        }
    }
</script>


<style scoped lang="scss">
    .time-dmg {
        font-size: 20px
    }

    a {
        color: #42b983;
    }

    hr {
        margin-top: 3px;
        margin-bottom: 3px;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }


    .healingcds-main .healing-dontuse-btn {
        background-color: #4CAF50;
        color: #FFF;
        padding: 5px 10px;
        text-align: center;
        display: inline-block;
        transition: box-shadow 100ms;
    }

    .healingcds-main .healing-use-btn {
        background-color: #AAA;
        color: #FFF;
        margin: 2px 2px 2px 2px;
        padding: 5px 10px;
        text-align: center;
        display: inline-block;
        transition: box-shadow 100ms;
    }

    .healingcds-main button:focus, .healingcds-main button:active {
        outline: none !important;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3) !important;
    }

    .healingcds-main button:hover {
        box-shadow: 0px 0px 6px 3px #FFF !important;
        transition: box-shadow 100ms;
    }

    .healingcds-flex {
        display: flex;
    }


    .name-dmg-cd {
       margin-left: auto;
       align-self: center;
    }

</style>
