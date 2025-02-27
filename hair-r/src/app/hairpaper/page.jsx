"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sparkles, Crown, Gift, Coins, Laugh, PartyPopper, Rocket, Brain } from 'lucide-react';
import NavThing from "@/components/navThing";


const HairPaper = () => {

  const tokenDistribution = [
    { name: 'Public Sale', value: 50, color: '#FF6B6B' },
    { name: 'Operating', value: 20, color: '#4ECDC4' },
    { name: 'Reserve', value: 5, color: '#45B7D1' },
    { name: 'Liquidity', value: 20, color: '#96CEB4' },
    { name: 'Event', value: 5, color: '#FFEEAD' }
  ];


  return (
    
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-red-900 text-white p-8">
      <NavThing />
      {/* Fun Header Section */}
      <div className="mt-10 text-center mb-16 transform hover:scale-105 transition-transform cursor-pointer">
        <div className="relative">
          <h1 className="text-6xl font-bold mb-4 animate-bounce">
            🦁 $HAIR PAPER 秀髮企劃書 👨‍🦲
          </h1>
        </div>
        <p className="text-xl text-yellow-300 animate-pulse">
          拯救你的秀髮！告別禿頭！ NO MORE BALDNESS! 
        </p>
        <div className="text-3xl mt-4">
          {"🧔 → 👨‍🦲 → 💆‍♂️ → 🦁"}
        </div>
      </div>

      {/* Meme Mission Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border-4 border-yellow-400 transform hover:rotate-1 transition-transform">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Laugh className="mr-2 animate-spin" /> 
          Losing Hair? We Care! 掉髮救星在此！
        </h2>
        <div className="space-y-4 text-lg">
          <p className="text-yellow-300 font-bold text-2xl mb-4">
            📈 Every Dip = More Hair Loss! 每次暴跌都在掉髮！
          </p>
          <div className="bg-gray-700 p-6 rounded-lg border-2 border-pink-400">
            <h3 className="text-xl font-bold mb-4 text-center">WHY $HAIR? 為什麼選擇$HAIR？</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-600 p-4 rounded-lg text-center transform hover:scale-105 transition-transform">
                <p className="text-2xl mb-2">👨‍🦲</p>
                <p>Before $HAIR</p>
                <p>買入前</p>
              </div>
              <div className="bg-gray-600 p-4 rounded-lg text-center transform hover:scale-105 transition-transform">
                <p className="text-2xl mb-2">🦁</p>
                <p>After $HAIR</p>
                <p>買入後</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Distribution with Meme Style */}
      <div className="max-w-4xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border-4 border-green-400">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <PartyPopper className="mr-2" />
          Tokenomics 代幣經濟學 
          <span className="ml-2 text-2xl">🚀</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name} ${value}%`}
                >
                  {tokenDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 animate-bounce">
              🍰
            </div>
          </div>
          <div className="space-y-4 bg-gray-700 p-4 rounded-lg">
            <p className="text-xl font-bold text-center bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              Total Supply: 1,000,000,000 $HAIR
              <br />
              總供應量：10億根頭髮
            </p>
            <ul className="space-y-2">
              {tokenDistribution.map((item, index) => (
                <li key={index} className="flex items-center p-2 bg-gray-600 rounded-lg transform hover:scale-105 transition-transform">
                  <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                  <span>{item.name}: {item.value}% 🔥</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* NFT Section with More Fun */}
      <div className="max-w-4xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border-4 border-blue-400">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Crown className="mr-2" />
          HAIR NFT Collection 稀有髮型系列
          <span className="ml-2">👑</span>
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Rocket className="mr-2" />
              3,333 Legendary Hairstyles 3,333個傳說級髮型
            </h3>
            <div className="text-center text-3xl my-4">
              👨‍🦲 → 👨 → 🧔 → 🦁
            </div>
            <p className="text-gray-300">市值越高，髮型越帥！The higher the market cap, the longer the hair!</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Brain className="mr-2" />
              Whale Rewards 大戶獎勵
            </h3>
            <div className="text-center">
              <p className="text-2xl mb-2">🐋 + $HAIR = 🎁</p>
              <p className="text-yellow-300">
                質押0.03% $HAIR = 神秘掉髮保養套組！
                <br />
                Stake 0.03% for mysterious hair care package!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-lg transform hover:rotate-6 transition-transform">
              <p className="text-2xl">🎩</p>
              <p>Top Hat NFT</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transform hover:-rotate-6 transition-transform">
              <p className="text-2xl">👓</p>
              <p>Cool Glasses NFT</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transform hover:rotate-6 transition-transform">
              <p className="text-2xl">👑</p>
              <p>Crown NFT</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transform hover:-rotate-6 transition-transform">
              <p className="text-2xl">🐋</p>
              <p>Whale NFT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meme */}
      <div className="text-center text-2xl animate-bounce">
        💪 Together Strong! 一起對抗掉髮！ 💪
      </div>
    </div>
  );
};

export default HairPaper;