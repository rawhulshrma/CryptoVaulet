import React from 'react';

export default function Loader() {
  // Container style to center the loader
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // background: '#f5f5f5'
  };

  const loaderStyle = {
    width: '20px',
    height: '80px',
    background: '#935936',
    position: 'relative',
  };

  const loaderBeforeStyle = {
    content: '""',
    position: 'absolute',
    top: '10px',
    left: '-22px',
    width: '25px',
    height: '60px',
    background: `
      radial-gradient(farthest-side, #fff 92%, transparent) 60% 6px/4px 4px,
      radial-gradient(50% 60%, #53707b 92%, transparent) center/70% 55%,
      radial-gradient(farthest-side, #53707b 92%, transparent) 50% 3px/14px 14px,
      radial-gradient(142% 100% at bottom right, transparent 64%, #53707b 65%) bottom/57% 40%,
      conic-gradient(from -120deg at right, #53707b 36deg, transparent 0) 100% 3px/51% 12px,
      conic-gradient(from 120deg at top left, transparent, #ef524a 2deg 40deg, transparent 43deg) top/100% 10px`,
    backgroundRepeat: 'no-repeat',
    transform: 'rotate(-26deg)',
    transformOrigin: '100% 80%',
    animation: 'l16 0.5s infinite ease-in-out alternate', // Made animation smoother
  };

  const loaderAfterStyle = {
    content: '""',
    position: 'absolute',
    width: '6px',
    height: '12px',
    left: '-6px',
    bottom: '15px',
    borderRadius: '100px 0 0 100px',
    background: '#53707b',
  };

  const keyframesStyle = `
    @keyframes l16 {
      0% { transform: rotate(-26deg); }
      100% { transform: rotate(0); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style>
      <div style={loaderStyle}>
        <div style={loaderBeforeStyle}></div>
        <div style={loaderAfterStyle}></div>
      </div>
    </div>
  );
};