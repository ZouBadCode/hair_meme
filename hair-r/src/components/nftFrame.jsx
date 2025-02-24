import React from 'react';
const sui = '/assets/suilogo.svg';
// import { useNFTStore } from '@/stores/ntfStore';

const NftFrame = () => {
    // const nftStore = useNFTStore();

    return (
        <div className="flex m-8 flex-col rounded-md p-4 h-full">
            MINT NOW FOR
            <div className="flex flex-col">
                <p className="text-3xl font-bold">{0}</p>
                <img src={sui} alt="frame" className="rounded-md ml-2 mt-6 w-12 h-12" />
                <button className="rounded-full bg-blue-500 text-white px-4 py-2 mt-4">
                    Mint
                </button>
            </div>
        </div>
    );
};

export default NftFrame;