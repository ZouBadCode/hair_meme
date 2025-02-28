"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 創建主題上下文
const ThemeContext = createContext();

// 主題提供者組件
export const ThemeProvider = ({ children }) => {
  // 檢查是否優先使用暗色模式以及本地存儲的主題
  const [theme, setTheme] = useState('light');
  
  // 在客戶端加載時從localStorage讀取主題設置
  useEffect(() => {
    // 檢查用戶的系統偏好設置
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 從localStorage讀取保存的主題，如果沒有則使用系統偏好
    const savedTheme = localStorage.getItem('hair-theme');
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    
    // 更新文檔的data-theme屬性
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    // 如果是dark模式，添加dark類到body
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // 切換主題函數
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // 保存到localStorage
    localStorage.setItem('hair-theme', newTheme);
    
    // 更新文檔屬性
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // 更新dark類
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主題的自定義Hook
export const useTheme = () => {
  return useContext(ThemeContext);
};