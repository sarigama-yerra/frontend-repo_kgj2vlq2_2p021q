export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm text-slate-600">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">BoomiisUK</h4>
          <p>Tasty bites, warm vibes. Open daily.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Visit</h4>
          <p>123 High Street, London</p>
          <p>Open 11:00 - 22:00</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><a href="/legal/privacy" className="hover:text-black">Privacy</a></li>
            <li><a href="/legal/terms" className="hover:text-black">Terms</a></li>
            <li><a href="/legal/cookies" className="hover:text-black">Cookies</a></li>
            <li><a href="/legal/accessibility" className="hover:text-black">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} BoomiisUK</div>
    </footer>
  )
}
