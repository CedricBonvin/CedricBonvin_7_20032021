<template>
    <div class="mur" >
        <h1 class="titleMur">Mur principal </h1>
        <div  v-for="mess in card" :key="mess.name"  >

            <div  :class="$store.state.pseudo === mess.pseudoUser? 'card' : 'cardUser'"> 
                
                <div class="date">{{ mess.date}}</div>
                        
                <div class="boxNom">
                    <img class="photoProfil" :src="mess.photo" alt="">
                    <span class="nom"> {{ mess.pseudoUser }} </span>
                </div>
                <img  v-if="mess.image" class="imageMessage" :src="mess.image" alt="">
                <div class="boxMessages">{{ mess.message }}</div>

                <!-- PARAMETRE -->
                <div class="wrapperParametre">
                    <div class="wrapperLike" >
                        <div class="boxLike">
                            <img @click="addLike(mess)" class="like" src="../assets/heart.svg" alt="icone like">
                            <div :id="mess.idMESSAGES"  class="nbrLike nbr">{{mess.totalLike}}</div>
                        </div>
                        <div class="boxDislike">
                            <img @click="addDislike(mess)" class="dislike" src="../assets/heartBreak.svg" alt="icone like">
                            <div  class="nbrdislike nbr">{{mess.totalDislike}}</div>
                        </div>
                    </div>
                    <div>
                        <p @click="goCommentaire(mess.idMESSAGES, mess.photo)" class="commenter">Commenter</p>
                    </div>
                    <img src="../assets/param.svg" alt="paramètre du message"
                        class="param"
                        v-if="$store.state.pseudo === mess.pseudoUser || $store.state.isAdmin === 1"
                        @click="displayBoxUpdate( mess.idMESSAGES), recupMessage(mess.message)"
                    >
                </div>    
            </div>
        </div>
            
            <boxImage 
                @event="afficheFromBoxImage"  
                @includeInCard="includeNewMessage"
                v-if="displayBoxImage" 
                :newcard="this.recupApi"
            />
           <boxUpdate 
                @newMessage="postNewMessage" 
                @eventDelete="deleteMess" 
                @closeBoxUpdate="closeFromUpdateMessage" 
                v-if="modifie" 
                :id="this.id"
                :recupMessage="this.message"
            />
        <footer class="footerMur">
            <div class="boxBoutton">
                <input type="text" class="inputMessage" id="message" placeholder="Poster votre message">
                <button class="buttonImage row" v-on:click="postMessage()"><img src="../assets/iconeRow.svg" alt=""></button>
                <button class="buttonImage" v-on:click="afficheBoxImage()"><img src="../assets/iconeImage.svg" alt="iconeImage"></button>
            </div>
        </footer>
    </div>
</template>

<script>
import boxUpdate from "../components/upDateMessage.vue"
import boxImage from "../components/boxImage.vue"
export default {
    name: 'Home',
    components : {
        boxUpdate,
        boxImage,
    },
    data(){
        return{
            modifie : false,
            id : "",
            card : [],
            pseudoUser : "",
            isUser : true,
            date : "",
            message : "",
            
            displayBoxImage : false,
            isMessage : true,

            like : 0,
            dislike : 0,

            isAdmin : 0
        }
    },                                            
    methods : {

        recupApi(){
            fetch("http://localhost:8080/api/message")
            .then(response => response.json())
            .then(result =>{  
                    console.log(result)           
                    this.card = result
            })
        },
        getDate ()  {
              
            const now = new Date();
            var options = { month: 'long'};
            this.date =  now.getDate() + " "
                    + new Intl.DateTimeFormat('fr-FR', options).format() + ": "
                    + now.getHours() + "h : " 
                    + now.getMinutes(12) + "min ";
        },
        postMessage(){

            const mess = document.getElementById("message").value
            const idUser = this.$store.state.idUser

            this.getDate()

            const obj = {
                //idMESSAGES : "",
                idUSERS : idUser,
                pseudoUser : this.$store.state.pseudo,
                message : mess,
                date : this.date,
                photoProfil : this.$store.state.photoProfil,
                token : JSON.parse(localStorage.getItem("token"))

            }

            fetch('http://localhost:8080/api/message', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,

                }
            })
            .then(response => response.json()) 
            .then(() =>{      
               // this.card.push(obj) 
               this.recupApi()

            });
        },      
        postNewMessage(payload){
            const idMessage = (element) => element.idMESSAGES === this.id;
            let index = this.card.findIndex(idMessage)
            this.card[index].message = payload.message
            console.log("pour le new"+this.card[index.message])
            this.modifie = false
        },
        deleteMess(){
           const idMessage = (element) => element.idMESSAGES === this.id;
           let index = this.card.findIndex(idMessage)
          this.card.splice(index,1)
          this.modifie = false       
        },    
        afficheBoxImage(){
            this.displayBoxImage ? this.displayBoxImage = false : this.displayBoxImage = true
        },
        afficheFromBoxImage(payload){
            this.displayBoxImage = payload.affiche
        },
        displayBoxUpdate(id){
            this.id = id
            if (this.modifie === false){
                this.modifie = true
            }else if (this.modifie === true){
                this.modifie = false
            }
        }, 
        closeFromUpdateMessage(payload){
            this.modifie = payload.affiches
        },
        includeNewMessage(payload){
            console.log("le payload est : "+ payload.newMessage.pseudoUser) // pourquoi ca n'affiche pas le user et ? mais sa fonctionne !!!
            this.card.push(payload.newMessage)
        },
        recupMessage(mess){
            this.message = mess
        },
        addLike(mess){
            const obj = {
                //idUser :  JSON.parse(localStorage.getItem("idUser")),
                idUser :  this.$store.state.idUser,
                idMessage : mess.idMESSAGES,
                token : JSON.parse(localStorage.getItem("token"))
            }
            fetch('http://localhost:8080/api/message/like', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                            Authorization: "Bearer" +" "+ obj.token,
                        }
                })
                .then(response => response.json()) 
                .then(() =>{     
                    //this.card = result                
                    this.recupApi()
                });
        },
        addDislike(mess){
            const obj = {
                //idUser :  JSON.parse(localStorage.getItem("idUser")),
                idUser :  this.$store.state.idUser,
                idMessage : mess.idMESSAGES,
                token : JSON.parse(localStorage.getItem("token"))
                
            }

            fetch('http://localhost:8080/api/message/dislike', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                            Authorization: "Bearer" +" "+ obj.token,
                        }
                })
                .then(response => response.json()) 
                .then(() =>{      
                        //this.card = result
                this.recupApi()
            });
        },
        goCommentaire(id,photoProfil){
            console.log("go comment")
            this.$store.state.idMessage = id
            this.$store.state.photoProfilMessage = photoProfil
            this.$router.push('/commentaire/'+ id)
            console.log("l'id du message du store est  : " + id)

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
                });
            }
        }
    }, 
     mounted(){
       this.recupApi(),
       this.refresh()
     },
}
</script>


