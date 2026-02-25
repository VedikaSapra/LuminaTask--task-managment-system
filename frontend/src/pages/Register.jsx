import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Sparkles, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please verify your secret keys.');
            setLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...registerData } = formData;
            await api.post('/auth/register/', registerData);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data) {
                const firstError = Object.values(data)[0];
                setError(Array.isArray(firstError) ? firstError[0] : (data.message || 'Failed to create account.'));
            } else {
                setError('Connection failed. Is the backend running?');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
            <div className="glass float" style={{ width: '100%', maxWidth: '480px', padding: '48px', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px -5px rgba(198, 167, 94, 0.3)' }}>
                        <ShieldCheck size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Join the Journey</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Begin your legend. Every hero starts with a single step.</p>
                </div>

                {error && <div style={{ background: '#FFF1F0', border: '1px solid #FFA39E', color: '#CF1322', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Hero ID (Username)</label>
                        <input
                            type="text"
                            placeholder="Pick a unique handle"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="hero@example.com"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Secure Password</label>
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Type it once more"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={loading}>
                        {loading ? 'Initiating Character...' : 'Start Your Journey'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    Already have a legend? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Resume Quest</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
