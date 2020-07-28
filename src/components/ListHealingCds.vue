<template>
    <div class="list-of-healing-cds">
        <h5 class="hcds-list-h">Healing CDs List</h5>
        <table>
              <thead>
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">CD</th>
                    <th class="text-center"></th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="listDat in listData" :key="listDat[7]" v-bind:style="{ backgroundColor: listDat[5], color: listDat[6] }">
                    <td class="table-id">{{ listDat[7] }}</td>
                    <td class="table-name">{{ listDat[2] }}</td>
                    <td class="table-cd">{{ secToMin(listDat[0]) }}</td>
                    <td class="table-button p-0 m-0"><button v-bind:style="{ color: listDat[6] }" class="delete-heal-btn" v-on:click="deleteHealCd(listDat[7])" n >Delete</button></td>
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
        name: "ListHealingCds",
        data() {
            return {
                testColor: "#FFF",
                listData: this.loadHealingCdsData(),
                healingCdsDataAll: []
            }
        },
        methods: {

        },
        mounted() {
            /* listener */
            this.$root.$on('reload-heal-list', data => (this.listData = data) )
        }
    }
</script>

<style scoped>
      .hcds-list-h {
        padding:10px 7px 2px 7px;
        margin: 0;
        text-align:center;
        width:300px;
    }
</style>