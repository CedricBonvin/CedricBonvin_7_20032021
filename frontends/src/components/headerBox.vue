<template>
    <div class="headerBox">
        <div @click="afficheBox()" class="userPseudo">  {{ pseudo }}
            <div class="boxAffiche" v-if="affiche">
                <div class="parametre paramHover">Paramètre</div>
                <div class="deconnexion paramHover" @click="deconnexion()">déconnection</div>
            </div>
        </div>
        <img :src="photo" id="photoUser" v-if="displayPhoto">
    </div>
</template>

<script>
export default {
    name : "headerBox",
    data(){
        return{
            affiche : false,
           
        }
    },
    props : {
        pseudo : String,
        photo : String,
        displayPhoto : Boolean
    },
    methods : {
        afficheBox(){
            if (this.affiche === false){
                this.affiche = true
            }else
            this.affiche = false
        },
        deconnexion(){
            localStorage.removeItem("pseudo")
            localStorage.removeItem("photoUrl")
            this.displayPhoto = false
            this.$router.push('/')
        }
    } 
}
</script>

<style  scoped>
    .userPseudo{
        position: relative;
        z-index: 20;
        color: red;
        cursor: pointer;
        margin-right: 10px;
    }
    .headerBox{
        display: flex;
    }
    .boxAffiche{
        position: absolute;
        color: white;
        left : -50px;
        background : rgba(49, 49, 49, 0.959);
        transform: translateX(-50%);
    }
    .parametre{
        border-bottom: solid 1px white;
        padding:20px;
    }
    .deconnexion{
        padding:20px;
    }
    .paramHover:hover{
        cursor: pointer;
        background: gray;
        color: red;
    }
    #photoUser{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
   
</style>






