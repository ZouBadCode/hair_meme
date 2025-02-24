"use client";
import React, { useState, useEffect } from 'react';
import usePriceStore from './store/PriceStore';

const sui = '/assets/suilogo.svg';
const hair_icon = '/assets/hair.png';

const FrameThing = () => {
  const [suiAmount, setSuiAmount] = useState(0);
  const [hairAmount, setHairAmount] = useState(0);

  const { curPrice, getCurPrice } = usePriceStore();

  const handleSuiAmountChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    setSuiAmount(isNaN(inputValue) ? 0 : inputValue);
  };

  useEffect(() => {
    let timeoutId;

    const updatePrice = () => {
      timeoutId = setTimeout(() => {
        getCurPrice(); // Corrected call to the store function
      }, 3000);
    };

    updatePrice(); // Initial fetch
    return () => clearTimeout(timeoutId);
  }, [suiAmount, getCurPrice]);

  // Recalculate hair amount when curPrice changes
  useEffect(() => {
    setHairAmount(suiAmount * curPrice);
  }, [suiAmount, curPrice]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col items-center rounded-md bg-gray-800 p-4 m-4">
          <input
            type="number"
            placeholder=" "
            min="0"
            step="any"
            value={suiAmount}
            className="bg-transparent text-white text-2xl font-medium w-full focus:outline-none"
            onChange={handleSuiAmountChange}
          />
        </div>
        <img src={sui} alt="sui logo" className="rounded-md ml-2 mt-6 w-12 h-12" />
      </div>
      <p className="text-3xl self-center">↓</p>
      <div className="flex flex-row">
        <div className="flex flex-col items-center rounded-md bg-gray-800 p-4 m-4">
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="any"
            value={hairAmount}
            disabled
            className="bg-transparent text-white text-2xl font-medium w-full focus:outline-none"
          />
        </div>
        <img src={hair_icon} alt="hair icon" className="rounded-md ml-2 mt-6 w-12 h-12" />
      </div>
      <button className="bg-gray-600 rounded-md p-4 m-4 text-white font-medium text-2xl">
        GROW ME MY $HAIR !
      </button>
    </div>
  );
};

export default FrameThing;
