import { useEffect, useState } from 'react'
import api from './services/api'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
import OrderSuccess from './components/OrderSuccess'
import './index.css'

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products')
        setProducts(response.data)
      } catch (err) {
        setError('Erro ao carregar produtos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  function handleAddToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, quantidade: 1 }]
    })
  }

  function handleRemoveFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    )
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    )
  }

  function handleCheckoutOpen() {
    if (cartItems.length === 0) {
      alert('Carrinho vazio')
      return
    }

    setCheckoutOpen(true)
  }

  function handleBackToCart() {
    setCheckoutOpen(false)
  }

  function handleOrderSuccess(id) {
    setOrderId(id)
    setCartItems([])
    setCheckoutOpen(false)
  }

  function handleBackToShop() {
    setOrderId(null)
  }

  if (orderId) {
    return (
      <OrderSuccess
        orderId={orderId}
        onBackToShop={handleBackToShop}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Tecprime Challenge</p>
          <h1>Mini Shop</h1>
          <p className="subtitle">
            Catálogo, carrinho em memória e checkout integrado ao backend.
          </p>
        </div>

        <div className="topbar-badge">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} no carrinho
        </div>
      </header>

      <div className="layout">
        <main className="catalog-panel">
          {loading && <p className="feedback">Carregando produtos...</p>}
          {error && <p className="feedback feedback-error">{error}</p>}

          {!loading && !error && (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </main>

        <aside className="sidebar">
          {!checkoutOpen ? (
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onCheckout={handleCheckoutOpen}
            />
          ) : (
            <CheckoutForm
              cartItems={cartItems}
              onBackToCart={handleBackToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onOrderSuccess={handleOrderSuccess}
            />
          )}
        </aside>
      </div>
    </div>
  )
}

export default App