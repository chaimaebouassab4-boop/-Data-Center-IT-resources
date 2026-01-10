
import React, { useEffect, useState } from 'react';
import { UserRole } from '../types';
import Sidebar from '../Components/Sidebar';
import Dashboard from '../views/Dashboard';
import Catalog from '../views/Catalog';
import { Bell, User, Search, ShieldCheck, LogIn } from 'lucide-react';
import { router } from '@inertiajs/react';

const App = ({ resources, auth, isLoggedIn }) => {

    const [currentRole, setCurrentRole] = useState(auth.role || UserRole.GUEST);
    const [activeTab, setActiveTab] = useState(isLoggedIn ? 'dashboard' : 'catalog');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

     useEffect(() => {
        setCurrentRole(auth.role || UserRole.GUEST);
        setActiveTab(isLoggedIn ? 'dashboard' : 'catalog');
    }, [auth.role]);

    // Mock roles switching for demo purposes
    const cycleRole = () => {
        const roles = Object.values(UserRole);
        const currentIndex = roles.indexOf(currentRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setCurrentRole(roles[nextIndex]);

        // Auto reset tab if role doesn't have access
        if (roles[nextIndex] === UserRole.GUEST) {
            setActiveTab('catalog');
        } else if (activeTab === 'users' && roles[nextIndex] !== UserRole.ADMIN) {
            setActiveTab('dashboard');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard resources={resources} role={currentRole} />;
            case 'catalog':
                return <Catalog resources={resources} role={currentRole} />;
            case 'my-reservations':
                return (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <h2 className="text-xl font-bold mb-2">My Bookings</h2>
                        <p>You have no active reservations at this time.</p>
                    </div>
                );
            case 'requests':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
                        <div className="text-center py-10 text-slate-400">
                            No pending requests in your queue.
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">User Directory</h2>
                        <p className="text-slate-500 mb-6">Manage roles and platform access permissions.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3">User</th>
                                        <th className="px-4 py-3">Role</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Last Active</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: 'Dr. Alice Morgan', email: 'a.morgan@univ.edu', role: 'Internal User', status: 'Active' },
                                        { name: 'Tech Support Team', email: 'ops@datacenter.net', role: 'Tech Manager', status: 'Active' },
                                        { name: 'Guest User 402', email: 'guest@web.com', role: 'Guest', status: 'Pending' },
                                    ].map((u, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{u.name}</p>
                                                        <p className="text-xs text-slate-500">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4"><span className="text-sm font-medium text-slate-700">{u.role}</span></td>
                                            <td className="px-4 py-4">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-xs text-slate-400">2 hours ago</td>
                                            <td className="px-4 py-4 text-sm font-semibold text-blue-600 cursor-pointer hover:underline">Edit</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return <div className="p-10 text-center text-slate-500">Feature under development.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                currentRole={currentRole}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={() => {
                    if (confirm("Are you sure you want to log out?")) {
                        router.post('/logout', {}, {
                            onSuccess: () => { }
                        });
                        //location.href = '/';
                    }
                }}
                isLoggedIn={isLoggedIn}
            />

            <main className="pl-64 min-h-screen flex flex-col">
                {/* Header bar */}
                <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {!isLoggedIn && <>
                            <a
                                href="/auth"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md 
                           hover:bg-blue-700 transition-colors duration-300 ease-in-out
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <LogIn size={18} /> {/* Icône Lucide */}
                                Login
                            </a>
                            <p className="text-xs font-medium text-slate-500 italic">
                                Log in to book
                            </p>
                        </>
                        }
                        {/*
                            <button
                                onClick={cycleRole}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                            >
                                <ShieldCheck size={14} />
                                Switch
                            </button>
                        */}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                            <Search size={16} className="text-slate-400" />
                            <input type="text" placeholder="Global search..." className="bg-transparent border-none text-sm outline-none w-48" />
                        </div>

                        {/* Notifications */}
                        {isLoggedIn &&
                            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                            </button>
                        }

                        <div className="h-8 w-px bg-slate-200 mx-1"></div>

                        <button onClick={() => isLoggedIn ? '' : location.href = '/auth'} className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900">{isLoggedIn && auth.user.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{currentRole}</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <User size={18} />
                            </div>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
                    {renderContent()}
                </div>

                {/* Footer */}
                <footer className="px-8 py-6 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400">
                        &copy; 2023 DataCenter Nexus. All rights reserved. |
                        <span className="ml-2 hover:text-blue-500 cursor-pointer">Security Policy</span> |
                        <span className="ml-2 hover:text-blue-500 cursor-pointer">Support</span>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default App;
