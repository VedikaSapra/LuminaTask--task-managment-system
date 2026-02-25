import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import MissionCard from '../components/MissionCard';
import { Plus, Filter, Search, Sword, Sparkles, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Missions = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMission, setNewMission] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Other',
        deadline: '',
        xp_reward: 50
    });
    const [editingMission, setEditingMission] = useState(null);
    const { refreshStats } = useAuth();

    useEffect(() => {
        fetchMissions();
    }, []);

    const fetchMissions = async () => {
        try {
            const response = await api.get('/missions/');
            setMissions(response.data);
        } catch (error) {
            console.error('Failed to fetch missions', error);
        } finally {
            setLoading(false);
        }
    };

    const [recentlyCompleted, setRecentlyCompleted] = useState(new Set());

    const handleComplete = async (id) => {
        try {
            await api.patch(`/missions/${id}/`, { is_completed: true });

            // Mark as recently completed to keep it visible
            setRecentlyCompleted(prev => new Set(prev).add(id));

            // Update the mission state immediately to show the tick
            setMissions(missions.map(m => m.id === id ? { ...m, is_completed: true } : m));

            await refreshStats();

            // Remove from the list after 15 seconds
            setTimeout(() => {
                setRecentlyCompleted(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            }, 15000);

        } catch (error) {
            console.error('Failed to complete mission', error);
        }
    };

    const handleEdit = (mission) => {
        setEditingMission(mission);
        setNewMission({
            title: mission.title,
            description: mission.description,
            priority: mission.priority,
            category: mission.category,
            deadline: mission.deadline || '',
            xp_reward: mission.xp_reward
        });
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this mission?')) {
            try {
                await api.delete(`/missions/${id}/`);
                setMissions(missions.filter(m => m.id !== id));
                await refreshStats();
            } catch (error) {
                console.error('Failed to delete mission', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure empty deadline is sent as null
            const missionData = {
                ...newMission,
                deadline: newMission.deadline || null
            };

            if (editingMission) {
                const response = await api.put(`/missions/${editingMission.id}/`, missionData);
                setMissions(missions.map(m => m.id === editingMission.id ? response.data : m));
            } else {
                const response = await api.post('/missions/', missionData);
                setMissions([response.data, ...missions]);
            }

            setShowAddForm(false);
            setEditingMission(null);
            setNewMission({ title: '', description: '', priority: 'Medium', category: 'Other', deadline: '', xp_reward: 50 });
            await refreshStats();
        } catch (error) {
            console.error('Failed to save mission', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '20px 0' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', fontWeight: 800 }}>Mission Command</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Plan your strikes and reap the rewards.</p>
                </div>
                <button
                    onClick={() => {
                        if (showAddForm && editingMission) {
                            setEditingMission(null);
                            setNewMission({ title: '', description: '', priority: 'Medium', category: 'Other', deadline: '', xp_reward: 50 });
                        } else {
                            setShowAddForm(!showAddForm);
                        }
                    }}
                    className="btn btn-primary"
                    style={{ padding: '14px 28px', boxShadow: '0 10px 20px -5px var(--primary-glow)' }}
                >
                    {showAddForm && editingMission ? 'Cancel Edit' : <><Plus size={20} /> New Mission</>}
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass"
                        style={{ padding: '40px', marginBottom: '40px', border: '1px solid var(--border)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '12px' }}>
                                <Target color="var(--primary)" size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                                {editingMission ? 'Update Mission Objectives' : 'Draft New Mission'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Mission Objectives</label>
                                <input
                                    type="text"
                                    placeholder="What needs to be done?"
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                                    value={newMission.title}
                                    onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Priority Level</label>
                                <select
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                                    value={newMission.priority}
                                    onChange={(e) => setNewMission({ ...newMission, priority: e.target.value })}
                                >
                                    <option value="Low">Low - Casual Task</option>
                                    <option value="Medium">Medium - Regular Quest</option>
                                    <option value="High">High - Heroic Feat</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Guild Category</label>
                                <select
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                                    value={newMission.category}
                                    onChange={(e) => setNewMission({ ...newMission, category: e.target.value })}
                                >
                                    <option value="Coding">Coding Guild</option>
                                    <option value="Fitness">Warrior Path (Fitness)</option>
                                    <option value="Work">Trade Hub (Work)</option>
                                    <option value="Reading">Library (Reading)</option>
                                    <option value="Health">Healer's Den (Health)</option>
                                    <option value="Education">Academy (Education)</option>
                                    <option value="Gaming">Game Lounge (Gaming)</option>
                                    <option value="Content Creation">Forge (Content Creation)</option>
                                    <option value="Travel">Expedition (Travel)</option>
                                    <option value="Cooking">Tavern (Cooking)</option>
                                    <option value="Music">Bard's Stage (Music)</option>
                                    <option value="Other">Wilderness (Other)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Due Date (Optional)</label>
                                <input
                                    type="date"
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                                    value={newMission.deadline}
                                    onChange={(e) => setNewMission({ ...newMission, deadline: e.target.value })}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Mission Intelligence (Description)</label>
                                <textarea
                                    placeholder="Provide more details for your quest..."
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                                    value={newMission.description}
                                    onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '16px' }}>
                                <button type="submit" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                                    {editingMission ? 'Update Mission' : 'Publish Mission'}
                                </button>
                                <button type="button" onClick={() => {
                                    setShowAddForm(false);
                                    setEditingMission(null);
                                    setNewMission({ title: '', description: '', priority: 'Medium', category: 'Other', deadline: '', xp_reward: 50 });
                                }} className="btn btn-ghost" style={{ padding: '14px 32px' }}>Stow Away</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="loading" style={{ height: '400px' }}>Loading Active Missions...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '28px' }}>
                    {missions.filter(m => !m.is_completed || recentlyCompleted.has(m.id)).length > 0 ? (
                        missions.filter(m => !m.is_completed || recentlyCompleted.has(m.id)).map((mission, idx) => (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <MissionCard
                                    mission={mission}
                                    onComplete={handleComplete}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="glass" style={{ gridColumn: '1 / -1', padding: '80px', textAlign: 'center', border: '1px solid var(--border)' }}>
                            <div style={{ background: 'var(--bg-secondary)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                <Sword size={40} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>The board is empty.</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}>
                                No missions are currently active in this realm. Time to draft a new quest.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default Missions;
