// /components/dashboard/NFTGrid.jsx
import React from 'react';
import useUserStore from './store/userStore';

const NFTGrid = () => {
  const { nfts, selectedCategory, selectedNFT, selectNFT } = useUserStore(state => ({
    nfts: state.nfts,
    selectedCategory: state.selectedCategory,
    selectedNFT: state.selectedNFT,
    selectNFT: state.selectNFT,
  }));
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {nfts[selectedCategory].map((nft) => (
        <div 
          key={nft.id}
          className={`p-4 bg-gray-700 rounded-xl cursor-pointer transition-all hover:scale-105 ${
            selectedNFT && selectedNFT.id === nft.id ? 'ring-2 ring-yellow-400' : ''
          }`}
          onClick={() => selectNFT(nft)}
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2">{nft.emoji}</div>
            <div className="text-center">
              <p className="font-bold">{nft.name}</p>
              <p className="text-xs text-gray-400">{nft.rarity}</p>
            </div>
          </div>
        </div>
      ))}
      
      {nfts[selectedCategory].length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-400">
          <p>在您的物品欄中未找到{
            selectedCategory === 'hair' ? '髮型' : 
            selectedCategory === 'head' ? '頭部' : '配飾'
          } NFT</p>
        </div>
      )}
    </div>
  );
};

export default NFTGrid;