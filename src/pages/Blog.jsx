import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Blog(){
  const [posts, setPosts] = useState([])
  useEffect(()=>{ apiGet('/api/blog').then(setPosts) },[])
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="space-y-6">
          {posts.map(p => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="block p-4 border rounded-xl hover:bg-slate-50">
              <div className="text-xl font-semibold">{p.title}</div>
              <div className="text-slate-600 text-sm">{p.excerpt}</div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
