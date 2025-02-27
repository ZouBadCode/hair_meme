"use client";
import React from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectButton } from '@mysten/dapp-kit';

const { networkConfig } = createNetworkConfig({
	localnet: { url: getFullnodeUrl('localnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();

const ConnectWallet = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider>
          <ConnectButton/>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
    );
  };

  export default ConnectWallet;