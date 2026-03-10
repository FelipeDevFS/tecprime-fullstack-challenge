import { useState } from 'react'
import api from '../services/api'

function CheckoutForm({
  cartItems,
  onBackToCart,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onOrderSuccess
}) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [formaPagamento, setFormaPagamento] = useState('PIX')
  const [loading, setLoading] = useState(false)

  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade
  }, 0)

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
    <section className="side-card">
      <div className="side-card-header">
        <div>
          <p className="section-kicker">Finalização</p>
          <h2>Checkout</h2>
        </div>

        <button className="secondary-button" type="button" onClick={onBackToCart}>
            Editar carrinho
        </button>
      </div>

      <div className="checkout-summary">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <div className="checkout-item-main">
              <h3>{item.nome}</h3>
              <p>
                {Number(item.preco).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => onDecreaseQuantity(item.id)}
                >
                  -
                </button>

                <span>{item.quantidade}</span>

                <button
                  type="button"
                  onClick={() => onIncreaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="link-danger"
                onClick={() => onRemoveFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}

        <div className="summary-box">
          <div className="summary-row">
            <span>Total do pedido</span>
            <strong>
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </strong>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="field-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            placeholder="Rua, número, complemento"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="pagamento">Forma de pagamento</label>
          <select
            id="pagamento"
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
          >
            <option value="PIX">PIX</option>
            <option value="CARTAO">Cartão</option>
            <option value="BOLETO">Boleto</option>
          </select>
        </div>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Confirmar pedido'}
        </button>
      </form>
    </section>
  )
}

export default CheckoutForm