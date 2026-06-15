import React from 'react'
import { useQuoteCart } from '../context/QuoteCartContext'
import './FloatingCart.css'

export default function FloatingCart() {
  const { cart, openDrawer } = useQuoteCart()

  if (cart.length === 0) return null

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button className="floating-cart" onClick={openDrawer} aria-label="View Quote Cart">
      <span className="floating-cart__icon">📋</span>
      <span className="floating-cart__badge">{totalItems}</span>
    </button>
  )
}
