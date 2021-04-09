<template>
    <div v-if="affiche">
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
            </div>

            <p class="labelImage">Image de profil :</p>    
            <div id="renduImage">   
                <input @change="fileFunc()"  type="file" name="file" id="file">
                <img class="imageProfil" src="../assets/profil.png" alt="">
            </div>
                <label class="labelPhotoProfil"  for="file"> Choisissez une photo de profil</label> 
            <div class="boxButton">
                <button @click="closeBox">Annuler</button>
                <button  @click="signUp()">Inscription</button>
            </div>
        </div>
        <div class="getMur">
            <router-link to="/mur" class="getMur">aller sur le mur</router-link>
        </div>

    </div>
</template>


<script>
export default {
    name: 'Inscription',
    data() {
       return {      
           ImageUser : "",
           affiche : true      
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
                // console.log("l'utilisateur à bien été crée'...! ") 
                // console.log("le token est :" + response.token)
                // console.log("le nom du fichier est :" + this.ImageUser)

                localStorage.setItem("photoUrl",JSON.stringify(response.photo))

                localStorage.setItem("pseudo",JSON.stringify(response.pseudo))
               // this.$store.state.pseudo = response.pseudo
                localStorage.setItem("email",JSON.stringify(response.email))
                localStorage.setItem("idUser",JSON.stringify(response.idUser))
                localStorage.setItem("token",JSON.stringify(response.token))

                this.$store.state.clearPassword = Password

                this.$router.push('/mur#/')        
            });    
        },
         fileFunc(){
            const input = document.getElementById("file")
          
                // console.log(input.files[0].name)
                console.log(input.files.get )
                 //console.log("le this.ImageUser est : " + this.ImageUser)
                 //this.ImageUser = input.files[0].type
                const reader = new FileReader()
                reader.onload = function(){
                    const img = new Image()
                    img.src = reader.result
                    this.ImageUser = img

                    img.style.width = "150px"
                    img.style.height = "150px"
                    img.style.position = "absolute"
                    img.style.objectFit = "cover"
                    img.style.top = 0
                    img.style.left = 0

                    const miniature = document.getElementById("renduImage")
                    miniature.append(img)
                }
               reader.readAsDataURL(input.files[0]) 
        },
        closeBox(){
            if (this.affiche){
                this.affiche = false
                this.$router.push('/')
            } else this.affiche = true
        }
     
    },
    
}
</script>


<style scoped >
    body{
        background: #f2f2f2;
    }
    h1{
        text-align: center;
        color: rgb(59, 59, 59);
    }
    .boxConnection{

        display: flex;
        flex-flow: column;
        justify-content: space-between;
        padding: 20px;
        width: 80%;
        margin: 30px auto;

        box-shadow: 0 0 5px 5px  gray;
        border-radius: 20px;
        background: rgb(110, 182, 110);
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
    a:hover{
        color: black;
    }
    .boxButton{
        display: flex;
        flex-flow: row wrap;
    }
    button{
        width: 150px;
        margin: 20px auto 20px auto;
        padding: 10px 20px;
        border-radius: 20px;
        background: red;
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
    #file{
        display: none;
    }
    #renduImage{
        position: relative;
        overflow: hidden;
        width: 150px;
        height: 150px;
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
        width: 150px;
        height: 150px;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
    }
    .labelPhotoProfil{
        cursor: pointer;
        color: white;
        text-decoration: underline;
        text-align: center;
        font-size: 1.2rem;
        padding-bottom: 20px;
    }

    
  
 
</style>