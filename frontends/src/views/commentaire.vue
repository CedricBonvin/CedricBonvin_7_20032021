<template>
    <div class="commentaire">
        <!-- Message de base -->
        <div class="messageOriginal">
        <h2>Message poster par :</h2>
        <img class="photoUser" :src="photoProfil" alt="photo profil du message">
        <div class="user">{{ pseudoUser}}</div> 
            <div class="cardMessageBase" v-for="mess in card" :key="mess.name">
                <div class="boxNom">
                        <img class="photoProfil" :src="mess.photoProfil" alt="">
                        <span class="nomUser"> {{ mess.pseudoUser }} </span>
                    </div>
                <img v-if="mess.image" class="image" :src="mess.image" alt="">
                <div class="boxMessages" > {{mess.message}}</div>
            </div>
            <div class="dates"> message poster le {{ date }}</div>
            <div class="separateur"></div>
        </div>
        <div>
            <h2 class="titleCommentaire">commentaire :</h2>
        </div>

        <!-- commentaire -->
        <div class="cardCommentaire" v-for="mess in commentaires" :key="mess.name">
            <div class="topMessage">
                <img class="photoProfil" :src="mess.photoProfil" alt="">
                <div class="pseudoUser">{{ mess.pseudo}}</div>
            </div>
            <div class="boxMessages"> {{ mess.message }}</div>
            <div class="boxParametre"> 
                <img 
                    v-if="mess.pseudo === $store.state.pseudo || $store.state.isAdmin === 1" 
                    @click="afficheUpdateCommentaire(mess.idCommentaire)"
                    class="iconeParametre" src="../assets/param.svg" alt="icone parametre du commentaire"> 
            </div>
        </div>
        <updateCommentaire 
            v-if="afficheUpdate"
            @closeBoxUpdate="afficheUpdate = false"
            :id="this.idCommentaire"
            :afterDelete="displayCommentaires"
        />
        
        <!-- FOOTER -->
        <div id="footerCommentaire">
            <div class="boxRowBack">
                <img src="../assets/iconeRow.svg" class="backMur" @click="backMur()">
            </div>
             <div class="boxBoutton">
                <input type="text" class="inputMessage" id="commentaire" placeholder="Poster votre commentaire">
                <button class=" boxRow" v-on:click="postCommentaire()">
                    <img class="row" src="../assets/iconeRow.svg" alt="">
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import updateCommentaire from "../components/updateCommentaire"
export default {
    name : "commentaire",
    components :{
        updateCommentaire
    },
    data(){
        return{
            card : [],
            pseudoUser : "",
            date : "",
            idCommentaire : null,
            commentaires : [],
            photoProfil : "",
            afficheUpdate : false
        }
    },
    methods : {
        backMur(){
            this.$router.push('/mur#/')
        },
        displayBasicMessage(){
            const idMess = this.$route.params.id
            const obj = {
                idMessage : idMess,
                token : JSON.parse(localStorage.getItem("token"))
            }

            fetch('http://localhost:8080/api/commentaires/originalCommentaire', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                }
            })
            .then(response => response.json()) 
            .then( result =>{ 
                this.card = result 
                this.photo = result[0].photo    
                this.pseudoUser = result[0].pseudoUser    
                this.date = result[0].date
                this.photoProfil = result[0].photoProfil

            });
        },
        postCommentaire(){
            console.log("essaie de post commentaire..!")
            const commentaire = document.getElementById("commentaire").value

            const obj = {
                idUser : this.$store.state.idUser,
                idMessageBase : this.$route.params.id,//this.$store.state.idMessage,
                message : commentaire,
                image : null,
                pseudo : this.$store.state.pseudo,
                photoProfil : this.$store.state.photoProfil,
                token : JSON.parse(localStorage.getItem("token"))
            }

            fetch('http://localhost:8080/api/commentaires', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                }
            })
            .then(response => response.json()) 
            .then( () =>{ 
               console.log("j'ai recu un truc")
            this.displayCommentaires()
            });
        },
        displayCommentaires(){
           const idMess = this.$route.params.id
            const obj = {
                idMessageBase : idMess
            }
            fetch("http://localhost:8080/api/commentaires/recup",{
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                }
            })
            .then(response => response.json())
            .then( result =>{
                this.commentaires = result 
                //console.log("je recoie un truc")            
                //console.log("un truc est la !!!!!!!!" + result[0].pseudo )
            })
        },
        refreshUser(){
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
                });
            }
        },
        afficheUpdateCommentaire(idComment){
            this.afficheUpdate === false ? this.afficheUpdate = true : this.afficheUpdate = false
            this.idCommentaire = idComment
        }
    },
    mounted(){
        this.refreshUser(),
        this.displayCommentaires(),
        this.displayBasicMessage()
    }
}
</script>

