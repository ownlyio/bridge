import logo from './logo.svg';
import './App.css';

import img_bnb from './img/tokens/bnb.png';
import img_eth from './img/tokens/eth.png';
import img_ownly_logo from './img/ownly/logo.png';
import img_ownly_horizontal_white from './img/ownly/horizontal-white.png';

function App() {
    return (
        <div className="bg-color-1">
            <div className="container">
                <header className="py-3 position-fixed w-100" id="header">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="pe-2">
                                    <a href="#top" className="d-flex align-items-center mb-0 mb-md-2 mb-lg-0 text-dark text-decoration-none">
                                        <img src={img_ownly_logo} className="d-none d-md-block" width="50" alt="Ownly"/>
                                        <img src={img_ownly_horizontal_white} className="d-block d-md-none" width="130" alt="Ownly"/>
                                    </a>
                                </div>
                                <div>
                                    <a href="#top" className="link-color-1 font-size-170 rubik-black ps-1 d-none d-md-block text-decoration-none">OWNLY</a>
                                </div>
                            </div>

                            <div className="d-none d-md-block">
                                <ul className="nav col-12 col-lg-auto me-lg-auto justify-content-center mb-0 rubik-regular">
                                    <li><a href="#features"
                                           className="nav-link pe-1 pe-sm-3 py-1 py-sm-2 link-color-1 font-size-80 font-size-sm-120">Features</a>
                                    </li>
                                    <li><a href="/token"
                                           className="nav-link px-1 px-sm-3 py-1 py-sm-2 link-color-1 font-size-80 font-size-sm-120 mb-1 mb-sm-0">Token</a>
                                    </li>
                                    <li><a href="#roadmap"
                                           className="nav-link px-1 px-sm-3 py-1 py-sm-2 link-color-1 font-size-80 font-size-sm-120">Roadmap</a>
                                    </li>
                                    <li><a href="#blog"
                                           className="nav-link px-1 px-sm-3 py-1 py-sm-2 link-color-1 font-size-80 font-size-sm-120">Blog</a>
                                    </li>
                                    <li><a href="#team"
                                           className="nav-link px-1 px-sm-3 py-1 py-sm-2 link-color-1 font-size-80 font-size-sm-120">Team</a>
                                    </li>
                                    <li><a href="https://ownly.io/marketplace" target="_blank" className="nav-link btn btn-custom-2 ms-1 ms-sm-3 ps-sm-3 py-1 py-sm-2 font-size-80 font-size-sm-90" id="launch-marketplace">Launch Marketplace</a></li>
                                </ul>
                            </div>

                            <div className="d-block d-md-none pe-1 cursor-pointer" id="show-mobile-nav">
                                <i className="fas fa-bars text-white font-size-150"> </i>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-2 position-fixed bg-white w-100 overflow-hidden" id="mobile-nav">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="pe-2">
                                    <a href="#top" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                                        <img src="img/ownly-2.png" className="" width="80" alt="Ownly"/>
                                    </a>
                                </div>
                            </div>

                            <div className="d-flex flex-fill">
                                <div className="d-flex justify-content-center w-100">
                                    <div>
                                        <ul className="nav flex-column align-items-start col-12 col-lg-auto me-lg-auto mb-0 rubik-regular">
                                            <li><a href="#features" className="nav-link py-1 link-color-1 font-size-80">Features</a></li>
                                            <li><a href="/token" className="nav-link py-1 link-color-1 font-size-80 mb-1 mb-sm-0">Token</a></li>
                                            <li><a href="#roadmap" className="nav-link py-1 link-color-1 font-size-80">Roadmap</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="nav flex-column align-items-start col-12 col-lg-auto me-lg-auto mb-0 rubik-regular">
                                            <li><a href="#blog" className="nav-link py-1 link-color-1 font-size-80 font-size-sm-120">Blog</a></li>
                                            <li><a href="#team" className="nav-link py-1 link-color-1 font-size-80">Team</a></li>
                                            <li><a href="https://ownly.io/marketplace" target="_blank" className="nav-link btn btn-custom-2 ms-1 ms-sm-3 ps-sm-3 py-1 py-sm-2 font-size-80 line-height-120 font-size-sm-90" id="launch-marketplace">Launch Marketplace</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="pe-1 cursor-pointer ps-3" id="hide-mobile-nav">
                                <i className="fas fa-times text-color-1 font-size-130"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center min-vh-100 py-5 padding-after-nav">
                    <div className="card shadow-sm w-100 mb-5 mt-4 mt-sm-0">
                        <div className="card-body">
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
                                                <button type="button" className="btn btn-custom-2 px-3">Max</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-xxl-2 mb-5 mb-lg-0">
                                    <div className="text-center font-size-110 line-height-150 mb-3">Approved: 100,000,000&nbsp;OWN</div>
                                    <div className="mb-1">
                                        <button className="btn btn-custom-2 py-2 w-100">Limits</button>
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
