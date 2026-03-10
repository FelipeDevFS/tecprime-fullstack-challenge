# Tecprime Fullstack Challenge

Mini sistema de compras online desenvolvido como solução para o desafio técnico da Tecprime Soluções.

## Visão geral

A aplicação foi construída com:

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Banco de dados:** PostgreSQL
- **Integração externa:** DummyJSON API

O sistema permite:

- listar produtos consumidos de uma API pública
- adicionar produtos ao carrinho
- finalizar um pedido
- salvar pedido e itens em banco relacional
- consultar um pedido pelo ID

---

## Funcionalidades

### Backend

- `GET /products`
  - consome a API pública DummyJSON
  - normaliza os dados
  - retorna apenas os campos necessários para o sistema

- `POST /orders`
  - recebe os dados do cliente e os itens do carrinho
  - valida os dados enviados
  - salva pedido e itens no banco de dados
  - utiliza transação para garantir consistência

- `GET /orders/:id`
  - consulta um pedido salvo no banco
  - retorna os dados do pedido e seus itens

### Frontend

- listagem de produtos
- carrinho em memória
- ajuste de quantidade
- remoção de itens
- checkout com formulário
- confirmação de pedido

---

## Estrutura do projeto

```bash
tecprime-fullstack-challenge/
  backend/
    src/
      controllers/
      database/
      routes/
      services/
      app.js
      server.js
    .env.example
    package.json

  frontend/
    src/
      components/
      services/
      App.jsx
      main.jsx
      index.css
    package.json

  README.md
```
