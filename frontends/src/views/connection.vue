<template>
    <div class="body">
        <div class="boxConnection">
            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="connectInputEmail" placeholder="monEmail@hébergeur.com">
                <div v-if="!isEmail" class="isFalse">* Veulliez vérifier votre E-email</div>
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <input type="password" name="email" id="connectPassword" placeholder="Password">
                <div v-if="!isPassword" class="isFalse">* Mot de passe incorrect</div>

                <div class="boxLinkInscription"><router-link to="/inscription">Créer un compte</router-link> </div>
            </div>
            <button class="buttonConnection"  @click="signIn()" >Connexion</button>
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
                if (response.email){
                    this.$store.state.pseudo = response.pseudo
                    this.$store.state.idUser = response.idUser
                    this.$store.state.photoProfil = response.photo
                    this.$store.state.email = response.email

                    localStorage.setItem("token",JSON.stringify(response.token))   
                    this.$router.push('/mur#/')
                }     
            });
        },   
    },
}
</script>

<style>
    .body{
    height: 100vh;
    background-image: url("../assets/meeting.jpg");
    background-size: cover;

           
    }
   
    h1{
        text-align: left;
        text-decoration: underline;
    }
    .boxConnection{
        position : fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-evenly;

        width: 50%;
        max-width: 500px;
        min-width: 350px;
        padding: 0px 0 0px 0;

        border-radius: 20px;
        background: rgb(238, 238, 238);
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
    .buttonConnection{
        
        width: 100%;
        padding: 10px 50px;
        border-radius: 0 0 20px 20px;
        background: rgb(197, 55, 45);
        color: white;
        font-size: 1.5rem;
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