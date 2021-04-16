<template>
    <div>
        <div class="headerBox" >
            <div v @click="afficheBox()" class="userPseudo">  {{ $store.state.pseudo }}
                <div class="boxAffiche" v-if="affiche">
                    <div class="parametre paramHover" @click="afficheParametre()">Paramètre</div>
                    <div class="deconnexion paramHover" @click="deconnexion()" @affichePhotoUser="photoUser">déconnection</div>
                    <div v-if="$store.state.isAdmin === 1" class="deconnexion paramHover" @click="goAdmin()" @affichePhotoUser="photoUser">Administration</div>
                </div>
            </div>
            <img v-if="$store.state.photoProfil" :src="$store.state.photoProfil" id="photoUser" >
         
        </div>
    </div>
</template>

<script>
export default {
    name : "headerBox",
    components : {
    },
    data(){
        return{
            affiche : false,
            affichParam : false, 
        }
    },
    props : {
        //pseudo : String,
        //photo : String,
        //displayPhoto : Boolean
    },
    methods : {
        afficheBox(){
            if (this.affiche === false){
                this.affiche = true
            }else
            this.affiche = false
        },
        deconnexion(){
            this.$store.state.pseudo = ""
            this.$store.state.photoProfil = ""
            this.$store.state.idUser = ""
            this.$store.state.email = ""
            localStorage.removeItem("token")
            this.affichParam =false
            this.$router.push('/')
        },
        afficheParametre(){
            // if (this.affichParam){
            //     this.affichParam = false
            // }else this.affichParam = true
            this.$router.push("/parametre")
        },
        closeParametre(payload){
            this.affichParam = payload.false
        },
        photoUser(){
            this.displayPhoto = true
        },
        goAdmin(){
            this.$router.push("/admin")
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
        margin-right: 0;
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
        padding:20px;
    }
    .deconnexion{
        padding:20px;
        border-top: solid 1px white;
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






