const JWT = require('jsonwebtoken')
const server = require('express')
const app = server()

//middleware de proteção
const middlewareProtect = require('./middleware')

//dotenv para carregar as variáveis de ambiente
require('dotenv').config()

//middleware para pegar os dados no corpo da requisição (POST)
app.use(server.json())

//variavel de ambiente usada para assinar o token
const jwt_secret = process.env.JWT_SECRET

//array onde irá conter os registros dos usúarios
const usuarios = []

//rota de registro
app.post('/registro', (req, res) => {
 try {
    //desestruturando os dados que vem no corpo da requisição
  const {nome, senha} = req.body

    //verifica se os dados estão completos
  if(!nome || !senha) {
    return res.status(404).json({error: 'Dados fornecidos incompletos'})
  }

    //verifica se o usúario existe se sim manda um erro
  const usuarioExiste = usuarios.find((usuario) => usuario.nome == nome)
  if(usuarioExiste) {
    return res.status(409).json({error: 'Usúario existe'})
  }
 
    //cria um objeto para ser adicionado na array usuarios
  const novoUsuario = {
    nome: nome,
    senha: senha
  }

  usuarios.push(novoUsuario)
  
    //se tudo ocorrer bem sem error o usúario é criado com sucesso
  res.status(201).json({
    message: 'Usúario criado com sucesso',
    usuario: {
        nome: novoUsuario.nome
    }
  })
  console.log(`Usúario ${nome} foi adicionado`)  
 } catch (error) {
    console.log(error.message || 'Erro inesperado do servidor')
    res.status(500).json({error: error.message})
 }
})

app.post('/login', (req,res) => {
    try {

        //desestruturando nome e senha do corpo da requisição
        const {nome, senha} = req.body
        if(!nome || !senha) {
            return res.status(400).json({error: 'Dados fornecidos incompletos'})
        }

        //verfica se o usúario existe ceso não mandara um erro
        const usuarioExiste = usuarios.find((usuario) => usuario.nome == nome && usuario.senha == senha)
        if(!usuarioExiste) {
            return res.status(401).json({error: 'Usúario não encontrado'})
        }

        //criação do token
        const payload = {nome: nome}
        const token = JWT.sign(payload, jwt_secret, {expiresIn: '1h'})
        res.status(200).json({token: token})

        console.log(`Login do usúario ${nome} feito com sucesso`)
    } catch (error) {
        console.log(error.message || 'Erro interno do servidor')
        res.status(500).json({error: error.message})
    }
})

app.get('/protect', middlewareProtect, (req, res) => {
    //Irá imprimir no teminal as informações do usúario que o token armazena
    console.log(req.usuario)

    //caso entre na rota com sucesso irá mandar o nome do usúario e mais as informações dele junto com um status 200 (SUCESSO)
    res.status(200).json({
        message: `Óla ${req.usuario.nome}!`,
        usuario: req.usuario
    })
})

if(process.env.NODE_ENV !== 'test') {
  app.listen(8999, () => console.log('Servidor aberto na porta 8999'))
}