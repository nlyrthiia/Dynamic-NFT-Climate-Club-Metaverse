import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { RecoilRoot } from "recoil"

import { Navbar, ScrollToTop } from "./components"
import { Home, Explore, Collection, Single, InitialMinting } from "./pages"
import { WalletProvider } from "./context/WalletContext"

function App() {
  return (
    <RecoilRoot>
      <WalletProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <ToastContainer limit={1} className="translate-y-[100px]" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="initial-minting" element={<InitialMinting />} />
            <Route path="account" element={<Collection />}>
              <Route path=":address" element={<Collection />} />
            </Route>
            <Route path="assets">
              <Route index path=":contractAddress" element={<Collection />} />
              <Route path=":contractAddress/:tokenId" element={<Single />} />
            </Route>
          </Routes>
        </Router>
      </WalletProvider>
    </RecoilRoot>
  )
}

export default App
