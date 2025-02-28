"use client";
import React from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectButton } from '@mysten/dapp-kit';

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
});
const queryClient = new QueryClient();

function OwnedObjects({ address }) {
  const { data } = useSuiClientQuery('getOwnedObjects', {
    owner: address,
  });
  if (!data) {
    console.log("null")
    return null;
  }
  return (
    <ul>
      {data.data.map((object) => (
        <li key={object.data?.objectId}>
          <a href={`https://suiexplorer.com/object/${object.data?.objectId}`}>
            {object.data?.objectId}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return (
    <div>
      <div>Connected to {account.address}</div>
      <OwnedObjects address={account.address} />
    </div>
  );
}

const ConnectWallet = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
        <WalletProvider>
          {/* 連接按鈕 */}
          <ConnectButton />
          {/* 當連接成功後會顯示帳戶資訊 */}
          <ConnectedAccount />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default ConnectWallet;