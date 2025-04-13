
// /components/store/particleStore.js
import { create } from 'zustand';

const useParticleStore = create((set) => ({
  particles: [],
  
  // 生成新的粒子
  generateParticles: () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 0.5,
      });
    }
    set({ particles: newParticles });
  },
  
  // 更新粒子位置
  updateParticles: () => set((state) => ({
    particles: state.particles.map(p => ({
      ...p,
      y: p.y - p.speed,
      opacity: p.y < 10 ? p.opacity * 0.95 : p.opacity,
    }))
  }))
}));

export default useParticleStore;