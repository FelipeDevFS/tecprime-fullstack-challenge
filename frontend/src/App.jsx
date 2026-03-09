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

  function handleCheckoutOpen() {
    setCheckoutOpen(true)
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
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Mini Shop Tecprime</h1>
          <p>Listagem de produtos integrada com API externa</p>
        </div>
      </header>

      <div className="layout">
        <main className="products-section">
          {loading && <p>Carregando produtos...</p>}
          {error && <p>{error}</p>}

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>

        <div className="sidebar">
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckoutOpen}
          />

          {checkoutOpen && (
            <CheckoutForm
              cartItems={cartItems}
              onOrderSuccess={handleOrderSuccess}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App