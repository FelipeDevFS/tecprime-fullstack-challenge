function OrderSuccess({ orderId, onBackToShop }) {
  return (
    <div className="order-success">
      <h2>Pedido realizado com sucesso 🎉</h2>

      <p>Seu número de pedido é:</p>

      <strong>#{orderId}</strong>

      <p>Guarde este número para consultar seu pedido.</p>

      <button className="back-button" onClick={onBackToShop}>
        Voltar para a loja
      </button>
    </div>
  )
}

export default OrderSuccess