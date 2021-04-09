<template>
    <div>
        <!-- Message de base -->
        <div class="messageOriginal">
        <h1><span class="user">{{ pseudoUser }}</span> à poster :</h1>
            <div class="card" v-for="mess in card" :key="mess.name">
                <div class="boxNom">
                        <img class="photoProfil" :src="mess.photo" alt="">
                        <span class="nom"> {{ mess.pseudoUser }} </span>
                    </div>
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
            <div> {{ mess.message }}</div>
        </div>

        <button class="backMur" @click="backMur()">Retour au mur principal</button>
        <footer>
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
            commentaires : []
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
            fetch("http://localhost:8080/api/commentaires/recup")
            .then(response => response.json())
            .then( result =>{
                this.commentaires = result             
                console.log("un truc est la !!!!!!!!" + result[0].pseudo )
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
h1{
    text-align: left;
    font-size: 1.5rem;
    margin: 0;
    padding: 20px
}
.card{
    margin: 20px auto;
}
.topMessage{
    display: flex;
    padding: 10px 0;
    position: relative;
}
.user{
    color: red;
}
.photoProfil{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
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
  
    bottom: 0;
    width: 100%;
    max-width: 600px;
    background: black;
}
.backMur{
   
    font-size: 1.5rem;
    padding: 10px 50px;
    background: red;
    color: white;
    margin: auto;
    cursor: pointer;
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
