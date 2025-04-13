// /components/store/userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  // 用戶數據
  hairTokens: 1250,
  nfts: {
    hair: [
      { id: 1, name: "BALD", emoji: "👨‍🦲", rarity: "Common", description: "初始階段，光頭狀態。每個偉大的$HAIR之旅都始於此。" },
      { id: 2, name: "GROWING", emoji: "👨", rarity: "Uncommon", description: "頭髮開始生長，這是希望的開始！" },
      { id: 3, name: "THICK", emoji: "🧔", rarity: "Rare", description: "豐厚的頭髮，感受自信回歸的力量！" }
    ],
    head: [
      { id: 4, name: "Default Head", emoji: "👤", rarity: "Common", description: "基本造型，簡約而不失魅力。" },
      { id: 5, name: "Cool Head", emoji: "😎", rarity: "Uncommon", description: "酷炫造型，戴上它讓所有人羨慕不已！" }
    ],
    accessory: [
      { id: 6, name: "Hat", emoji: "🎩", rarity: "Uncommon", description: "經典帽子，彰顯您的紳士風範。" },
      { id: 7, name: "Crown", emoji: "👑", rarity: "Legendary", description: "皇冠配飾，成為$HAIR王國的統治者！" }
    ]
  },
  staked: {
    amount: 500,
    since: "2025-02-10T14:48:00",
    rewards: 25
  },
  
  // UI 狀態
  isInventoryOpen: false,
  selectedCategory: 'hair',
  selectedNFT: null,
  stakingAmount: '',
  
  // 初始化選中的 NFT
  initSelectedNFT: () => set((state) => {
    if (state.nfts[state.selectedCategory].length > 0) {
      return { selectedNFT: state.nfts[state.selectedCategory][0] };
    }
    return { selectedNFT: null };
  }),
  
  // 切換物品欄顯示/隱藏
  toggleInventory: () => set((state) => ({ 
    isInventoryOpen: !state.isInventoryOpen 
  })),
  
  // 選擇 NFT 分類
  selectCategory: (category) => set((state) => {
    let selectedNFT = null;
    if (state.nfts[category].length > 0) {
      selectedNFT = state.nfts[category][0];
    }
    return { 
      selectedCategory: category,
      selectedNFT 
    };
  }),
  
  // 選擇具體 NFT
  selectNFT: (nft) => set(() => ({ selectedNFT: nft })),
  
  // 設置質押金額
  setStakingAmount: (amount) => set(() => ({ stakingAmount: amount })),
  
  // 質押邏輯
  handleStake: () => set((state) => {
    if (!state.stakingAmount || isNaN(state.stakingAmount) || parseFloat(state.stakingAmount) <= 0) {
      alert('請輸入有效金額');
      return state;
    }
    
    const amount = parseFloat(state.stakingAmount);
    if (amount > state.hairTokens) {
      alert('$HAIR 代幣餘額不足');
      return state;
    }
    
    return {
      hairTokens: state.hairTokens - amount,
      staked: {
        ...state.staked,
        amount: state.staked.amount + amount,
        since: new Date().toISOString()
      },
      stakingAmount: ''
    };
  }),
  
  // 解除質押邏輯
  handleUnstake: () => set((state) => {
    if (!state.staked.amount) return state;
    
    return {
      hairTokens: state.hairTokens + state.staked.amount + state.staked.rewards,
      staked: {
        amount: 0,
        since: "",
        rewards: 0
      }
    };
  }),
  
  // 計算質押收益率
  calculateRewardRate: (state) => {
    return state.staked.amount * 0.05; // 簡化為5% APY
  }
}));

export default useUserStore;
