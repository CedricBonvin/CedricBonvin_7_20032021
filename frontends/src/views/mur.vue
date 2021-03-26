<template>
    <div>
        <h1>Mur principal </h1> 
        <div v-for="(mess, myKey ) in card" :key="myKey">
            <div> {{messageFromUser(mess.pseudoUser)}}
                <div  :class="{cardUser : isUser, card : !isUser}">
                    <div class="boxNom">
                        <span class="nom"> {{ mess.pseudoUser }} </span>
                    </div>
                    <div>{{ mess.message }}</div>
                
                    <img src="../assets/param.svg" alt="paramètre du message"
                        class="param"
                        v-if="pseudoUser === mess.pseudoUser"
                        @click="displayBoxUpdate( mess.idMESSAGES)"
                    >
                </div>
            </div>
        </div>
           <boxUpdate  v-if="modifie === true" :id="this.id"/>
        <footer>
            <h3>poster votre message : </h3>
            <input type="text" class="inputMessage" id="message">
            <button v-on:click="postMessage()">Envoyer</button>
        </footer>
    </div>
</template>

<script>
import boxUpdate from "../components/upDateMessage.vue"
export default {
    name: 'Home',
    components : {
        boxUpdate,
    },
    data(){
        return{
            modifie : false,
            id : "",
            card : [],
            pseudoUser : "",
            isUser : false,          
        }
    },                                                  // différence beforeMount et methods
    methods : {
        messageFromUser(pseudo){
            //console.log(pseudo + " " + JSON.parse(localStorage.getItem("pseudo") ))
            const storagePseudo = JSON.parse(localStorage.getItem("pseudo"))
            if (pseudo === storagePseudo ){
                this.isUser = true
            }else this.isUser = false
        },
        recupApi(){
            fetch("http://localhost:8080/api/message").then(response => response.json()).then(result =>{             
                    this.pseudo = result[0].pseudoUser
                    console.log("le pseudo est : "+result[0].pseudoUser)
                    this.card = result
                    this.pseudoUser = JSON.parse(localStorage.getItem("pseudo"))


            })
        },
        postMessage(){

            const mess = document.getElementById("message").value
            const idUser = JSON.parse(localStorage.getItem("idUser"))

            const obj = {
                //idMESSAGES : "",
                idUSERS : idUser,
                pseudoUser : JSON.parse(localStorage.getItem("pseudo")),
                message : mess
            }

            fetch('http://localhost:8080/api/message', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(() =>{      
                console.log("le message à bien été poster...! ") 
                this.card.push(obj)        
            });
        },
        displayBoxUpdate(id){
            this.id = id
            if (this.modifie === false){
                console.log("j'ai appuyer et l'id de this.id est : " + this.id)
                this.modifie = true
            }else if (this.modifie === true){
                this.modifie = false
            }
        },
    },
    
    beforeMount(){
        this.recupApi()
    },
    destroyed(){
        this.recupApi()
    }
}
</script>


<style>

    h1{
        text-align: center;
        text-decoration: none;
        margin: 0;
        color: white;
    }
    .cardUser{
        position: relative;
        border: solid;
        padding:0px 10px 10px 20px;
        margin: 20px auto;
        margin-right: 50px;
        width: 50%;
        background: rgb(86, 100, 163);
        box-shadow: 0 0 1px 1px;
        border-radius: 20px;
        color: white;
    }
    .card{
        position: relative;
        border: solid;
        padding:0px 10px 10px 20px;
        margin: 20px auto;
        margin-left: 50px;
        width: 50%;
        background: rgb(89, 163, 86);
        box-shadow: 0 0 1px 1px;
        border-radius: 20px;
        color: white;
    }
    .param{
        opacity: 50%;
        width: 20px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        cursor: pointer;
    }
    .boxNom{
        padding-bottom: 10px ;
    }
    .nom{
        color: rgb(175, 56, 56);
        text-align: left;
        font-size: 0.8rem;
        margin-top: 0;
        font-weight: bold;
    }
    footer{
        background: black;
        padding: 30px;
        color: white;
    }
    footer input{
        display: block;
        margin: auto;
        width: 80%;
        padding: 20px 10px;
        border-radius: 30px;
    }
    footer button{
        display: block;
        margin: 20px auto;
        padding: 5px 40px;
        background: rgb(89, 163, 86);
        border-radius: 30px;
        font-size: 1.5rem;
        color: white;
        font-weight: bold;
    }
   
</style>














