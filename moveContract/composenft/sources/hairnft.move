module composenft::hairnft {

    use std::string::{Self, String};
    use std::vector;
    use std::option::{Self, Option};
    use sui::url::{Self, Url};
    use sui::display;
    use sui::transfer;
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
    use sui::vec_map::{Self, VecMap};
    use sui::transfer_policy::{Self, TransferPolicy, TransferPolicyCap};
    use sui::event;
    use sui::table_vec::{Self, TableVec};
    use sui::random::{Self, Random};

    use kiosk::royalty_rule as kiosk_royalty_rule;
    use kiosk::kiosk_lock_rule;
    use kiosk::personal_kiosk_rule;

    use sui::random::{Self, Random};
    
    public struct HAIRNFT has drop {}

    public struct HairNFT has key, store {
        id: UID,
        name: String,
        description: String,
        number: u64,
        url: Url,
        model: Url,
        attributes: VecMap<String, String>,
    }

    public struct AdminCap has key, store {
        id: UID
    }

    public struct Royalty has key {
        id: UID,
        recipient: address,
        policy_cap: TransferPolicyCap<HairNFT>
    }

    fun init(otw: HAIRNFT, ctx: &mut TxContext) {
        let publisher = sui::package::claim(otw, ctx);

        let mut display = display::new<HairNFT>(&publisher, ctx);
        display::add(&mut display, string::utf8(b"name"), string::utf8(b"{name}"));
        display::add(&mut display, string::utf8(b"description"), string::utf8(b"{description}"));
        display::add(&mut display, string::utf8(b"image_url"), string::utf8(b"{url}"));
        display::add(&mut display, string::utf8(b"model_url"), string::utf8(b"{model}"));
        display::add(&mut display, string::utf8(b"attributes"), string::utf8(b"{attributes}"));
        display::update_version(&mut display);
    
        let admin_cap = AdminCap{
            id: object::new(ctx)
        };

        let (mut policy, policy_cap) = transfer_policy::new<HairNFT>(&publisher, ctx);

        kiosk_royalty_rule::add(&mut policy, &policy_cap, 300, 2_000_000_000);

        kiosk_lock_rule::add(&mut policy, &policy_cap);

        personal_kiosk_rule::add(&mut policy, &policy_cap);

        let royalty = Royalty {
            id: object::new(ctx),
            recipient: @treasury,
            policy_cap
        };

        let sender = tx_context::sender(ctx);

        transfer::public_transfer(publisher, sender);
        transfer::public_transfer(display, sender);
        transfer::public_transfer(admin_cap, sender);
        transfer::public_share_object(policy);
        transfer::share_object(royalty);
    }
    
    entry fun withdraw_royalty (
        _admin_cap: &AdminCap,
        royalty: &Royalty,
        policy: &mut TransferPolicy<HairNFT>,
        ctx: &mut TxContext,
    ) {
        let coin = transfer_policy::withdraw(policy, &royalty.policy_cap, option::none(), ctx);
        transfer::public_transfer(coin, royalty.recipient);
    }

    fun mint(
        random: &Random,
        hair: &mut HairNFT,
        name: String,
        description: String,
        number: u64,
        url: Url,
        model: Url,
        attributes: VecMap<String, String>,
        ctx: &mut TxContext
    ): HairNFT {
        let hairnft = HairNFT {
            id: object::new(ctx),
            name: name,
            description: description,
            number: number,
            url: url,
            model: model,
            attributes: attributes,
        }
    }
}