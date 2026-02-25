import React from 'react';

const ExperienceBar = ({ xp }) => {
    const currentXP = xp % 100;
    const percentage = Math.min(100, Math.max(0, currentXP));

    return (
        <div style={{ width: '100%', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>Progress</span>
                <span>{currentXP} / 100 XP</span>
            </div>
            <div className="xp-bar-container">
                <div
                    className="xp-bar-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ExperienceBar;
