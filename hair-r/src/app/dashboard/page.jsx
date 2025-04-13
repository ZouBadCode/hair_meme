"use client";

import React, { useEffect } from 'react';
import { Sparkles, Wallet } from 'lucide-react';
import NavThing from "@/components/navThing";
import Footer from "@/components/Footer";
import "../../app/glowAnimation.css";

// 引入 Zustand store
import useUserStore from '@/components/store/userStore';

// 引入自定義組件
import NFTDisplay from '@/components/NFTDisplay';
import InventoryToggle from '@/components/InventoryToggle';
import TokenBalance from '@/components/TokenBalance';
import StakingPanel from '@/components/StakingPanel';
import NFTInventory from '@/components/NFTInventory';

const DashboardPage = () => {
  const initSelectedNFT = useUserStore(state => state.initSelectedNFT);
  
  // 初始化選中的 NFT
  useEffect(() => {
    initSelectedNFT();
  }, [initSelectedNFT]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white">
      <NavThing />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 頂部標題 */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold meme-text mb-4">
              我的 <span className="text-yellow-300">$HAIR</span> 儀表板
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              在這裡管理您的NFT和$HAIR代幣
            </p>
            <div className="mt-6 max-w-xl mx-auto h-2 bg-gradient-to-r from-pink-500 via-yellow-300 to-purple-500 rounded-full"></div>
          </div>
          
          {/* 主要內容 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側面板：NFT 展示 */}
            <div className="lg:col-span-2 bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-pink-500 p-6 relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="mr-2 text-yellow-300" />
                我的NFT收藏
              </h2>
              
              {/* NFT展示區域 */}
              <NFTDisplay />
              
              {/* 物品欄切換按鈕 */}
              <InventoryToggle />
            </div>
            
            {/* 右側面板：代幣信息和質押 */}
            <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-purple-500 p-6 meme-card">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Wallet className="mr-2 text-yellow-300" />
                我的 $HAIR 代幣
              </h2>
              
              {/* 代幣餘額 */}
              <TokenBalance />
              
              {/* 質押區域 */}
              <StakingPanel />
            </div>
          </div>
          
          {/* 可滑動的物品欄面板 */}
          <NFTInventory />
        </div>
      </div>
      
      {/* 添加頁尾 */}
      <Footer />
    </div>
  );
};

export default DashboardPage;