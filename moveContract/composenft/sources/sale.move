module composenft::sale{

    use sui::balance::{Self,Balance};
    use sui::sui::SUI;
    use sui::coin::{Self, Coin, into_balance, from_balance};
    use sui::tx_context::{Self, TxContext};
    use std::vector::{Self};
    use sui::table::{Self, Table};
    use composenft::hair::HAIR;
    use std::option::{Self, Option};
    use std::string::{Self, String};
    use composenft::oracle::{get_sui_buck_price, Pair_code};
    use SupraOracle::SupraSValueFeed::{OracleHolder};


    const EBuyOutOfThePoolAmount: u64 = 0;
    const EClaimNotStart: u64 = 1;
    const ESaleNotStart: u64 = 2;
    public struct SALE has drop {} /// otw for init

    public struct ReferralTable has key, store{
        id: UID,
        reftable_SUI: Table<String, u256>,
        reftable_BUCK: Table<String, u256>,
    }

    public struct PoolCap has key, store {
        id: UID
    }

    public struct PurchaseProof has key {
        id: UID,
        amount: u256,
    }

    fun init(otw: SALE, ctx: &mut TxContext) {
        let poolcap = PoolCap {
            id: object::new(ctx)
        };
        let referralTable = ReferralTable {
            id: object::new(ctx),
            reftable_SUI: table::new<String, u256>(ctx),
            reftable_BUCK: table::new<String, u256>(ctx)
        };
        transfer::transfer(poolcap, ctx.sender());
        transfer::share_object(referralTable);
    }


    public fun setRefCode(
        cap: &PoolCap,
        refaddress: String, 
        reftable: &mut ReferralTable
    ){
        table::add(&mut reftable.reftable_SUI, refaddress, 0);
        table::add(&mut reftable.reftable_SUI, refaddress, 0);
    }

    public struct PurchasePool<phantom BUCK> has key {
        id: UID,
        status: u8, 
        p_coin_sui: Balance<SUI>, //for saving sui
        p_coin_buck: Balance<BUCK>, //for saving BUCK
        exchange_rate: u256,
        buck_bouns_rate: u8, //for buck colab
        sale_amount: u256, //max_sale_amount
        price_decimals_rate: u64, //100000000000
        status_rate: vector<u256>,
        hair_coin: Balance<HAIR>,
        status_amount: vector<u256>,
        isStart: bool,
        isStartClaim: bool,
    }

    public fun buy_with_sui<BUCK>(
        buy_coin: Coin<SUI>,
        pool: &mut PurchasePool<BUCK>,
        reftable: &mut ReferralTable,
        refcode: Option<String>,
        ctx: &mut TxContext,
    ) {
        assert!(pool.isStart == true, ESaleNotStart);
        let ref_status = false;
        let discount_ref = 10;
        if (option::is_some(&refcode)){
            let refcodeValue = option::borrow(&refcode);
            if (table::contains(&reftable.reftable_SUI, *refcodeValue)){
                let discount_ref = 9;
                let ref_status = true;
            } else {
                let discount_ref = 10;
                let ref_status = false;
            }
        } else {
            let discount_ref = 10;
            let ref_status = false;
        };
        let coin_value = coin::value(&buy_coin);
        if (((coin_value as u256) * (pool.price_decimals_rate as u256) * discount_ref /10/pool.exchange_rate/1000000000) > pool.sale_amount) {
            let real_price = pool.sale_amount * pool.exchange_rate / (pool.price_decimals_rate as u256) * 1000000000;
            let mut buy_coin = buy_coin; //deref 
            let real_buy_coin = coin::split(&mut buy_coin, (real_price as u64), ctx);
            balance::join(&mut pool.p_coin_sui, into_balance(real_buy_coin));
            let buyproof = PurchaseProof{
                id: object::new(ctx),
                amount: pool.sale_amount
            };
            pool.sale_amount = 0;
            transfer::transfer(buyproof, ctx.sender());
            transfer::public_transfer(buy_coin, ctx.sender());
        } else {
            balance::join(&mut pool.p_coin_sui, into_balance(buy_coin));
            let buyproof = PurchaseProof{
                id: object::new(ctx),
                amount: ((coin_value as u256) * (pool.price_decimals_rate as u256) * discount_ref /10/pool.exchange_rate/1000000000)
            };
            let sale = ((coin_value as u256) * (pool.price_decimals_rate as u256) * discount_ref /10/pool.exchange_rate/1000000000);
            pool.sale_amount = pool.sale_amount - sale;
            transfer::transfer(buyproof, ctx.sender());
        };
        if (pool.status == 7) {
            return
        } else if (pool.sale_amount <= *vector::borrow(&pool.status_amount, pool.status as u64)){
            pool.status = pool.status + 1;
            pool.exchange_rate = *vector::borrow(&pool.status_rate, pool.status as u64);
        };
        if (ref_status == true){
            let ref_mut = table::borrow_mut(&mut reftable.reftable_SUI, *option::borrow(&refcode));
            *ref_mut = *ref_mut + (coin_value as u256);

        }
    }


    ///TODO Buy with BUCK(Bucket Protocol) with discout 10%off
    public fun buy_with_buck<BUCK>(
        buy_coin: Coin<BUCK>,
        pool: &mut PurchasePool<BUCK>,
        reftable: &mut ReferralTable,
        refcode: Option<String>,
        pcode: &Pair_code,
        oracle_holder: &OracleHolder,
        ctx: &mut TxContext,
    ) {
        assert!(pool.isStart == true, ESaleNotStart);
        let sui_buck_price = get_sui_buck_price(oracle_holder, pcode, ctx);
        let ref_status = false;
        let discount_ref = 10;
        if (option::is_some(&refcode)){
            let refcodeValue = option::borrow(&refcode);
            if (table::contains(&reftable.reftable_BUCK, *refcodeValue)){
                let discount_ref = 11;
                let ref_status = true;
            } else {
                let discount_ref = 10;
                let ref_status = false;
            }
        } else {
            let discount_ref = 10;
            let ref_status = false;
        };
        let coin_value = coin::value(&buy_coin);
        if (((coin_value as u256) * (pool.price_decimals_rate as u256) *(pool.buck_bouns_rate as u256) * discount_ref /100/pool.exchange_rate/1000000000/(sui_buck_price as u256)) > pool.sale_amount){
            let real_price = pool.sale_amount * pool.exchange_rate / (pool.price_decimals_rate as u256) * 1000000000 * (sui_buck_price as u256);
            let mut buy_coin = buy_coin; //deref p
            let real_buy_coin = coin::split(&mut buy_coin, (real_price as u64), ctx);
            balance::join(&mut pool.p_coin_buck, into_balance(real_buy_coin));
            let buyproof = PurchaseProof{
                id: object::new(ctx),
                amount: pool.sale_amount
            };
            pool.sale_amount = 0;
            transfer::transfer(buyproof, ctx.sender());
            transfer::public_transfer(buy_coin, ctx.sender());
        } else{
            balance::join(&mut pool.p_coin_buck, into_balance(buy_coin));
            let buyproof = PurchaseProof{
                id: object::new(ctx),
                amount: ((coin_value as u256) * (pool.price_decimals_rate as u256) *(pool.buck_bouns_rate as u256) * discount_ref /100/pool.exchange_rate/1000000000/(sui_buck_price as u256))
            };
            let sale = ((coin_value as u256) * (pool.price_decimals_rate as u256) *(pool.buck_bouns_rate as u256) * discount_ref /100/pool.exchange_rate/1000000000/(sui_buck_price as u256));
            pool.sale_amount = pool.sale_amount - sale;
            transfer::transfer(buyproof, ctx.sender());
        };
        if (pool.status == 7) {
            return
        } else if (pool.sale_amount <= *vector::borrow(&pool.status_amount, pool.status as u64)){
            pool.status = pool.status + 1;
            pool.exchange_rate = *vector::borrow(&pool.status_rate, pool.status as u64);
        };
        if (ref_status == true){
            let ref_mut = table::borrow_mut(&mut reftable.reftable_BUCK, *option::borrow(&refcode));
            *ref_mut = *ref_mut + ((coin_value as u256) * 9/10);

        }
    }

    public fun start_sale<BUCK>(
        cap: &PoolCap,
        ctx: &mut TxContext
    ){
        let target_sale: vector<u256> = vector[673486465000000, 604293385000000, 532298052000000, 445806702000000, 331740882000000, 212382819000000, 196065916000000];
        let price_v: vector<u256> = vector[20090103,  40400000, 42042000, 50500000, 66600000, 69690000, 9527000, 114514000];
        let salePool = PurchasePool<BUCK>{
            id: object::new(ctx),
            status: 0,
            p_coin_sui:  balance::zero<SUI>(),
            p_coin_buck: balance::zero<BUCK>(),
            exchange_rate:  *vector::borrow(&price_v, 0),
            buck_bouns_rate: 11,
            sale_amount: 707894781000000,
            price_decimals_rate: 100000000000,
            status_rate: price_v,
            hair_coin: balance::zero<HAIR>(),
            status_amount: target_sale,
            isStart: false,
            isStartClaim: false
        };
        transfer::share_object(salePool);

    }
    
    public fun start_sale_state<BUCK>(
        cap: &PoolCap,
        pool: &mut PurchasePool<BUCK>,
        ctx: &mut TxContext
    ){
        pool.isStart = true;
    }

    public fun close_sale_state<BUCK>(
        cap: &PoolCap,
        pool: &mut PurchasePool<BUCK>,
        ctx: &mut TxContext
    ){
        pool.isStart = false;
    }

    public fun start_claim<BUCK>(
        cap: &PoolCap,
        pool: &mut PurchasePool<BUCK>,
        ctx: &mut TxContext
    ){
        pool.isStartClaim = true;
    }

    public fun claim<BUCK> (
        in: PurchaseProof,
        pool: &mut PurchasePool<BUCK>,
        ctx: &mut TxContext
    ) {
        assert!(pool.isStartClaim == true, EClaimNotStart);
        let p_amount = in.amount;
        let take_coin =coin::take(&mut pool.hair_coin, p_amount as u64, ctx);
        transfer::public_transfer(take_coin, ctx.sender());
        let PurchaseProof {id, amount: _} = in;
        object::delete(id);
    }

    public fun price_getter<BUCK> (
        pool: &mut PurchasePool<BUCK>,
        ctx: &mut TxContext
    ): u8{
        pool.status
    }
}



// sui client call --function buy_with_sui --package 0x0286b40addef6334f93e290a5dad991082595c2ab119dfc2baccdce1bf402d8b --module sale --type-args "0x700de8dea1aac1de7531e9d20fc2568b12d74369f91b7fad3abc1c4f40396e52::usdt::USDT" --args "0x1ff7f33a6b11ee3cb7286cfc8ef9c1f7ac955ebe83e75d0ee3e1646be873edea" "0x821e0aba4ad4fa5939ab41783f03d10995ba53160c1a71ee33310693881c0697"