<template>
    <div>
        <div class="boxConnection">
        <h1>Connectez-vous !</h1>
            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="connectInputEmail" placeholder="monEmail@hébergeur.com">
                <div v-if="!isEmail" class="isFalse">* Veulliez vérifier votre E-email</div>
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <input type="email" name="email" id="connectPassword" placeholder="Password">
                <div v-if="!isPassword" class="isFalse">* Mot de passe incorrect</div>

                <div class="boxLinkInscription"><router-link to="/inscription">Créer un compte</router-link> </div>
            </div>
            <button @click="afficheUser()" v-on:click="signIn()" >Connexion</button>
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
            isEmail : true,
            isPassword : true
        }
    },
       
    methods : {
            
        signIn(){
            let Email = document.getElementById("connectInputEmail").value
            let Password = document.getElementById("connectPassword").value

            this.isEmail = true // si email correct, err email ne s'affiche pas, uniquement l'erreur password

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
            .then(response =>{ 
               
                console.log("la longueur est de :"+ response.length)
                if (response.length){
                    console.log("Essaie de connection " + response[0].email) 
                    localStorage.setItem("pseudo",JSON.stringify(response[0].pseudo))
                    localStorage.setItem("idUser",JSON.stringify(response[0].idUser))
                    
                    this.$router.push('/mur#/')
                }
                if (response === 0){
                    this.isEmail = false
                    console.log("impossible de trouvé le mail")
                }         
                if (response === 1){
                    this.isPassword = false
                    console.log("Mot de passe erroné")
                }         
            });
        }, 
    },
     destroyed:
         function afficheUser(){this.$store.commit("AFFICHE_USER")},
        
   

}
</script>

<style scoped >
    body{
        background: #f2f2f2;
    }
    h1{
        text-align: left;
        text-decoration: underline;
        margin: 20px 0 10px 0;

        
    }
    .boxConnection{

        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-evenly;

        width: 80%;
        margin: 20px auto;
        padding: 0px 0 20px 0;

        box-shadow: 0 0 5px 5px  gray;
        border-radius: 20px;
        background: rgb(110, 182, 110);
    }
    .inputCol{
        width: 70%;
        text-align: center;
        margin: 10px 0;

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
        margin: 20px 0;
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
    .isFalse{
        color: red;
        text-align: left;
        font-weight: bold;
    }
 
</style>