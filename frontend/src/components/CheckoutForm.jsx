import { useState } from 'react'
import api from '../services/api'

function CheckoutForm({ cartItems, onOrderSuccess }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [formaPagamento, setFormaPagamento] = useState('PIX')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert('Carrinho vazio')
      return
    }

    setLoading(true)

    try {
      const payload = {
        nome,
        email,
        endereco,
        formaPagamento,
        produtos: cartItems.map((item) => ({
          id: item.id,
          quantidade: item.quantidade
        }))
      }

      const response = await api.post('/orders', payload)

      onOrderSuccess(response.data.orderId)

    } catch (error) {
      console.error(error)
      alert('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />

        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value="PIX">PIX</option>
          <option value="CARTAO">Cartão</option>
          <option value="BOLETO">Boleto</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Finalizar Pedido'}
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm