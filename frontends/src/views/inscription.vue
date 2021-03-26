<template>
    <div>
        <div class="boxConnection">
                <h1>Inscription</h1>

            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="inputEmail" placeholder="monEmail@hébergeur.com">
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <input type="email" name="email" id="password" placeholder="Password">
                <!--<div class="boxLinkInscription"><a href="#">Créer un compte</a></div>-->
            </div>
            <div class="inputCol">
                <label for="pseudo">Pseudo :</label>
                <input type="text" name="pseudo" id="pseudo" placeholder="Mon pseudo">
                <!--<div class="boxLinkInscription"><a href="#">Créer un compte</a></div>-->
            </div>
            <button v-on:click="signUp()">Inscription</button>
        </div>
        <div class="getMur">
            <router-link to="/mur" class="getMur">aller sur le mur</router-link>
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
            let Email = document.getElementById("inputEmail").value
            let Password = document.getElementById("password").value
            let Pseudo = document.getElementById("pseudo").value

            let obj = {
                email : Email,
                password : Password,
                pseudo : Pseudo
            }

           fetch('http://localhost:8080/api/user', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(response =>{ 
                console.log("l'utilisateur à bien été crée'...! ") 
                localStorage.setItem("pseudo",JSON.stringify(response.pseudo))
                this.$router.push('/mur#/')        
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
        text-align: center;
    }
    .boxConnection{

        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;

        width: 80%;
        margin: 20px auto;
        padding: 20px;

        box-shadow: 0 0 5px 5px  gray;
        border-radius: 20px;
        background: rgb(110, 182, 110);
    }
    .inputCol{
        padding: 10px;
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
        padding: 10px 10px;
    }
    .boxLinkInscription{
        text-align: right;
        padding: 10px 0;
    }
    .boxConnection a{      
        text-align: right;
        text-decoration: underline;
        color: rgb(66, 65, 65);
    }
    a:hover{
        color: black;
    }
    button{
        margin-top: 20px;
        display: block;
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
        color: white;
    }
 
</style>