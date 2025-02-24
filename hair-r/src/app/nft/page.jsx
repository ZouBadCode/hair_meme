import React from 'react';
import NavThing from '../../components/NavThing';
// import MintCase from '@/components/3d/MintCase';
// import { useNFTStore } from '@/stores/ntfStore';
import NftFrame from '../../components/nftFrame';

const NftPage = () => {
    // const ntfStore = useNFTStore();

    return (
        <div className="flex flex-col items-center">
            <NavThing />
            <h1 className="text-center text-4xl font-bold">Meet HAIR, Your Personal Identity on the Chain</h1>
            <div>
                <p className="text-center text-xl mt-4 px-4 py-2 rounded-lg shadow-md">
                    Put Your HEAD on the Chain and make them jealous.
                </p>
            </div>
            <div className="flex flex-row items-center">
                {/* showcase current it */}
                <div className="flex flex-col items-center h-full">
                    {/* <Suspense fallback={<div>Loading...</div>}>
                        <MintCase />
                    </Suspense> */}
                    <p className="mt-4 text-xl font-electrolize">Current Iteration: {"FIRST"}</p>
                </div>

                {/* frame */}
                <div className="flex flex-col items-center h-full">
                    <NftFrame />
                </div>
            </div>
            <div className="flex flex-col items-center mt-12">
                <p className="text-center text-3xl mt-4 px-4 py-2 rounded-lg">hairs that GROWS with $HAIR</p>
            </div>
        </div>
    );
};

export default NftPage;
