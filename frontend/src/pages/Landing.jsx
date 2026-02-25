import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Users, Clock, Trophy, Sparkles, LayoutDashboard, ShieldCheck, Play, Rocket, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardPreview from '../assets/dashboard_preview.png';

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero" style={{
                padding: '40px 0',
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
                            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                                The Smarter Way to Stay Organized
                            </span>
                        </div>

                        <h1 style={{ fontSize: '4.5rem', marginBottom: '24px', lineHeight: 1.1 }}>
                            Stay Organized. <br />
                            Get More Done <br />
                            With <span style={{ color: 'var(--accent)' }}>LuminaTask.</span>
                        </h1>

                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '540px',
                            marginBottom: '40px',
                            lineHeight: 1.7
                        }}>
                            A clean, simple task manager that helps you plan your day, prioritize your tasks, and stay focused—without the overwhelm.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Link to="/register" className="btn btn-primary xp-glow" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>
                                Get Started Free <ArrowRight size={20} />
                            </Link>
                            {/* <Link to="/login" className="btn btn-ghost" style={{ padding: '18px 32px', fontSize: '1.1rem' }}>
                                <Play size={20} fill="var(--text-main)" /> Watch Demo
                            </Link> */}
                        </div>

                        <div style={{ display: 'flex', gap: '40px', marginTop: '60px' }}>
                            <div>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>200+</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trusted By Teams</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>6M</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Saved Million Hours</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>98%</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>User Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        style={{ position: 'relative' }}
                    >
                        <div className="glass" style={{
                            padding: '12px',
                            background: '#FFFFFF',
                            border: '1px solid var(--border)',
                            borderRadius: '32px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                            position: 'relative'
                        }}>
                            <img
                                src={dashboardPreview}
                                alt="LuminaTask Dashboard"
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
                            />

                            {/* Floating Card UI Element */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                    right: '-20px',
                                    width: '260px',
                                    zIndex: 10
                                }}
                            >
                                <div className="card-elevated magic-glow" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Shield size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <h5 style={{ fontSize: '0.9rem', margin: 0 }}>Protect the Realm</h5>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>High Priority</p>
                                        </div>
                                    </div>
                                    <div className="xp-bar-container" style={{ height: '8px' }}>
                                        <div className="xp-bar-fill" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Teams Love Section */}
            <section id="features" style={{
                padding: '120px 0',
                background: 'var(--accent-gradient)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white' }}>Level Up Your <br /> Productivity Potential</h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', lineHeight: 1.7 }}>
                            LuminaTask helps you organize, prioritize, and complete your tasks
                            effortlessly — all in one clean, premium interface.
                        </p>
                    </div>

                    <div className="feature-grid">
                        <motion.div
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 20px var(--primary-glow)'
                            }}
                            className="glass feature-card"
                            style={{ transition: 'border-color 0.3s ease' }}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                                <Rocket color="var(--primary)" size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Stay Organized</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Keep all your tasks, projects, and priorities in one place — so nothing slips through the cracks.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 20px var(--primary-glow)'
                            }}
                            className="glass feature-card"
                            style={{ transition: 'border-color 0.3s ease' }}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                                <Zap color="var(--primary)" size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Never Miss a Deadline</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Smart reminders and notifications make sure you stay on track every single day.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 20px var(--primary-glow)'
                            }}
                            className="glass feature-card"
                            style={{ transition: 'border-color 0.3s ease' }}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                                <Target color="var(--primary)" size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Prioritize Smartly</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Prioritize tasks intelligently and focus on what actually drives results and earns XP.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section style={{
                padding: '120px 0',
                background: 'linear-gradient(135deg, #FFFFFF 0%,  var(--primary-glow) 100%,#FDFBF0 40%)',
                color: 'var(--text-main)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative mesh-like gradients */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(176, 141, 70, 0.1) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>Get Organized in 4 Simple Steps</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
                            LuminaTask makes productivity effortless with a smooth, intuitive workflow anyone can follow.
                        </p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '16px 36px' }}>Get Started Free <ArrowRight size={20} /></Link>
                            <Link to="/about" className="btn btn-ghost" style={{ padding: '16px 36px' }}>Learn more <ArrowRight size={20} /></Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                                1
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Create Your Tasks</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Add what you need to do and set the basics — LuminaTask handles the structure.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                                2
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Set Priorities</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Choose what matters most, mark deadlines, and let LuminaTask guide your focus.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                                3
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Get Timely Reminders</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Receive alerts exactly when you need them — no more missed tasks or chaos.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                                4
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Track & Complete</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Follow your progress and check off tasks as you go — simple, smooth, and satisfying.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section style={{ padding: '120px 0', background: 'var(--bg-main)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Real Results, Real Impact</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '80px', maxWidth: '600px', margin: '0 auto 80px' }}>
                        Stay on track with smart, timely reminders that keep your day running smoothly.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                        <div className="glass" style={{ padding: '40px 20px', border: 'none', background: 'var(--bg-secondary)', borderBottom: '4px solid var(--primary)' }}>
                            <h3 style={{ fontSize: '3.5rem', marginBottom: '12px', color: 'var(--primary)' }}>40%</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Get more done without the stress</p>
                        </div>
                        <div className="glass" style={{ padding: '40px 20px', border: 'none', background: 'var(--bg-secondary)', borderBottom: '4px solid var(--primary)' }}>
                            <h3 style={{ fontSize: '3.5rem', marginBottom: '12px', color: 'var(--primary)' }}>3X</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Plan your day quicker than before</p>
                        </div>
                        <div className="glass" style={{ padding: '40px 20px', border: 'none', background: 'var(--bg-secondary)', borderBottom: '4px solid var(--primary)' }}>
                            <h3 style={{ fontSize: '3.5rem', marginBottom: '12px', color: 'var(--primary)' }}>87%</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Collaboration efficiency boost</p>
                        </div>
                        <div className="glass" style={{ padding: '40px 20px', border: 'none', background: 'var(--bg-secondary)', borderBottom: '4px solid var(--primary)' }}>
                            <h3 style={{ fontSize: '3.5rem', marginBottom: '12px', color: 'var(--primary)' }}>25k+</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Tasks checked off monthly</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section style={{
                padding: '120px 0',
                background: 'var(--accent-gradient)',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '32px', color: 'white' }}>Ready to Begin Your Quest?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                            Join thousands who have already transformed their daily routine into an adventure.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '20px 48px', fontSize: '1.1rem', fontWeight: 800 }}>
                                Get Started Free <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="btn" style={{ border: '2px solid white', color: 'white', padding: '20px 48px', fontSize: '1.1rem', fontWeight: 700 }}>
                                Login to Account
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '100px 0 60px', borderTop: '1px solid var(--divider)', background: 'var(--bg-main)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '24px' }}>LuminaTask</h3>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.7 }}>
                                The ultimate RPG-inspired productivity platform.
                                Level up your life, one quest at a time.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '24px' }}>Product</h4>
                            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>Features</li>
                                <li>Quests</li>
                                <li>Rankings</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '24px' }}>Support</h4>
                            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>Documentation</li>
                                <li>Community</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '24px' }}>Legal</h4>
                            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>Privacy</li>
                                <li>Terms</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingTop: '40px', borderTop: '1px solid var(--divider)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <p>© 2026 LuminaTask. Forge your own legacy.</p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <span>Twitter</span>
                            <span>Discord</span>
                            <span>GitHub</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
