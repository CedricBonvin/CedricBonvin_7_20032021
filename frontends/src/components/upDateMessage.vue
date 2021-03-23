<template>
    <div id="updateMessage" v-if="cancel">
        <h3> Modifier votre message </h3>
        <textarea  id="newMessage"  v-model="message" placeholder="Votre nouveau message" ></textarea>
        <button @click="updateMessage(id)" >Mettre à jour</button>
        <button @click="deleteMessage(id)">Supprimer</button>
        <button @click="cancelAction()">Annuler</button>
    </div>
</template>


<script>
  
    export default {
        name : "boxUpdate",
        props : {
            id : Number,
        },
        data(){
            return {
                cancel : true,
                message : "",    
            }
        }, 
        methods : {
            cancelAction(){
                if (this.cancel === false){
                    this.cancel = true
                }
                this.cancel =false
            }, 
            updateMessage(id){
                console.log("pour le post l'id est " + id + "et le message est : " + this.message)
                this.cancel = false
                const obj = {
                    idMESSAGES : id,
                    message : this.message
                } 
                fetch('http://localhost:8080/api/message/update', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(() =>{ 
                        console.log("Le nouveau message à bien été envoyer...!  ")         
                
                });
                
            },
            deleteMessage(id){
                console.log("l'id du message que je veut supprimer est :" + id)
                this.cancel = false
                const obj = {
                    idMESSAGES : id
                }
                fetch('http://localhost:8080/api/message/delete', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(() =>{ 
                        console.log("l'id du message à supprimer à bien été envoyé, id : " + id)         
                });
            },
        },    
    }

    
</script>


<style scoped>
    
    #updateMessage{
        position : fixed;
        top : 50vh;
        left : 5%;
        transform: translateY(-50%);

        background: gray;
        width: 80%;
        margin: auto;
        padding: 20px;
    }
    textarea{
        width: 100%;
    }
    button{
        display: block;
        background: red;
        padding: 10px 20px;
        margin: 20px auto;
        color : white;
        font-size: 1.5rem;
        border-radius: 20px;
    }

</style>