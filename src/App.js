import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components";
import { Home, Explore, Collection } from "./pages";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />}>
            <Route path=":slug" element={<Collection />} />
          </Route>
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
