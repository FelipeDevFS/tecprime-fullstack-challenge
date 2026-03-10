function Cart({
  cartItems,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout
}) {
  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade
  }, 0)

  return (
    <section className="side-card">
      <div className="side-card-header">
        <div>
          <p className="section-kicker">Resumo</p>
          <h2>Carrinho</h2>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <p>Seu carrinho está vazio.</p>
          <span>Adicione produtos para continuar a compra.</span>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-main">
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
          </div>

          <div className="summary-box">
            <div className="summary-row">
              <span>Total</span>
              <strong>
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </strong>
            </div>
          </div>

          <button className="primary-button" onClick={onCheckout}>
            Ir para checkout
          </button>
        </>
      )}
    </section>
  )
}

export default Cart