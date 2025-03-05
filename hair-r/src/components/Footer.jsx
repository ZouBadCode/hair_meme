"use client";
import React from 'react';
import { useTheme } from './ThemeContext';
import { Twitter, Github, Send, MessageSquare } from 'lucide-react';

const Footer = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  
  const socialLinks = [
    { 
      name: 'X', 
      icon: <Twitter className="w-6 h-6" />, 
      url: 'https://x.com',
      color: '#1DA1F2'
    },
    { 
      name: 'Discord', 
      icon: <MessageSquare className="w-6 h-6" />, 
      url: 'https://discord.gg',
      color: '#5865F2'
    },
    { 
      name: 'GitHub', 
      icon: <Github className="w-6 h-6" />, 
      url: 'https://github.com',
      color: '#24292e'
    },
    { 
      name: 'Telegram', 
      icon: <Send className="w-6 h-6" />, 
      url: 'https://t.me',
      color: '#0088cc'
    }
  ];

  return (
    <footer className={`relative overflow-hidden py-12 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 to-purple-900' 
        : 'bg-gradient-to-r from-purple-900 to-pink-600'
    } text-white`}>
      {/* 粒子效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDuration: `${Math.random() * 3 + 1}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo 和描述區 */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/assets/hair.png" 
                alt="$HAIR Logo" 
                className="w-12 h-12 animate-pulse" 
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500 text-transparent bg-clip-text">
                $HAIR
              </span>
            </div>
            <p className="text-center md:text-left text-gray-200 max-w-md">
              $HAIR - 拯救你的秀髮！告別禿頭！一個充滿趣味的加密貨幣項目，讓你的錢包和頭髮一同成長！
            </p>
          </div>
          
          {/* 快速鏈接區 */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-yellow-300 pb-2">
              快速鏈接
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-300 transition-colors duration-300">首頁</a>
              </li>
              <li>
                <a href="/nft" className="hover:text-yellow-300 transition-colors duration-300">NFT</a>
              </li>
              <li>
                <a href="/hairpaper" className="hover:text-yellow-300 transition-colors duration-300">Hair Paper</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-yellow-300 transition-colors duration-300">儀表板</a>
              </li>
            </ul>
          </div>
          
          {/* 社交媒體按鈕區 */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-yellow-300 pb-2">
              社區連結
            </h3>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.name}
                >
                  <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" 
                       style={{ background: social.color }}></div>
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform 
                    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white bg-opacity-20'}
                    backdrop-blur-sm group-hover:scale-110 border border-white border-opacity-30 group-hover:border-opacity-0`}
                  >
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* 底部口號 */}
        <div className="text-center pt-8 border-t border-white border-opacity-20">
          <h2 className="text-2xl font-bold mb-2 wiggle">
            💪 Together Strong! 一起對抗掉髮！ 💪
          </h2>
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} $HAIR. 所有權利未保留，因為我們是開源的！
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;