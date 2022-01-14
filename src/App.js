import './App.css';
import { useEffect, useState } from 'react'
import { configureWeb3 } from './utils/web3Init'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import { faCheckCircle, faExclamationCircle, faExternalLinkAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import networks from './utils/networks'
// Images
import img_bnb from './img/tokens/bnb.png'
import img_eth from './img/tokens/eth.png'
import img_ownly_logo from './img/ownly/logo.png'
import metamask from './img/metamask.png'

function App() {
    const [web3, setWeb3] = useState()
    const [bscContract, setBscContract] = useState()
    const [ethContract, setEthContract] = useState()
    const [state, setState] = useState({
        isConnected: false,
        account: "",
        isApproved: false,
        hasMetamask: false,
        txError: "",
        txHashBsc: "",
        txHashEth: "",
    })

    // Other Variables
    // PRODUCTION
    // const explorerBscUrl = "https://bscscan.com/tx/"
    // const explorerEthUrl = "https://etherscan.com/tx/"
    // DEVELOPMENT
    const explorerBscUrl = "https://testnet.bscscan.com/tx/"
    const explorerEthUrl = "https://rinkeby.etherscan.com/tx/"

    // Modals
    const [showNotConnected, setShowNotConnected] = useState(false)
    const [showPleaseWait, setShowPleaseWait] = useState(false)
    const [showOnApprove, setShowOnApprove] = useState(false)
    const [showOnError, setShowOnError] = useState(false)
    const [showOnTransfer, setShowOnTransfer] = useState(false)
    const [showMetamaskInstall, setShowMetamaskInstall] = useState(false)
    const [showWrongNetwork, setShowWrongNetwork] = useState(false)

    useEffect(() => {
        function _init() {
            const web3Metamask = configureWeb3()

            if (web3Metamask !== 1) { 
                setWeb3(web3Metamask)
                _setState("hasMetamask", true)
            } else {
                _setState("hasMetamask", false)
            }
        }

        _init()
    }, [])

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

    // app, web3 functions
    // switch network      
    const switchNetwork = async (networkName) => {
        try {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                // PRODUCTION
                // params: [{ chainId: "0x38" }],
                // DEVELOPMENT
                params: [{ chainId: "0x61" }],
            })

            setShowWrongNetwork(false)
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await web3.currentProvider.request({
                        method: "wallet_addEthereumChain",
                        params: [networks[networkName]],
                    })
                } catch (error) {
                    _setState("txError", error.message)
                    setShowOnError(true)
                }
            }
        }
    }

    // connect wallet
    const connectWallet = async () => {
        if (state.hasMetamask) {
            const netId = await web3.eth.net.getId() // 97 - BSC testnet, 56 - BSC Mainnet
            
            // PRODUCTION
            // if (netId === 56) {
            // DEVELOPMENT
            if (netId === 97) {
                const acct = await window.ethereum.request({ method: "eth_requestAccounts"})
                if (acct.length > 0) {
                    _setState("isConnected", true)
                    _setState("account", acct[0])
                }
            } else {
                setShowWrongNetwork(true)
            }
        } else {
            setShowMetamaskInstall(true)
        }
    }

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
                            { state.isConnected ? (
                                <li className="nav-item" id="connect-to-metamask-container">
                                    <button type="button" className="d-none d-sm-block btn btn-custom-9 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connected: {shortenAddress(state.account, 6, 4)}</button>
                                </li>
                            ) : (
                                <li className="nav-item" id="connect-to-metamask-container">
                                    <button onClick={connectWallet} type="button" className="d-none d-sm-block btn btn-custom-4 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connect&nbsp;Wallet</button>
                                    <button onClick={connectWallet} type="button" className="d-block d-sm-none btn btn-custom-4 shadow-sm font-size-90 py-2 px-4" id="connect-to-metamask" style={{"borderRadius": "100px"}}>Connect</button>
                                </li>
                            )}
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
                                        { state.isConnected ? (
                                            <button className="btn btn-custom-2 font-size-130 py-3 w-100">APPROVE</button>
                                        ) : (
                                            <button onClick={() => setShowNotConnected(true)} className="btn btn-custom-2 font-size-130 py-3 w-100">APPROVE</button>
                                        )}
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
            {/* Modal for not connected */}
            <Modal show={showNotConnected} onHide={() => setShowNotConnected(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="red" size="6x" icon={faExclamationCircle} />
                    </div>
                    <p className="app-error-modal-content text-center font-andes text-lg">Please connect to your Metamask Wallet.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowNotConnected(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 

            {/* Modal for error transaction */}
            <Modal show={showOnError} onHide={() => setShowOnError(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="red" size="6x" icon={faExclamationCircle} />
                    </div>
                    <p className="app-error-modal-content text-center font-andes text-lg">Error: {state.txError}</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowOnError(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 

            {/* Modal for waiting */}
            <Modal show={showPleaseWait} onHide={() => setShowPleaseWait(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="grey" size="6x" icon={faSpinner} spin />
                    </div>
                    <p className="app-error-modal-content text-center font-andes text-lg">Please wait...</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowPleaseWait(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 

            {/* Modal for successful approve */}
            <Modal show={showOnApprove} onHide={() => setShowOnApprove(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="green" size="6x" icon={faCheckCircle} />
                    </div>
                    <p className="app-success-modal-content text-center font-andes text-lg">Your transaction was approved. You can now proceed.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowOnApprove(false)}>
                        Close
                    </Button>
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => window.open(explorerBscUrl + state.txHashBsc, '_blank').focus()}>
                        View on BscScan
                    </Button>
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => window.open(explorerEthUrl + state.txHashEth, '_blank').focus()}>
                        View on EtherScan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for successful staking */}
            <Modal show={showOnTransfer} onHide={() => setShowOnTransfer(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="green" size="6x" icon={faCheckCircle} />
                    </div>
                    <p className="app-success-modal-content text-center font-andes text-lg">Your LP tokens are staked successfully.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowOnTransfer(false)}>
                        Close
                    </Button>
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => window.open(explorerBscUrl + state.txHashBsc, '_blank').focus()}>
                        View on BscScan
                    </Button>
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => window.open(explorerEthUrl + state.txHashEth, '_blank').focus()}>
                        View on EtherScan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for No Metamask */}
            <Modal show={showMetamaskInstall} onHide={() => setShowMetamaskInstall(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div style={{"textAlign": "center"}}>
                        <img src={metamask} alt="Metamask logo" />
                    </div>
                    <p className="app-metamask-modal-content text-center font-andes text-lg">Metamask is currently not installed</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowMetamaskInstall(false)}>
                        Close
                    </Button>
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => window.open("https://metamask.io/download", '_blank').focus()}>
                        Install Metamask
                    </Button>
                </Modal.Footer>
            </Modal> 

            {/* Modal for incorrect network */}
            <Modal show={showWrongNetwork} onHide={() => setShowWrongNetwork(false)} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="green" size="6x" icon={faExclamationCircle} />
                    </div>
                    {/* PRODUCTION */}
                    {/* <p className="app-network-modal-content text-center font-andes text-lg">Please connect to BSC Mainnet</p> */}
                    {/* DEVELOPMENT */}
                    <p className="app-network-modal-content text-center font-andes text-lg">Please connect to BSC Testnet</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="font-w-hermann w-hermann-reg" variant="secondary" onClick={() => setShowWrongNetwork(false)}>
                        Close
                    </Button>
                    {/* PRODUCTION */}
                    {/* <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => switchNetwork("bscmainnet")}>
                        Switch Network
                    </Button> */}
                    {/* DEVELOPMENT */}
                    <Button className="font-w-hermann w-hermann-reg" variant="primary" onClick={() => switchNetwork("bsctestnet")}>
                        Switch Network
                    </Button>
                </Modal.Footer>
            </Modal>  
            
            {/* End Modals */}
        </div>
  );
}

export default App;
