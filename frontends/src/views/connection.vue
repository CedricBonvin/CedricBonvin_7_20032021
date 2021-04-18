<template>
    <div class="body">
        <div class="boxConnection">
            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="connectInputEmail" placeholder="monEmail@hébergeur.com">
                <div v-if="erreurMail" class="isFalse">{{erreurMail}}</div>
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <div class="boxPassword">
                    <input type="password" name="email" id="connectPassword" placeholder="Password" >
                    <img class="eye" src="../assets/eye.svg" alt="" @click="showPassword()">
                </div>
                <div v-if="erreurPW" class="isFalse">{{ erreurPW }}</div>

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
            erreurPW : "",
            erreurMail : ""
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
                let valid = true
                if (response.erreur){
                    valid = false
                    this.erreurMail = response.erreur.email
                    this.erreurPW = response.erreur.password
                }
                 if (valid === true){
                    this.$store.state.pseudo = response.pseudo
                    this.$store.state.idUser = response.idUser
                    this.$store.state.photoProfil = response.photo
                    this.$store.state.email = response.email
                    this.$store.state.isAdmin = response.isAdmin

                    localStorage.setItem("token",JSON.stringify(response.token))   
                    this.$router.push('/mur#/')
                }     
            });
        },
        showPassword(){
           const pw = document.getElementById("connectPassword")
           const att = pw.getAttribute("type")
            if(att === "password"){
                pw.setAttribute("type", "text")
            }else pw.setAttribute("type", "password")        
        }   
    },
}
</script>

<style>
    .body{
    height: 100vh;
    background: linear-gradient(to right, rgba(119, 119, 119, 0.664),rgba(179, 176, 176, 0.432)),url("../assets/meeting.jpg") ;
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
        padding: 10px ;
    }
    .boxPassword{
        position: relative;
    }
    .eye{
        position: absolute;
        right:  10px;
        top : 10px;
        width: 20px;
        opacity: 60%;
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