<style scoped>

.commentaire{
    padding-bottom: 100px;
     background: linear-gradient(288deg, rgba(179,179,179,1) 0%, rgba(79,79,79,1) 100%);
    background-attachment: fixed;
}
.messageOriginal{
    background: rgb(63, 62, 62);
    padding: 20px;

}
h2{
    text-align: left;
    font-size: 1.5rem;
    margin: 0;
    padding:0 0 20px 20px;
    color : white
}
.photoUser{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: auto;
}
.nomUser{
    position: relative;
    top : -10px;
    left: 5px;
    color: red;
}
.cardMessageBase{
     margin: 30px auto;
    background-color: rgb(187, 184, 184);
    border-color: rgb(160, 157, 157);
    width: 80%;
    max-width: 500px;
    background: rgb(169, 236, 124);
    padding: 10px 10px 10px 10px;
    border-radius: 20px;
    border: 2px rgb(131, 128, 128) solid;
}
.cardCommentaire{
    margin: 30px auto;
    width: 80%;
    max-width: 500px;
    background: rgb(204, 211, 233);;
    border-radius: 20px;
    border: 2px rgb(131, 128, 128) solid;
    border: solid 3px white;
    overflow: hidden;
}
.topMessage{
    display: flex;
    padding: 10px 10px;
    position: relative;
}
.user{
    color: red;
    font-size: 2.5rem;
    text-align: center;
}
.photoProfil{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
}
.boxMessages{
    color: black;
    padding:0 10px 10px 10px;
}
.image{
    width: 100%;
}
.pseudoUser{
    position: absolute;
    left: 50px;
    top : 50%;
    transform: translateY(-50%);
    color: red;
}
.dates{
    color: white;
    text-align: center;
}
.separateur{
    border-bottom: solid 1px rgb(252, 250, 250);
    height: 20px;
    width: 20%;
    margin: auto;
}
.titleCommentaire{
    color: white;
    padding: 20px;
}
#footerCommentaire{
    position: fixed;
    bottom: 0;
    width: 100%;
   
    background:none;
    width: 100%;
    max-width: 600px;
    padding: 0;
}
.boxBoutton{
    display: flex;
    justify-content: center;
    background: black;
    padding: 10px;
}
.backMur{
    width: 35px;
    margin-right: 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0;
    background: none;
    transform: rotateY(-180deg);
}
.boxRowBack{
    text-align: right;
}
.backMur:hover{
    color: rgb(192, 192, 192);
}
.inputMessage{
    width: 70%;
    border-radius: 10px 0 0 10px;
    padding: 10px;
}
.boxRow{
    position: relative;
    left: -5px;
    top: 1px;
    background: rgb(102, 209, 102);
    border-radius: 0 10px 10px 0%;
    padding: 10px;
}
.row{
    width: 30px;
    height: 30px;
    margin: 0;
}
.boxParametre{
    text-align: right;
    padding: 3px;
    background: white;
    opacity: 50%;
}
.iconeParametre{
    position: relative;
    right: 10px;
    top: 2px;
    width: 20px;
    opacity: 60%;
    cursor: pointer;
}


</style>
