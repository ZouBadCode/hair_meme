module composenft::testnet_nft{
    use sui::{event, url::{Self, Url}};
    use std::string::{Self, String};

    public struct Obj has key, store{
        id: UID,
        name: String,
        description: String,
        url: Url,
    }

    /// An example NFT that can be minted by anybody
    public struct TestnetNFT has key {
            id: UID,
            /// Name for the token
            name: String,
            /// Description of the token
            description: String,
            /// URL for the token
            url: Url,

            equipment: Option<Obj>
            // TODO: allow custom attributes
    }

    // ===== Events =====

    public struct NFTMinted has copy, drop {
            // The Object ID of the NFT
            object_id: ID,
            // The creator of the NFT
            creator: address,
            // The name of the NFT
            name: String,
    }

    // ===== Public view functions =====

    /// Get the NFT's `name`
    public fun name(nft: &TestnetNFT): &String {
            &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &TestnetNFT): &String {
            &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &TestnetNFT): &Url {
            &nft.url
    }

    // ===== Entrypoints =====

    #[allow(lint(self_transfer))]
    /// Create a new devnet_nft
    public fun mint_to_sender(
            name: vector<u8>,
            description: vector<u8>,
            url: vector<u8>,
            ctx: &mut TxContext,
    ) {
            let sender = ctx.sender();
            let nft = TestnetNFT {
                    id: object::new(ctx),
                    name: string::utf8(name),
                    description: string::utf8(description),
                    equipment: option::none(),
                    url: url::new_unsafe_from_bytes(url),
            };

            event::emit(NFTMinted {
                    object_id: object::id(&nft),
                    creator: sender,
                    name: nft.name,
            });

            transfer::transfer(nft, sender);
    }

    public fun mint_obj_to_sender(
            name: String,
            description: String,
            url: vector<u8>,
            ctx: &mut TxContext,
    ) {
            let sender = ctx.sender();
            let nft = Obj {
                    id: object::new(ctx),
                    name: name,
                    description: description,
                    url: url::new_unsafe_from_bytes(url),
            };

            transfer::transfer(nft, sender);
    }


    /// Update the `description` of `nft` to `new_description`
    public fun update_description(
            nft: &mut TestnetNFT,
            new_description: vector<u8>,
            _: &mut TxContext,
    ) {
            nft.description = string::utf8(new_description)
    }

    public fun equipt(
        obj: Obj,
        nft: &mut TestnetNFT
    ){
        option::fill(&mut nft.equipment, obj)
    }


}


// ADDR 0x29e77dc6f743ad7ec9a4423331de503166592a86aaac4078b57d0fe13c7d27df

// PID 0x3d79c6756fe05d6e56bdb3516ec4006a6c0b67c814b78758ebc1f204e58f0178  

// NFT 0x98d2f4c84bc8254ab48a0c2cd3c8db9912508b74a2e95985f01fea826fcd4cda

// obj 0x6320bb0cacf3756452098da7b224f9764c1b4a0448d343e578ea8c66fb117f05