<style>
    .mur{
    height: 100%;
    padding-bottom: 100px;
    background: linear-gradient(288deg, rgba(179,179,179,1) 0%, rgba(79,79,79,1) 100%);
    background-attachment: fixed;
    }
   
    .titleMur{
        text-align: center;
        text-decoration: none;
        color: white;
    }
    .card{
        position: relative;
        border: solid;
        padding:0px 10px 0px 10px;
        margin: 60px auto;
        margin-right: 5%;
        width: 80%;
        min-width: 250px;
        background: rgb(120, 195, 118);
        box-shadow: 0 0 1px 1px;
        border-radius: 20px;
        color: white;
    }
    .cardUser{
        position: relative;
        border: solid;
        padding:0px 10px 0px 10px;
        margin: 60px auto;
        margin-left: 5%;
        width: 80%;
        min-width: 250px;
        background: rgb(204, 211, 233);
        
        box-shadow: 0 0 1px 1px;
        border-radius: 20px;
        color: white;
    }
    .date{
        position: absolute;
        left: 50%;
        top : -25px;
        transform: translateX(-50%);
        font-size: 0.8rem;
    }
    .param{
        width: 15px;
    
        cursor: pointer;
    }
    .boxNom{
        padding: 5px  0 10px 0 ;
    }
    .nom{
        position: relative;
        top: -10px;
        color: rgb(175, 56, 56);
        text-align: left;
        margin-top: 0;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .photoProfil{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
    }
    .footerMur{
        position: fixed;
        z-index: 1000;
        width: 100%;
        max-width: 600px;
        margin: 50px auto 0 auto;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        padding: 10px 15px 10px 15px;    
        color: white;
    }
    footer h3{
        margin-left: 20px;
    }
    .boxBoutton{
        display: flex;
        justify-content: center;
    }
    footer input{
        width: 80%;
        height: 50px;
        padding: 0px 10px;
        border-radius: 30px 0 0 30px;
    }
    footer button{
        width: 50px;
        height: 50px;
        margin-left:  10px;
        background: rgb(89, 163, 86);
        border-radius: 50%;
        border: solid 2px green;
        color: white;
        cursor: pointer;
    }
    .buttonImage{
        padding: 10px
    }
    .row{
        border-radius: 0 30px 30px 0;
        margin-left: -1px;
    }
    .imageMessage{
        width: 100%;
    }
    .boxMessages{
         color: black;
         border-radius: 0 0 20px 20px;
    }
    .wrapperParametre{
        display: flex;
        width: calc(100% + 20px);
        justify-content: space-between;
        left: 0;
        bottom: -40px;
        opacity: 50%;
        padding: 5px 10px ;
        margin-left: -10px;
        margin-top: 20px;
        background-color: white;
        border-radius: 0 0 10px 10px;

    }
    .wrapperLike{
        display: flex;
        justify-content: space-between;
        width: 80px;
    }
    .commenter{
        color: black;
        cursor: pointer;
    }
    .boxLike{
        position: relative;
        cursor: pointer;
    }
    .boxDislike{
        position: relative;
        cursor: pointer;
    }
    .like{
        width: 15px;
    }
    .dislike{
        width: 15px;
    }
    .nbr{
        position: absolute;
        bottom: 0;
        right: -20px;
        margin-top: -10px;
        color: rgb(68, 68, 68);
    }   
</style>














