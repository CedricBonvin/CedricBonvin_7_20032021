<template>
    <div>
        <h1>Mur principal </h1>
        <thanksNewUser  class="thanksNewUser" v-if="this.affiche"></thanksNewUser>
        <div v-for="mess in card" :key="mess.name">
            <div class="card"   > 
                <div class="date">{{ mess.date}}</div>
                <div>  <!-- :class=" isUser ? 'card' : 'cardUser'"-->
                    <div >   
                        <div class="boxNom">
                            <span class="nom"> {{ mess.pseudoUser }} </span>
                        </div>
                        <div>{{ mess.message }}</div>
                    
                        <img src="../assets/param.svg" alt="paramètre du message"
                            class="param"
                            v-if="storagePseudo === mess.pseudoUser"
                            @click="displayBoxUpdate( mess.idMESSAGES)"
                        >
                    </div>
                </div>
            </div>
        </div>
           <boxUpdate @newMessage="postNewMessage" @eventDelete="deleteMess"  v-if="modifie === true" :id="this.id"/>
        <footer>
            <div class="boxBoutton">
                <input type="text" class="inputMessage" id="message" placeholder="Poster votre message">
                <button v-on:click="postMessage()">E</button>
            </div>
        </footer>
    </div>
</template>

<script>
import boxUpdate from "../components/upDateMessage.vue"
import thanksNewUser from "../components/thanksNewUser.vue"
export default {
    name: 'Home',
    components : {
        boxUpdate,
        thanksNewUser
    },
    data(){
        return{
            modifie : false,
            id : "",
            card : [],
            pseudoUser : "",
            storagePseudo : "",
            isUser : false,
            affiche : false,
            date : ""               
        }
    },
                                                // différence beforeMount et methods
    methods : {
      
        pseudoUserMessage(pseudo){
            this.pseudoUser = pseudo
        },
        compare(){
            if( this.storagePseudo === this.pseudoUser){
                this.isUser = true
            } else this.isUser = false
            console.log(this.isUser)
            console.log("le pseudo du storage est : " + this.storagePseudo)
            console.log(" le pseudoUser est : "+this.pseudoUser)
        },
        recupApi(){
            fetch("http://localhost:8080/api/message").then(response => response.json()).then(result =>{             
                    this.card = result
                    this.storagePseudo = JSON.parse(localStorage.getItem("pseudo"))


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
            const idUser = JSON.parse(localStorage.getItem("idUser"))

            this.getDate()
            console.log(" la date est : "+ this.date)

            const obj = {
                //idMESSAGES : "",
                idUSERS : idUser,
                pseudoUser : JSON.parse(localStorage.getItem("pseudo")),
                message : mess,
                date : this.date
            }

            fetch('http://localhost:8080/api/message', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(result =>{      
                console.log("le message à bien été poster...! et la réponse du serveur est : "+  result.idMessage) 
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
        deleteMess(){
            const idMessage = (element) => element.idMESSAGES === this.id;
            let index = this.card.findIndex(idMessage)
            console.log("index : "+index)
            this.card.splice(index,1)
            this.modifie = false
            console.log("index du tableau card à supprimer : " + index);
            
        },
        postNewMessage(payload){
            const idMessage = (element) => element.idMESSAGES === this.id;
            let index = this.card.findIndex(idMessage)
            this.card[index].message = payload.message
            console.log("pour le new"+this.card[index.message])
            this.modifie = false
        },
        thanksNewUser(){
            if(thanksNewUser){
                thanksNewUser = false
            }else thanksNewUser = true
        }
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
        margin: 50px auto;
        margin-left: 10%;
        width: 50%;
        min-width: 250px;
        background: rgb(89, 163, 86);
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
        opacity: 50%;
        width: 20px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        cursor: pointer;
    }
  
    .nom{
        color: rgb(175, 56, 56);
        text-align: left;
        margin-top: 0;
        font-weight: bold;
    }
    footer{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        padding: 10px 15px 30px 15px;    
        color: white;
    }
    footer h3{
        margin-left: 20px;
    }
    .boxBoutton{
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    footer input{
        width: 80%;
        height: 60px;
        padding: 20px 10px;
        border-radius: 30px;
    }
    footer button{
        width: 60px;
        height: 60px;
        font-weight: bold;
        margin-left:  10px;
        background: rgb(89, 163, 86);
        border-radius: 50%;
        border: solid 2px green;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
    }
   
</style>














