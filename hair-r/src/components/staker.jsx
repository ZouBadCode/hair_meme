const exp = require("constants");

const StakePanel = () => {
  return (
    <div className="bg-gray-800 bg-opacity-60 rounded-2xl border-2 border-purple-500 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Staking Rewards</h2>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span>Staking Progress</span>
          <span className="font-bold text-yellow-300">Next Reward</span>
        </div>
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-300 to-green-500"
            style={{ width: "65%" }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">🔄</span>
            <h3 className="font-bold text-xl">Retrive Rewards</h3>
          </div>
          <div className="flex justify-between">
            <span>Estimated earnings</span>
            <span className="font-bold text-green-400">a lot of $HAIR</span>
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">🎁</span>
            <h3 className="font-bold text-xl">Special Rewards</h3>
          </div>
          <p>The longer you stake, the higher chance of special drops!</p>
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
  );
};

export default StakePanel;
