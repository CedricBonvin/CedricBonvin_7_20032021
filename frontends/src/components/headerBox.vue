<template>
    <div class="headerBox">
        <div @click="afficheBox()" class="userPseudo">  {{ pseudo }}
            <div class="boxAffiche" v-if="affiche">
                <div class="parametre paramHover" @click="afficheParametre()">Paramètre</div>
                <div class="deconnexion paramHover" @click="deconnexion()">déconnection</div>
            </div>
        </div>
        <img :src="photo" id="photoUser" v-if="displayPhoto">
        <parametre 
                @closeParametre="closeParametre" 
                v-if="this.affichParam" 
        />
    </div>
</template>

<script>
import parametre from "../components/parametre"
export default {
    name : "headerBox",
    components : {
        parametre,
    },
    data(){
        return{
            affiche : false,
            affichParam : false     
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
            localStorage.removeItem("idUser")
            this.affichParam =false
            this.displayPhoto = false
            this.$router.push('/')
        },
        afficheParametre(){
            if (this.affichParam){
                this.affichParam = false
            }else this.affichParam = true
        },
        closeParametre(payload){
            this.affichParam = payload.false
        },
      
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
        z-index: 1000;
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
        object-fit: cover;
    }
   
</style>






