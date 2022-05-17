import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import NewJsonUrlAsset from "./pages/NewJsonUrlAsset";
import JsonUrlAssetDetails from "./pages/JsonUrlAssetDetails";
import JsonUrlAssetsList from "./pages/JsonUrlAssetsList";
import SideBar from "./components/SideBar";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-full bg-neutral-100 overflow-auto">
          <Header />
          <SideBar />
          <div className="relative left-[160px] w-[calc(100%-160px)] xl:block xl:left-0 xl:w-full">
            <Routes>
              <Route path="/" element={<JsonUrlAssetsList />} />
              <Route path="/:id" element={<JsonUrlAssetDetails />} />
              <Route path="/create-new" element={<NewJsonUrlAsset />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
};

export default App;
