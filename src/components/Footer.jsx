function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-2">JobConnect</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Empowering job seekers and recruiters with a smarter hiring platform.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/jobs" className="hover:underline">Browse Jobs</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-indigo-600">🔗 LinkedIn</a>
            <a href="#" className="hover:text-blue-600">🐦 Twitter</a>
            <a href="#" className="hover:text-pink-600">📸 Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; 2025 JobConnect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
