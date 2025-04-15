import {React, useState} from 'react';
// import { useNFTStore } from '@/stores/ntfStore';

const NftFrame = () => {
    // const nftStore = useNFTStore();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('SUI');
    const currencies = ['BUCK', 'SUI', 'USDC'];
    
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const handleSelect = (currency) => {
        setSelectedCurrency(currency);
        setIsOpen(false);
    };
    
    return (
        <div className="flex m-8 flex-col rounded-md p-4 h-full items-center justify-center">
            <div className="flex flex-col items-center">
                MINT NOW FOR
                <div className="flex flex-col justify-center items-center">
                    <p className="text-3xl font-bold">{0}</p>
                    
                    <div className="relative mt-2">
                        <button 
                            onClick={toggleDropdown}
                            className="flex items-center justify-between w-32 rounded-md bg-gray-800 text-white px-4 py-2"
                        >
                            {selectedCurrency}
                            <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        {isOpen && (
                            <div className="absolute mt-1 w-full bg-gray-700 rounded-md shadow-lg animate-fadeIn z-10">
                                {currencies.map((currency) => (
                                    <div 
                                        key={currency}
                                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer transition-colors"
                                        onClick={() => handleSelect(currency)}
                                    >
                                        {currency}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button className="rounded-full bg-blue-500 text-white px-4 py-2 mt-4">
                        Mint
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NftFrame;