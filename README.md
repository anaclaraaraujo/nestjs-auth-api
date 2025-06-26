# NestJS: Autenticação e Autorização JWT com Prisma e PostgreSQL

Este projeto é uma **API completa de autenticação e autorização** desenvolvida com **NestJS**, utilizando **JSON Web Tokens (JWT)** para segurança. Ele se integra ao **Prisma ORM** para gerenciar o banco de dados, configurado para **PostgreSQL**.

A implementação utiliza as bibliotecas `passport` (`passport-jwt` e `passport-local`) para um controle eficiente do fluxo de autenticação, protegendo rotas e garantindo que apenas usuários autorizados possam acessar recursos específicos.

---

## ⚙️ Como Utilizar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js**: Versão LTS recomendada.
- **npm** ou **Yarn**: Gerenciador de pacotes do Node.js.
- **Servidor PostgreSQL**: Este projeto foi projetado para usar PostgreSQL. Certifique-se de ter uma instância rodando (você pode usar Docker, por exemplo). Se preferir, é possível adaptar para MySQL.

### 📦 Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/anaclaraaraujo/nestjs-auth-api.git
    cd nestjs-auth-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure o arquivo `.env`:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente. Altere os valores conforme sua configuração:

    ```env
    # Configuração do JWT
    JWT_SECRET="SUA_CHAVE_SECRETA_MUITO_FORTE_AQUI"

    # Configuração do Banco de Dados PostgreSQL
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"

    # Exemplo de configuração local para PostgreSQL (usando Docker, por exemplo):
    # DATABASE_URL="postgresql://postgres:docker@localhost:5432/nestjs_auth?schema=public"

    # Se você optou por MySQL (altere também o schema.prisma):
    # DATABASE_URL="mysql://root@localhost:3306/nestjs_auth"
    ```

    **Importante:** Troque `"SUA_CHAVE_SECRETA_MUITO_FORTE_AQUI"` por uma string única e complexa para garantir a segurança dos seus tokens JWT.

4.  **Ajuste o `prisma/schema.prisma` (se necessário):**
    O arquivo `prisma/schema.prisma` define o esquema do banco de dados. Este projeto já vem configurado para PostgreSQL. Se você pretende usar MySQL, deverá alterar a propriedade `provider` de `postgresql` para `mysql`.

    **Para PostgreSQL (configuração padrão do projeto):**

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id       Int    @id @default(autoincrement())
      email    String @unique
      password String
      name     String
    }
    ```

5.  **Execute as migrações do Prisma:**
    Este comando criará as tabelas necessárias no seu banco de dados e gerará o cliente Prisma.

    ```bash
    npx prisma migrate dev --name init
    # ou
    yarn prisma migrate dev --name init
    ```

### 🚀 Iniciando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run start:dev
# ou
yarn start:dev
```

A API estará em execução e acessível em `http://localhost:3000`.

---

## 🧪 Testando os Endpoints da API

Você pode usar ferramentas como Insomnia, Postman ou a extensão Thunder Client do VS Code para interagir com a API.

### Criar Usuário

Este endpoint permite registrar um novo usuário no sistema.

- **Endpoint:** `/users`

- **Método:** `POST`

- **Headers:**
  - `Content-Type`: `application/json`

- **Corpo da Requisição (JSON):**

  ```json
  {
    "email": "usuario@example.com",
    "password": "Senha@Forte123",
    "name": "Nome do Usuário"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Nome do Usuário"
  }
  ```

### Fazer Login

Este endpoint é usado para autenticar um usuário e receber um token JWT.

- **Endpoint:** `/login`

- **Método:** `POST`

- **Headers:**
  - `Content-Type`: `application/json`

- **Corpo da Requisição (JSON):**

  ```json
  {
    "email": "usuario@example.com",
    "password": "Senha@Forte123"
  }
  ```

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9AZXhhbXBsZS5jb20iLCJzdWIiOjEsImlhdCI6MTY4ODQ2Mjg4MCwiZXhwIjoxNjg4NDY2NDgMH0.UmTokenJWTGeradoAqui"
  }
  ```

  **Importante:** Use o `accessToken` retornado em suas próximas requisições para acessar rotas protegidas. Adicione-o ao cabeçalho `Authorization` no formato `Bearer SEU_ACCESS_TOKEN_AQUI`.

---

## 🤝 Contribuição

Embora o projeto esteja completo, sugestões e melhorias são sempre bem-vindas. Sinta-se à vontade para abrir uma `issue` ou enviar um `pull request` se encontrar algum problema ou tiver ideias.
