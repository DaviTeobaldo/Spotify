
const express = require('express')

const path = require("path")

const prisma = require("../../Back-End/prisma.js")

const bodyParser = require("body-parser")

const form = express.Router()



form.use(bodyParser.json())
form.use(bodyParser.urlencoded({extended:false}))

//Para conseguir ter css e JS
    form.use(express.static(path.join(__dirname, "public")))

form.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html")
})

form.get('/form', function(req, res){
    res.sendFile(__dirname + "/form.html")
})


form.post('/receber', async function(req, res){

    console.log(
      'Recebido Nome usuário: ', req.body.nome, 
      " Senha: ", req.body.senha, 
      " Email : ", req.body.email
  );

  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.nome,
        password: req.body.senha
      },
    })
    console.log("Funcionou e registrado: " + user)

  } catch (error) {
    console.log(error);
  }
  res.redirect("/login")
});

form.get("/login",  function(req, res){
    res.sendFile(__dirname + "/entrar.html")
 

})

form.post("/entrada", async function(req, res){
    try{
    const user = await prisma.user.findMany({
        where: {
            OR: [
                // Condição 1: Email correto E senha correta
                {
                  email: req.body.nome_email,
                  AND: {
                    password: req.body.senha,
                  },
                },
                // Condição 2: Nome de usuário correto E senha correta
                {
                  username: req.body.nome_email,
                  AND: {
                    password: req.body.senha,
                  },
                },
              ],
          
        }

    })
    console.log(user)
    if (user.length !== 0) {
        res.redirect("/logado")
    }

    else if (user.length === 0){
      res.redirect("/error")
    }

} catch(error){
    console.log("Erro na vizualização:" + error)
} 


})

form.get('/logado', function(req, res){
  res.sendFile(__dirname + "/logado.html")
})

form.get("/error", function(req, res){
  res.sendFile(__dirname + "/erro.html")
})

// Fechar a conexão com o banco de dados
async function main() {
  await prisma.$disconnect();
}
main();


module.exports = form
