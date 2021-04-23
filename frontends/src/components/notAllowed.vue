<template>
     <div class="notAllowed">
            <p>Veuillez-vous connecter !</p>
            <button @click="goConnection()" class="buttonConnect">Connectez-vous</button>
        </div>
</template>

<script>
export default {
    name : "notAllowed",
    methods : {
        goConnection(){
            this.$router.push("/")
        }

    }
}
</script>

<style scoped>
.notAllowed{
    position : absolute;
    top : 40%;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    padding: 30px 0 0 0 ;
    width: 90%;
    text-align: center;
    border: solid rgb(107, 106, 106) 5px;
    background: rgb(230, 229, 229);
    border-radius: 20px;
    font-size: 1.3rem;
    font-weight: bold;
    box-shadow: 0 0 15px 5px rgb(129, 128, 128); 
    color: rgb(68, 67, 67);      
} 
.buttonConnect{
    border: none;
    width: 100%;
    padding: 20px 0;
    background: green;
    color: rgb(246, 255, 247);
    font-size: 1.5rem;
    margin-top: 30px;
    cursor: pointer;
}
.buttonConnect:hover{
    background: rgba(0, 128, 0, 0.849);
    font-size: 1.3em;
}
</style>