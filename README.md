# README - API TypeScript Express

Este README fornece uma visão geral da API TypeScript Express que gerencia contas de usuários e suas tecnologias associadas. A API permite aos usuários criar contas, adicionar, atualizar, marcar como estudadas e excluir tecnologias, bem como recuperar uma lista de tecnologias associadas a um usuário específico.

## Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Primeiros Passos](#primeiros-passos)
3. [Endpoints da API](#endpoints-da-api)
4. [Middleware](#middleware)
5. [Exemplos de Uso](#exemplos-de-uso)
6. [Contribuições](#contribuições)

## Pré-requisitos

Antes de executar a API TypeScript Express, você deve ter o seguinte software e ferramentas instalados:

- Node.js: Você pode baixar e instalar o Node.js em [nodejs.org](https://nodejs.org/).

## Primeiros Passos

1. Clone o repositório para o seu computador local:

   ```bash
   git clone <URL-do-repositório>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd <diretório-do-projeto>
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

Por padrão, a API será executada na porta 3000. Você pode alterar a porta modificando a constante `PORT` no código.

## Endpoints da API

A API fornece os seguintes endpoints:

- **POST /users**: Crie uma nova conta de usuário.
- **GET /technologies**: Recupere uma lista de tecnologias associadas a um usuário.
- **POST /technologies**: Adicione uma nova tecnologia à conta de um usuário.
- **PUT /technologies/:id**: Atualize o título e a data limite de uma tecnologia.
- **PATCH /technologies/:id/studied**: Marque uma tecnologia como estudada.
- **DELETE /technologies/:id**: Exclua uma tecnologia.

## Middleware

A API inclui uma função de middleware `checkExistsUserAccount` que verifica se um usuário existe com base no nome de usuário. Esse middleware é usado para garantir que as solicitações que requerem uma conta de usuário (por exemplo, recuperar, atualizar ou excluir tecnologias) estejam associadas a um usuário existente.

## Exemplos de Uso

### Criar um Usuário (POST /users)

```http
POST /users
Content-Type: application/json

{
  "name": "João da Silva",
  "username": "joaodasilva"
}
```

### Recuperar Tecnologias do Usuário (GET /technologies)

```http
GET /technologies
Content-Type: application/json
Username: joaodasilva
```

### Adicionar uma Tecnologia (POST /technologies)

```http
POST /technologies
Content-Type: application/json
Username: joaodasilva

{
  "title": "Nova Tecnologia",
  "deadline": "2023-12-31"
}
```

### Atualizar uma Tecnologia (PUT /technologies/:id)

```http
PUT /technologies/1
Content-Type: application/json
Username: joaodasilva

{
  "title": "Tecnologia Atualizada",
  "deadline": "2023-11-30"
}
```

### Marcar uma Tecnologia como Estudada (PATCH /technologies/:id/studied)

```http
PATCH /technologies/1/studied
Content-Type: application/json
Username: joaodasilva
```

### Excluir uma Tecnologia (DELETE /technologies/:id)

```http
DELETE /technologies/1
Content-Type: application/json
Username: joaodasilva
```

## Contribuições

Se você deseja contribuir para este projeto, sinta-se à vontade para enviar uma solicitação de pull ou abrir um problema para sugerir melhorias ou relatar bugs. Suas contribuições são bem-vindas!
