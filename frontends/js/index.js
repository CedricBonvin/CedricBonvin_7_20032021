
let test = document.querySelector("#afficheMessage")

test.addEventListener("click",function(){
    console.log("j'ai appuyé")

    fetch("http://localhost:8080/api/message").then(response => response.json()).then(result =>{
        console.log(result);
        for (let i in result){
            displayMessages(result[i])
        }
    })
})

function displayMessages(response){

        let recup = document.querySelector("#test")
        
        let card =  document.createElement("div");
        card.style.border = "1px solid black";
        card.style.margin = "20px 20px 0 0";
        card.style.padding = "20px"

        let nom = document.createElement("div")
        nom.innerHTML= response.nom
        card.appendChild(nom)

        let mess = document.createElement("div")
        mess.innerHTML = response.message
        card.appendChild(mess)

        recup.appendChild(card)
    
}