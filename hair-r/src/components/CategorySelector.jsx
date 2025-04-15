
// /components/dashboard/CategorySelector.jsx
import React from 'react';
import useUserStore from './store/userStore';

const CategorySelector = () => {
  const { selectedCategory, selectCategory } = useUserStore(state => ({
    selectedCategory: state.selectedCategory,
    selectCategory: state.selectCategory,
  }));
  
  return (
    <div className="flex space-x-4 mb-6">
      <button 
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedCategory === 'hair' ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        onClick={() => selectCategory('hair')}
      >
        髮型 NFT
      </button>
      <button 
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedCategory === 'head' ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        onClick={() => selectCategory('head')}
      >
        頭部 NFT
      </button>
      <button 
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedCategory === 'accessory' ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        onClick={() => selectCategory('accessory')}
      >
        配飾
      </button>
    </div>
  );
};

export default CategorySelector;
