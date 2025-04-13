// /components/dashboard/TokenBalance.jsx
import React from 'react';
import useUserStore from '../store/userStore';

const TokenBalance = () => {
  const { hairTokens, staked } = useUserStore(state => ({
    hairTokens: state.hairTokens,
    staked: state.staked,
  }));
  
  return (
    <div className="bg-gray-700 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300">可用餘額：</span>
        <span className="text-2xl font-bold text-yellow-300">{hairTokens} $HAIR</span>
      </div>
      <div className="flex items-center">
        <img src="/assets/hair.png" alt="$HAIR" className="w-8 h-8 mr-2" />
        <div className="h-2 bg-yellow-300 bg-opacity-50 flex-grow rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-300"
            style={{ width: `${(hairTokens / (hairTokens + staked.amount)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;