<template>
  <div id="app">
    <div id="nav">
     <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        <div class="logo">Groupomania</div>
        <headerBox  :class="afficheUser()" 
                    :pseudo="this.pseudoUser"
                    :photo="this.photoUrl" 
                    :displayPhoto="this.affichePhoto "
                    class="headerBox"  >
        </headerBox>
    </div>

    <router-view/>
  </div>
</template>

<script>
import headerBox from "./components/headerBox"
export default {
    name:"app",
        components : {
        headerBox
        },  
    data(){
        return {
        pseudoUser : "",
        photoUrl : "",
        affichePhoto : false
        }
    },
    computed : {
        
    },
    methods : {
        afficheUser(){
          this.pseudoUser = JSON.parse(localStorage.getItem("pseudo"))
          this.photoUrl = JSON.parse(localStorage.getItem("photoUrl"))
          if (this.photoUrl){
            this.affichePhoto = true
          }else this.affichePhoto = false
        },
        // parametre
        
    },
}
</script>

<style>
html{
  height: 100%;
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    background: rgba(13, 14, 13, 0.747);
    margin: 0;
    min-height: 100%;
    position: relative;
    padding-bottom: 120px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;

  font-size: 1.5rem;  
  padding: 30px 15px;
  background: black;
  color: white;
}



#nav a.router-link-exact-active {               /*  c'est quoi ce truc .. !!!  */ 
  color: #42b983;
}

.headerBox{
margin-right: 20px;}

</style>



















