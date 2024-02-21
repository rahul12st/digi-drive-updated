import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";




 import { ethers } from "ethers";

import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [metamaskError, setMetamaskError] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          setContract(contract);
          setProvider(provider);
        } else {
          console.error("Metamask is not installed");
          setMetamaskError(true);
        }
      } catch (error) {
        console.error("Error loading provider:", error);
        setMetamaskError(true);
      }
    };

    loadProvider();
  }, []);
  return (
    <>
     {metamaskError && (
  <div className="metamask-error">
    <p>MetaMask Wallet is not installed or connected. Please install MetaMask Wallet.</p>
    {/* You can add a close button if needed */}
     <span className="close-btn" onClick={() => setMetamaskError(false)}>&times;</span> 
  </div>
)}

      {!modalOpen && (
        <button className="share" role="button" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">


      <div class="pattern-dots-md gray-light">
      

    <h1>Digi-Drive</h1>

  


        <h2 style={{ color: "#466d1d"}}>Your personalised and secured drive.</h2>

        <div className="bg"></div>
        <div className="image">.🌐.</div>

        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p className="accnumber" style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
        </div>
      </div>
    </>
  );
}

export default App;
