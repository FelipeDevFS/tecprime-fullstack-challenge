const axios = require('axios')
const pool = require('../database/connection')

function validateOrderData(orderData) {
  const { nome, email, endereco, formaPagamento, produtos } = orderData

  if (!nome || !email || !endereco || !formaPagamento || !produtos) {
    throw new Error('Missing required order fields')
  }

  const paymentMethods = ['PIX', 'CARTAO', 'BOLETO']

  if (!paymentMethods.includes(formaPagamento)) {
    throw new Error('Invalid payment method')
  }

  if (!Array.isArray(produtos) || produtos.length === 0) {
    throw new Error('Products list is required')
  }

  for (const produto of produtos) {
    if (!produto.id || !produto.quantidade || produto.quantidade <= 0) {
      throw new Error('Invalid product item')
    }
  }
}

async function getExternalProducts() {
  const response = await axios.get('https://dummyjson.com/products')
  return response.data.products
}

async function createOrder(orderData) {
  validateOrderData(orderData)

  const { nome, email, endereco, formaPagamento, produtos } = orderData

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const orderResult = await client.query(
      `
      INSERT INTO orders (nome, email, endereco, forma_pagamento)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [nome, email, endereco, formaPagamento]
    )

    const orderId = orderResult.rows[0].id

    const externalProducts = await getExternalProducts()

    for (const item of produtos) {
      const productData = externalProducts.find(
        (product) => product.id === item.id
      )

      if (!productData) {
        throw new Error(`Product with id ${item.id} not found`)
      }

      await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [orderId, item.id, item.quantidade, productData.price]
      )
    }

    await client.query('COMMIT')

    return orderId
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function getOrderById(id) {
  return null
}

module.exports = {
  createOrder,
  getOrderById
}