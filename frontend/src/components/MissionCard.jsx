import React from 'react';
import { Calendar, CheckCircle, Circle, Clock, Tag, Sparkles, AlertTriangle, Pencil, Trash2 } from 'lucide-react';

const MissionCard = ({ mission, onComplete, onEdit, onDelete }) => {
    const priorityColors = {
        High: 'var(--secondary)',
        Medium: 'var(--accent)',
        Low: 'var(--primary)',
    };

    const priorityBgs = {
        High: 'var(--secondary-soft)',
        Medium: 'var(--accent-soft)',
        Low: 'var(--primary-glow)',
    };

    const isUrgent = mission.deadline && !mission.is_completed && (new Date(mission.deadline) - new Date() < 24 * 60 * 60 * 1000);

    return (
        <div className={`glass ${mission.is_completed ? 'completed' : ''} ${isUrgent ? 'urgent-pulse' : ''}`} style={{
            padding: '28px',
            borderLeft: `6px solid ${mission.is_completed ? 'var(--success)' : priorityColors[mission.priority]}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: mission.is_completed ? '#F0F9EB' : 'var(--bg-secondary)',
            opacity: mission.is_completed ? 0.8 : 1,
            position: 'relative'
        }}>
            {isUrgent && (
                <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '20px',
                    background: 'var(--secondary)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    <AlertTriangle size={12} /> URGENT
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: 'rgba(255,255,255,0.05)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            border: '1px solid var(--border)'
                        }}>
                            {mission.category || 'QUEST'}
                        </span>
                        <span style={{
                            color: priorityColors[mission.priority],
                            background: priorityBgs[mission.priority],
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase'
                        }}>
                            {mission.priority}
                        </span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3 }}>{mission.title}</h3>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {!mission.is_completed && (
                        <>
                            <button
                                onClick={() => onEdit(mission)}
                                className="btn btn-ghost"
                                style={{ padding: '10px', borderRadius: '12px', color: 'var(--text-secondary)' }}
                                title="Edit Quest"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => onComplete(mission.id)}
                                className="btn btn-ghost xp-glow"
                                style={{ padding: '10px', borderRadius: '12px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                                title="Complete Quest"
                            >
                                <Circle size={22} />
                            </button>
                        </>
                    )}

                    {mission.is_completed && (
                        <div style={{ color: 'var(--success)', padding: '5px' }}>
                            <CheckCircle size={32} />
                        </div>
                    )}

                    <button
                        onClick={() => onDelete(mission.id)}
                        className="btn btn-ghost"
                        style={{ padding: '10px', borderRadius: '12px', color: '#ff4d4d' }}
                        title="Delete Quest"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
                {mission.description || 'No detailed intelligence provided for this quest.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: mission.is_completed ? 'var(--success)' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {mission.is_completed ? (
                        <>
                            <CheckCircle size={16} />
                            <span>Task Completed</span>
                        </>
                    ) : (
                        <>
                            <Calendar size={16} />
                            <span>{mission.deadline || 'Ongoing'}</span>
                        </>
                    )}
                </div>
                <div className="reward-shine" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '6px 12px', borderRadius: '10px', fontSize: '0.9rem' }}>
                    <Sparkles size={14} />
                    +{mission.xp_reward} XP
                </div>
            </div>
        </div>
    );
};

export default MissionCard;
