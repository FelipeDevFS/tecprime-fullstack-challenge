function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.imagem} alt={product.nome} className="product-image" />
      </div>

      <div className="product-info">
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>

        <div className="product-footer">
          <div className="product-details">
            <span>
              {Number(product.preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
            <span>Estoque: {product.estoque}</span>
          </div>

          <button
            className="add-cart-button"
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard