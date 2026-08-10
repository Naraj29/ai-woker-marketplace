import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8,9,16,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 0 20px rgba(99,102,241,0.5)',
            }}>⚡</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                WorkerX <span style={{
                  background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>AI</span>
              </span>
              <span style={{ fontSize: 9, color: '#64748b', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Gemma Marketplace
              </span>
            </div>

            {/* Live status */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 99, padding: '4px 10px',
              fontSize: 10, fontWeight: 700, color: '#10b981',
              letterSpacing: '0.06em',
            }}>
              <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              GEMMA LIVE
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/" style={{
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              color: isActive('/') ? '#a5b4fc' : '#94a3b8',
              background: isActive('/') ? 'rgba(99,102,241,0.15)' : 'transparent',
              border: isActive('/') ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              transition: 'all 0.2s',
            }}>Marketplace</Link>

            {isAuthenticated && (
              <Link to="/profile" style={{
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                color: isActive('/profile') ? '#a5b4fc' : '#94a3b8',
                background: isActive('/profile') ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: isActive('/profile') ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>Dashboard</Link>
            )}

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid rgba(99,102,241,0.5)', objectFit: 'cover' }}
                />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', display: 'none' }}>{user?.username}</span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(244,63,94,0.1)',
                    border: '1px solid rgba(244,63,94,0.3)',
                    color: '#f87171',
                    padding: '6px 14px',
                    borderRadius: 10,
                    fontSize: 12, fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn-gradient" style={{ padding: '8px 20px', fontSize: 13 }}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};