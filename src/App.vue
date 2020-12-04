<template>
  <div id="app" v-bind:class="{ 'darkMode' : darkMode }">
    <button class="modeSwitchButton" @click="changeDarkLight()" > {{ darkModeText }}</button>
    <flash-message class="flash-message-custom-success"></flash-message>
    <router-view/>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        darkMode:1,
        darkModeText: "Light Mode"
      }
    },methods: {
      changeDarkLight() {
        this.darkMode =  1 - this.darkMode
        if (this.darkMode===1) {
          this.darkModeText = "Light Mode"
        } else {
          this.darkModeText = "Dark Mode"
        }
      }
    }
  }

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width:100%;
    height:100%;
  }

#nav {
  padding: 30px;
}

.modeSwitchButton {
  border: 1px transparent solid;
  background-color: #fff;
  margin-top:10px;
  padding:2px;
  border-radius:3px;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
}

.darkMode .modeSwitchButton {
  background-color: rgba(255,255,255,0.15);
  color: #fff;
}
.modeSwitchButton {
  outline: none !important;
}


@import './assets/css/main.css';
@import './assets/css/flash.css';
@import './assets/css/table.css';
@import './assets/css/dark.css';
</style>
