"use client";
import React, { useState, useEffect } from 'react';
import ConnetWalletBtn from './connetWalletBTN';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext';

const NavThing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // 添加錯誤處理，當 useTheme 不可用時使用默認值
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  
  // 檢測滾動以更改navbar樣式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", text: "$HAIR", emoji: "🦁" },
    { href: "/nft", text: "NFT", emoji: "👑" },
    { href: "/hairpaper", text: "Hair Paper", emoji: "📜" },
    { href: "/dashboard", text: "儀表板", emoji: "📊" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900 bg-opacity-90 shadow-lg' 
          : 'bg-purple-900 bg-opacity-90 shadow-lg'
        : 'bg-transparent'
    } py-4 px-6`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo區域 */}
        <div className="flex items-center space-x-2">
          <img 
            src="/assets/hair.png" 
            alt="$HAIR Logo" 
            className="w-10 h-10 animate-bounce" 
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500 text-transparent bg-clip-text">
            $HAIR
          </span>
        </div>

        {/* 導航連結 */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <li key={index} className="group">
              <Link href={item.href}>
                <span className="flex items-center space-x-1 text-white dark:text-white font-bold hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  <span>{item.emoji}</span>
                  <span className="border-b-2 border-transparent group-hover:border-yellow-300 pb-1">
                    {item.text}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 工具按鈕區域 */}
        <div className="flex items-center space-x-4">
          {/* 主題切換按鈕 */}
          <div className="relative group">
            {themeContext ? <ThemeToggle /> : null}
          </div>

          {/* 連接錢包按鈕 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <ConnetWalletBtn />
            </div>
          </div>
        </div>

        {/* 移動端菜單按鈕 */}
        <button className="md:hidden text-white dark:text-white text-2xl">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavThing;