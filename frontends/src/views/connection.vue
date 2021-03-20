<template>
    <div>
        <h1>Connectez-vous !</h1>
        <div class="boxConnection">
            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="connectInputEmail" placeholder="monEmail@hébergeur.com">
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <input type="email" name="email" id="connectPassword" placeholder="Password">
                <div class="boxLinkInscription"><router-link to="/inscription">Créer un super compte</router-link> </div>
            </div>
            <button v-on:click="signUp()">Connexion</button>
        </div>
        <div  class="getMur">
            <router-link to="/mur" class="linkMur"  >aller sur le mur</router-link>
        </div>

    </div>
</template>


<script>
export default {
        name: 'connection',
        data() {
        return {        
        }
        },
        props: {
        msg: String
    },
    methods : {
           signUp(){
            let Email = document.getElementById("connectInputEmail").value
            let Password = document.getElementById("connectPassword").value

            let obj = {
                email : Email,
                password : Password
            }

           fetch('http://localhost:8080/api/user/login', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(() =>{ 
                console.log("Essaie de connection ")         
            });
        }
    }
}
</script>

<style scoped >
    body{
        background: #f2f2f2;
    }
    h1{
        padding: 30px 0 30px 15px;
        text-align: left;
        text-decoration: underline;
    }
    .boxConnection{

        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-evenly;

        width: 80%;
        height: 50vh;
        margin: 20px auto;
        padding: 20px;

        box-shadow: 0 0 5px 5px  gray;
        border-radius: 20px;
        background: rgb(110, 182, 110);
    }
    .inputCol{
        width: 70%;
        text-align: center;

    }
    label{
        display: block;
        text-align: left;
        padding: 5px;
    }
    input{
        display: block;
        width: 100%;
        padding: 10px 0;
    }
    .boxLinkInscription{
        text-align: right;
        padding: 10px 0;
    }
    .boxConnection a{      
        text-align: right;
        text-decoration: underline;
        color: rgb(66, 65, 65);
        padding: 20px;
    }
    a:hover{
        color: black;
    }
    button{
        padding: 20px 50px;
        border-radius: 20px;
        background: green;
        color: white;
        font-size: 1.5rem;
    }
    button:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
    .getMur{
        text-align: center;
        padding: 20px;
        font-size: 2rem;
        background: black;
    }
    .linkMur{
        color:rgb(106, 146, 106);
    }
    .linkMur:hover{
        color: white;
    }
 
</style>