import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">BoomiisUK</Link>
        <nav className="hidden md:flex gap-6 text-sm text-slate-700">
          <Link to="/menu" className="hover:text-black">Menu</Link>
          <Link to="/order" className="hover:text-black">Order</Link>
          <Link to="/reservations" className="hover:text-black">Reservations</Link>
          <Link to="/gallery" className="hover:text-black">Gallery</Link>
          <Link to="/events" className="hover:text-black">Events</Link>
          <Link to="/blog" className="hover:text-black">Blog</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>
        </nav>
        <Link to="/order" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm">Order Now</Link>
      </div>
    </header>
  )
}
