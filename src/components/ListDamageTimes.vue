<template>
    <div class="list-of-damage-times">
        <h5 class="dmgt-list-h">Raid Damage List</h5>
        <table class="damage-table-times">
            <thead>
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Time</th>
                    <th class="text-center"></th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="listDat in listData" :key="listDat[2]" >
                    <td class="table-id">{{ listDat[2] }}</td>
                    <td class="table-name">{{ listDat[0] }}</td>
                    <td class="table-cd">{{ secToMin(listDat[1]) }}</td>
                    <td class="table-button p-0 m-0"><button class="delete-damage-btn" v-on:click="deleteDamageTimes(listDat[2])"  >Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import appMixins from '../mixins/appMixins'
    export default {
        mixins: [appMixins],
        props: ["g_bossFight"],
        name: "ListDamageTimes",
        data() {
            return {
                testColor: "#FFF",
                listData: this.loadDamageTimesData(),
                damageTimes: []
            }
        },
        mounted() {
            /* listener */
            this.$root.$on('reload-damage-list', data => (this.listData = data) )
        }
    }
</script>

<style scoped>
    button:focus,button:active {
        outline: none !important;
    }

    .dmgt-list-h {
        padding:10px 7px 2px 7px;
        margin: 0;
        text-align:center;
        width:300px;
    }

</style>