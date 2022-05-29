import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const WalletContext = createContext();

const network = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

export const WalletProvider = ({ children }) => {
  const [walletInfo, setWalletInfo] = useState({
    address: null,
    balance: null,
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (window.ethereum) {
    window.ethereum.on("chainChanged", (chainId) => {
      if (
        chainId.toString() !== network.polygon.chainId &&
        walletInfo.address
      ) {
        setError(`Please switch to ${network.polygon.chainName} network.`);
      } else {
        setError(null);
      }
    });
    window.ethereum.on("accountsChanged", () => {
      handleWalletConnect();
    });
  }

  const handleNetworkChange = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("wallet_addEthereumChain", [
        {
          ...network.polygon,
        },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWalletConnect = async () => {
    setError(null);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const { chainId } = await provider.getNetwork();
        if (chainId.toString() !== network.polygon.chainId) {
          handleNetworkChange();
        }
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletInfo({ ...walletInfo, address });
        setError(null);
      } catch (error) {
        setError("Error Connecting Wallet...");
      }
    } else {
      setError("Metamask is not installed");
    }
  };

  return (
    <WalletContext.Provider
      value={{ walletInfo, error, handleWalletConnect, handleNetworkChange }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
