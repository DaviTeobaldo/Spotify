var elem_preloader = document.getElementById("preloader") //Pegando o elemento do documento - o elemento de loading
var elem_loader = document.getElementById("loader")
console.log("Feito o Download")

setTimeout(function(){
    elem_loader.classList.remove("loader") //Retira o elemento chamado "loader", ou seja, ele mesmo
    elem_preloader.classList.remove("preloader")
}, 1280)

