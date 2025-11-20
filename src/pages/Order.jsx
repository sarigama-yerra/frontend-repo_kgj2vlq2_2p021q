import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Order() {
  const [items, setItems] = useState([])
  const [basket, setBasket] = useState([])
  const [status, setStatus] = useState('idle')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('pickup')
  const [address, setAddress] = useState('')
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => { apiGet('/api/menu').then(d => setItems(d.items)) }, [])

  const add = (it) => {
    setBasket(prev => {
      const idx = prev.findIndex(p => p.slug === it.slug)
      if (idx >= 0) {
        const cp = [...prev]; cp[idx] = {...cp[idx], quantity: cp[idx].quantity+1, subtotal: (cp[idx].quantity+1)*cp[idx].unit_price}; return cp
      }
      return [...prev, { item_slug: it.slug, title: it.title, unit_price: it.price, quantity: 1, subtotal: it.price }]
    })
  }

  const totals = basket.reduce((acc, i) => acc + i.subtotal, 0)

  const checkout = async () => {
    setStatus('processing')
    try{
      const res = await apiPost('/api/orders', {
        full_name: fullName,
        email,
        phone,
        order_type: type,
        address: type==='delivery'?address:undefined,
        items: basket,
      })
      setClientSecret(res.client_secret || 'created')
      setStatus('created')
    }catch(e){
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Order Online</h1>
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map(i => (
              <div key={i.slug} className="border rounded-xl p-4">
                <div className="aspect-video rounded-lg bg-slate-100 mb-3"/>
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-slate-600 mb-2">£{i.price?.toFixed(2)}</div>
                <button onClick={()=>add(i)} className="text-sm border px-3 py-1 rounded-full">Add</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Basket</h2>
          <div className="bg-slate-50 rounded-xl p-4">
            {basket.length===0 ? <p className="text-sm text-slate-600">Your basket is empty.</p> : (
              <ul className="space-y-2 mb-3">
                {basket.map((b,i)=> (
                  <li key={i} className="flex justify-between text-sm"><span>{b.title} × {b.quantity}</span><span>£{b.subtotal.toFixed(2)}</span></li>
                ))}
              </ul>
            )}
            <div className="flex justify-between font-semibold"><span>Total</span><span>£{totals.toFixed(2)}</span></div>
          </div>
          <div className="mt-6 space-y-2">
            <input className="w-full border px-3 py-2 rounded" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
            <div className="flex gap-3 text-sm">
              <label className="flex items-center gap-2"><input type="radio" checked={type==='pickup'} onChange={()=>setType('pickup')} /> Pickup</label>
              <label className="flex items-center gap-2"><input type="radio" checked={type==='delivery'} onChange={()=>setType('delivery')} /> Delivery</label>
            </div>
            {type==='delivery' && (
              <input className="w-full border px-3 py-2 rounded" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
            )}
            <button disabled={basket.length===0 || status==='processing'} onClick={checkout} className="w-full bg-black text-white px-4 py-2 rounded">{status==='processing'?'Processing...':'Checkout'}</button>
            {status==='created' && <p className="text-green-600 text-sm">Order created. {clientSecret ? 'Proceed to payment with Stripe element.' : 'Stripe not configured; marked for cash/card on collection.'}</p>}
            {status==='error' && <p className="text-red-600 text-sm">Something went wrong.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
