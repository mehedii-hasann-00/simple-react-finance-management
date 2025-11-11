import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AppsContext } from '../AppsContext';
import { useState, useContext, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  const { user, logoutUser } = useContext(AppsContext);
  const navigate = useNavigate();

  const linkBase =
    'px-3 py-2 rounded-md text-sm transition-colors duration-200';
  const linkActive =
    'text-green-600 dark:text-emerald-300 font-semibold underline';
  const linkInactive =
    'text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-emerald-300';

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur dark:bg-[#0B1020]/80 border-b border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
              aria-label="Toggle navigation"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <Link to="/" className="flex items-center">
              <i className="lni lni-shield-dollar"></i>
              <p className="ml-2 text-lg font-bold text-green-700 dark:text-emerald-300">FinEase</p>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
            >
              Home
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/add-transaction"
                  className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                >
                  Add Transaction
                </NavLink>
                <NavLink
                  to="/my-transactions"
                  className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                >
                  My Transactions
                </NavLink>
                <NavLink
                  to="/reports"
                  className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                >
                  My Profile
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3 relative">
            {/* Theme Toggle Switch */}
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="theme-toggle"
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div className="block w-10 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div
                  className={`dot absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    isDarkMode ? 'transform translate-x-4' : ''
                  }`}
                ></div>
              </div>
            </label>

            {!user ? (
              <div className="hidden lg:flex items-center">
                <Link
                  to="/login"
                  className="mr-2 inline-flex items-center bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    setMenuOpen((o) => !o);
                  }}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                  <svg
                    className="h-4 w-4 text-gray-600 dark:text-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-[#0B1020] dark:border-white/10">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.displayName || 'User'}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/10"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:text-red-400 dark:hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-3">
            <nav className="flex flex-col gap-1 border-t border-gray-200 pt-3 dark:border-white/10">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
              >
                Home
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/add-transaction"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                  >
                    Add Transaction
                  </NavLink>
                  <NavLink
                    to="/my-transactions"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                  >
                    My Transactions
                  </NavLink>
                  <NavLink
                    to="/reports"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                  >
                    Reports
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                  >
                    My Profile
                  </NavLink>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
