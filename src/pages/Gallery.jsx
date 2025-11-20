import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Gallery(){
  const [images, setImages] = useState([])
  const [lightbox, setLightbox] = useState(null)
  useEffect(()=>{ apiGet('/api/gallery').then(setImages) },[])
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img,i)=>(
            <button key={i} onClick={()=>setLightbox(img)} className="aspect-square bg-slate-100 rounded-xl" title={img.alt||img.title} />
          ))}
        </div>
      </div>
      {lightbox && (
        <div onClick={()=>setLightbox(null)} className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full">
            <div className="aspect-video bg-slate-100 rounded" />
            <div className="mt-2 text-sm text-slate-700">{lightbox.title}</div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
