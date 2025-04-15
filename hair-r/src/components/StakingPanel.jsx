
// /components/dashboard/StakingPanel.jsx
import React from 'react';
import { PiggyBank, Coins } from 'lucide-react';
import useUserStore from './store/userStore';

const StakingPanel = () => {
  const { 
    staked,
    stakingAmount,
    setStakingAmount,
    handleStake,
    handleUnstake,
    calculateRewardRate
  } = useUserStore(state => ({
    staked: state.staked,
    stakingAmount: state.stakingAmount,
    setStakingAmount: state.setStakingAmount,
    handleStake: state.handleStake,
    handleUnstake: state.handleUnstake,
    calculateRewardRate: () => state.calculateRewardRate(state),
  }));
  
  return (
    <div className="bg-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <PiggyBank className="mr-2 text-pink-400" />
        質押您的 $HAIR
      </h3>
      
      {/* 當前質押金額 */}
      {staked.amount > 0 && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>質押金額：</span>
            <span className="font-bold text-pink-400">{staked.amount} $HAIR</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>收益率：</span>
            <span className="font-bold text-green-400">{calculateRewardRate()} $HAIR/月</span>
          </div>
          <div className="flex justify-between">
            <span>待領獎勵：</span>
            <span className="font-bold text-yellow-300">+{staked.rewards} $HAIR</span>
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
  );
};

export default StakingPanel;    