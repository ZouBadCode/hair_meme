"use client";
import React from 'react';
import FrameAtom from './3ds/3dFrameatom';

const NFTShow = () => {
    // Define available models (you can adjust this based on actual availability)
    const availableModels = Array(1).fill().map((_, i) => {
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
        <div className="w-full py-16 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-8 text-center text-white">Common Hairs </h2>
                            <p className="text-lg text-center text-gray-400 mb-8">Mint something shinier than these!</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.from({ length: items.length}).map((_, index) => {
                                    // You can add a file check here if needed
                                    return (
                                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden aspect-square">
                                            <div className="w-full h-full relative">
                                                <FrameAtom 
                                                    modelPath={items[index]?.model} 
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
    );
};

export default NFTShow;
