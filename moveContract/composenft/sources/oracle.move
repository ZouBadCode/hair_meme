module composenft::oracle{

    use SupraOracle::SupraSValueFeed::{get_price, extract_price, OracleHolder, Price};
    use sui::tx_context::{Self, TxContext};

    public struct OrcaleChangeCap has key, store {
        id: UID
    }

    public struct Pair_code has key, store {
        id: UID,
        code: u32
    }

    fun init(ctx: &mut TxContext){
        let pcode = Pair_code{
            id: object::new(ctx),
            code: 160
        };
        transfer::share_object(pcode);
    }

    public fun set_pcode(
        pcode: &mut Pair_code,
        value: u32,
        ctx: &mut TxContext
    ){
        pcode.code = value; 
    }

    public(package) fun get_sui_buck_price(oracle_holder: &OracleHolder, pcode: &Pair_code, ctx: &mut TxContext): u128{
        let (sui_buck_price, _, _, _) = get_price(oracle_holder, pcode.code);
        sui_buck_price
    }  
}