import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [menuPreview, setMenuPreview] = useState([])
  useEffect(() => {
    apiGet('/api/menu').then(data => setMenuPreview(data.items.slice(0,4))).catch(()=>{})
  }, [])
  const subscribe = async (e) => {
    e.preventDefault()
    try{
      await apiPost('/api/subscribe',{ email })
      setSubscribed(true)
    }catch(e){/* ignore */}
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Tasty bites. Warm vibes.</h1>
            <p className="mt-4 text-lg text-slate-600">BoomiisUK brings bold flavours to your day. Order online for pickup or delivery.</p>
            <div className="mt-6 flex gap-3">
              <a href="/order" className="bg-black text-white px-5 py-3 rounded-full">Order Now</a>
              <a href="/menu" className="border border-slate-300 px-5 py-3 rounded-full">View Menu</a>
            </div>
          </div>
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-200 to-pink-200"/>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Featured Dishes</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {menuPreview.map((m,i)=> (
            <div key={i} className="border rounded-xl p-4">
              <div className="aspect-square rounded-lg bg-slate-100 mb-3"/>
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm text-slate-600">£{m.price?.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-slate-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold">Get tasty updates</h3>
          {subscribed ? (
            <p className="text-green-600 mt-2">Thanks! You're on the list.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-2 flex gap-2">
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="flex-1 border px-3 py-2 rounded" required />
              <button className="bg-black text-white px-4 rounded">Subscribe</button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
