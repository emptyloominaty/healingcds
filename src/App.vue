<template>
  <div id="app">
    <flash-message class="flash-message-custom-success"></flash-message>
    <router-view/>
    <p class="footer">Healing CDs App 2 Made by Empty </p>
  </div>
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
.footer {
  margin-top:250px;
}

@import './assets/css/main.css';
@import './assets/css/flash.css';
@import './assets/css/table.css';
</style>
