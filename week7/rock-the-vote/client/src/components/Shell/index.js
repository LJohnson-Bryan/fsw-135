import {React, useState, useContext} from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

const Shell = props => {

    const { user: {username, profileImg}, token, logout } = useContext(UserContext);

    const [navToggle, setNavToggle] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const location = useLocation();

    return ( 
        <div>
            <nav className="bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h3 className="text-white font-medium text-xl">Rock-Your-Vote</h3>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {token && <Link to="/issues" className={location.pathname === "/issues" ? "bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"}>Issues</Link>}
                                {token && <Link to="/create" className={location.pathname === "/create" ? "bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium" : "text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"}>Create Issue</Link>}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <h3 className="text-white text-md">{username}</h3>

                            {/* <!-- Profile dropdown --> */}
                            <div className="ml-3 relative">
                                <div>
                                    <button onClick={() => setProfileDropDown(!profileDropDown)} className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" id="user-menu" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        {token && <img className="h-8 w-8 rounded-full" src={profileImg} alt="" />}
                                    </button>
                                </div>
                                
                                <div className={`${profileDropDown ? 'transition ease-out duration-100 transform opacity-100 scale-100' : 'ransition ease-in duration-75 transform opacity-0 scale-95'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <Link to="/profile" onClick={() => setProfileDropDown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                                    <Link to="/" onClick={() => {
                                        setProfileDropDown(false);
                                        logout();
                                    }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                    {/* <!-- Mobile menu button --> */}
                        {token && <button onClick={() => setNavToggle(!navToggle)} className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            
                            <svg className={`${navToggle ? 'hidden' : 'block'} block h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            
                            <svg className={`${navToggle ? 'block' : 'hidden'} block h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>}
                    </div>
                </div>
            </div>

            <div className={`${navToggle ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                
                    <Link to="/issues" onClick={() => setNavToggle(false)} className={location.pathname === "/issues" ? "bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"}>Issues</Link>
                    <Link to="/create" onClick={() => setNavToggle(false)} className={location.pathname === "/create" ? "bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium" : "text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"}>Create Issue</Link>
                </div>
                <div className="pt-4 pb-3 border-t border-indigo-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={profileImg} alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">{username}</div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Link to="/profile" onClick={() => setNavToggle(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">Your Profile</Link>
                        <Link to="/" onClick={() => {
                            setNavToggle(false);
                            logout();
                        }} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">Sign Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-lg leading-6 font-semibold text-gray-900">
                    {props.page}
                </h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-4 sm:px-0">
                    {props.children}
                    </div>
                </div>
            </main>
        </div>    
    );
}

export default Shell;
