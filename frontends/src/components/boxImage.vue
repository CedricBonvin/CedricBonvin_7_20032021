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
             date :""
        }
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
            let Pseudo = JSON.parse(localStorage.getItem("pseudo"))
            let Image = document.getElementById("files").files[0]
            let mess = document.getElementById("message").value

            console.log("image : "+Image)

            this.getDate()
           
            let formdata = new FormData()
            formdata.append('pseudoUser' , Pseudo)
            formdata.append('date' , this.date)     
            formdata.append('message' , mess)     
            formdata.append('image' , Image)     


            

 
            
           fetch('http://localhost:8080/api/message', {
            method: "POST",
            body: formdata,
           // headers: {"Content-type": "multipart/form-data",}
            })
            .then(response => response.json()) 
            .then( (res) =>{ console.log(res)
               // console.log("l'utilisateur à bien été crée'...! ") 
              //  console.log("le nom du fichier est :" + this.ImageUser)
              //  localStorage.setItem("pseudo",JSON.stringify(response.pseudo))
              //  localStorage.setItem("photoUrl",JSON.stringify(response.photo))

              //  this.$router.push('/mur#/') 
              this.affiche = false       
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
        bottom: 150px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.966);
        width: 80%;
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
        flex-flow: row wrap;
        justify-content: space-evenly;
        width: 100%;
    }
    button{
        padding: 10px 30px;
        font-size: 1.3rem;
        background: red;
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

</style>