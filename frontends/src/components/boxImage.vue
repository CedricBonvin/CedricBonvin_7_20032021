<template>
    <div class="wrapper">
        <h4>Postez votre image :</h4>
        <div id="sampleImage">
            <label for="files"><img class="iconeImage" src="../assets/iconeImage.svg" alt=""></label>
            <input @change="fileFunc()" type="file" id="files" name="file">
        </div>
        <div class="boxMessage">
            <label class="labelMessage" for="message">Ajouter une légende !</label>
            <input type="text-area"  id="message">
        </div>
        <p class="erreur" v-if="erreur">{{ erreur }}</p>
        <div class="boxbutton">
            <button @click="afficheBox()">Annuler</button>
            <button @click="postImage()">Poster</button> 
        </div>
    </div>
</template>

<script>
export default {
    name : "boxImage",
    data(){
        return{
             date :"",
             objetMessage : {
                 pseudoUser : "",
                 Message : "",
                 image : "",
                 photo : ""
             },
             erreur : ""
        }
    },
    props : {
        newcard : Function
    },
    
    methods : {
        afficheBox(){
            this.$emit("event",{ affiche: false} )
        },
        fileFunc(){
            const input = document.getElementById("files")
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

                const miniature = document.getElementById("sampleImage")
                miniature.append(img)
            }
            reader.readAsDataURL(input.files[0]) 
        },
        postImage(){          
            let Pseudo = this.$store.state.pseudo

            let Image = document.getElementById("files").files[0]
            let mess = document.getElementById("message").value
            let photoProfil = this.$store.state.photoProfil
            let idUSERS = this.$store.state.idUser
            const token = JSON.parse(localStorage.getItem("token"))

            this.getDate()
           
            let formdata = new FormData()
            formdata.append('pseudoUser' , Pseudo)
            formdata.append('date' , this.date)     
            formdata.append('message' , mess)     
            formdata.append('image' , Image)     
            formdata.append('idUSERS' , idUSERS)     
            formdata.append('photoProfil' , photoProfil)     
            formdata.append('token' , token)     
     
           fetch('http://localhost:8080/api/message/image', {
            method: "POST",
            body: formdata,
            headers: {Authorization: "Bearer" +" "+ token,}
            })
            .then(response => response.json()) 
            .then( response =>{
                if (response.erreur){
                    this.erreur = response.erreur
                }else{
                    this.afficheBox()
                    this.newcard() // appelle de recupApi() depuis mur.vue
                }
            });    
        }, 
         getDate ()  {
              
            const now = new Date();
            var options = { month: 'long'};
            this.date =  now.getDate() + " "
                    + new Intl.DateTimeFormat('fr-FR', options).format() + ": "
                    + now.getHours() + "h : " 
                    + now.getMinutes(12) + "min ";
        },
    }
}
</script>

<style scoped>

    .wrapper{
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background:  rgba(10, 34, 66, 0.959);
        width: 80%;
        max-width: 500px;
        margin: auto;
        color: white;
        font-size: 1.3rem;
        padding: 10px;
        border-radius: 20px;
    }
    #sampleImage{
        position: relative;

        width: 150px;
        height: 150px;
        margin: 30px auto;
        background: gray;
        padding: 20px
    }
    #files{
        display: none;
    }
    .iconeImage{
        cursor: pointer;
    }
    .boxbutton{
        display: flex;
        flex-flow: row;
        justify-content: space-evenly;
        width: 100%;
    }
    button{
        padding: 10px 30px;
        font-size: 1rem;
        background:  rgba(196, 96, 96);
        border-radius: 20px;
        margin: 20px;
        color: white;
    }
    .boxMessage{
        display: flex;
        flex-flow: column;
    }
    #message{
        padding: 10px;
        width: 80%;
        margin:20px  auto;
        border-radius: 90px;
    }
    .erreur{
        font-size: 0.9rem;
    }

</style>