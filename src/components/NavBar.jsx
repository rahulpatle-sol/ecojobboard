import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-xl font-bold">
        <Link to="/">JobConnect</Link>
      </h1>
      <ul className="flex gap-4 text-sm font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/jobsearch">Jobs</Link></li>
        <li>
          <Link
            to="/login"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
