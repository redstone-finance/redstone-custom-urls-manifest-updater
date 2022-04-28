import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import NewJsonUrlAsset from "./pages/NewJsonUrlAsset";
import JsonUrlAssetDetails from "./pages/JsonUrlAssetDetails";
import JsonUrlAssetsList from "./pages/JsonUrlAssetsList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen bg-neutral-100">
        <Header />
        <Routes>
          <Route path="/" element={<JsonUrlAssetsList />} />
          <Route path="/:id" element={<JsonUrlAssetDetails />} />
          <Route path="/create-new" element={<NewJsonUrlAsset />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
