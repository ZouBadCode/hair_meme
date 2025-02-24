import NavThing from "../../components/navThing";

export default function WhitePaper() {
  return (
    <div className="w-screen h-20 bg-slate-600">
      <NavThing className="z-10"></NavThing>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="m-4 px-10">
          <h1 className="text-4xl font-bold">White Paper</h1>
          <h2 className="area">Coming Soon</h2>
        </div>
      </div>
    </div>
  );
}
