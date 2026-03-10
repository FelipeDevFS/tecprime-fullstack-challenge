# 🛒 Mini Shop – Desafio Técnico Tecprime

Este projeto foi desenvolvido como solução para o **Desafio Técnico de Desenvolvedor Full Stack da Tecprime**.

A aplicação consiste em um **mini sistema de compras online**, contendo integração com API externa de produtos, gerenciamento de carrinho no frontend e criação de pedidos persistidos em banco relacional.

O objetivo foi demonstrar organização de código, integração entre sistemas, clareza arquitetural e boas decisões técnicas.

---

# 🛠️ Tecnologias utilizadas

## Backend

- **Node.js**
- **Express**
- **Axios** (integração com API externa)
- **PostgreSQL**
- **pg** (driver do PostgreSQL)
- **dotenv**
- **cors**

## Frontend

- **React**
- **Vite**
- **Axios**

---

# 📂 Estrutura do projeto

```
tecprime-fullstack-challenge/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── database/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

A aplicação foi organizada separando claramente **backend e frontend**, permitindo execução independente de cada parte.

---

# 🚀 Como executar o projeto

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd tecprime-fullstack-challenge
```

---

# ⚙️ Executando o Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

## Criar arquivo `.env`

Utilize o arquivo `.env.example` como base.

```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tecprime_shop
DB_PASSWORD=sua_senha_aqui
DB_PORT=5432
```

---

# 🗄️ Banco de Dados (PostgreSQL)

Crie o banco de dados:

```sql
CREATE DATABASE tecprime_shop;
```

Crie as tabelas:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  forma_pagamento VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);
```

---

## Iniciar o servidor

```bash
npm run dev
```

Backend disponível em:

```
http://localhost:3000
```

---

# 💻 Executando o Frontend

Acesse a pasta do frontend:

```bash
cd ../frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Frontend disponível em:

```
http://localhost:5173
```

---

# 🔌 Endpoints da API

## Listar produtos

```
GET /products
```

Consome a API pública **DummyJSON** e normaliza os dados retornando apenas os campos necessários para o frontend.

---

## Criar pedido

```
POST /orders
```

Payload esperado:

```json
{
  "nome": "Cliente",
  "email": "cliente@email.com",
  "endereco": "Rua Exemplo",
  "formaPagamento": "PIX",
  "produtos": [{ "id": 1, "quantidade": 2 }]
}
```

---

## Consultar pedido

```
GET /orders/:id
```

Retorna os dados do pedido juntamente com seus itens associados.

---

# 🧠 Principais decisões técnicas

### Separação em camadas no backend

O backend foi organizado em **Routes, Controllers e Services**, promovendo melhor separação de responsabilidades e facilitando manutenção e escalabilidade.

### Backend como BFF (Backend for Frontend)

O backend atua como uma camada intermediária entre o frontend e a API pública **DummyJSON**, normalizando os dados retornados e protegendo o frontend de possíveis mudanças na API externa.

### Modelagem relacional

Foi utilizada uma modelagem **1:N entre orders e order_items**, permitindo que um pedido possua múltiplos produtos associados.

### Transações no banco de dados

O cadastro de pedidos utiliza **transações SQL**, garantindo consistência entre a inserção na tabela de pedidos e a inserção dos itens do pedido.

### Componentização no React

O frontend foi desenvolvido utilizando **componentes reutilizáveis**, separando responsabilidades entre exibição de produtos, carrinho e fluxo de compra.

---

# 📈 Melhorias futuras

Caso houvesse mais tempo para evolução do projeto, algumas melhorias importantes seriam:

- Implementação de **testes automatizados** (Jest / Cypress)
- **Containerização com Docker**
- Implementação de **autenticação com JWT**
- Implementação de **paginação e filtros** na listagem de produtos

---

# 📄 Considerações finais

Este projeto foi desenvolvido com foco em **organização de código, clareza arquitetural e boas práticas de desenvolvimento full stack**.

A aplicação demonstra integração entre frontend e backend, consumo de API externa, persistência de dados em banco relacional e estrutura modular para evolução futura.

Desenvolvido por **Felipe Oliveira Carvalho**.
