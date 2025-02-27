"use client";

import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Sparkles, Coins } from "lucide-react";
import usePriceStore from "./store/PriceStore";

const sui_icon = "/assets/suilogo.svg";
const hair_icon = "/assets/hair.png";
const buck_icon = "/assets/buck.svg";
const CurrencyIcon = ({ type }) => {
  if (type === "sui") {
    return (
      <div className="w-6 h-6 rounded-full overflow-hidden">
        <img
          src={sui_icon}
          alt="SUI coin"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden">
      <img
        src={buck_icon}
        alt="BUCK coin"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const HairGrowthApp = () => {
  const countdown = usePriceStore((state) => state.stage);
  const percentage = usePriceStore((state) => state.progress);
  const curPrice = usePriceStore((state) => state.curPrice);
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("sui");

  return (
    <div className="max-w-md mx-16 bg-gradient-to-b from-purple-100 to-pink-100 rounded-3xl shadow-lg p-8 space-y-4 border-4 border-purple-300">
      <div className="flex items-center justify-center space-x-2">
        <h1 className="text-3xl font-bold text-center text-purple-600 animate-bounce">
          Grow Some $HAIR
        </h1>
        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
      </div>

      {/* Main Icon */}
      <div className="w-40 h-40 mx-auto mb-8 transform hover:scale-105 transition-transform">
        <div className="relative w-full h-full">
          <CircularProgressbar
            value={75}
            text=""
            styles={{
              path: { stroke: "#9333EA" },
              trail: { stroke: "#E9D5FF" },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={hair_icon}
              alt="Growth icon"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="flex justify-center space-x-4 items-center">
        <div
          className="w-12 h-12 bg-white border-2 border-purple-400 rounded-lg flex items-center justify-center text-lg font-bold text-purple-600 shadow-md transform hover:scale-110 transition-transform"
        >
          {countdown[0]}
        </div>
        <p className="text-slate-800">of {countdown[1]} STAGES OF HAIR GROWING!</p>
      </div>

      {/* Percentage Bar */}
      <div className="w-full bg-white rounded-full h-6 p-1 border-2 border-purple-300">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
          style={{ width: `${percentage}%` }}
        >
          <span className="text-white text-xs font-bold">{percentage}%</span>
        </div>
      </div>

      {/* Price Info */}
      <div className="bg-white rounded-lg p-2 border border-purple-300 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-purple-600">
              1 $HAIR ={" "}
            </span>
            <div className="flex items-center space-x-1">
              <img
                src={sui_icon}
                alt="SUI coin"
                className="w-4 h-4 rounded-full"
              />
              <span className="text-sm font-medium text-purple-600">
                {curPrice} SUI
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500">2m ago</span>
        </div>
      </div>

      {/* Amount Input */}
      <div className="flex items-center space-x-2 p-4 bg-white border-2 border-purple-300 rounded-xl shadow-inner">
        <Coins className="w-6 h-6 text-purple-500" />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 outline-none bg-transparent text-lg font-bold text-purple-600 placeholder-purple-300"
          placeholder="Enter amount"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrency("sui")}
            className={`p-1 rounded-lg transition-all ${
              currency === "sui" ? "bg-purple-100 scale-110" : ""
            }`}
          >
            <CurrencyIcon type="sui" />
          </button>
          <button
            onClick={() => setCurrency("buck")}
            className={`p-1 rounded-lg transition-all ${
              currency === "buck" ? "bg-purple-100 scale-110" : ""
            }`}
          >
            <CurrencyIcon type="buck" />
          </button>
        </div>
      </div>

      {/* Buy Button */}
      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl text-xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={() => alert("Coming soon!")}>
        Buy Now 🚀
      </button>
    </div>
  );
};

export default HairGrowthApp;
