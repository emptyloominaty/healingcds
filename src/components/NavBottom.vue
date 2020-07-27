<template>
    <div>
        <button class='btn btn-outline-dark' id='hideshow'>Hide/Show Unused CDs</button>
        <button class='btn btn-outline-dark' id="generate-ert">Generate ERT Note</button>
        <button class='btn btn-outline-dark' id="hide-ert">Hide ERT Note</button>
    </div>
</template>

<script>
    export default {
        name: "NavBottom"
    }
</script>

<style scoped>
    div {
        margin-top:20px;
        text-align:left;
    }
    button {
        margin-right: 6px;
    }
    button:focus,button:active {
        box-shadow: none !important;
    }
    button:hover {
        cursor:pointer;
    }
</style>