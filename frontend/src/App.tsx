import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import NewJsonUrlAsset from "./pages/NewJsonUrlAsset";
import JsonUrlAssetDetails from "./pages/JsonUrlAssetDetails";
import JsonUrlAssetsList from "./pages/JsonUrlAssetsList";
import SideBar from "./components/SideBar";
import CalculateSymbol from "./pages/CalculateSymbol";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-full bg-neutral-100 overflow-auto">
          <Header />
          <SideBar />
          <div className="flex justify-center pt-60">
            <p className="w-3/5 text-center text-lg">
              We would like to inform you that we are going to{" "}
              <b>shut down Custom URL Oracles on 29.12.2023</b>. We apologize
              for any inconvenience and please contact us on{" "}
              <a
                href="https://discord.com/invite/PVxBZKFr46"
                className="text-redstone hover:underline"
              >
                Discord
              </a>{" "}
              with any questions
            </p>
          </div>
          {/* 
            <div className="relative left-[160px] w-[calc(100%-160px)] xl:block xl:left-0 xl:w-full">
              <Routes>
                <Route path="/" element={<JsonUrlAssetsList />} />
                <Route path="/:id" element={<JsonUrlAssetDetails />} />
                <Route path="/create-new" element={<NewJsonUrlAsset />} />
                <Route path="/calculate-symbol" element={<CalculateSymbol />} />
              </Routes>
            </div> 
          */}
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
