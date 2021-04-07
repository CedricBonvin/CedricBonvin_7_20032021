<template>
    <div class="parametre">
        <h3>paramètres du compte</h3>
        <div class="colInput">
            <label for="email">email :</label>
            <input  type="email" id="email" name="email" :value="this.email">
        </div>
        <div class="colInput">
            <label for="password">password :</label>
            <input type="password" id="password" name="password" :value="this.password">
            <p class="modifPassword">modifier votre password</p>
        </div>
        <div class="colInput">
            <label for="pseudo">pseudo :</label>
            <input type="pseudo" id="pseudo" name="pseudo" :value="this.pseudo">
        </div>

        <!-- PHOTO DE PROFIL -->
        <p class="titlePhotoProfil">Photo de profil : </p>
        <div>
            <div class="renduImage" id="renduImages">
                <img class="photoProfil" :src="this.userPhoto" alt="photo de profil">
                <input @change="fileFunc()"  type="file" id="fileUser" name="fileUser">
            </div>
                <label class="labelChangeFile" for="fileUser">Modifier la photo de profil</label>
        </div>

        <!--BUTTON -->
        <div class="boxButton">
            <button @click="afficheConfirmUpdate(), userUpdate()"  class="button ">mettre à jour</button>
            <button @click="afficheBox()" class="button">Annuler</button>
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
            </div>
            <p>Veuillez vous reconnecter..</p>
            <button @click="afficheBox(), goConnection()"  class="button">ok</button>
        </div>
    </div>
</template>

<script>
export default {
    name : "parametre",
    data(){
        return{
            pseudo : JSON.parse(localStorage.getItem("pseudo")),
            password : "*********",
            email : JSON.parse(localStorage.getItem("email")),
            userPhoto : JSON.parse(localStorage.getItem("photoUrl")),

            afficheConfirmation : false,
            confirmUpdate : false

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
                localStorage.removeItem("email")
                localStorage.removeItem("pseudo")
                localStorage.removeItem("photoUrl")
                localStorage.removeItem("idUser")
                localStorage.removeItem("token")
                this.$router.push('/')
            })
        },
        afficheConfirm(){
            this.afficheConfirmation ? this.afficheConfirmation = false : this.afficheConfirmation = true
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
            const oldMail = JSON.parse(localStorage.getItem("email"))
            const oldPseudo = JSON.parse(localStorage.getItem("pseudo"))
            const fileUser = document.getElementById("fileUser").files[0]
            const oldPhotoUser = JSON.parse(localStorage.getItem("photoUrl"))
           const token = JSON.parse(localStorage.getItem("token"))

            const formdata = new FormData()
                formdata.append("email", email)
                formdata.append("pseudo", pseudo)
                formdata.append("image", fileUser)
                formdata.append("oldMail", oldMail)
                formdata.append("oldPseudo", oldPseudo)
                formdata.append("oldPhotoUser", oldPhotoUser)
                formdata.append("token", token)

            fetch('http://localhost:8080/api/user/update', {
            method: "POST",
            body: formdata,
              headers: {
                        Authorization: "Bearer" +" "+ token,
                        }
            })
            .then(response => response.json()) 
            .then (res => {   
                this.email = res.email
                this.pseudo = res.pseudo

            })       
        },
        afficheConfirmUpdate(){
            this.confirmUpdate ? this.confirmUpdate = false : this.confirmUpdate = true
        },
        goConnection(){
            this.$router.push('/')
            this.afficheBox()

            localStorage.removeItem("pseudo")
            localStorage.removeItem("photoUrl")
            localStorage.removeItem("idUser")
            localStorage.removeItem("email")
            localStorage.removeItem("token")
        }


    }
}
</script>

<style scoped>
  
    h3{
        font-size: 1.7rem;
        margin: 20px auto;
    }
    .parametre{
        position: absolute;
        z-index: 10;
        top : 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        padding: 20px;
        color: white;
        border-radius: 10px;
        background: rgb(37, 37, 37);
        text-align: center;
    }
    .colInput{
        display: flex;
        flex-flow: column ;
        text-align: left;
        margin: 20px auto;
    }
    input{
        margin: 10px 0;
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
        background: rgb(24, 168, 36);
        color: white;
        border-radius: 10px;
        margin: 20px 0;
        cursor: pointer;
    }
    .supprimer{
        background: red;
        width: 100%;
        margin-top: 20px;
        font-size: 1.3rem;
        color: white;
        padding: 20px 0;
        cursor: pointer;
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
        color: red;
        text-align: right;
        text-decoration: underline;
        font-size: 1rem;
    }
    .confirmDeleteAccount{
        position: fixed;
        left: 50%;
        top: 350px;
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
    .titlePhotoProfil{
        text-align: left;
    }
    .confirmBoxUpdateUser{
        position: absolute;
        top: 200px;
        left: 50%;
        width: 80%;
        transform: translateX(-50%);
        font-size: 1rem;
        padding: 50px 20px;
        color: white; 
        background: black;
        border-radius: 10px;
        box-shadow: 0 0 200px 100px white;
    }
    .title{
        padding: 20px 0 0 0 ;
        font-size: 1.2rem;
        color: green;
        font-weight: bold;
    }
    .information{
        padding: 30px;
    }
</style>