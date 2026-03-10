function OrderSuccess({ orderId, onBackToShop }) {
  return (
    <div className="success-shell">
      <div className="success-card">
        <p className="section-kicker">Pedido concluído</p>
        <h2>Compra realizada com sucesso</h2>
        <p className="success-text">Seu número de pedido é</p>
        <strong>#{orderId}</strong>
        <p className="success-text">
          Guarde esse identificador para consultar o pedido pelo endpoint do backend.
        </p>

        <button className="primary-button" onClick={onBackToShop}>
          Voltar para a loja
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess