import React from 'react';
import './trustBadge.css';
import { BsShieldFillCheck, BsLockFill, BsHeadset } from 'react-icons/bs';

const TrustBadge = ({ icon, text }) => {
    const getIcon = () => {
        switch (icon) {
            case 'shield': return <BsShieldFillCheck />;
            case 'lock': return <BsLockFill />;
            case 'support': return <BsHeadset />;
            default: return <BsShieldFillCheck />;
        }
    };

    return (
        <div className="trust-badge">
            <span className="trust-icon">{getIcon()}</span>
            <span className="trust-text">{text}</span>
        </div>
    );
};

export default TrustBadge;
