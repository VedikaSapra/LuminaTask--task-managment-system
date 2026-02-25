import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LayoutDashboard, ScrollText, LogOut, User, Home as HomeIcon, Trophy, Sword, ShieldCheck, Target, ChevronDown, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getHeroRank = (level) => {
        if (level >= 50) return { title: 'Legendary', color: 'var(--primary)', icon: <Sparkles size={14} /> };
        if (level >= 25) return { title: 'Commander', color: '#FFD700', icon: <Trophy size={14} /> };
        if (level >= 10) return { title: 'Striker', color: '#C0C0C0', icon: <Sword size={14} /> };
        if (level >= 5) return { title: 'Guardian', color: '#CD7F32', icon: <ShieldCheck size={14} /> };
        return { title: 'Initiate', color: 'var(--text-muted)', icon: <Target size={14} /> };
    };

    const currentRank = user ? getHeroRank(user.level) : null;

    const isLanding = location.pathname === '/';
    const isDashboard = location.pathname === '/dashboard' || location.pathname === '/missions';
    const isAuth = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/about';

    return (
        <nav className="glass-header" style={{ width: '100%' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 12px rgba(198, 167, 94, 0.3)' }}>
                        <Sparkles size={22} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>LuminaTask</h2>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {/* Public Landing Links */}
                    {isLanding && (
                        <div className="hide-mobile" style={{ display: 'flex', gap: '32px', marginRight: '24px' }}>
                            <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Features</a>
                            <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>About Us</Link>
                            <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Get Started</Link>
                        </div>
                    )}

                    {/* Dashboard/Auth Escape Links */}
                    {(isDashboard || isAuth) && (
                        <div style={{ display: 'flex', gap: '32px', marginRight: '24px' }}>
                            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HomeIcon size={18} /> Home
                            </Link>
                        </div>
                    )}

                    {!user ? (
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Link to="/login" className="btn btn-ghost" style={{ padding: '10px 24px' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '10px 24px' }}>Sign Up</Link>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link to="/dashboard" className={`btn ${location.pathname === '/dashboard' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '10px 16px' }}>
                                    <LayoutDashboard size={18} />
                                    <span className="hide-mobile">Dashboard</span>
                                </Link>
                                <Link to="/missions" className={`btn ${location.pathname === '/missions' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '10px 16px' }}>
                                    <ScrollText size={18} />
                                    <span className="hide-mobile">Quests</span>
                                </Link>
                            </div>

                            <div style={{ width: '1px', height: '24px', background: 'var(--divider)' }}></div>

                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: 'none',
                                        border: 'none',
                                        padding: '4px 8px',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        transition: 'background 0.2s',
                                    }}
                                    className="hover-bg"
                                >
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', border: `2px solid ${currentRank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={20} color={currentRank.color} />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-2px',
                                            right: '-2px',
                                            background: currentRank.color,
                                            borderRadius: '50%',
                                            width: '16px',
                                            height: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid var(--bg-main)',
                                            color: 'white'
                                        }}>
                                            {currentRank.icon}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} className="hide-mobile">
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{user.username}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Level {user.level}</span>
                                    </div>
                                    <ChevronDown size={16} color="var(--text-muted)" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '120%',
                                                    right: 0,
                                                    width: '240px',
                                                    background: 'var(--bg-card)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                                    padding: '8px',
                                                    zIndex: 100
                                                }}
                                            >
                                                <div style={{ padding: '16px', borderBottom: '1px solid var(--divider)', marginBottom: '8px' }}>
                                                    <p style={{ margin: 0, fontWeight: 800, fontSize: '0.8rem', color: currentRank.color, textTransform: 'uppercase' }}>{currentRank.title}</p>
                                                    <p style={{ margin: '4px 0 0', fontWeight: 700, fontSize: '1rem' }}>{user.username}</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level {user.level} Hero</p>
                                                </div>



                                                <button
                                                    onClick={() => { logout(); navigate('/login'); setDropdownOpen(false); }}
                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'none', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'var(--secondary)', textAlign: 'left' }}
                                                    className="hover-bg"
                                                >
                                                    <LogOut size={18} />
                                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Logout</span>
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
