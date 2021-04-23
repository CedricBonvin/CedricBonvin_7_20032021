<template>
    <div v-if="affiche" class="inscription">
        <div class="boxInscription">
            <div class="inputCol">
                <label for="email">E-mail :</label>
                <input type="text" name="email" id="inputEmail" placeholder="monEmail@hébergeur.com">
                <p class="erreur" v-if="validMail">{{validMail}}</p>
            </div>
            <div class="inputCol">
                <label for="password">Mot de passe :</label>
                <div class="boxPassword">
                    <input type="password" name="email" id="password" placeholder="Password" >
                    <img @click="affichePassword()" class="eye" src="../assets/eye.svg" id="affichePassword" alt="">
                    <p class="erreur" v-if="validPW"> {{validPW}}</p>
                </div>
            </div>
            <div class="inputCol">
                <label for="pseudo">Pseudo :</label>
                <input type="text" name="pseudo" id="pseudo" placeholder="Mon pseudo">
                <p class="erreur" v-if="validPseudo"> {{validPseudo}}</p>
            </div>

            <p class="labelImage">Image de profil :</p>    
            <div id="renduImage">   
                <input @change="fileFunc()"  type="file" name="file" id="file">
                <img class="imageProfil" src="../assets/profil.png" alt="">
            </div>
                <label class="labelPhotoProfil"  for="file"> Choisissez une photo de profil</label> 
            <div class="boxButton">
                <button  id="buttonInscription" @click="signUp()">Inscription</button>
            </div>
        </div>
     

    </div>
</template>


<script>
export default {
    name: 'Inscription',
    data() {
       return {      
           ImageUser : "",
           affiche : true,
           
           validMail : "",
           validPW : "",
           validPseudo: ""
       }
    },
    props: {
        msg: String,
        NewUser : Boolean
    },
    methods : {
        signUp(){
            let Email = document.getElementById("inputEmail").value
            let Password = document.getElementById("password").value
            let Pseudo = document.getElementById("pseudo").value
            let Image = document.getElementById("file").files[0] 
           
           let formdata = new FormData()
            formdata.append('email' , Email)
            formdata.append('password' , Password)
            formdata.append('pseudo' , Pseudo)
            formdata.append('image' , Image)     
            
           fetch('http://localhost:8080/api/user', {
            method: "POST",
            body: formdata,
           // headers: {"Content-type": "multipart/form-data",}
            })
            .then(response => response.json()) 
            .then(response =>{
               
                //TEST FORMULAIRE
                let valid = true
                if (response.erreur){
                    console.log("la réponse du mail est : " + response.erreur.email)
                    valid = false 
                    this.validPW = response.erreur.password
                    this.validMail = response.erreur.email
                    this.validPseudo = response.erreur.pseudo
                }       
                if (valid === true){
                    this.$router.push('/mur#/')   
                    this.$store.state.pseudo = response.pseudo
                    this.$store.state.idUser = response.idUser
                    this.$store.state.photoProfil = response.photo
                    this.$store.state.email = response.email
                    this.$store.state.isAdmin = response.isAdmin
                    localStorage.setItem("token",JSON.stringify(response.token))                    
                }
                else console.log("un prob. ")
            });    
        },
         fileFunc(){
            const input = document.getElementById("file")
    
                const reader = new FileReader()
                reader.onload = function(){
                    const img = new Image()
                    img.src = reader.result
                    this.ImageUser = img

                    img.style.width = "100px"
                    img.style.height = "100px"
                    img.style.position = "absolute"
                    img.style.objectFit = "cover"
                    img.style.top = 0
                    img.style.left = 0

                    const miniature = document.getElementById("renduImage")
                    miniature.append(img)
                }
               reader.readAsDataURL(input.files[0]) 
        },
       
        affichePassword(){
            const password = document.getElementById("password")
            let attPass = password.getAttribute("type")

            if ( attPass === "password"){
                password.setAttribute("type","text")
            } 
            else if (attPass === "text"){
                password.setAttribute("type", "password")
            }       
        }  
    },   
}
</script>


<style>
   .inscription{
    background: linear-gradient(to right, rgba(119, 119, 119, 0.664),rgba(179, 176, 176, 0.432)),url("../assets/meeting.jpg") ;
   background-size: cover;
   height: 100vh;
   
   }
 
    h1{
        text-align: center;
        color: rgb(59, 59, 59);
    }
    .boxInscription{
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        position : absolute;
        top: 60px;
        left: 50%;
        padding: 0;
        transform: translateX(-50%);
        width: 80%;

        border-radius: 20px;
        background: rgb(238, 238, 238);
    }
    .inputCol{
        padding: 10px;
        width: 90%;
        max-width: 400px;
        margin: auto;
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
    .boxPassword{
        position: relative
    }
    .eye{
        position: absolute;
        top : 7px;
        right: 10px;
        width: 25px;
        opacity: 40%;
        cursor: pointer;
    }
    a:hover{
        color: black;
    }
    .boxButton{
        display: flex;
        flex-flow: row wrap;
    }
    #buttonInscription{
        width: 100%;
        padding: 10px 20px;
        border-radius:  0 0 20px 20px;
        background: rgba(196, 96, 96);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
   
    .getMur{
        text-align: center;
        padding: 20px;
        font-size: 2rem;
        background: black;
        color: white;
    }
    #file{
        display: none;
    }
    #renduImage{
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 100px;
        margin: 10px auto;
        padding: 20px;
        background: rgba(128, 128, 128, 0.472);
        border-radius: 50%;
    }
    .iconeImage{
        cursor: pointer;
    }
    .labelImage{
        text-align: center;
        font-size: 1.3rem;
        margin-top: 10px;
    }
    .imageProfil{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
    }
    .labelPhotoProfil{
        cursor: pointer;
        color: rgb(92, 91, 91);
        text-decoration: underline;
        text-align: center;
        font-size: 1.2rem;
        padding-bottom: 20px;
    }
    .labelPhotoProfil:hover{
        color:black;
    }
    .erreur{
        text-align: left;
        font-size: 0.9rem;
        color: red;
    }


    
  
 
</style>