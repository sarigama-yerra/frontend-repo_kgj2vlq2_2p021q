import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Admin(){
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('admin@boomiis.uk')
  const [password, setPassword] = useState('admin12345')
  const [data, setData] = useState({ categories: [], items: [] })

  const login = async (e)=>{
    e.preventDefault()
    try{ await apiPost('/api/admin/login', { email, password }); setAuthed(true); load() }catch(e){ alert('Invalid credentials') }
  }
  const load = async ()=>{ const d = await apiGet('/api/admin/menu'); setData(d) }

  const [cat, setCat] = useState({ name:'', slug:'', description:'', position:0, is_active:true })
  const saveCat = async ()=>{ await apiPost('/api/admin/menu/category', cat); load(); setCat({ name:'', slug:'', description:'', position:0, is_active:true }) }

  const [item, setItem] = useState({ title:'', slug:'', description:'', price:0, currency:'GBP', category_slug:'', image_url:'', tags:[], allergens:[], is_active:true })
  const saveItem = async ()=>{ await apiPost('/api/admin/menu/item', item); load(); setItem({ title:'', slug:'', description:'', price:0, currency:'GBP', category_slug:'', image_url:'', tags:[], allergens:[], is_active:true }) }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin</h1>
        {!authed ? (
          <form onSubmit={login} className="max-w-sm space-y-3">
            <input className="w-full border px-3 py-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
            <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            <button className="bg-black text-white px-4 py-2 rounded">Login</button>
          </form>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="font-semibold mb-2">Current Menu</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.items.map(i => (
                  <div key={i.slug} className="border rounded-xl p-3">
                    <div className="font-semibold">{i.title}</div>
                    <div className="text-xs text-slate-500">{i.category_slug} • £{i.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">New Category</h3>
                <div className="space-y-2">
                  <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={cat.name} onChange={e=>setCat({...cat, name:e.target.value})} />
                  <input className="w-full border px-3 py-2 rounded" placeholder="Slug" value={cat.slug} onChange={e=>setCat({...cat, slug:e.target.value})} />
                  <input className="w-full border px-3 py-2 rounded" placeholder="Description" value={cat.description} onChange={e=>setCat({...cat, description:e.target.value})} />
                  <button onClick={saveCat} className="w-full bg-black text-white px-4 py-2 rounded">Save Category</button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">New Item</h3>
                <div className="space-y-2">
                  <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={item.title} onChange={e=>setItem({...item, title:e.target.value})} />
                  <input className="w-full border px-3 py-2 rounded" placeholder="Slug" value={item.slug} onChange={e=>setItem({...item, slug:e.target.value})} />
                  <input className="w-full border px-3 py-2 rounded" placeholder="Category Slug" value={item.category_slug} onChange={e=>setItem({...item, category_slug:e.target.value})} />
                  <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Price" value={item.price} onChange={e=>setItem({...item, price:parseFloat(e.target.value||0)})} />
                  <input className="w-full border px-3 py-2 rounded" placeholder="Tags (comma)" onChange={e=>setItem({...item, tags:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
                  <button onClick={saveItem} className="w-full bg-black text-white px-4 py-2 rounded">Save Item</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
