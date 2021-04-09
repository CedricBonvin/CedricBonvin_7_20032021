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
        }
        // parametre
        
    },
}
</script>

<style>
html{
  height: 100%;
  background-color: rgb(199, 199, 199);
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    min-height: 100%;
    padding-bottom: 120px;
    width: 100%;
    max-width: 600px;
    margin: auto;
    background: linear-gradient(288deg, rgba(179,179,179,1) 0%, rgba(79,79,79,1) 100%);
    background-attachment: fixed;
    box-shadow: 0 0 55px 5px rgb(211, 211, 211);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
  position: r;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  font-size: 1.5rem;  
  padding: 10px 15px;
  background: black;
  color: white;
}



#nav a.router-link-exact-active {               /*  c'est quoi ce truc .. !!!  */ 
  color: #42b983;
}

.headerBox{
  margin-right: 20px;
}

</style>



















