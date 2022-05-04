import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import NewJsonUrlAsset from "./pages/NewJsonUrlAsset";
import JsonUrlAssetDetails from "./pages/JsonUrlAssetDetails";
import JsonUrlAssetsList from "./pages/JsonUrlAssetsList";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-full overflow-auto bg-neutral-100">
          <Header />
          <Routes>
            <Route path="/" element={<JsonUrlAssetsList />} />
            <Route path="/:id" element={<JsonUrlAssetDetails />} />
            <Route path="/create-new" element={<NewJsonUrlAsset />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
};

export default App;
