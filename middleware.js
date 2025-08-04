const JWT = require('jsonwebtoken')
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

const protect = (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //extrair o token (Bearer TOKEN)
            token = req.headers.authorization.split(' ')[1]
            const decoded = JWT.verify(token, jwt_secret)

            //Colocar os dados do usúario na requisição
            req.usuario = decoded

            //continuar para a proxima função
            next()
        } catch (error) {
            console.log(error.message)
            return res.status(401).json({error: 'Token inválido ou expirado'})
        }
    } else {
        return res.status(401).json({error: 'Não autorizado, token não fornecido'})
    }
}

module.exports = protect