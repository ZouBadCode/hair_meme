"use client";
import React from 'react';
import FrameAtom from './3ds/3dFrameatom';

const NFTShow = () => {
    // Define available models (you can adjust this based on actual availability)
    const availableModels = Array(12).fill().map((_, i) => {
        const modelPath = `./example/${i + 1}.glb`;
        return {
            id: i + 1,
            title: `NFT ${i + 1}`,
            model: modelPath,
            exists: true // In a real implementation, you might check if the file exists
        };
    });

    // Filter to only include existing models
    const items = availableModels.filter(item => item.exists);

    return (
        <div className="w-full h-full">
            <div className="nft-grid">
                {items.map(item => (
                    <div key={item.id} className="nft-item">
                        <div className="nft-content">
                            <FrameAtom modelPath={item.model} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTShow;
