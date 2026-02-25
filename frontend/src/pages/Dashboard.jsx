import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Flame, Trophy, Zap, Sword, Target, ShieldCheck,
    Calendar as CalendarIcon, BarChart3, History, LayoutDashboard,
    Clock, AlertTriangle, CheckCircle2, Sparkles, ChevronRight,
    User, Mail, Lock, UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const StatCard = ({ title, value, icon, color }) => (
    <motion.div whileHover={{ y: -5 }} className="card-elevated" style={{ borderLeft: `4px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
                background: `${color}15`,
                padding: '12px',
                borderRadius: '12px',
                color: color,
                display: 'flex',
                boxShadow: `0 0 20px ${color}10`
            }}>
                {icon}
            </div>
            <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{title}</p>
                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{value}</h3>
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user, refreshStats } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state && location.state.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await refreshStats();
                const missionsRes = await api.get('/missions/');
                setMissions(missionsRes.data);
            } catch (err) {
                console.error('Migration failed at Hero Headquarters', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (!user || loading) return <div className="loading">Invoking Hero Data...</div>;

    const completedMissions = missions.filter(m => m.is_completed);
    const activeMissions = missions.filter(m => !m.is_completed);

    // Updated Urgent Logic: High Priority + Due within 48h + Overdue
    const urgentMissions = activeMissions.filter(m => {
        if (m.priority === 'High') return true;
        if (!m.deadline) return false;

        const now = new Date();
        const deadline = new Date(m.deadline);
        const diff = deadline - now;
        const fortyEightHours = 48 * 60 * 60 * 1000;

        // Return true if past due (diff < 0) or due within 48 hours
        return diff < fortyEightHours;
    });

    const progress = (user.total_xp % 1000) / 10;

    // Rank Logic
    const getHeroRank = (level) => {
        if (level >= 50) return { title: 'Legendary Hero', color: 'var(--primary)', icon: <Sparkles size={20} /> };
        if (level >= 25) return { title: 'Hero Commander', color: '#FFD700', icon: <Trophy size={20} /> };
        if (level >= 10) return { title: 'Hero Striker', color: '#C0C0C0', icon: <Sword size={20} /> };
        if (level >= 5) return { title: 'Hero Guardian', color: '#CD7F32', icon: <ShieldCheck size={20} /> };
        return { title: 'Hero Initiate (Lvl 1)', color: 'var(--text-muted)', icon: <Target size={20} /> };
    };

    const currentRank = getHeroRank(user.level);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            {/* Sidebar Navigation */}
            <div className="glass" style={{
                width: '260px',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRight: '1px solid var(--border)',
                borderLeft: 'none',
                borderTop: 'none',
                borderBottom: 'none',
                borderRadius: '0',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto',
                flexShrink: 0
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '32px', padding: '0 8px', display: 'flex', alignItems: 'center' }}>
                    <h2 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={24} color="var(--primary)" />
                        LuminaTask
                    </h2>
                </div>

                {/* User Profile Block */}
                <div style={{ padding: '0 8px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-secondary)',
                        border: '2px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        flexShrink: 0
                    }}>
                        {user.avatar ? (
                            <span style={{ fontWeight: 800 }}>{user.avatar}</span>
                        ) : (
                            <UserCircle size={24} />
                        )}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.username}</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: currentRank.color, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {currentRank.title}
                        </p>
                    </div>
                </div>

                <div style={{ padding: '0 8px', marginBottom: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Navigation
                    </p>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                        { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                        { id: 'rankings', icon: <Trophy size={20} />, label: 'Rankings' },
                        { id: 'calendar', icon: <CalendarIcon size={20} />, label: 'Calendar' },
                        { id: 'rewards', icon: <Sparkles size={20} />, label: 'Rewards' },
                        { id: 'history', icon: <History size={20} />, label: 'History' },
                        { id: 'profile', icon: <User size={20} />, label: 'User Pages' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 16px',
                                gap: '16px',
                                fontSize: '0.9rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--primary-glow)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab.id ? 700 : 500,
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                width: '100%',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = 'var(--text-main)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: activeTab === tab.id ? 'var(--primary)' : 'inherit'
                            }}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                    <button
                        onClick={useAuth().logout}
                        style={{
                            padding: '12px 16px',
                            gap: '16px',
                            fontSize: '0.9rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            width: '100%',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 71, 87, 0.1)';
                            e.currentTarget.style.color = 'var(--secondary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lock size={20} style={{ flexShrink: 0 }} />
                        </span>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '40px 48px', maxWidth: 'calc(100vw - 260px)', overflowX: 'hidden' }}>
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '48px' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '8px', fontWeight: 900 }}>Hero Headquarters</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: 0 }}>
                                Manage your missions, track your progress, and ascend to legends.
                            </p>
                        </div>
                    </div>
                </motion.header>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                                <StatCard title="Total Experience" value={`${user.total_xp} XP`} icon={<Flame size={24} />} color="var(--primary)" />
                                <StatCard title="Hero Level" value={`Lvl ${user.level}`} icon={<Trophy size={24} />} color="var(--accent)" />
                                <StatCard title="Current Streak" value={`${user.current_streak || 0} Days`} icon={<Zap size={24} />} color="var(--secondary)" />
                                <StatCard title="Quests Won" value={user.completed_missions} icon={<Sword size={24} />} color="var(--success)" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                                <div className="glass" style={{ padding: '40px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                        <h3 style={{ fontSize: '1.5rem' }}>Hero Progress</h3>
                                        <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{user.total_xp % 1000} / 1000 XP</span>
                                    </div>
                                    <div className="xp-bar-container" style={{ marginBottom: '32px', height: '20px', borderRadius: '10px' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="xp-bar-fill"
                                            style={{ borderRadius: '10px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', flex: 1 }}>
                                            <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Missions</p>
                                            <p style={{ margin: 0, fontWeight: 800, fontSize: '1.5rem' }}>{activeMissions.length}</p>
                                        </div>
                                        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', flex: 1 }}>
                                            <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Urgent Tasks</p>
                                            <p style={{ margin: 0, fontWeight: 800, fontSize: '1.5rem', color: urgentMissions.length > 0 ? 'var(--secondary)' : 'inherit' }}>
                                                {urgentMissions.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass" style={{ padding: '40px' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Urgent Quests</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {urgentMissions.length > 0 ? (
                                            urgentMissions.map(m => (
                                                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', background: 'rgba(255, 71, 87, 0.1)', border: '1px solid rgba(255, 71, 87, 0.2)' }}>
                                                    <AlertTriangle size={20} color="var(--secondary)" />
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>{m.title}</p>
                                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expires in {Math.round((new Date(m.deadline) - new Date()) / (60 * 60 * 1000))} hours</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                                                <ShieldCheck size={40} style={{ opacity: 0.2, marginBottom: '16px' }} />
                                                <p>No immediate threats detected.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'rankings' && (
                        <motion.div
                            key="rankings"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass"
                            style={{ padding: '40px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Hero Ranking System</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                                Your rank is determined by your Level. Earn XP by completing missions to level up!
                            </p>

                            <div className="card-elevated" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ background: 'var(--bg-secondary)' }}>
                                        <tr>
                                            <th style={{ padding: '20px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Rank Tier</th>
                                            <th style={{ padding: '20px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Level Req.</th>
                                            <th style={{ padding: '20px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>XP Req.</th>
                                            <th style={{ padding: '20px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { level: 1, xp: 0, title: 'Hero Initiate', icon: <Target size={18} />, color: 'var(--text-muted)' },
                                            { level: 5, xp: 4000, title: 'Hero Guardian', icon: <ShieldCheck size={18} />, color: '#CD7F32' },
                                            { level: 10, xp: 9000, title: 'Hero Striker', icon: <Sword size={18} />, color: '#C0C0C0' },
                                            { level: 25, xp: 24000, title: 'Hero Commander', icon: <Trophy size={18} />, color: '#FFD700' },
                                            { level: 50, xp: 49000, title: 'Legendary Hero', icon: <Sparkles size={18} />, color: 'var(--primary)' }
                                        ].map((rank, i) => {
                                            const isCurrent = user.level >= rank.level && (i === 4 || user.level < [1, 5, 10, 25, 50][i + 1]);
                                            const isUnlocked = user.level >= rank.level;

                                            return (
                                                <tr key={i} style={{
                                                    borderBottom: '1px solid var(--divider)',
                                                    background: isCurrent ? `${rank.color}05` : 'transparent',
                                                    transition: 'background 0.3s ease'
                                                }}>
                                                    <td style={{ padding: '20px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ color: isUnlocked ? rank.color : 'var(--text-muted)', display: 'flex' }}>
                                                                {rank.icon}
                                                            </div>
                                                            <span style={{ fontWeight: 700, color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>{rank.title}</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>Level {rank.level}</td>
                                                    <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{rank.xp.toLocaleString()} XP</td>
                                                    <td style={{ padding: '20px' }}>
                                                        {isCurrent ? (
                                                            <span style={{ background: rank.color, color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>CURRENT</span>
                                                        ) : isUnlocked ? (
                                                            <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700 }}>UNLOCKED</span>
                                                        ) : (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                                                <div style={{ width: '60px', height: '6px', background: 'var(--divider)', borderRadius: '3px', position: 'relative' }}>
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        left: 0,
                                                                        top: 0,
                                                                        height: '100%',
                                                                        width: `${Math.min(100, (user.total_xp / rank.xp) * 100)}%`,
                                                                        background: 'var(--border)',
                                                                        borderRadius: '3px'
                                                                    }}></div>
                                                                </div>
                                                                {Math.round((user.total_xp / rank.xp) * 100)}%
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {user.level < 50 && (
                                <div style={{ marginTop: '32px', padding: '24px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px' }}>Path to Next Rank</h4>
                                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            Reach Level {[5, 10, 25, 50].find(l => l > user.level)} to unlock the next Tier!
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                                            {1000 - (user.total_xp % 1000)} XP Remaining
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Next Level in Progress</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'calendar' && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass"
                            style={{ padding: '40px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Command Center Calendar</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Grouping by Date */}
                                {(() => {
                                    const grouped = activeMissions.filter(m => m.deadline).reduce((groups, mission) => {
                                        const date = new Date(mission.deadline).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                                        if (!groups[date]) groups[date] = [];
                                        groups[date].push(mission);
                                        return groups;
                                    }, {});

                                    return Object.entries(grouped).sort((a, b) => new Date(a[1][0].deadline) - new Date(b[1][0].deadline)).map(([date, missions]) => (
                                        <div key={date}>
                                            <h4 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '1rem', borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>{date}</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                                                {missions.map(m => (
                                                    <motion.div
                                                        whileHover={{ x: 5 }}
                                                        key={m.id}
                                                        style={{
                                                            padding: '20px',
                                                            borderRadius: '16px',
                                                            background: 'var(--bg-secondary)',
                                                            border: '1px solid var(--border)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <div>
                                                            <h5 style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>{m.title}</h5>
                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>{m.category}</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>+{m.xp_reward} XP</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ));
                                })()}
                                {activeMissions.filter(m => m.deadline).length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                                        <CalendarIcon size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                                        <p>No quest deadlines plotted in the stars.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}



                    {activeTab === 'rewards' && (
                        <motion.div
                            key="rewards"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass"
                            style={{ padding: '40px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Hero Milestones & Rewards</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {[
                                    { level: 1, title: 'Hero Initiate', icon: <Target size={32} />, color: 'var(--text-muted)', reward: 'Access to Basic Missions' },
                                    { level: 5, title: 'Hero Guardian', icon: <ShieldCheck size={32} />, color: '#CD7F32', reward: 'Bronze Token & Profile Border' },
                                    { level: 10, title: 'Hero Striker', icon: <Sword size={32} />, color: '#C0C0C0', reward: 'Silver Badge & Custom Icon Set' },
                                    { level: 25, title: 'Hero Commander', icon: <Trophy size={32} />, color: '#FFD700', reward: 'Gold Medal & Priority Quest Access' },
                                    { level: 50, title: 'Legendary Hero', icon: <Sparkles size={32} />, color: 'var(--primary)', reward: 'Divine Aura & Global Hall of Fame' }
                                ].map((tier, idx) => {
                                    const isUnlocked = user.level >= tier.level;
                                    return (
                                        <div key={idx} style={{
                                            padding: '30px',
                                            borderRadius: '24px',
                                            background: isUnlocked ? 'var(--bg-secondary)' : 'rgba(0,0,0,0.02)',
                                            border: `2px solid ${isUnlocked ? tier.color : 'var(--border)'}`,
                                            opacity: isUnlocked ? 1 : 0.5,
                                            textAlign: 'center',
                                            position: 'relative'
                                        }}>
                                            {!isUnlocked && <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>LOCKED</div>}
                                            <div style={{ color: isUnlocked ? tier.color : 'var(--text-muted)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                                                {tier.icon}
                                            </div>
                                            <h4 style={{ margin: '0 0 8px', color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>{tier.title}</h4>
                                            <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Unlocked at Level {tier.level}</p>
                                            <div style={{
                                                padding: '8px',
                                                borderRadius: '8px',
                                                background: isUnlocked ? `${tier.color}10` : 'rgba(0,0,0,0.05)',
                                                fontSize: '0.75rem',
                                                color: isUnlocked ? tier.color : 'var(--text-muted)',
                                                fontWeight: 700
                                            }}>
                                                EARNED: {tier.reward}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'history' && (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass"
                            style={{ padding: '40px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Hall of Fame (Completed Quests)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {completedMissions.map(m => (
                                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                                        <CheckCircle2 color="var(--success)" size={24} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{m.title}</h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category: {m.category} • Rewarded {m.xp_reward} XP</p>
                                        </div>
                                        <div style={{ opacity: 0.5 }}>
                                            <Trophy size={20} color="var(--accent)" />
                                        </div>
                                    </div>
                                ))}
                                {completedMissions.length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px' }}>Your history is a blank scroll. Go forth and conquer!</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'profile' && (
                        <ProfileTab user={user} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
const ProfileTab = ({ user }) => {
    const { updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        avatar: user.avatar || 'Warrior',
        password: ''
    });

    // Sync form data with user prop when user updates
    useEffect(() => {
        setFormData({
            username: user.username,
            email: user.email,
            avatar: user.avatar || 'Warrior',
            password: ''
        });
    }, [user]);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const characters = [
        { name: 'Warrior', icon: <Sword size={24} />, description: 'Strong and resilient.' },
        { name: 'Mage', icon: <Zap size={24} />, description: 'Master of the arcane.' },
        { name: 'Rogue', icon: <Target size={24} />, description: 'Swift and deadly.' },
        { name: 'Paladin', icon: <ShieldCheck size={24} />, description: 'Protector of the weak.' },
        { name: 'Archer', icon: <Target size={24} />, description: 'Deadly from a distance.' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const dataToSubmit = { ...formData };
            if (!dataToSubmit.password) delete dataToSubmit.password;
            await updateProfile(dataToSubmit);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (!isEditing) {
        return (
            <motion.div
                key="profile-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass"
                style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'var(--primary-glow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        border: '4px solid var(--primary)',
                        color: 'var(--primary)',
                        boxShadow: '0 0 30px var(--primary-glow)'
                    }}>
                        <UserCircle size={80} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{user.username}</h2>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)'
                    }}>
                        <Mail size={16} />
                        <span>{user.email}</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                    <div className="card-elevated" style={{ padding: '24px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Character Class</p>
                        <div style={{ color: 'var(--primary)', marginBottom: '12px' }}>
                            {characters.find(c => c.name === (user.avatar || 'Warrior'))?.icon || <Sword size={24} />}
                        </div>
                        <h4 style={{ margin: 0 }}>{user.avatar || 'Warrior'}</h4>
                    </div>
                    <div className="card-elevated" style={{ padding: '24px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member Since</p>
                        <div style={{ color: 'var(--accent)', marginBottom: '12px' }}>
                            <CalendarIcon size={24} />
                        </div>
                        <h4 style={{ margin: 0 }}>{new Date().toLocaleDateString()}</h4>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary"
                        style={{ padding: '16px 40px', fontSize: '1rem' }}
                    >
                        Edit Hero Profile
                    </button>
                    {message.text && message.type === 'success' && (
                        <p style={{ color: 'var(--success)', marginTop: '20px', fontWeight: 600 }}>{message.text}</p>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass"
            style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: '3px solid var(--primary)',
                    color: 'var(--primary)'
                }}>
                    <UserCircle size={60} />
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '8px' }}>Hero Profile</h3>
                <p style={{ color: 'var(--text-muted)' }}>Customize your hero's identity and appearance.</p>
            </div>

            {message.text && (
                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    background: message.type === 'success' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                    border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--secondary)'}`,
                    color: message.type === 'success' ? 'var(--success)' : 'var(--secondary)',
                    textAlign: 'center',
                    fontWeight: 600
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <h4 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--primary)' }}>Identity</h4>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Hero Username</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Hero Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                            required
                        />
                    </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>New Password (Leave blank to keep current)</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Min. 6 characters"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                        />
                    </div>
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
                    <h4 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--primary)' }}>Character Class</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                        {characters.map(char => (
                            <div
                                key={char.name}
                                onClick={() => setFormData({ ...formData, avatar: char.name })}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    border: `2px solid ${formData.avatar === char.name ? 'var(--primary)' : 'var(--border)'}`,
                                    background: formData.avatar === char.name ? 'var(--primary-glow)' : 'var(--bg-main)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ color: formData.avatar === char.name ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '10px' }}>
                                    {char.icon}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{char.name}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{char.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '32px', display: 'flex', gap: '16px' }}>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-ghost"
                        style={{ flex: 1, padding: '16px' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-primary"
                        style={{ flex: 2, padding: '16px' }}
                    >
                        {saving ? 'Saving Hero Data...' : 'Update Hero Profile'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default Dashboard;
