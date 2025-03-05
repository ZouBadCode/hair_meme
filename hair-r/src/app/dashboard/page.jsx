"use client";

import React, { useState, useEffect } from 'react';
import NavThing from "@/components/navThing";
import "../../app/glowAnimation.css";
import { Sparkles, Wallet, ChevronDown, ChevronUp, Coins, PiggyBank } from 'lucide-react';
import usePriceStore from '@/components/store/PriceStore';

const DashboardPage = () => {
    // 可滑動的物品欄狀態
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('hair');
    const [selectedNFT, setSelectedNFT] = useState(null);
    
    // 模擬用戶數據 - 實際應用中，這應該來自API或狀態管理
    const [userData, setUserData] = useState({
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
        }
    });
    
    // 設置初始選中的NFT
    useEffect(() => {
        if (userData.nfts[selectedCategory].length > 0) {
            setSelectedNFT(userData.nfts[selectedCategory][0]);
        }
    }, [selectedCategory, userData.nfts]);
    
    // 切換物品欄顯示/隱藏
    const toggleInventory = () => {
        setIsInventoryOpen(!isInventoryOpen);
    };
    
    // 選擇NFT分類
    const selectCategory = (category) => {
        setSelectedCategory(category);
        if (userData.nfts[category].length > 0) {
            setSelectedNFT(userData.nfts[category][0]);
        } else {
            setSelectedNFT(null);
        }
    };
    
    // 選擇具體NFT
    const selectNFT = (nft) => {
        setSelectedNFT(nft);
    };
    
    // 計算質押收益率
    const calculateRewardRate = () => {
        // 簡單計算示例
        return userData.staked.amount * 0.05; // 簡化為5% APY
    };
    
    const [stakingAmount, setStakingAmount] = useState('');
    
    // 質押邏輯
    const handleStake = () => {
        if (!stakingAmount || isNaN(stakingAmount) || parseFloat(stakingAmount) <= 0) {
            alert('請輸入有效金額');
            return;
        }
        
        const amount = parseFloat(stakingAmount);
        if (amount > userData.hairTokens) {
            alert('$HAIR 代幣餘額不足');
            return;
        }
        
        // 更新用戶數據（實際應用中，這將涉及API調用）
        setUserData(prev => ({
            ...prev,
            hairTokens: prev.hairTokens - amount,
            staked: {
                ...prev.staked,
                amount: prev.staked.amount + amount,
                since: new Date().toISOString()
            }
        }));
        
        setStakingAmount('');
    };
    
    // 解除質押邏輯
    const handleUnstake = () => {
        if (!userData.staked.amount) return;
        
        // 更新用戶數據（實際應用中，這將涉及API調用）
        setUserData(prev => ({
            ...prev,
            hairTokens: prev.hairTokens + prev.staked.amount + prev.staked.rewards,
            staked: {
                amount: 0,
                since: "",
                rewards: 0
            }
        }));
    };
    
    // 粒子效果狀態
    const [particles, setParticles] = useState([]);

    // 生成粒子效果
    useEffect(() => {
        // 生成新的粒子
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                    speed: Math.random() * 2 + 0.5,
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
        const interval = setInterval(() => {
            setParticles(prev => 
                prev.map(p => ({
                    ...p,
                    y: p.y - p.speed,
                    opacity: p.y < 10 ? p.opacity * 0.95 : p.opacity,
                }))
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);
    
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
                            <div className="flex flex-col items-center justify-center min-h-[300px] relative">
                                {/* 粒子效果 */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {particles.map(particle => (
                                        <div 
                                            key={particle.id}
                                            className="absolute rounded-full bg-white"
                                            style={{
                                                left: `${particle.x}%`,
                                                top: `${particle.y}%`,
                                                width: `${particle.size}px`,
                                                height: `${particle.size}px`,
                                                opacity: particle.opacity,
                                            }}
                                        />
                                    ))}
                                </div>
                                
                                {selectedNFT ? (
                                    <div className="text-center z-10">
                                        <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 border-4 border-yellow-300 shadow-lg pulse-grow">
                                            <span className="text-8xl">{selectedNFT.emoji}</span>
                                        </div>
                                        
                                        <h3 className="text-3xl font-bold mb-2 text-yellow-300">
                                            {selectedNFT.name}
                                        </h3>
                                        
                                        <div className="flex items-center justify-center mb-4">
                                            <span className="mr-2 text-pink-400">稀有度：</span>
                                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm">
                                                {selectedNFT.rarity}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-300 max-w-md mx-auto">
                                            {selectedNFT.description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 z-10">
                                        <p className="text-2xl">尚未選擇NFT</p>
                                        <p>從下方物品欄選擇一個NFT</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* 物品欄切換按鈕 */}
                            <button 
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-all meme-button"
                                onClick={toggleInventory}
                            >
                                <span className="mr-2">物品欄</span>
                                {isInventoryOpen ? <ChevronDown /> : <ChevronUp />}
                            </button>
                        </div>
                        
                        {/* 右側面板：代幣信息和質押 */}
                        <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-purple-500 p-6 meme-card">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <Wallet className="mr-2 text-yellow-300" />
                                我的 $HAIR 代幣
                            </h2>
                            
                            {/* 代幣餘額 */}
                            <div className="bg-gray-700 rounded-xl p-6 mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300">可用餘額：</span>
                                    <span className="text-2xl font-bold text-yellow-300">{userData.hairTokens} $HAIR</span>
                                </div>
                                <div className="flex items-center">
                                    <img src="/assets/hair.png" alt="$HAIR" className="w-8 h-8 mr-2" />
                                    <div className="h-2 bg-yellow-300 bg-opacity-50 flex-grow rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-yellow-300"
                                            style={{ width: `${(userData.hairTokens / (userData.hairTokens + userData.staked.amount)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 質押區域 */}
                            <div className="bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    <PiggyBank className="mr-2 text-pink-400" />
                                    質押您的 $HAIR
                                </h3>
                                
                                {/* 當前質押金額 */}
                                {userData.staked.amount > 0 && (
                                    <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span>質押金額：</span>
                                            <span className="font-bold text-pink-400">{userData.staked.amount} $HAIR</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>收益率：</span>
                                            <span className="font-bold text-green-400">{calculateRewardRate()} $HAIR/月</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>待領獎勵：</span>
                                            <span className="font-bold text-yellow-300">+{userData.staked.rewards} $HAIR</span>
                                        </div>
                                        <button 
                                            className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors"
                                            onClick={handleUnstake}
                                        >
                                            解除所有質押 & 領取獎勵
                                        </button>
                                    </div>
                                )}
                                
                                {/* 質押控制 */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={stakingAmount}
                                        onChange={(e) => setStakingAmount(e.target.value)}
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        placeholder="質押金額"
                                    />
                                    <button 
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                                        onClick={handleStake}
                                    >
                                        <Coins className="mr-2" />
                                        質押
                                    </button>
                                </div>
                                
                                <p className="mt-4 text-sm text-gray-400">
                                    質押$HAIR可以獲得被動獎勵，並且隨著時間推移提升您的NFT等級！
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 可滑動的物品欄面板 */}
                    <div 
                        className={`mt-4 bg-gray-800 bg-opacity-90 rounded-t-2xl border-t-2 border-l-2 border-r-2 border-yellow-500 transition-all duration-500 ${
                            isInventoryOpen ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 overflow-hidden py-0'
                        }`}
                    >
                        {/* 分類選擇器 */}
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
                        
                        {/* NFT物品網格 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                            {userData.nfts[selectedCategory].map((nft) => (
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
                            
                            {userData.nfts[selectedCategory].length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-400">
                                    <p>在您的物品欄中未找到{
                                        selectedCategory === 'hair' ? '髮型' : 
                                        selectedCategory === 'head' ? '頭部' : '配飾'
                                    } NFT</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;