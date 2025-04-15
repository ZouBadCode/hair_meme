// /components/dashboard/ParticleEffect.jsx
import React, { useEffect } from 'react';
import useParticleStore from './store/particleStore';

const ParticleEffect = () => {
  const { particles, generateParticles, updateParticles } = useParticleStore();
  
  useEffect(() => {
    // 生成初始粒子
    generateParticles();
    
    // 設定粒子更新定時器
    const interval = setInterval(() => {
      updateParticles();
    }, 100);

    return () => clearInterval(interval);
  }, [generateParticles, updateParticles]);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
