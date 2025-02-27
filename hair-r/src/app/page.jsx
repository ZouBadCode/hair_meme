"use client";
import NavThing from "@/components/navThing";
import HairGrowthApp from "../components/sale_component";
import IntroHome from "../components/introHome";
import HomeHead from "../components/3ds/HomeHead";
import "./glowAnimation.css";
import { useEffect, useState } from "react";

export default function Land() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 簡單的載入動畫
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-pink-500">
        <div className="text-center">
          <img 
            src="/assets/hair.png" 
            alt="$HAIR Logo" 
            className="w-32 h-32 mx-auto animate-bounce mb-8" 
          />
          <h1 className="text-4xl font-bold text-white">Loading your $HAIR...</h1>
          <div className="mt-6 w-64 h-4 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 animate-pulse" style={{width: '70%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* 新的NavBar */}
      <NavThing />
      
      {/* Hero部分 */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen pt-20 relative">
        {/* 3D頭部作為背景，但添加一些過濾效果使其更融合 */}
        <div className="absolute inset-0 z-0 opacity-70">
          <HomeHead />
        </div>
        
        {/* 左側文字部分 */}
        <div className="z-10 text-center mx-4 mb-12 md:mb-0 md:mx-8 md:w-1/2 transform hover:scale-105 transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-bold meme-text">Fill your wallet with some</h1>
          <h2 className="area wiggle">\ $HAIR /</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="meme-button flex items-center">
              <span className="mr-2">👨‍🦲</span> Start Bald
            </button>
            <button className="meme-button flex items-center">
              <span className="mr-2">🦁</span> End Majestic
            </button>
          </div>
        </div>
        
        {/* 右側App部分 */}
        <div className="z-10 transform hover:rotate-2 transition-all duration-500">
          <HairGrowthApp />
        </div>
      </div>
      
      {/* 功能介紹部分 */}
      <div className="py-20 z-10 relative bg-white bg-opacity-80">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 meme-text meme-gradient-text">
            What CAN $HAIR DO?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 卡片1 */}
            <div className="meme-card bg-yellow-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-4 border-black">
                  <video autoPlay loop muted className="w-full h-full object-cover">
                    <source src="/assets/SPIN.mp4" type="video/mp4" />
                  </video>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Get Some <span className="text-purple-600">FANCY</span></h3>
                  <p className="text-xl">HAIR FOR YOUR CHARMING HEAD</p>
                </div>
              </div>
              <p className="text-lg">轉變你的形象，從普通禿頭變身獅子王！$HAIR不只是一個代幣，它是你頭上的自信！</p>
            </div>
            
            {/* 卡片2 */}
            <div className="meme-card bg-pink-100 p-8">
              <h3 className="text-2xl font-bold mb-4">Hair Growth Stages</h3>
              <div className="flex justify-between text-center">
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">👨‍🦲</span>
                  <p>Stage 1</p>
                  <p className="text-sm">Bald</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">👨</span>
                  <p>Stage 2</p>
                  <p className="text-sm">Growing</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🧔</span>
                  <p>Stage 3</p>
                  <p className="text-sm">Thick</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🦁</span>
                  <p>Stage 4</p>
                  <p className="text-sm">Majestic</p>
                </div>
              </div>
            </div>
            
            {/* 卡片3 */}
            <div className="meme-card bg-blue-100 p-8 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-center">Participate in our Token Economy</h3>
              <div className="flex flex-wrap justify-center gap-8 mt-6">
                <div className="text-center pulse-grow">
                  <span className="text-5xl block mb-4">💰</span>
                  <p className="font-bold">質押</p>
                  <p>Stake $HAIR</p>
                </div>
                <div className="text-center pulse-grow">
                  <span className="text-5xl block mb-4">🎮</span>
                  <p className="font-bold">遊戲</p>
                  <p>Play Games</p>
                </div>
                <div className="text-center pulse-grow">
                  <span className="text-5xl block mb-4">🎁</span>
                  <p className="font-bold">獎勵</p>
                  <p>Get Rewards</p>
                </div>
                <div className="text-center pulse-grow">
                  <span className="text-5xl block mb-4">🦁</span>
                  <p className="font-bold">進化</p>
                  <p>Evolve Hair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 原IntroHome組件將其融入上面的設計中 */}
      
      {/* 底部口號 */}
      <div className="text-center py-12 bg-gradient-to-r from-purple-900 to-pink-600 text-white">
        <h2 className="text-4xl font-bold mb-4 wiggle">
          💪 Together Strong! 一起對抗掉髮！ 💪
        </h2>
        <p className="text-xl max-w-2xl mx-auto">
          每買入一個$HAIR代幣，就是為禿頭革命貢獻一份力量！
        </p>
      </div>
    </div>
  );
}