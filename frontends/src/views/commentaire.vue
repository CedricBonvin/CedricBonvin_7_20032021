<template>
    <div>
        <!-- Message de base -->
        <div class="messageOriginal">
        <h2>Message poster par :</h2>
        <img class="photoUser" :src="photo" alt="photo profil du message">
        <div class="user">{{ pseudoUser }}</div> 
            <div class="card" v-for="mess in card" :key="mess.name">
                <div class="boxNom">
                        <img class="photoProfil" :src="photo" alt="">
                        <span class="nom"> {{ mess.pseudoUser }} </span>
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
        <div class="card" v-for="mess in commentaires" :key="mess.name">
            <div class="topMessage">
                <img class="photoProfil" :src="mess.photoProfil" alt="">
                <div class="pseudoUser">{{ mess.pseudo}}</div>
            </div>
            <div class="boxMessages"> {{ mess.message }}</div>
        </div>

        <footer>
            <div class="boxRowBack">
                <img src="../assets/iconeRow.svg" class="backMur" @click="backMur()">
            </div>
             <div class="boxBoutton">
                <input type="text" class="inputMessage" id="commentaire" placeholder="Poster votre message">
                <button class="buttonImage row" v-on:click="postCommentaire()"><img src="../assets/iconeRow.svg" alt=""></button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name : "commentaire",
    data(){
        return{
            card : [],
            pseudoUser : "",
            date : "",
            idMessage : null,
            commentaires : [],
            photo : this.$store.state.photoProfilMessage
        }
    },
    methods : {
        backMur(){
            this.$router.push('/mur#/')
        },
        displayBasicMessage(){
            const obj = {
                idMessage : this.$store.state.idMessage,
                token : JSON.parse(localStorage.getItem("token"))
            }

            fetch('http://localhost:8080/api/message/commentaire', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                }
            })
            .then(response => response.json()) 
            .then( result =>{ 
                this.card = result     
                this.pseudoUser = result[0].pseudoUser
                this.date = result[0].date

            });
        },
        postCommentaire(){
            console.log("essaie de post commentaire..!")
            const commentaire = document.getElementById("commentaire").value

            const obj = {
                idUser : JSON.parse(localStorage.getItem("idUser")),
                idMessageBase : this.$store.state.idMessage,
                message : commentaire,
                image : null,
                pseudo : JSON.parse(localStorage.getItem("pseudo")),
                photoProfil : JSON.parse(localStorage.getItem("photoUrl")),
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

            const obj = {
                idMessageBase : this.$store.state.idMessage,
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
                //console.log("un truc est la !!!!!!!!" + result[0].pseudo )
            })
        }

    },
    mounted(){
        this.displayBasicMessage(),
        this.displayCommentaires()
    }
}
</script>

<style scoped>

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
.card{
    margin: 30px auto;
    padding-bottom: 10px;

}
.topMessage{
    display: flex;
    padding: 10px 0;
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
}
.image{
    width: 100%;
}

.pseudoUser{
    position: absolute;
    left: 40px;
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


footer{
    width: 100%;
   
    background:none;
    bottom: 0;
    width: 100%;
    max-width: 600px;
    padding: 0;
}
.boxBoutton{
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
    border-radius: 10px;
    padding: 20px;
}
.row{
    width: 40px;
    margin: 0;
}

</style>
