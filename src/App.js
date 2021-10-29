import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

// Utils
import contract from './utils/contract'
import getCurrentNetwork from './utils/getCurrentNetwork'
import getCurrentWalletConnected  from './utils/getCurrentWalletConnected'
import shortenAddress  from './utils/shortenAddress'

import img_bnb from './img/tokens/bnb.png';
import img_eth from './img/tokens/eth.png';
import img_ownly_logo from './img/ownly/logo.png';
import img_ownly_horizontal_white from './img/ownly/horizontal-white.png';

function App() {
    const [walletAddress, setWallet] = useState("")
    const [status, setStatus] = useState(0)
    const [network, setNetwork] = useState("")
    const [netStatus, setNetStatus] = useState(0)

    const [showMetamaskInstall, setShowMetamaskInstall] = useState(false);
    const handleShowMetamaskInstall = () => setShowMetamaskInstall(true);

    // Event Listener for Metamask Account Change
    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0])
                    setStatus(1)
                } else {
                    setWallet("");
                    setStatus(2)
                }
            })
        } else {
            setStatus(0);
        }
    }

    // Event Listener for Metamask Network Change
    const addNetworkListener = () => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', async function(networkIdMM){
                const networkResponseOnLoad = await getCurrentNetwork(1)
                setNetwork(networkResponseOnLoad.network)
                setNetStatus(networkResponseOnLoad.netStatus)
            });
        }
    }

    const connectWallet = () => {
        async function initUtilsOnLoad() {
            const {address, status} = await getCurrentWalletConnected();
            const {network, netStatus} = await getCurrentNetwork();
            setWallet(address)
            setStatus(status)
            setNetwork(network)
            setNetStatus(netStatus)

            if (status === 0) {
                handleShowMetamaskInstall()
            }
        }

        initUtilsOnLoad();
        addWalletListener();
        addNetworkListener();
    }

    useEffect(() => {
        connectWallet();
    });

    const renderWalletAddress = () => {
        if(walletAddress !== "") {
            return (
                <li className="nav-item">
                    <a className="text-color-6 text-decoration-none" href="#" id="account-address">{ shortenAddress(walletAddress, 6, 4) }</a>
                </li>
            );
        } else {
            return (
                <li className="nav-item" id="connect-to-metamask-container">
                    <button type="button" className="btn btn-custom-4 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" onClick={connectWallet}>Connect Wallet</button>
                </li>
            );
        }
    };

    return (
        <div className="bg-color-1">
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
                <div className="container">
                    <div className="d-flex align-items-center" id="navbar-d-flex">
                        <a className="#" href="https://ownly.io/marketplace">
                            <img src={img_ownly_logo} width="53" alt="Ownly" />
                        </a>
                        <div className="ps-2">
                            <a href="#" className="link-color-1 text-decoration-none website-home-link">
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <div className="font-size-150 font-size-sm-200 rubik-black website-home-link line-height-90">OWNLY</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse w-100 justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            { renderWalletAddress() }
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="d-flex align-items-center min-vh-100 py-5 padding-after-nav">
                    <div className="card shadow-sm w-100 mb-5 mt-4 mt-sm-0">
                        <div className="card-body py-4">
                            <div className="row align-items-end">
                                <div className="col-lg-4 col-xxl-5 mb-5 mb-lg-0">
                                    <div className="font-size-110 mb-2">From</div>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="pe-3">
                                            <img src={img_bnb} width="40" alt="BNB" />
                                        </div>
                                        <div className="font-size-130 font-size-xl-140 neo-bold pe-3">Binance Smart Chain</div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="font-size-lg-120 font-size-xl-130 neo-bold pe-3">OWN</div>
                                                <div>Balance:&nbsp;&nbsp;1,000,000,000</div>
                                            </div>

                                            <div className="input-group">
                                                <input type="text" className="form-control font-size-160" placeholder="0.000" />
                                                <button type="button" className="btn btn-custom-4 px-3">Max</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-xxl-2 mb-5 mb-lg-0">
                                    <div className="text-center font-size-110 line-height-150 mb-3">Approved: 100,000,000&nbsp;OWN</div>
                                    <div className="mb-1">
                                        <button className="btn btn-border-2 py-2 w-100">Limits</button>
                                    </div>
                                    <div className="mb-1">
                                        <button className="btn btn-custom-2 font-size-130 py-3 w-100">TRANSFER</button>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-xxl-5">
                                    <div className="font-size-110 mb-2">To</div>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="pe-3">
                                            <img src={img_eth} width="40" alt="ETH" />
                                        </div>
                                        <div className="font-size-130 font-size-xl-140 neo-bold pe-3">Ethereum Blockchain</div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="font-size-lg-120 font-size-xl-130 neo-bold pe-3">OWNT</div>
                                                <div>Balance:&nbsp;&nbsp;1,000,000,000</div>
                                            </div>

                                            <div className="input-group">
                                                <input type="text" className="form-control font-size-160" placeholder="0.000" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
