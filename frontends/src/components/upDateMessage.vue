<template>
    <div id="updateMessage">
        <h3> Modifier votre message </h3>
        <textarea  id="newMessage"  v-model="message" placeholder="Votre nouveau message" rows="5" > </textarea>
        <p class="erreur" v-if="erreur">{{ erreur }}</p>
        <div class="boxBoutton">
            <button @click="updateMessage(id)" title="Mettre à jour le message">Mettre à jour</button>
            <!--<button @click="deleteMessage(id)">Supprimer</button> -->
            <button @click="deleteMessage(id)" title="Supprimer le message">Supprimer</button>
            <button @click="closeBox()" title="Annuler">Annuler</button>
        </div>
    </div>
</template>


<script>
  
    export default {
        name : "boxUpdate",
        props : {
            id : Number,
            recupMessage : String
        },
        data(){
            return {
                cancel : true,
                message : this.recupMessage, 
                erreur : ""   
            }
        },
       
        methods : {
         
            updateMessage(id){
                this.cancel = false
                const obj = {
                    idMESSAGES : id,
                    message : this.message,
                    token : JSON.parse(localStorage.getItem("token"))
                } 
                fetch('http://localhost:8080/api/message/update', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {"Content-type": "application/json; charset=UTF-8",
                                Authorization: "Bearer" +" "+ obj.token,
                                }
                    })
                    .then(response => response.json()) 
                    .then( response =>{
                        if (response.erreur){
                            this.erreur = response.erreur
                        }
                        else{
                         this.$emit("newMessage",{ message : this.message})
                        }
                    });
            },      
            deleteMessage(id){
                this.$emit("eventDelete",{})
                this.cancel = false
                const obj = {
                    idMESSAGES : id,
                    token : JSON.parse(localStorage.getItem("token"))
                }
                fetch('http://localhost:8080/api/message/delete', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {"Content-type": "application/json; charset=UTF-8",
                                Authorization: "Bearer" +" "+ obj.token,
                            }
                    })
                    .then(response => response.json()) 
                    .then( () =>{ 
                });
            },
            closeBox(){
                this.$emit("closeBoxUpdate", { affiches : false})
            }
        },     
    }

    
</script>


<style scoped>
    
    #updateMessage{
        position : fixed;
        top : 20%;
        left : 50%;
        transform: translateX(-50%);
        color: white;

        background: rgba(0, 0, 0, 0.931);
        width: 80%;
        max-width: 500px;
        padding: 20px;
    }
    .boxBoutton{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        font-size: 0.7rem;
    }
    textarea{
        margin-top: 20px;
        width: 100%;
        max-width: 100%;
    }
    button{
        display: block;
        background: rgba(236, 59, 59, 0.87);
        padding: 10px 20px;
        margin: 10px 5px;
        color : white;
        font-size: 1rem;
        border-radius: 20px;
        cursor: pointer;
    }
    #newMessage{
    padding: 5px 20px;}

</style>