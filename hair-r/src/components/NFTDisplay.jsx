// /components/dashboard/
import React from 'react';
import useUserStore from '../store/userStore';
import ParticleEffect from './ParticleEffect';

const NFTDisplay = () => {
  const selectedNFT = useUserStore(state => state.selectedNFT);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] relative">
      {/* 粒子效果 */}
      <ParticleEffect />
      
      {selectedNFT ? (
        <div className="text-center z-10">
          <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 border-4 border-yellow-300 shadow-lg pulse-grow">
            <span className="text-8xl">{selectedNFT.emoji}</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-2 text-yellow-300">
            {selectedNFT.name}
          </h3>
          
          <div className="flex items-center justify-center mb-4">
            <span className="mr-2 text-pink-400">稀有度：</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm">
              {selectedNFT.rarity}
            </span>
          </div>
          
          <p className="text-gray-300 max-w-md mx-auto">
            {selectedNFT.description}
          </p>
        </div>
      ) : (
        <div className="text-center text-gray-400 z-10">
          <p className="text-2xl">尚未選擇NFT</p>
          <p>從下方物品欄選擇一個NFT</p>
        </div>
      )}
    </div>
  );
};

export default NFTDisplay;