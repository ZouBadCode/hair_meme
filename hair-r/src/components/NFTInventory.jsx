// /components/dashboard/NFTInventory.jsx
import React from 'react';
import useUserStore from './store/userStore';
import CategorySelector from './CategorySelector';
import NFTGrid from './NFTGrid';

const NFTInventory = () => {
  const isInventoryOpen = useUserStore(state => state.isInventoryOpen);
  
  return (
    <div 
      className={`mt-4 bg-gray-800 bg-opacity-90 rounded-t-2xl border-t-2 border-l-2 border-r-2 border-yellow-500 transition-all duration-500 ${
        isInventoryOpen ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 overflow-hidden py-0'
      }`}
    >
      {/* 分類選擇器 */}
      <CategorySelector />
      
      {/* NFT物品網格 */}
      <NFTGrid />
    </div>
  );
};

export default NFTInventory;
