
// /components/dashboard/InventoryToggle.jsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useUserStore from '../store/userStore';

const InventoryToggle = () => {
  const { isInventoryOpen, toggleInventory } = useUserStore(state => ({
    isInventoryOpen: state.isInventoryOpen,
    toggleInventory: state.toggleInventory,
  }));
  
  return (
    <button 
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-all meme-button"
      onClick={toggleInventory}
    >
      <span className="mr-2">物品欄</span>
      {isInventoryOpen ? <ChevronDown /> : <ChevronUp />}
    </button>
  );
};

export default InventoryToggle;