<template>
  <div id="app">
    <div id="nav">
     <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        <!-- <div class="logo">Groupomania</div> -->
        <img @click="backMur()" class="logo" src="./assets/Groupomania/icon-left-font-monochrome-white.svg" alt="">
        <headerBox  :class="afficheUser()" 
                    :pseudo="this.pseudoUser"
                    :photo="this.photoUrl" 
                    :displayPhoto="this.affichePhoto "
                    @updateUser="func"
                    class="headerBox"  
                    >
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
        func(payload){
          this.photoUrl = payload.photoUrl
          this.pseudoUser = payload.pseudoUser
        },
        backMur(){
          this.$router.push("/mur")
        }
        // parametre
        
    },
}
</script>

<style>
html{
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    position: relative;
    min-height: 100vh;
    width: 100%;
    max-width: 600px;
    margin: auto;
    background: linear-gradient(288deg, rgba(85, 85, 87, 0.801) 50%, rgba(137, 138, 139, 0.712) 100%);
    background-attachment: fixed;
    box-shadow: 0 0 55px 5px rgb(0, 0, 0);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
 position: fixed;
  width: 100%;
  max-width: 600px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  margin: auto;

  font-size: 1.5rem;  
  padding: 10px 15px;
  background: rgb(10, 34, 66);
  color: white;
}



#nav a.router-link-exact-active {               /*  c'est quoi ce truc .. !!!  */ 
  color: #42b983;
}

.headerBox{
  margin-right: 20px;
}
.logo{
  width: 150px;
  cursor: pointer;
  
}

</style>



















