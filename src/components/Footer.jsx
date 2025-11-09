
export default function Footer() {
  return (
<footer className="bg-[#faf8f2] text-gray-500 border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Logo & Info */}
    <div>
      <div className="flex items-center gap-3">
        <img src="/lg.png" alt="Hero.io Logo" className="w-10 h-10" />
        <h2 className="text-lg font-bold tracking-wide">GreenNest</h2>
      </div>
      <p className="mt-3 text-sm text-gray-400 leading-6">
        Make the earth green
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className=" font-bold  mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="/plants" className=" transition">All Plants</a>
        </li>
        <li>
          <a href="/profile" className=" transition">My Profile</a>
        </li>
        <li>
          <a href="/" className="hover: transition">About Us</a>
        </li>
        <li>
          <a href="/" className="hover: transition">Contact</a>
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div className="md:text-right">
      <h3 className=" font-semibold text-base mb-4">Social Links</h3>
      <div className="flex md:justify-end gap-4">
        <a
          href="https://x.com"
          target="_blank"
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-indigo-500 rounded-full transition"
        >
          <i class="lni lni-twitter-old"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-indigo-500 rounded-full transition"
        >
          <i class="lni lni-linkedin"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-indigo-500 rounded-full transition"
        >
          <i class="lni lni-facebook"></i>
        </a>
        <a
          href="https://github.com/mehedii-hasann-00"
          target="_blank"
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-indigo-500 rounded-full transition"
        >
          <i class="lni lni-github"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Divider & Bottom Text */}
  <div className="border-t border-slate-700 text-center py-4 text-sm text-gray-400">
    <p>
      © {new Date().getFullYear()} <span className="font-semibold ">GreenNest</span> — All rights reserved.
    </p>
  </div>
</footer>


  )
}
