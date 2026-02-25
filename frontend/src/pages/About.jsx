import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page" style={{ padding: '80px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                {/* Hero section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '12px 24px',
                        background: 'var(--primary-glow)',
                        borderRadius: '99px',
                        color: 'var(--primary-dark)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: '24px',
                        border: '1px solid var(--primary-dark)'
                    }}>
                        OUR PHILOSOPHY
                    </div>
                    <h1 style={{ fontSize: '4rem', marginBottom: '24px', lineHeight: 1.1 }}>
                        The Art of <span style={{ color: 'var(--primary)' }}>Refined Momentum</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        Productivity shouldn't feel like a chore. It should feel like an evolution.
                        LuminaTask transforms your daily grind into a quest for excellence.
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div style={{ display: 'grid', gap: '80px' }}>
                    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'center' }}>
                        <div className="glass" style={{ padding: '40px', background: 'var(--bg-secondary)', position: 'relative', borderBottom: '4px solid var(--primary)' }}>
                            <Target size={120} color="var(--primary)" style={{ opacity: 0.1, position: 'absolute', top: '20px', right: '20px' }} />
                            <h2 style={{ fontSize: '2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Target color="var(--primary)" /> The Mission Hook
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                                Every task you add isn't just a line on a list. It's a **Quest**. By framing your work as a series of strategic missions, we help you overcome decision fatigue and focus on the "Win Conditions" of your day.
                            </p>
                            <div style={{ height: '4px', width: '60px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>How It Works:</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {[
                                    { icon: <Zap color="var(--primary)" />, title: "Earn XP", text: "Complete missions to gain experience and track your productivity level in real-time." },
                                    { icon: <Shield color="var(--primary)" />, title: "Main Quest Priority", text: "Identify your critical tasks and protect them from distractions." },
                                    { icon: <Rocket color="var(--primary)" />, title: "Level Up", text: "Watch your stats grow as you master new habits and workflows." }
                                ].map((step, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{step.title}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--accent-gradient)',
                        borderRadius: '40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
                        <Sparkles size={48} color="white" style={{ marginBottom: '32px', position: 'relative', zIndex: 1 }} />
                        <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white', position: 'relative', zIndex: 1 }}>Ready to Begin Your Legend?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', position: 'relative', zIndex: 1 }}>
                            Join thousands of creators, engineers, and adventurers who have redefined how they work.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                            <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '16px 40px', fontWeight: 800 }}>Initialize Character <ArrowRight size={20} /></Link>
                            <Link to="/" className="btn" style={{ border: '2px solid white', color: 'white', padding: '16px 40px' }}>View Landing</Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
