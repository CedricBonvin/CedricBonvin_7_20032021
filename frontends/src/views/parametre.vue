<template>
    <div  class="parametre">
        <div v-if="allowed">
            <h3>Paramètres du compte</h3>
            <div class="colInput">
                <label for="email">Email :</label>
                <input @change="changeEmail()"  type="email" id="email" name="email" :value="this.email">
                <p class="erreur" v-if="erreurMail"> {{ erreurMail}} </p>
            </div>
            <div class="colInput">
                <label for="pseudo">Pseudo :</label>
                <input @change="changePseudo()" type="pseudo" id="pseudo" name="pseudo" :value="this.pseudo">
                 <p class="erreur" v-if="erreurPseudo"> {{erreurPseudo}} </p>
            </div>
            <!-- password -->
            <label>Password :</label>
            <p @click="afficheNewPassword()" class="modifPassword">Modifier votre password</p>
            <div v-if="newPassword" class="colInput password" id="boxPassword">
                <div class="boxPassword">
                    <label class="password" for="newPassword"> Nouveau Password :</label>
                    <div class="boxPassword1">
                        <input  type="password" id="newPassword" name="newPassword">
                        <img @click="affichePasswore1()" class="eye" src="../assets/eye.svg" alt="icone affiche password">
                    </div>
                    <p v-if="erreurPW" class="errorPassword"> {{ erreurPW }}</p>
                    <label class="password" for="newPassword">Confirmer votre nouveau password :</label>
                    <div class="boxPassword1">
                        <input  type="password" id="ConfirmPassword" name="ConfirmPassword" >
                        <img @click="affichePassword2()" class="eye" src="../assets/eye.svg" alt="icone affiche password">
                    </div>
                    <p v-if="erreurPW" class="errorPassword">{{ erreurPW }}</p>
                </div>
            </div>
            <hr class="hr">
            <!-- PHOTO DE PROFIL -->
            <p class="titlePhotoProfil">Photo de profil : </p>
            <div>
                <div class="renduImage" id="renduImages">
                    <img class="photoProfil" :src="$store.state.photoProfil" alt="photo de profil">
                    <input @change="fileFunc()"  type="file" id="fileUser" name="fileUser">
                </div>
                    <label class="labelChangeFile" for="fileUser">Modifier la photo de profil</label>
            </div>
            <!--BUTTON -->
            <div class="boxButton">
                <button @click="userUpdate()"  class="button ">Mettre à jour</button>
                <button @click="afficheBox(), goMur()" class="button">Annuler</button>
            </div>
            <button @click="afficheConfirm()" class="supprimer">Supprimer votre compte</button>
            <!-- BOX CONFIRMATION DE LA SUPPRESSION DU COMPTE -->
            <div class="confirmDeleteAccount" v-if="this.afficheConfirmation">
                <p>Etes-vous sûr de vouloir supprimer votre compte ? <br>( Cette action est irréversible !)</p>
                <div class="boxButton" >
                    <button class="button"  @click="afficheConfirm()" >annuler</button>
                    <button class="button danger" @click="afficheBox() ,deleteAccount()">Supprimer</button>
                </div>
            </div>
            <!--BOX CONFIRMATION UPDATE USER -->
            <div v-if="confirmUpdate" class="confirmBoxUpdateUser">
                <p class="title">! Votre profil à bien été mise à jour ! </p>
                <div class="information">
                    <p> email : {{this.email}}</p>
                    <p> pseudo : {{this.pseudo}}</p>
                    <p> password : {{this.passwordText}} </p>
                </div>
                <p>Veuillez vous reconnecter..</p>
                <button @click="afficheBox(), goConnection()"  class="button">ok</button>
            </div>
        </div>
        <notAllowed v-else />
    </div>
</template>

