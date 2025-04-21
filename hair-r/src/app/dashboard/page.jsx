"use client";
import React, { useState, useEffect } from "react";
import NavThing from "@/components/navThing";
import Footer from "@/components/Footer";
import "../glowAnimation.css";
import FrameAtom from "@/components/3ds/3dFrameatom";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // User NFTs and staking status
  const [userNfts, setUserNfts] = useState([
    {
      id: 1,
      stage: 1,
      name: "BALD #1234",
      stakedDays: 0,
      hairGrowth: 0,
      rarity: 0,
      rarityEx: "Base",
    },
    {
      id: 2,
      stage: 2,
      name: "GROWING #5678",
      stakedDays: 15,
      hairGrowth: 25,
      rarity: 3,
      rarityEx: "RARE",
    },
    {
      id: 3,
      stage: 3,
      name: "THICK #9012",
      stakedDays: 30,
      hairGrowth: 75,
      rarity: 4,
      rarityEx: "EXTRAORDINARY",
    },
  ]);

  // Dashboard statistics
  const [stats, setStats] = useState({
    totalStaked: 2,
    totalHairGrowth: 100,
    estimatedRewards: 250,
    aprPercentage: 120,
  });

  // Selected NFT
  const [selectedNft, setSelectedNft] = useState(null);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

  // Smoke effect particles
  const [particles, setParticles] = useState([]);

  // Handle NFT selection
  const handleNftSelect = (nft) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedNft(nft);
      setIsAnimating(false);
    }, 500);
  };

  // Handle staking actions
  const handleStake = (id) => {
    setUserNfts((prev) =>
      prev.map((nft) =>
        nft.id === id ? { ...nft, stakedDays: nft.stakedDays > 0 ? 0 : 1 } : nft
      )
    );
    updateStats();
  };

  // Update dashboard statistics
  const updateStats = () => {
    const staked = userNfts.filter((nft) => nft.stakedDays > 0).length;
    const growth = userNfts.reduce((total, nft) => total + nft.hairGrowth, 0);

    setStats({
      totalStaked: staked,
      totalHairGrowth: growth,
      estimatedRewards: growth * 2.5,
      aprPercentage: 120,
    });
  };

  useEffect(() => {
    // Create progressive loading experience
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Slowly increase to 90%, jump to 100% when complete
        if (prevProgress < 90) {
          return prevProgress + Math.random() * 5;
        }
        return prevProgress;
      });
    }, 100);

    // Simulate loading completion
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 150); // Short delay to ensure transition animation completes
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Generate smoke effect particles
  useEffect(() => {
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
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed,
          opacity: p.y < 10 ? p.opacity * 0.95 : p.opacity,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-pink-500">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <img
              src="/assets/hair.png"
              alt="$HAIR Logo"
              className="w-32 h-32 absolute top-0 left-0 animate-pulse"
            />
            <div className="absolute inset-0 bg-pink-500 rounded-full opacity-20 animate-ping"></div>
          </div>

          <h1 className="text-4xl font-bold text-white transition-all duration-300 ease-in-out">
            Loading your $HAIR Dashboard...
          </h1>

          <div className="mt-6 w-64 h-4 bg-gray-800 bg-opacity-40 rounded-full overflow-hidden mx-auto backdrop-blur-sm border border-pink-300 border-opacity-30">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-white mt-2 text-sm opacity-70 font-mono">
            {Math.floor(progress)}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white">
      <NavThing />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold meme-text mb-4">
              Your <span className="text-yellow-300">$HAIR</span> Dashboard
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Manage your hair growth and staking rewards
            </p>
            <div className="mt-6 max-w-xl mx-auto h-2 bg-gradient-to-r from-pink-500 via-yellow-300 to-purple-500 rounded-full"></div>
          </div>

          {/* Statistics cards section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 border-2 border-pink-500">
              <h3 className="text-gray-300 mb-2">Total Staked</h3>
              <div className="flex items-center">
                <span className="text-3xl mr-3">🔒</span>
                <span className="text-4xl font-bold">{stats.totalStaked}</span>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 border-2 border-blue-500">
              <h3 className="text-gray-300 mb-2">Total Growth Index</h3>
              <div className="flex items-center">
                <span className="text-3xl mr-3">📈</span>
                <span className="text-4xl font-bold">
                  {stats.totalHairGrowth}
                </span>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 border-2 border-yellow-400">
              <h3 className="text-gray-300 mb-2">Estimated Rewards</h3>
              <div className="flex items-center">
                <span className="text-3xl mr-3">💰</span>
                <span className="text-4xl font-bold">
                  {stats.estimatedRewards}
                </span>
                <span className="text-xl ml-2 text-yellow-300">$HAIR</span>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 border-2 border-green-500">
              <h3 className="text-gray-300 mb-2">Annual Yield</h3>
              <div className="flex items-center">
                <span className="text-3xl mr-3">✨</span>
                <span className="text-4xl font-bold text-green-400">
                  {stats.aprPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* 新佈局：上方放 NFT 列表和中間的模型展示 */}
          <div className="flex flex-col gap-8 mb-16">
            {/* 上方：NFT列表和模型展示 */}
            <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-pink-500 p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                NFT Showcase & Management
              </h2>

              <div className="flex flex-row gap-8">
                {/* Left: NFT list (max-w-1/3) */}
                <div className="w-full max-w-1/3 lg:max-w-xs">
                  <h3 className="text-xl font-bold mb-4">Your HAIR NFTs</h3>
                  <div className="space-y-4 h-full my-3">
                    {userNfts.map((nft) => (
                      <div
                        key={nft.id}
                        className={`my-2 p-4 rounded-xl cursor-pointer transition-all duration-300 meme-card ${
                          selectedNft && selectedNft.id === nft.id
                            ? "bg-gradient-to-r from-pink-500 to-purple-500"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => handleNftSelect(nft)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div>
                              <h3 className="font-bold">{nft.name}</h3>
                              <p className="text-sm text-gray-300">
                                {nft.stakedDays > 0
                                  ? `Staked for ${nft.stakedDays} days`
                                  : "Not staked"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: NFT Model Display (main focus) */}
                <div className="flex-1 relative">
                  {selectedNft ? (
                    <div
                      className={`flex flex-col items-center transition-opacity duration-500 bg-gray-700 bg-opacity-60 rounded-2xl p-8 h-full ${
                        isAnimating ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 border-4 border-yellow-300 shadow-lg">
                        <FrameAtom modelPath="./example/1.glb" />
                      </div>

                      <h2 className="text-3xl font-bold mb-2 text-yellow-300">
                        {selectedNft.name}
                      </h2>
                      <div className="flex flex-row justify-center">
                        <p className="text-xl mx-2 font-semibold">RARITY</p>
                        <span
                          className={`font-light text-lg ${
                            selectedNft.rarity == 1
                              ? "text-red-500"
                              : selectedNft.rarity == 2
                              ? "text-yellow-500"
                              : selectedNft.rarity == 3
                              ? "text-green-500"
                              : selectedNft.rarity == 4
                              ? "text-blue-500"
                              : selectedNft.rarity == 5
                              ? "text-purple-500"
                              : "text-gray-500"
                          }`}
                        >
                          {selectedNft.rarityEx}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-700 bg-opacity-60 rounded-2xl p-8">
                      <span className="text-6xl mb-4">👈</span>
                      <p className="text-xl text-center">
                        Select an NFT from the list to view details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 下方：Staking Rewards */}
            <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-purple-500 p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Staking Rewards
              </h2>

              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span>Total Accumulated Rewards</span>
                  <span className="font-bold text-yellow-300">320 $HAIR</span>
                </div>
                <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-300 to-green-500"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0</span>
                  <span>Next level requires: 500</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">🔄</span>
                    <h3 className="font-bold text-xl">Daily Rewards</h3>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated today's earnings</span>
                    <span className="font-bold text-green-400">+12 $HAIR</span>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">🎁</span>
                    <h3 className="font-bold text-xl">Special Rewards</h3>
                  </div>
                  <p>
                    The longer you stake, the higher chance of special drops!
                  </p>
                  <div className="mt-2 text-center">
                    <span className="inline-block px-3 py-1 bg-purple-600 rounded-full text-sm">
                      Next special reward: in 3 days
                    </span>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">🏆</span>
                    <h3 className="font-bold text-xl">Claim Rewards</h3>
                  </div>
                  <button className="w-full meme-button">
                    <span className="mr-2">💰</span> Harvest All Rewards
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add footer */}
      <Footer />
    </div>
  );
}
