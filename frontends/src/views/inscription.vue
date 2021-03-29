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
            </div>
            <p class="labelImage" @click="afficheBoxImage()">Image de profil :</p>
            <div v-if="BoxImage"> 
                <div id="boxImage">
                    <div>
                        <label class="labelProfil" for="file">Ajouter une photo</label>
                    </div>
                    <input @change="fileFunc()"  type="file" name="file" id="file">
                    <div class="photoProfil" id="renduImage"></div>
                </div>
            </div>
                <button  @click="signUp()">Inscription</button>
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
           BoxImage : true ,
           ImageUser : ""      
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
                console.log("l'utilisateur à bien été crée'...! ") 
                console.log("le nom du fichier est :" + this.ImageUser)
                localStorage.setItem("pseudo",JSON.stringify(response.pseudo))
                localStorage.setItem("photoUrl",JSON.stringify(response.photo))

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

                    img.style.width = "100px"
                    img.style.height = "100px"

                    const miniature = document.getElementById("renduImage")
                    miniature.append(img)
                }
               reader.readAsDataURL(input.files[0]) 
        },
        afficheBoxImage(){
            if (this.BoxImage === true){
                this.BoxImage = false
                console.log(this.BoxImage)
            }else this.BoxImage = true
            console.log(this.BoxImage)
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
        width: 70%;
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
    button{
        width: 200px;
        margin: 40px auto 20px auto;
        padding: 20px 50px;
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
    .photoProfil{
        display: block;
        width: 100px;
        height: 100px;
        border: solid 1px black;
        border-radius: 50%;
        overflow: hidden;
    }
    #boxImage{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between ;
        width: 60%;
        margin: auto;
        align-items: center;
        height: 100px;
    }
    .labelProfil{
        display: block;
        text-decoration: underline;
        cursor: pointer;
        font-size: 1.9rem;
    }
    .labelImage{
        text-align: left;
        margin: auto;
        width: 70%;
        
        padding: 10px;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .labelImage:hover{
        color: rgb(48, 48, 48);
        transform: scale(1.05);
    }
 
</style>