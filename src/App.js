import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components";
import { Home, Explore, Collection, Single } from "./pages";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />} />
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
