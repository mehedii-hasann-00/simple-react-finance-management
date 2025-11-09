import { NavLink, Link } from 'react-router-dom';
import { AppsContext } from '../AppsContext';
import { useState, useContext } from 'react';
import { div } from 'framer-motion/client';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logoutUser } = useContext(AppsContext);
    console.log(user);

    return (
        <div className="px-8 mx-4 py-8 flex flex-col lg:flex-row items-center justify-between">
            <div className='flex' >
                <Link to="/" className="flex items-center">
                    <img src="/lg.png" alt="" className='h-16 w-16' />
                    <p className="text-xl font-bold ml-2 text-green-700">GreenNest</p>
                </Link>
            </div>
            <div className='my-4'>
                <nav className="flex gap-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-500 font-semibold underline' : 'text-gray-700'}>
                        Home
                    </NavLink>

                    {user ?

                        <>
                            <NavLink to="/plants" className={({ isActive }) => isActive ? 'text-green-500 font-semibold underline' : 'text-gray-700'}>
                                Add Transaction
                            </NavLink>
                            <NavLink to="/plants" className={({ isActive }) => isActive ? 'text-green-500 font-semibold underline' : 'text-gray-700'}>
                                My Transaction
                            </NavLink>
                            <NavLink to="/plants" className={({ isActive }) => isActive ? 'text-green-500 font-semibold underline' : 'text-gray-700'}>
                                Reports
                            </NavLink>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-green-500 font-semibold underline' : 'text-gray-700'}>
                                My Profile
                            </NavLink>
                        </>

                        : null}
                </nav>
            </div>
            <div className="relative">
                {!user ? (
                    <div className=''>
                        <Link to={'/login'}
                            className="mr-4 cursor-pointer items-center gap-2 bg-gradient-to-r from-green-700 to-green-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                        >
                            <span className="text-white font-medium">Login</span>
                        </Link>
                        <Link to={'/signup'}
                            className="cursor-pointer items-center gap-2 bg-gradient-to-r from-green-700 to-green-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-400 transition-all duration-300"
                        >
                            <span className="text-white font-medium">Register</span>
                        </Link>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-2 cursor-pointer px-4 py-2 transition-all duration-300"
                        >
                            <img src={user.photoURL} alt="" className='h-8 w-8 rounded-full mr-4' />

                        </button>

                        {/* Dropdown */}
                        {menuOpen && (
                            <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100">
                                <div className="flex px-4 py-2 border-b border-gray-200 text-gray-700 font-medium">
                                    {user.displayName}
                                </div>
                                <button
                                    onClick={logoutUser}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
