import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Events(){
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', event_date:'', headcount:'', budget_range:'', message:'' })
  const [status, setStatus] = useState('idle')
  const submit = async (e)=>{
    e.preventDefault()
    setStatus('submitting')
    try{ await apiPost('/api/events/inquiry', form); setStatus('success') }catch(e){ setStatus('error') }
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Events & Catering</h1>
        <p className="text-slate-600 mb-6">Tell us about your event and we’ll be in touch.</p>
        {status==='success'? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded">Thanks! We’ll get back to you soon.</div>
        ):(
          <form onSubmit={submit} className="space-y-3">
            <input required className="w-full border px-3 py-2 rounded" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} />
            <input required type="email" className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <input type="date" className="w-full border px-3 py-2 rounded" value={form.event_date} onChange={e=>setForm({...form, event_date:e.target.value})} />
            <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Estimated headcount" value={form.headcount} onChange={e=>setForm({...form, headcount:e.target.value})} />
            <input className="w-full border px-3 py-2 rounded" placeholder="Budget range" value={form.budget_range} onChange={e=>setForm({...form, budget_range:e.target.value})} />
            <textarea className="w-full border px-3 py-2 rounded" placeholder="Tell us more" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
            <button disabled={status==='submitting'} className="w-full bg-black text-white px-4 py-2 rounded">{status==='submitting'?'Sending...':'Send Inquiry'}</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  )
}
