<template>
    <div class="pageAdmin">
        <div v-if="allowed">
            <div class="adminTop">
                <div class="boxAdmin">
                    <h1>Admin :</h1>
                    <div>
                        <img class="photoProfil" :src="this.$store.state.photoProfil" alt="photo Profil">
                    </div>
                    <div class="boxRow">
                        <img @click="backMur()" class="iconeRow" src="../assets/iconeRow.svg" alt="">
                    </div>
                </div>
            
                </div>
                    <h3 class="titleAllUser">Tous les utilisateurs :</h3>
                    <section class="sectionCard">
                        <div  v-for="mess in allUsers" :key="mess.email"  >
                            <div class="cardUsers" :id="mess.pseudo" @click="afficheParam(mess.pseudo, mess.idUser)">
                                <div class="data">
                                    <img class="photoUser" :src="mess.photo" alt="photoProfil">
                                    <p class="pseudo">{{mess.pseudo}}</p>
                                </div>
                            </div>
                                <div class="boxParam" v-if="pseudo === mess.pseudo">
                                    <p @click="afficheConfirmDelete()" class="supprimer">Supprimer  le compte</p>
                                </div>
                        </div>
                        <div class="boxDelete" v-if="afficheBoxConfirmDelete">
                            <div>Etes-vous sûr de vouloir supprimer le compte ?</div>
                            <div class="buttonBox">
                                <button class="buttonSupprimer cancel" @click="cancel()">Annuler</button>
                                <button class="buttonSupprimer" @click="deleteUser()">Supprimer</button>
                            </div>
                        </div>
                    </section>
                <div>
            </div>
        </div>
        <boxAllowed v-else />
    
    </div>
</template>

<script>
import boxAllowed from "../components/notAllowed"

export default {
    name : "admin",
    components :{
        boxAllowed
    },
    data(){
        return{
            allUsers : [],
            afficheParametre : false,
            pseudo : "",
            idUser : "",
            afficheBoxConfirmDelete : false,
            allowed : false
        }
    },
  
   
    methods : {
        getAllUsers(){
            fetch("http://localhost:8080/api/admin")
            .then(response => response.json())
            .then(result =>{  
                    console.log(result)           
                    this.allUsers = result             
            })
        },
        afficheParam(mess,idUser){

            if(this.pseudo === mess) {
                this.pseudo = ""
            }
            this.pseudo = mess

            this.idUser = idUser
           // this.afficheParametre === false ? this.afficheParametre = true : this.afficheParametre = false
        },
        deleteUser(){

            const obj = {
                idUser : this.idUser
            }
            console.log("l'idUser a supp : " +this.idUser)
             fetch('http://localhost:8080/api/admin/deleteUser', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                        }
            })
            .then(response => response.json()) 
            .then( () => {
                this.getAllUsers()
            })
            this.afficheBoxConfirmDelete = false
        },
        refresh(){
            if (!this.$store.state.email){
                const obj = {
                    token : JSON.parse(localStorage.getItem("token"))    
                }
                
                fetch('http://localhost:8080/api/user/refresh', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                    }
                })
                 .then(response => response.json()) 
                .then( result =>{ 

                    this.$store.state.pseudo = result[0].pseudo
                    this.$store.state.photoProfil = result[0].photo
                    this.$store.state.idUser = result[0].idUser
                    this.$store.state.email = result[0].email
                    this.$store.state.isAdmin = result[0].isAdmin

                    if (this.$store.state.isAdmin === 1)
                    this.allowed = true
                });
            }
        },
        backMur(){
            this.$router.push("/mur")
        },
        afficheConfirmDelete(){
            this.afficheBoxConfirmDelete = true
        },
        cancel(){
            this.afficheBoxConfirmDelete = false
        },
        tryConnection(){
           
                if (this.$store.state.isAdmin === 1)
                this.allowed = true
            
        }
    },
    mounted(){
        this.tryConnection()
        this.getAllUsers()
        this.refresh()
    }

}
</script>

<style scoped>
    .pageAdmin{
        background: linear-gradient(288deg, rgba(85, 85, 87, 0.932) 50%, rgba(137, 138, 139, 0.712) 100%),url("../assets/poing.jpg");
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        min-height: 100vh;
        padding-top: 60px;
    }
     .adminTop{
        position: relative;
        background: rgb(214, 212, 212);
        padding: 20px;
        color: rgb(114, 111, 111);
    }
    .boxAdmin{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding-top: 10px;
    }
 
    .iconeRow{
        cursor: pointer;
        width: 40px;
        transform: rotate(180deg);
    }
    h3{
        padding:20px;
        font-size: 1.3rem;
    }
    h1{
        text-align: center;
        text-align: left;
        font-size: 1.4rem;
    }
    .titleAllUser{
        color: white;
    }
    .sectionCard{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
    .cardUsers{
        display: inline-block;
        margin: 20px;
        margin-bottom: 0;
        height: 102px;
        background-color: rgb(255, 255, 255);
        border-radius: 50px;
        border: solid 3px rgb(92, 90, 90);
        padding-right: 10px;
        cursor: pointer;
        color:black;
    }
    .cardUsers:hover{
        transform: scale(1.05);
        background: rgba(196, 96, 96, 0.705);
        border: solid white 3px;
        color: black;
    }
    .photoProfil{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
    }
    .photoProfil{
        margin: auto;
    }
    .pseudoUser{
        position: relative;
        bottom: 15px;
        left: 10px;
        text-align: center;
        font-size: 1.8rem;
        margin: 10px 0;
        color: rgb(250, 246, 246);
    }.photoUser{
        width: 95px;
        height: 95px;
        border-radius: 50%;
        object-fit: cover;
    }
    .data{
        display: flex;
        align-items: center;
    }
    .pseudo{
        margin-left: 50px;
        font-size: 1.4rem;
        padding-right: 30px;
    }
    .boxParam{
        width: 100%;
        display: flex;
    }
    .supprimer{
        width: 100%;
        text-align: center;
        cursor: pointer;
        color: white;
    }
    .supprimer:hover{
        color: red   
    }
    .voirCommentaire{
        width: 50%;
        text-align: center;
        cursor: pointer;
    }
    .voirCommentaire:hover{
        color: red;
    }
    .boxDelete{
        position: absolute;
        top: 40%;
        left: 50%;
        padding: 30px;
        transform: translate(-50%);
        width: 80%;
        max-width: 500px;
        border: solid 1px gray;
        border-radius: 20px;
        background: rgb(255, 255, 255);
        box-shadow: 0 0 5px 5px rgb(151, 151, 151);
    }
    .buttonBox{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
    .buttonSupprimer{
        display: block;
        margin: 20px auto 0 auto;
        padding: 20px 30px;
        border-radius: 20px;
        border: none;
        background: red;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
    }
    .cancel{
        background: rgb(92, 230, 92);
    }
    .buttonSupprimer:hover{
        transform: scale(1.05);
        box-shadow: 0 0 5px 5px rgb(151, 151, 151);
    }
   
</style>
