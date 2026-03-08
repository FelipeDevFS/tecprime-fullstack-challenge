function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.preco) * item.quantidade
  }, 0)

  return (
    <aside className="cart">
      <h2>Carrinho</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.nome}</h3>
                  <p>Qtd: {item.quantidade}</p>
                  <p>
                    {Number(item.preco).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>

                <button onClick={() => onRemoveFromCart(item.id)}>
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>
              Total:{' '}
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </strong>
          </div>
        </>
      )}
    </aside>
  )
}

export default Cart