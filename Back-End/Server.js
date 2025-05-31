const  express = require('express');//O nome da biblioteca

const app = express() //Utilizando os módulos do express. Ele executará as Rotas do outro arquivo

const form = require('../Front-End/Formulario/script.js') //Importando o módulo do arquivo Rotas
      
   
app.use("/" /*Especificando o nome da rota utilizada*/, form) //Utilizando a Rota principal do arquivo Rotas
                          
 
app.listen(3000, () => {   
    console.log("Começando projeto: Rota 3000.") 
                 
})           
 