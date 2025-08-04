# jwt_api-auth

**API simples de autenticação usando JWT (JSON Web Tokens) com Node.js e Express.**

Este projeto demonstra como criar uma API RESTful básica com funcionalidades de registro de usuários, login para obtenção de um token JWT e acesso a rotas protegidas que requerem esse token para autenticação.

##  Funcionalidades

- **Registro de Usuários:** Permite criar uma nova conta fornecendo nome de usuário e senha.
- **Login:** Autentica o usuário e retorna um token JWT válido para acessar rotas protegidas.
- **Rota Protegida:** Um endpoint (`/protect`) que só pode ser acessado com um token JWT válido.

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **jsonwebtoken:** Para gerar e verificar tokens JWT.
- **dotenv:** Para carregar variáveis de ambiente de um arquivo `.env`.
    *   Nota: Este projeto utiliza `dotenv` para gerenciar a `JWT_SECRET`. O `dotenv` registra no console mensagens como `[dotenv@17.2.1] injecting env (1) from .env`. Para funcionalidades avançadas como observabilidade, versionamento e backup de variáveis de ambiente em tempo de execução, considere explorar ferramentas como o [Dotenvx Radar](https://dotenvx.com/radar).

##  Como Rodar

1.  **Clonar o repositório**
    ```bash
    git clone https://github.com/Machado-SI/jwt-api-auth.git
    cd jwt-api-auth
    ```

2.  **Instalar dependências**
    ```bash
    npm install
    ```

3.  **Configurar variáveis de ambiente**
    *   Crie um arquivo `.env` na raiz do projeto.
    *   Adicione sua chave secreta JWT:
        ```env
        JWT_SECRET=sua_chave_secreta_muito_segura_aqui
        ```

4.  **Iniciar o servidor**
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:8999`.

##  Rotas da API

### 1. POST `/registro`
**Objetivo:** Criar uma nova conta de usuário.

**Como usar:**
1.  Envie uma requisição `POST` para `/registro`.
2.  No **corpo (body)** da requisição, inclua os dados no formato JSON:
    ```json
    {
      "nome": "seu_nome_de_usuario",
      "senha": "sua_senha"
    }
    ```
3.  **Resposta (201 Created):** Confirmação da criação do usuário.

---

### 2. POST `/login`
**Objetivo:** Fazer login e obter um token de acesso (JWT).

**Como usar:**
1.  Envie uma requisição `POST` para `/login`.
2.  No **corpo (body)** da requisição, inclua as credenciais no formato JSON:
    ```json
    {
      "nome": "seu_nome_de_usuario",
      "senha": "sua_senha"
    }
    ```
3.  **Resposta (200 OK):** Um `token` JWT para acessar rotas protegidas.
    ```json
    {
      "token": "seu.token.jwt.aqui"
    }
    ```

---

### 3. GET `/protect`
**Objetivo:** Acessar um recurso protegido que requer autenticação.

**Como usar:**
1.  Obtenha um **token válido** via `/login`.
2.  Envie uma requisição `GET` para `/protect`.
3.  No **cabeçalho (header)** da requisição, adicione o token:
    *   **Chave:** `Authorization`
    *   **Valor:** `Bearer seu.token.jwt.aqui`
4.  **Resposta (200 OK):** Mensagem de boas-vindas personalizada.