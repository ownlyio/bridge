import './App.css';
import { useEffect, useState } from 'react'

// Utils
import shortenAddress  from './utils/shortenAddress'

import img_bnb from './img/tokens/bnb.png'
import img_eth from './img/tokens/eth.png'
import img_ownly_logo from './img/ownly/logo.png'

// Variables
const [state, setState] = useState({
    isConnected: false,
    account: "",
    isApproved: false,
    txError: "",
    txHash: "",
})

// Util Functions
// MAX function
const triggerMaxAmount = () => {
    // document.getElementById("stake-input-num").value = state.currentLPBalance
}

// make an address short
const shortenAddress = (address, prefixCount, postfixCount) => {
    let prefix = address.substr(0, prefixCount)
    let postfix = address.substr(address.length - postfixCount, address.length)

    return prefix + "..." + postfix
}

// state updater
const _setState = (name, value) => {
    setState(prevState => ({...prevState, [name]: value}))
}

// round to the nearest hundredths
const roundOff = num => {
    return +(Math.round(num + "e+2")  + "e-2");
}

// add thousands separator
const addCommasToNumber = x => {
    if (!Number.isInteger(Number(x))) {
        x = Number(x).toFixed(5)
    }

    return x.toString().replace(/^[+-]?\d+/, function(int) {
        return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    });
}

function App() {
    return (
        <div className="bg-color-1">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
                <div className="container">
                    <div className="d-flex align-items-center" id="navbar-d-flex">
                        <a className="#" href="#">
                            <img src={img_ownly_logo} width="53" alt="Ownly" />
                        </a>
                        <div className="ps-2">
                            <a href="#" className="link-color-1 text-decoration-none website-home-link">
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <div className="font-size-150 font-size-sm-200 rubik-black website-home-link line-height-90">OWNLY</div>
                                        <div className="bg-color-6 text-center text-white py-1 px-2 ms-2">
                                            <div className="font-size-60 font-size-sm-70 rubik-bold line-height-100" id="app-version">BETA</div>
                                        </div>
                                    </div>
                                    <div className="font-size-70 font-size-sm-100 rubik-bold line-height-90" id="market-label">BRIDGE</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="justify-content-between mt-2 mt-lg-0" id="navbarSupportedContent" style={{"flexGrow": "initial"}}>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {/* { isConnected ? (
                                <li className="nav-item" id="connect-to-metamask-container">
                                    <button type="button" className="d-none d-sm-block btn btn-custom-9 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connected: {shortenAddress(account, 6, 6)}</button>
                                </li>
                            ) : ( */}
                                <li className="nav-item" id="connect-to-metamask-container">
                                    <button type="button" className="d-none d-sm-block btn btn-custom-4 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connect&nbsp;Wallet</button>
                                    <button type="button" className="d-block d-sm-none btn btn-custom-4 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connect</button>
                                </li>
                            {/* )} */}
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}

            {/* App */}
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
                                        <button className="btn btn-custom-2 font-size-130 py-3 w-100">APPROVE</button>
                                        {/* <button className="btn btn-custom-2 font-size-130 py-3 w-100">TRANSFER</button> */}
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
            {/* End App */}

            {/* Modals */}

            {/* End Modals */}
        </div>
  );
}

export default App;