<script>
import notAllowed from "../components/notAllowed.vue"
export default {
    name : "parametre",
    components :{
        notAllowed,
    },
    data(){
        return{
            pseudo : this.$store.state.pseudo,
            email : this.$store.state.email,
            userPhoto : this.$store.state.photoProfil,

            afficheConfirmation : false,
            confirmUpdate : false,
            newPassword : false,
            passwordText : "inchangé",

            erreurMail : "",
            erreurPseudo : "",
            erreurPW : "",
            allowed : false
        }
    },
    methods : {
        afficheBox(){
            this.$emit("closeParametre", { paramClose : false})
        },
        deleteAccount(){
            console.log("essaie du supresseion du compte de l'email : " + this.email)
            const obj = {
                email : this.email,
                token : JSON.parse(localStorage.getItem("token"))
            }
            fetch('http://localhost:8080/api/user/deleteUser', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {"Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                        }
            })
            .then(response => response.json()) 
            .then( () => {
                this.$store.state.pseudo = ""
                this.$store.state.photoProfil = ""
                this.$store.state.idUser = ""
                this.$store.state.email = ""
                localStorage.removeItem("token")
                this.$router.push('/')
            })
        },
        afficheConfirm(){
            this.afficheConfirmation ? this.afficheConfirmation = false : this.afficheConfirmation = true
        },
        goMur(){
            this.$router.push("/mur")
        },
        fileFunc(){
            const input = document.getElementById("fileUser")
          
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

                    const miniature = document.getElementById("renduImages")
                    miniature.append(img)
                }
               reader.readAsDataURL(input.files[0]) 
        },
        userUpdate(){
            const email = document.getElementById("email").value
            const pseudo = document.getElementById("pseudo").value
            const oldMail = this.$store.state.email
            const oldPseudo = this.$store.state.pseudo
            const fileUser = document.getElementById("fileUser").files[0]
            const oldPhotoUser = this.$store.state.photoProfil
            const token = JSON.parse(localStorage.getItem("token"))

            //Check Password depuis le front
            let validPassword = true


            //FORMDATA
            const formdata = new FormData()
                formdata.append("email", email)
                formdata.append("pseudo", pseudo)
                formdata.append("image", fileUser)
                formdata.append("oldMail", oldMail)
                formdata.append("oldPseudo", oldPseudo)
                formdata.append("oldPhotoUser", oldPhotoUser)
                formdata.append("token", token)

                if (this.newPassword){
                    const newPassword = document.getElementById("newPassword").value
                    const confirmPassword = document.getElementById("ConfirmPassword").value
                    formdata.append("password", newPassword)
                    formdata.append("confirmPassword", confirmPassword)

                    newPassword.length > 0 ? this.passwordText = "mis à jour" : this.passwordText = "inchangé"
        
                }
            

            if (validPassword === true){
               // this.confirmUpdate = true
               fetch('http://localhost:8080/api/user/update', {
                method: "POST",
                body: formdata,
                headers: {
                        Authorization: "Bearer" +" "+ token,
                        }
                })
                .then(response => response.json()) 
                .then (response => {  
                    console.log(response)
                    if( response.erreur){
                        this.confirmUpdate = false
                        this.erreurMail = response.erreur.email
                        this.erreurPseudo = response.erreur.pseudo
                        this.erreurPW = response.erreur.password
                    }else{
                        this.confirmUpdate = true
                        this.erreurEmail = ""
                        this.erreurPseudo = ""
                        this.email = response.email
                        this.pseudo = response.pseudo
                    } 
                })  
            }else {
                console.log("le password est faux") 
                this.confirmUpdate = false  
                this.errorPassword = true    
            } 
        },
        afficheConfirmUpdate(){
            this.confirmUpdate ? this.confirmUpdate = false : this.confirmUpdate = true
        },
        goConnection(){
            this.$router.push('/')
            this.afficheBox()

                this.$store.state.pseudo = ""
            this.$store.state.photoProfil = ""
            this.$store.state.idUser = ""
            this.$store.state.email = ""
            localStorage.removeItem("token")
        },
        afficheNewPassword(){
            this.newPassword === false ? this.newPassword = true : this.newPassword = false
        },
        changeEmail(){
            const email = document.getElementById("email").value
            this.email = email
        },
        changePseudo(){
            const pseudo = document.getElementById("pseudo").value
            this.pseudo = pseudo
        },
        affichePasswore1(){
            const pw = document.getElementById("newPassword")
           const attr =  pw.getAttribute("type")
            if (attr === "password"){
                pw.setAttribute("type", "text")
            } else pw.setAttribute("type","password")
        },
        affichePassword2(){
            const pw = document.getElementById("ConfirmPassword")
           const attr =  pw.getAttribute("type")
            if (attr === "password"){
                pw.setAttribute("type", "text")
            } else pw.setAttribute("type","password")
        },
        refresh(){
            if (!this.$store.state.email){
                const obj = {
                    token : JSON.parse(localStorage.getItem("token"))    
                }
                
                fetch('http://localhost:8080/api/user/refresh', {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Bearer" +" "+ obj.token,
                    }
                })
                 .then(response => response.json()) 
                .then( result =>{ 

                    this.$store.state.pseudo = result[0].pseudo
                    this.$store.state.photoProfil = result[0].photo
                    this.$store.state.idUser = result[0].idUser
                    this.$store.state.email = result[0].email
                    this.$store.state.isAdmin = result[0].isAdmin

                    this.email = result[0].email
                    this.pseudo = result[0].pseudo
                });
            }
        },
        tryConnection(){
             const token = localStorage.getItem("token")
                    if (token){
                        this.allowed = true
                    }
        },
       
    },
    mounted(){
        this.refresh()
        this.tryConnection()
    }
}
</script>

