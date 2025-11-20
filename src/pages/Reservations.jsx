import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Reservations(){
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', date:'', time:'', party_size:2, notes:'' })
  const [status, setStatus] = useState('idle')
  const submit = async (e)=>{
    e.preventDefault()
    setStatus('submitting')
    try{
      await apiPost('/api/reservations', form)
      setStatus('success')
    }catch(e){ setStatus('error') }
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Reservations</h1>
        {status==='success' ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded">Thanks! We'll confirm by email.</div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input required className="w-full border px-3 py-2 rounded" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} />
            <input required type="email" className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <input required className="w-full border px-3 py-2 rounded" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <div className="grid grid-cols-3 gap-2">
              <input required type="date" className="border px-3 py-2 rounded" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
              <input required type="time" className="border px-3 py-2 rounded" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} />
              <input required type="number" min={1} max={20} className="border px-3 py-2 rounded" value={form.party_size} onChange={e=>setForm({...form, party_size:parseInt(e.target.value)})} />
            </div>
            <textarea className="w-full border px-3 py-2 rounded" placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
            <button disabled={status==='submitting'} className="w-full bg-black text-white px-4 py-2 rounded">{status==='submitting'?'Submitting...':'Check Availability'}</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  )
}
