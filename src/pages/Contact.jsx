import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact(){
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <div className="space-y-2 text-slate-700">
          <p>Address: 123 High Street, London</p>
          <p>Phone: +44 20 1234 5678</p>
          <p>Email: hello@boomiis.uk</p>
        </div>
        <div className="mt-6 aspect-video rounded-xl bg-slate-100" />
      </div>
      <Footer />
    </div>
  )
}
