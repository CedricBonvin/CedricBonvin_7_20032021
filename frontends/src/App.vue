<template>
  <div id="app">
    <div id="nav">
     <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        <div>Groupomania</div>
    </div>

    <router-view/>
  </div>
</template>

<style>
body{
    margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  font-size: 2.5rem;  
  padding: 30px 15px;
  background: black;
  color: white;
}



#nav a.router-link-exact-active {               /*  c'est quoi ce truc .. !!!  */ 
  color: #42b983;
}
</style>
