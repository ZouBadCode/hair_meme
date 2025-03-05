"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import { Volume2 } from 'lucide-react';

const ScrollingNews = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(45); // 初始動畫時間

  // 頭髮相關的迷因新聞
  const hairMemes = [
    { 
      icon: "💰", 
      text: "最新研究表明：持有 $HAIR 可能導致頭髮生長速度提高420%！" 
    },
    { 
      icon: "📈", 
      text: "市場報告：「禿頭」搜索量下降，「$HAIR」搜索量創歷史新高！" 
    },
    { 
      icon: "👨‍🦲", 
      text: "驚人轉變！某CEO在購買$HAIR代幣後，頭髮狀態從「光頭」變為「獅子鬃毛」！" 
    },
    { 
      icon: "🦁", 
      text: "$HAIR 市值突破新高！用戶紛紛報告頭髮長得太快，理髮店生意爆滿！"
    },
    { 
      icon: "🧪", 
      text: "秘密實驗室：$HAIR 代幣挖礦或許與真實頭髮生長速度有關聯！" 
    },
    { 
      icon: "💸", 
      text: "經濟學家困惑：為何$HAIR持有者總是頭髮濃密？這挑戰了傳統金融理論！" 
    },
    { 
      icon: "🎮", 
      text: "遊戲開發商公佈：即將推出「$HAIR成長模擬器」，讓你的NFT頭髮在元宇宙生長！" 
    },
    { 
      icon: "🚀", 
      text: "$HAIR空投活動結束，參與者報告頭皮發熱感，這是好兆頭！" 
    },
  ];

  // 計算適合的動畫時間
  useEffect(() => {
    const calculateAnimationDuration = () => {
      if (scrollContainerRef.current) {
        // 根據內容長度調整動畫時間
        const contentWidth = scrollContainerRef.current.scrollWidth / 2;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        // 每100像素約需3秒的滾動時間
        const calculatedDuration = (contentWidth / 100) * 3;
        setAnimationDuration(calculatedDuration);
      }
    };

    // 初始計算
    calculateAnimationDuration();

    // 窗口大小改變時重新計算
    window.addEventListener('resize', calculateAnimationDuration);
    return () => window.removeEventListener('resize', calculateAnimationDuration);
  }, []);

  // 自定義滾動動畫樣式，使用計算的動畫時間
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-50% - 16px)); }
      }
      .animate-marquee {
        animation: marquee ${animationDuration}s linear infinite;
      }
      .animate-marquee.paused {
        animation-play-state: paused;
      }
      
      /* 添加警報閃光線的動畫 */
      @keyframes alertPulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
      }
      .animate-alert-pulse {
        animation: alertPulse 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [animationDuration]);

  // 自動輪播高亮效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hairMemes.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [hairMemes.length]);

  return (
    <div 
      className={`w-full overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-900 border-b border-purple-800' 
          : 'bg-purple-900 border-b border-pink-500'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 添加頂部紅色警報閃光線 */}
      <div className="h-[2px] bg-red-600 animate-alert-pulse"></div>
      
      {/* 快訊報導標題 */}
      <div className="relative group">
        {/* 滾動快訊 */}
        <div className="py-3 px-4 overflow-hidden relative">
          {/* 閃光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-1000"></div>
          
          <div 
            ref={scrollContainerRef}
            className={`flex whitespace-nowrap ${isPaused ? 'paused' : ''} animate-marquee`}
          >
            {/* 固定標題 */}
            <div className="inline-flex items-center mr-6 bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 rounded-full">
              <Volume2 className="w-4 h-4 mr-2 text-white" />
              <span className="text-white font-bold">$HAIR 快訊</span>
            </div>
            
            {/* 滾動內容 - 第一組 */}
            {hairMemes.map((meme, index) => (
              <div 
                key={index} 
                className={`inline-flex items-center mx-8 transition-all duration-300 ${
                  index === currentIndex ? 'scale-110 text-yellow-300' : 'text-white'
                }`}
              >
                <span className="text-xl mr-2">{meme.icon}</span>
                <span className="font-medium">{meme.text}</span>
                <span className="mx-8 text-gray-400">|</span>
              </div>
            ))}
            
            {/* 滾動內容 - 第二組（完全相同，確保無縫循環） */}
            {hairMemes.map((meme, index) => (
              <div 
                key={`repeat-${index}`} 
                className={`inline-flex items-center mx-8 transition-all duration-300 ${
                  index === currentIndex ? 'scale-110 text-yellow-300' : 'text-white'
                }`}
              >
                <span className="text-xl mr-2">{meme.icon}</span>
                <span className="font-medium">{meme.text}</span>
                <span className="mx-8 text-gray-400">|</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 兩側漸變效果 */}
        <div className={`absolute left-0 top-0 h-full w-16 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-gray-900 to-transparent' 
            : 'bg-gradient-to-r from-purple-900 to-transparent'
        }`}></div>
        <div className={`absolute right-0 top-0 h-full w-16 ${
          theme === 'dark' 
            ? 'bg-gradient-to-l from-gray-900 to-transparent' 
            : 'bg-gradient-to-l from-purple-900 to-transparent'
        }`}></div>
      </div>
      
      {/* 添加底部紅色警報閃光線 */}
      <div className="h-[2px] bg-red-600 animate-alert-pulse"></div>
    </div>
  );
};

export default ScrollingNews;