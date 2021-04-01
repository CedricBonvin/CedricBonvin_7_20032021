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
        <div>
            <p>modifier la photo de profil : </p>
            <div class="renduImage">
                <img class="photoProfil" :src="this.userPhoto" alt="photo de profil">
            </div>
        </div>
        <div class="boxButton">
            <button class="button">mettre à jour</button>
            <button @click="afficheBox()" class="button">Annuler</button>
        </div>
        <button class="supprimer">Supprimer votre compte</button>
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
            userPhoto : JSON.parse(localStorage.getItem("photoUrl"))
        }
    },
    methods : {
        afficheBox(){
            this.$emit("closeParametre", { paramClose : false})
        },
        // putInput(){
        //     this. = document.getElementById("email").value
        //     // recupEmail.innerHtml(this.email)

        // }
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
        top : 100px;
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
        margin: 20px auto;
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
    }
    .supprimer{
        background: red;
        width: 100%;
        margin-top: 20px;
        font-size: 1.3rem;
        color: white;
        padding: 10px 0;
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
</style>