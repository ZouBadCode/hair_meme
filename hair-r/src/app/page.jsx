import IntroHome from "../components/introHome";
import "./glowAnimation.css";
import HairGrowthApp from "../components/sale_component";
import HomeHead from "../components/3ds/HomeHead";
export default function Land() {
  return (
    <div className="bg-[#82DBC5]">

      <div className="flex justify-evenly items-center h-screen w-screen mb-64 relative z-10">
        <div className="m-4 px-1">
          <h1 className="text-4xl font-bold">Fill your wallet with some</h1>
          <h2 className="area">\ $HAIR /</h2>
        </div>
        <HairGrowthApp className="relative z-10" />
      </div>
      <HomeHead className="absolute z-0" />
      <div className="flex justify-evenly items-center h-screen w-screen relative z-10">
        <IntroHome />
      </div>
    </div>
  );
}
