<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/slap">Slap</router-link> |
      <router-link to="/vendr">Vendr</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
}
#nav {
  color: #42b883;
  position: absolute;
  top: 1rem;
  width: 100%;
}
#nav > a {
  color: #42b883;
  transition: color 0.2s;
}
#nav > a:hover,
#nav > a:active {
  color: #35495e;
}
</style>
