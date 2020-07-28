<template>
    <li class="healingcds-main">
        <div v-for="item in damageTimesProp" v-bind:key="item[2]">
            <div class="healingcds-flex">
                <span class="time-dmg">{{ secToMin(item[1]) }} </span>
                <button class="healing-use-btn" v-bind:id="'healCdBtn-'+itemH[7]+'-'+item[2]" v-for="itemH in healData" v-bind:key="itemH[7]" @click="useHealCd(itemH[7])" > {{ itemH[2] }}</button>
                <!-- v-bind:style="{  backgroundColor: item[5], color: item[6] }" -->
                <span class="name-dmg-cd"> {{ item[0] }} </span>
            </div>
            <hr>
        </div>
    </li>
</template>

<script>
    import appMixins from '../mixins/appMixins'

    export default {
        mixins: [appMixins],
        name: 'CdTable',
        props: ["g_bossFight", "damageTimesProp"],
        data() {
            return {
                healData: this.loadHealingCdsData(),
                cdTableHtml: ""
            }
        },
        methods: {
            useHealCd(id) {
                    return id;
            }
        },
        mounted() {
            /* listener */
            this.$root.$on('reload-heal-list', data => (this.healData = data) )
        }
    }
</script>


<style scoped >
    hr {
        margin-top: 3px;
        margin-bottom: 3px;
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.15);
    }

    .time-dmg {
        font-size: 20px;
        margin-right:10px;
        align-self:center;
    }

    .name-dmg-cd{
        font-size:12px;
        margin-left: auto;
        align-self: center;
        max-width: 100px;
        word-break: break-all;
        text-align:right;
    }

    .healingcds-flex {
        display: flex;
        flex-wrap: wrap;
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



</style>
