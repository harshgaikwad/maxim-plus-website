import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuoteCart } from '../context/QuoteCartContext'
import SEO from '../components/SEO'
import './QuoteCheckout.css'

export default function QuoteCheckout() {
  const { cart, clearCart } = useQuoteCart()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    address: '',
    phone: '',
    location: '',
    dateRequired: ''
  })
  
  const [status, setStatus] = useState('idle')

  if (cart.length === 0 && status !== 'success') {
    return (
      <div className="checkout-empty">
        <h2>Your Quote Cart is Empty</h2>
        <p>Please add some products before requesting a quote.</p>
        <button className="btn btn--primary" onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Format the cart items for the email
    const cartSummary = cart.map(item => `${item.quantity}x ${item.name} (${item.category})`).join('\n')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c41a0dfb-85cf-4f5b-a791-ee92f47e46ba',
          subject: `New Bulk Quote Request from ${formData.company}`,
          from_name: formData.name,
          Name: formData.name,
          Company: formData.company,
          Phone: formData.phone,
          Address: formData.address,
          Location: formData.location,
          Date_Required: formData.dateRequired,
          Products_Requested: cartSummary,
        })
      })

      const json = await response.json()
      if (response.status === 200) {
        setStatus('success')
        clearCart()
      } else {
        console.error(json)
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="checkout-success">
        <div className="checkout-success__icon">✅</div>
        <h2>Quote Request Sent!</h2>
        <p>Thank you, {formData.name}. We have received your bulk quote request for {formData.company}.</p>
        <p>Our sales team will review your requirements and get back to you shortly with pricing and availability.</p>
        <button className="btn btn--primary" onClick={() => navigate('/')}>Return to Home</button>
      </div>
    )
  }

  return (
    <div className="quote-checkout">
      <SEO 
        title="Submit Quote Request | Maxim Plus" 
        description="Submit your bulk quote request for safety products." 
        noIndex={true} 
      />
      
      <div className="container">
        <div className="quote-checkout__header">
          <h1>Request a Bulk Quote</h1>
          <p>Review your selected items and provide your company details to receive a customized quote.</p>
        </div>

        <div className="quote-checkout__grid">
          <div className="quote-checkout__summary">
            <h3>Selected Products ({cart.length})</h3>
            <ul className="checkout-cart-list">
              {cart.map(item => (
                <li key={item.id}>
                  <div className="checkout-cart-item">
                    <span className="checkout-cart-qty">{item.quantity}x</span>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{fontSize: '0.8rem', color: '#666'}}>{item.category}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="quote-checkout__form-wrapper">
            <h3>Company Details</h3>
            <form onSubmit={handleSubmit} className="quote-checkout__form">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Company Name *</label>
                <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Acme Corp" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
              </div>
              <div className="form-group">
                <label>Company Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Industrial Area, Phase 1" />
              </div>
              <div className="form-group">
                <label>City / Location *</label>
                <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="Pune, Maharashtra" />
              </div>
              <div className="form-group">
                <label>Date Required By *</label>
                <input type="date" name="dateRequired" required value={formData.dateRequired} onChange={handleChange} />
              </div>

              {status === 'error' && (
                <div className="form-error" style={{color: 'red', marginTop: '1rem'}}>
                  Failed to send request. Please check your connection or contact us directly.
                </div>
              )}

              <button type="submit" className="btn btn--primary btn--lg" style={{width: '100%', marginTop: '1rem'}} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
