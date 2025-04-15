"use client";
import React, { useState, useEffect } from 'react';
import NavThing from "@/components/navThing";
import Footer from "@/components/Footer"; // 引入頁尾組件
import NftFrame from '../../components/nftFrame';
import "../glowAnimation.css";
import FrameAtom from "@/components/3ds/3dFrameatom";
const NftPage = () => {
    const [selectedNft, setSelectedNft] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nftStages = [
        { 
            emoji: "👨‍🦲", 
            name: "BALD",
            description: "光滑而孤獨的頭頂",
            rarity: "Base"
        },
        { 
            emoji: "👨", 
            name: "GROWING",
            description: "用水澆灌(mint)出的美好狀態",
            rarity: "Stage 1"
        },
        { 
            emoji: "🧔", 
            name: "THICK",
            description: "和 $HAIR 一起飛上天際",
            rarity: "Stage 2"
        },
        { 
            emoji: "🦁", 
            name: "MAJESTIC",
            description: "來自天外之力的成長，需要某些神奇的力量…？",
            rarity: "???"
        },
    ];

    const handleNftSelect = (index) => {
        setIsAnimating(true);
        setTimeout(() => {
            setSelectedNft(index);
            setIsAnimating(false);
        }, 500);
    };

    // 煙霧效果的粒子
    const [particles, setParticles] = useState([]);

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
                    {/* 頭部標題 */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold meme-text mb-4">
                            Meet <span className="text-yellow-300">$HAIR</span> NFTs
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Put Your HEAD on the Chain and make them jealous.
                        </p>
                        <div className="mt-6 max-w-xl mx-auto h-2 bg-gradient-to-r from-pink-500 via-yellow-300 to-purple-500 rounded-full"></div>
                    </div>
                    
                    {/* NFT展示區 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* 左側：NFT階段列表 */}
                        <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-pink-500 p-6 order-2 lg:order-1">
                            <h2 className="text-2xl font-bold mb-6 text-center">Hair Growth Stages</h2>
                            
                            <div className="space-y-4">
                                {nftStages.map((stage, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 meme-card ${
                                            selectedNft === index ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                        onClick={() => handleNftSelect(index)}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-4xl mr-4">{stage.emoji}</span>
                                            <div>
                                                <h3 className="font-bold">{stage.name}</h3>
                                                <p className="text-sm text-gray-300">{stage.rarity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* 中間：當前NFT展示 */}
                        <div className="lg:col-span-1 order-1 lg:order-2 relative">
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
                            
                            <div className={`flex flex-col items-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 border-4 border-yellow-300 shadow-lg">
                                    <span className="text-8xl">{nftStages[selectedNft].emoji}</span>
                                </div>
                                
                                <h2 className="text-3xl font-bold mb-2 text-yellow-300">
                                    {nftStages[selectedNft].name} NFT
                                </h2>
                                
                                <div className="flex items-center mb-4">
                                    <span className="mr-2 text-pink-400">Rarity:</span>
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm">
                                        {nftStages[selectedNft].rarity}
                                    </span>
                                </div>
                                
                                <p className="text-center text-gray-300 mb-6">
                                    {nftStages[selectedNft].description}
                                </p>
                                
                                <NftFrame />
                            </div>
                        </div>
                        
                        {/* 右側：NFT特點 */}
                        <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-purple-500 p-6 order-3">
                            <h2 className="text-2xl font-bold mb-6 text-center">Perks</h2>
                            
                            <div className="space-y-6">
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="flex items-center mb-3">
                                        <span className="text-3xl mr-3">🔄</span>
                                        <h3 className="font-bold text-xl">動態成長</h3>
                                    </div>
                                    <p>HAIR 的長度與 $HAIR 將會緊密綁定，讓你的頭皮健康 to the MOON!</p>
                                </div>
                                
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="flex items-center mb-3">
                                        <span className="text-3xl mr-3">🎁</span>
                                        <h3 className="font-bold text-xl">獨家空投</h3>
                                    </div>
                                    <p>持有 HEAD 就有收到生態系空「頭」的機會！</p>
                                </div>
                                
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="flex items-center mb-3">
                                        <span className="text-3xl mr-3">🏆</span>
                                        <h3 className="font-bold text-xl">標誌秀髮</h3>
                                    </div>
                                    <p>長出搶眼的 HAIR 顏色，讓你萬眾矚目</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 底部指示 */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-6 meme-text">
                            hairs that <span className="text-yellow-300">GROWS</span> with $HAIR
                        </h2>
                        
                        <button className="meme-button text-xl px-8 py-4 wiggle">
                            <span className="mr-2">🚀</span> Mint Your Hair Now
                        </button>
                        
                        <p className="mt-6 text-gray-400">
                            Limited： Each stage of stage will create a new style of HAIR.
                        </p>
                    </div>
                    </div>
                    </div>
x
                    {/* 3D Models Grid */}
                    <div className="w-full py-16 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-8 text-center text-white">Our 3D Hair Collection</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.from({ length: 16 }).map((_, index) => {
                                    const modelPath = `example/${index + 1}.glb`;
                                    // You can add a file check here if needed
                                    return (
                                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden aspect-square">
                                            <div className="w-full h-full relative">
                                                <FrameAtom 
                                                    modelPath={modelPath} 
                                                    fallback={
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <p className="text-gray-400">Model not available</p>
                                                        </div>
                                                    }
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                                    <p className="text-center text-white">Hair #{index + 1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* 添加頁尾 */}
            <Footer />
        </div>
    );
};

export default NftPage;