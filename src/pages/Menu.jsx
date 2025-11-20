import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Menu() {
  const [data, setData] = useState({ categories: [], items: [] })
  const [filter, setFilter] = useState('')
  const [cat, setCat] = useState('')
  useEffect(() => { apiGet('/api/menu').then(setData) }, [])
  const items = useMemo(() => data.items.filter(i => (!filter || i.tags?.includes(filter)) && (!cat || i.category_slug===cat)), [data, filter, cat])
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {['', 'vegan','halal','gluten-free','vegetarian','spicy'].map(t => (
            <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1 rounded-full border ${filter===t?'bg-black text-white':'bg-white'}`}>{t||'All'}</button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <button onClick={()=>setCat('')} className={`px-3 py-1 rounded-full border ${cat===''?'bg-black text-white':'bg-white'}`}>All</button>
          {data.categories.map(c => (
            <button key={c.slug} onClick={()=>setCat(c.slug)} className={`px-3 py-1 rounded-full border ${cat===c.slug?'bg-black text-white':'bg-white'}`}>{c.name}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(i => (
            <div key={i.slug} className="border rounded-xl p-4">
              <div className="aspect-video rounded-lg bg-slate-100 mb-3"/>
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-slate-600 mb-2">£{i.price?.toFixed(2)}</div>
              <button className="text-sm border px-3 py-1 rounded-full">Add to basket</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
