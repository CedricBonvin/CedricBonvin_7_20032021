<template>
    <div>
        <h1>Mur Principal</h1>
        <div v-for="(mess, myKey ) in card" :key="myKey" >
            <div class="card"   >
                <div class="boxNom">
                    <span class="nom"> {{ mess.nom }} </span> 
                    <span class="nom"> {{ mess.prenom}} </span>
                </div>
                <div>{{ mess.message }}</div>
                <button @click="displayBoxUpdate( mess.idMESSAGES)"> modifier le message </button>
            </div>
        </div>
           <boxUpdate v-if="modifie === true " :id="this.id"/>
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
        boxUpdate
    },
    data(){
        return{
            modifie : false,
            id : "",
            card : [],
        }
    },                                                  // différence beforeMount et methods
    methods : {
        recupApi(){
            fetch("http://localhost:8080/api/message").then(response => response.json()).then(result =>{ 
                this.card = result
                console.log(result)
            })
        },
        postMessage(){

            const mess = document.getElementById("message").value
            console.log(mess)

            const obj = {
                //idMESSAGES : "",
                idUSERS : 9,
                nom : "bourbon",
                prenom : "sophie",
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
}
</script>


<style>
    body{
        background: rgb(192, 189, 189);
    }
    h1{
        text-align: center;
        text-decoration: none;
        margin: 0;
    }
    .card{
        border: solid;
        padding:0px 10px 10px 20px;
        margin: 20px auto;
        width: 50%;
        background: rgb(89, 163, 86);
        box-shadow: 0 0 1px 1px;
        border-radius: 20px;
        color: white;
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














