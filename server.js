const JWT = require('json-web-token')
const server = require('express')
const app = server()

//middleware para pegar os dados no corpo da requisição (POST)
app.use(server.json())

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

app.listen(8999, () => console.log('Servidor aberto na porta 8999'))