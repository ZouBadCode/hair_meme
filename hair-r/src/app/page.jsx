import IntroHome from "../components/introHome";
import "./glowAnimation.css";
import HairGrowthApp from "../components/sale_component";
import HomeHead from "../components/3ds/HomeHead";
import NavThing from "@/components/navThing";

export default function Land() {
  return (
    <div className="bg-[#82DBC5] min-h-screen flex flex-col justify-between">
      <NavThing />
      <div className="flex flex-row items-center justify-center h-screen relative z-10">
        <div className="text-center m-4 px-1">
          <h1 className="text-4xl font-bold">Fill your wallet with some</h1>
          <h2 className="area">\ $HAIR /</h2>
        </div>
        <HairGrowthApp className="relative z-10 mt-8" />
      </div>
      <HomeHead className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <IntroHome />
      </div>
    </div>
  );
}