<style scoped>
  
    h3{
        font-size: 2rem;
        margin: 20px auto;
    }
    .parametre{
        
        padding: 20px;
        padding-top: 80px;
        color: white;
        background: linear-gradient(288deg, rgba(85, 85, 87, 0.945) 50%, rgba(137, 138, 139, 0.822) 100%),url("../assets/poing.jpg");
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        min-height: 100vh;
        text-align: center;
    }
    .colInput{
        display: flex;
        flex-flow: column ;
        text-align: left;
        margin: 20px auto;
    }
    input{
        width: 80%;
        padding: 10px;
        border-radius: 10px;
    }
    .renduImage{
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 100px;
        margin: 20px auto 0 auto;
        border-radius: 50%;
    }
    .boxButton{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
    .button{
        font-size: 1.2rem;
        width: 120px;
        padding: 10px 10px;
        background: rgba(24, 168, 36, 0.658);
        color: white;
        border-radius: 10px;
        margin: 20px 0;
        cursor: pointer;
    }
    .button:hover{
        transform: scale(1.1);
    }
    .supprimer{
        background: rgb(196, 83, 83);
        width: 100%;
        margin-top: 20px;
        font-size: 1.3rem;
        color: white;
        padding: 20px 0;
        cursor: pointer;
    }
      .supprimer:hover{
        transform: scale(1.02);
    }
    .photoProfil{
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .modifPassword{
        color: rgb(182, 45, 45);
        text-align: left;
        margin-left: 30px;
        text-decoration: underline;
        font-size: 1.2rem;
        cursor: pointer;
        font-weight: bold;
    }
    .password{
        font-size: 0.8rem;
    }
    .confirmDeleteAccount{
        position: fixed;
        left: 50%;
        top: 80px;
        width: 70%;
        transform: translateX(-50%);
        padding: 50px 30px ;
        background:rgb(47, 47, 47);
        box-shadow: 0 0 5000px 200px white;
        border-radius: 10px;
        border: solid 3px rgb(179, 43, 43);
        font-size: 1.2rem;
    }
    .danger{
        background: red;
    }
    #fileUser{
        display: none;
    }
    .labelChangeFile{
        display: inline-block;
        cursor: pointer;
        border-radius: 10px;
        color: white;
        font-size: 1rem;
        margin-bottom: 20px;
        text-decoration: underline;
    }
    label{
        font-size: 1.2rem;
    }
    .titlePhotoProfil{
        text-align: left;
        margin-top: 20px;
    }
    .confirmBoxUpdateUser{
        position: fixed;
        top: 61px;
        left: 50%;
        width: 80%;
        max-width: 500px;
        transform: translateX(-50%);
        font-size: 1rem;
        padding: 50px 20px;
        color: white; 
        background: black;
        border-radius: 0 0 10px 10px;
        box-shadow: 0 0 5px 5px white;
    }
    .title{
        padding: 20px 0 0 0 ;
        font-size: 1.2rem;
        color: rgba(196, 96, 96);
        font-weight: bold;
    }
    .information{
        padding: 30px;
    }
    .hr{
        width: 50%;
        margin: 40px auto;   
    }
    .errorPassword{
        color: red;
    }
    .boxPassword1{
        width: 80%;
        position: relative
    }
    #newPassword{
        width: 100%;
    }
    #ConfirmPassword{
        width: 100%;
    }
    .eye{
        position : absolute;
        top : 10px;
        width: 20px;
        opacity: 50%;
        cursor: pointer;
    }
    .erreur{
        color: red;
    }
  
</style>