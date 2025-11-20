import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Legal(){
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <section>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-slate-700">We respect your privacy. This page outlines how we handle your data.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
          <p className="text-slate-700">Use of this website implies acceptance of our terms.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p className="text-slate-700">We use essential cookies and anonymous analytics.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Accessibility</h2>
          <p className="text-slate-700">We strive to meet WCAG 2.1 AA guidelines.</p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
