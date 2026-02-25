import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Double check your Hero ID and Password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
            <div className="glass float" style={{ width: '100%', maxWidth: '440px', padding: '48px', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px -5px rgba(198, 167, 94, 0.3)' }}>
                        <Sparkles size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Enter your credentials to resume your journey.</p>
                </div>

                {error && <div style={{ background: '#FFF1F0', border: '1px solid #FFA39E', color: '#CF1322', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Hero Username</label>
                        <input
                            type="text"
                            placeholder="e.g. shadow_stalker"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Secret Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In to LuminaTask'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    New to the realm? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>Start Training</Link>
                </div>
            </div>
        </div >
    );
};

export default Login;
