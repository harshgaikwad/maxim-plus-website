import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuoteCart } from '../context/QuoteCartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isDrawerOpen, closeDrawer } = useQuoteCart()
  const navigate = useNavigate()

  if (!isDrawerOpen) return null

  const handleCheckout = () => {
    closeDrawer()
    navigate('/quote-request')
  }

  return (
    <div className="cart-drawer-overlay" onClick={closeDrawer}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2>Your Quote Request</h2>
          <button className="cart-drawer__close" onClick={closeDrawer}>✕</button>
        </div>

        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🛒</span>
              <p>Your quote cart is empty.</p>
              <button className="btn btn--primary btn--sm" onClick={closeDrawer}>
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__img-wrapper">
                    <img 
                      src={`/products/prod_${item.id.replace('-', '_')}.webp`} 
                      alt={item.name} 
                      onError={(e) => e.target.src = '/products/prod_fs_02.webp'} // Fallback
                    />
                  </div>
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <span className="cart-item__cat">{item.category}</span>
                    <div className="cart-item__controls">
                      <div className="cart-item__qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <button className="btn btn--primary cart-drawer__checkout" onClick={handleCheckout}>
              Proceed to Request ({cart.length} items)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
