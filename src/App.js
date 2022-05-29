import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "./components";
import { Home, Explore, Collection, Single, InitialMinting } from "./pages";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <ToastContainer className="translate-y-[100px]" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="initial-minting" element={<InitialMinting />} />
          <Route path="/account">
            <Route index path="/account/:address" element={<Collection />} />
          </Route>
          <Route path="/assets">
            <Route index path=":contractAddress" element={<Collection />} />
            <Route path=":contractAddress/:tokenId" element={<Single />} />
          </Route>
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
