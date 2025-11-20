import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../lib/api'

export default function BlogDetail(){
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  useEffect(()=>{ apiGet(`/api/blog/${slug}`).then(setPost).catch(()=>setError('Not found')) },[slug])
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {error ? <p className="text-red-600">{error}</p> : post ? (
          <article>
            <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
            {post.cover_image_url && <div className="aspect-video rounded-xl bg-slate-100 mb-4" />}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: post.content}} />
          </article>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
