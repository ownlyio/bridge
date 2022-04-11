let cacheVersion;
let ownlyContract;
let ownlyContractAddress;
let ownlyContractAbi;
let mainBridgeContract;
let mainBridgeContractAddress;
let mainBridgeContractAbi;
let wrappedOwnlyContract;
let wrappedOwnlyContractAddress;
let wrappedOwnlyContractAbi;
let rpcEndpointBsc;
let blockchainExplorerBsc;
let chainIDBsc;
let rpcEndpointEth;
let blockchainExplorerEth;
let chainIDEth;
let ownlyAPI;
let ownlyListener;
let web3Bsc;
let web3Eth;
let mainWeb3;
let address = false;
let isConnectedToMetamask = false;
let loading_interval;
let approved = 0;
let signature = null;

let initializeEnvVariables = () => {
    let currentURL = window.location.href;

    if(false) {
        ownlyContractAddress = "0xC3Df366fAf79c6Caff3C70948363f00b9Ac55FEE";
        ownlyContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

        mainBridgeContractAddress = "0xf803DaAC7c8341511571F59AA73fC8CfBaD88eb0";
        mainBridgeContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeItemCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"fetchBridgeItems","outputs":[{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct MainBridge.BridgeItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBridgeValidator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignedMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"getItemIdIsClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"recoverSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bridgeValidator","type":"address"}],"name":"setBridgeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ownTokenAddress","type":"address"}],"name":"setOwnToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"splitSignature","outputs":[{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

        wrappedOwnlyContractAddress = "0x9a8f31475553624FEe096E8d40eb2365386F89B9";
        wrappedOwnlyContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeItemCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"fetchBridgeItems","outputs":[{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct WrappedOwnly.BridgeItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBridgeValidator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignedMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"getItemIdIsClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"recoverSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bridgeValidator","type":"address"}],"name":"setBridgeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"splitSignature","outputs":[{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

        rpcEndpointEth = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
        rpcEndpointBsc = "https://bsc-dataseed.binance.org/";

        blockchainExplorerEth = "https://etherscan.io/";
        blockchainExplorerBsc = "https://bscscan.com/";

        chainIDEth = 1;
        chainIDBsc = 56;

        ownlyAPI = "https://ownly.tk/";
    } else {
        ownlyContractAddress = "0xC3Df366fAf79c6Caff3C70948363f00b9Ac55FEE";
        ownlyContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

        mainBridgeContractAddress = "0xf803DaAC7c8341511571F59AA73fC8CfBaD88eb0";
        mainBridgeContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeItemCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"fetchBridgeItems","outputs":[{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct MainBridge.BridgeItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBridgeValidator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignedMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"getItemIdIsClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"recoverSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bridgeValidator","type":"address"}],"name":"setBridgeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ownTokenAddress","type":"address"}],"name":"setOwnToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"splitSignature","outputs":[{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

        wrappedOwnlyContractAddress = "0x9a8f31475553624FEe096E8d40eb2365386F89B9";
        wrappedOwnlyContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeItemCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"fetchBridgeItems","outputs":[{"components":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct WrappedOwnly.BridgeItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBridgeValidator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignedMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"getItemIdIsClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"recoverSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bridgeValidator","type":"address"}],"name":"setBridgeValidator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"splitSignature","outputs":[{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"contractAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

        rpcEndpointEth = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
        rpcEndpointBsc = "https://data-seed-prebsc-2-s2.binance.org:8545/";

        blockchainExplorerEth = "https://rinkeby.etherscan.io/";
        blockchainExplorerBsc = "https://testnet.bscscan.com/";

        chainIDEth = 4;
        chainIDBsc = 97;

        ownlyAPI = "http://ownly-api.test/";
    }

    cacheVersion = $("#script").attr("src").split("?v=")[1];
    $("#app-version").text(cacheVersion);
};
let initiate_loading_page = () => {
    loading_interval = setInterval(function() {
        if($("#loading-ownly").css('opacity') === "1") {
            $("#loading-ownly").css('opacity', '0.3');
        } else {
            $("#loading-ownly").css('opacity', '1');
        }
    }, 1100);

    let all = document.getElementsByTagName("*");
    for (let i=0, max=all.length; i < max; i++)
    {
        loading_set_ele(all[i]);
    }
};
let loading_check_element = (ele) => {
    let all = document.getElementsByTagName("*");
    let per_inc=100/all.length;

    if($(ele).on())
    {
        let prog_width=per_inc+Number(document.getElementById("progress_width").value);
        document.getElementById("progress_width").value=prog_width;
        $("#loading-page-progress-bar").css("width", prog_width + "%")
    } else {
        loading_set_ele(ele);
    }
}
let loading_set_ele = (set_element) => {
    loading_check_element(set_element);
}
let close_loading_page = () => {
    let loadingOwnlyContainer = $("#loading-ownly-container");

    loadingOwnlyContainer.removeClass("d-flex");
    loadingOwnlyContainer.addClass("d-none");

    clearInterval(loading_interval);
};
let numberFormat = function(x, decimal) {
    x = parseFloat(x);
    let parts = x;

    if(decimal !== false) {
        parts = parts.toFixed(decimal)
    }

    parts = parts.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(decimal !== 0) {
        return parts.join(".");
    } else {
        return parts[0];
    }
};
let initializePage = () => {
    let app = $("#app");
    app.removeClass("d-none");
};
let connectToMetamask = async () => {
    if(!isConnectedToMetamask) {
        if (window.ethereum) {
            try {
                ethereum.on('accountsChanged', (accounts) => {
                    address = (accounts.length > 0) ? accounts[0] : false;

                    updateConnectToWallet();
                    initializePage();
                });

                ethereum.on('chainChanged', (_chainId) => window.location.reload());

                mainWeb3 = new Web3(ethereum);

                initializeContracts();

                return true;
            } catch (error) {
                $("#modal-no-metamask-installed").modal("show");
                return false;
            }
        } else {
            $("#modal-no-metamask-installed").modal("show");
            return false;
        }
    } else {
        return true;
    }
};
let updateConnectToWallet = async () => {
    // let accounts = await web3Eth.eth.getAccounts();
    // address = (accounts.length > 0) ? accounts[0] : false;
    //
    // console.log(address);

    if(!address) {
        try {
            accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            address = (accounts.length > 0) ? accounts[0] : false;
        } catch(e) {}
    }

    if(address) {
        $("#connect-wallet-container").addClass("d-none");

        let accountAddress = $("#account-address");

        let content = ' <div class="d-flex align-items-center">';
        content += '        <div class="background-image-cover" id="profile-photo" style="width:35px; height:35px; border-radius:50%; border:1px solid #aaaaaa">';
        content += '            <svg data-jdenticon-value="" class="jdenticon w-100 h-100" style="border-radius:50%">';
        content += '                Fallback text or image for browsers not supporting inline svg.';
        content += '            </svg>';
        content += '        </div>';
        content += '        <span class="font-size-90 ps-2">' + shortenAddress(web3Bsc.utils.toChecksumAddress(address), 5, 5) + "&nbsp;" + '</span>';
        content += '    </div>';

        accountAddress.html(content);
        accountAddress.removeClass("d-none");

        jdenticon.update("#profile-photo .jdenticon", address.toString());

        accountAddress.attr("href", "?profile=" + address);

        let form_data = new FormData();
        form_data.append('address', address);

        $.ajax({
            url: ownlyAPI + "api/get-account-settings",
            method: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: form_data
        }).done(async function(response) {
            if(response.data && response.data.photo) {
                let profilePhoto = $("#profile-photo");

                profilePhoto.html("");
                profilePhoto.css("background-image", "url(" + response.data.photo + ")");
            }
        }).fail(function(error) {
            console.log(error);
        });

        loadBridgeData();
    } else {
        $("#account-address").addClass("d-none");
        $("#connect-wallet-container").removeClass("d-none");
    }
};
let initializeWeb3 = async () => {
    try {
        ethereum.on('accountsChanged', (accounts) => {
            address = (accounts.length > 0) ? accounts[0] : false;

            updateConnectToWallet();
            initializePage();
        });

        ethereum.on('chainChanged', (_chainId) => window.location.reload());
    } catch (error) {}

    web3Bsc = new Web3(rpcEndpointBsc);
    web3Eth = new Web3(rpcEndpointEth);
};
let initializeContracts = () => {
    ownlyContract = new web3Bsc.eth.Contract(ownlyContractAbi, ownlyContractAddress);
    mainBridgeContract = new web3Bsc.eth.Contract(mainBridgeContractAbi, mainBridgeContractAddress);
    wrappedOwnlyContract = new web3Eth.eth.Contract(wrappedOwnlyContractAbi, wrappedOwnlyContractAddress);
};
let shortenAddress = (address, prefixCount, postfixCount) => {
    let prefix = address.substr(0, prefixCount);
    let postfix = address.substr(address.length - postfixCount, address.length);

    return prefix + "..." + postfix;
};
let pad_zeroes = (number) => {
    number = number.toString();

    while(number.length < 2) {
        number = "0" + number;
    }

    return number;
};
let loadBridgeData = function() {
    let fromNetwork = $("#from-network").html();

    if(fromNetwork === "BNB Chain") {
        ownlyContract.methods.balanceOf(address).call()
            .then(function(balance) {
                let balanceDisplay = numberFormat(web3Bsc.utils.fromWei(balance, 'ether'), 2);
                $("#balance").html(balanceDisplay);
            });

        ownlyContract.methods.allowance(address, mainBridgeContractAddress).call()
            .then(function(allowance) {
                let allowanceDisplay = numberFormat(web3Bsc.utils.fromWei(allowance, 'ether'), 2);
                $("#approved").html(allowanceDisplay);

                approved = allowance;

                if(allowance > 0) {
                    $(".completed-circle[data-value='1']").removeClass("text-color-11");
                    $(".completed-circle[data-value='1']").addClass("text-color-10");

                    $("#progress-bar").css("width", "50%");
                }
            });

        $.get(ownlyAPI + "api/web3/bridge/getSignature/97/" + address, function(data) {
            data = JSON.parse(data);

            signature = data;

            if(data.length > 0) {
                $(".completed-circle[data-value='1']").removeClass("text-color-11");
                $(".completed-circle[data-value='1']").addClass("text-color-10");

                $(".completed-circle[data-value='2']").removeClass("text-color-11");
                $(".completed-circle[data-value='2']").addClass("text-color-10");

                $("#progress-bar").css("width", "84%");
            }
        });
    } else if(fromNetwork === "Ethereum") {
        wrappedOwnlyContract.methods.balanceOf(address).call()
            .then(function(balance) {
                let balanceDisplay = numberFormat(web3Bsc.utils.fromWei(balance, 'ether'), 2);
                $("#balance").html(balanceDisplay);
            });

        wrappedOwnlyContract.methods.allowance(address, wrappedOwnlyContractAddress).call()
            .then(function(allowance) {
                let allowanceDisplay = numberFormat(web3Bsc.utils.fromWei(allowance, 'ether'), 2);
                $("#approved").html(allowanceDisplay);

                approved = allowance;

                if(allowance > 0) {
                    $(".completed-circle[data-value='1']").removeClass("text-color-11");
                    $(".completed-circle[data-value='1']").addClass("text-color-10");

                    $("#progress-bar").css("width", "50%");
                }
            });

        $.get(ownlyAPI + "api/web3/bridge/getSignature/4/" + address, function(data) {
            data = JSON.parse(data);

            signature = data;

            if(data.length > 0) {
                $(".completed-circle[data-value='1']").removeClass("text-color-11");
                $(".completed-circle[data-value='1']").addClass("text-color-10");

                $(".completed-circle[data-value='2']").removeClass("text-color-11");
                $(".completed-circle[data-value='2']").addClass("text-color-10");

                $("#progress-bar").css("width", "84%");
            }
        });
    }
};

initializeEnvVariables();

$(document).ready(function() {
    initiate_loading_page();
});

$(window).on("load", async () => {
    initializeWeb3();
    initializeContracts();
    updateConnectToWallet();
    initializePage();
    close_loading_page();
});

$(document).on("click", "#install-metamask", () => {
    $("#modal-no-metamask-installed").modal("hide");
});

$(document).on("click", "#connect-wallet", () => {
    $("#modal-wallet-options").modal("show");
});

$(document).on("click", ".change-network", function() {
    let direction = $(this).attr("data-direction");
    let network = $(this).attr("data-value");

    $(".change-network[data-direction='" + direction + "']").closest("li").removeClass("d-none");
    $(".change-network[data-direction='" + direction + "'][data-network='" + network + "']").closest("li").addClass("d-none");

    $("#" + direction + "-network").html(network);

    let oppositeDirection = (direction === "from") ? "to" : "from";
    let oppositeNetwork = (network === "BNB Chain") ? "Ethereum" : "BNB Chain";

    $(".change-network[data-direction='" + oppositeDirection + "']").closest("li").removeClass("d-none");
    $(".change-network[data-direction='" + oppositeDirection + "'][data-network='" + oppositeNetwork + "']").closest("li").addClass("d-none");

    $("#" + oppositeDirection + "-network").html(oppositeNetwork);

    loadBridgeData();
});

$(document).on("click", "#approve", async function() {
    let fromNetwork = $("#from-network").html();
    let amount = web3Bsc.utils.toWei($("#amount").val(), 'ether');

    isConnectedToMetamask = await connectToMetamask();
    if(!isConnectedToMetamask) {
        return 0;
    }
    let _chainID = await mainWeb3.eth.getChainId();

    if(fromNetwork === "BNB Chain") {
        if(_chainID !== chainIDBsc) {
            $("#modal-wrong-network").modal("show");
            return 0;
        }

        ownlyContract = new mainWeb3.eth.Contract(ownlyContractAbi, ownlyContractAddress);
        ownlyContract.methods.approve(mainBridgeContractAddress, amount)
            .send({
                from: mainWeb3.utils.toChecksumAddress(address)
            }).on('transactionHash', function(transactionHash){
                $("#modal-processing").modal("show");
            }).on('error', function(error){
                $("#modal-processing").modal("hide");

                $("#modal-error .message").text(error.code + ": " + error.message);
                $("#modal-error").modal("show");
            }).then(function(receipt) {
                $("#modal-processing").modal("hide");
                loadBridgeData();
            });
    } else if(fromNetwork === "Ethereum") {
        if(_chainID !== chainIDEth) {
            $("#modal-wrong-network").modal("show");
            return 0;
        }

        wrappedOwnlyContract = new mainWeb3.eth.Contract(wrappedOwnlyContractAbi, wrappedOwnlyContractAddress);
        wrappedOwnlyContract.methods.approve(wrappedOwnlyContractAddress, amount)
            .send({
                from: mainWeb3.utils.toChecksumAddress(address)
            }).on('transactionHash', function(transactionHash){
            $("#modal-processing").modal("show");
        }).on('error', function(error){
            $("#modal-processing").modal("hide");

            $("#modal-error .message").text(error.code + ": " + error.message);
            $("#modal-error").modal("show");
        }).then(function(receipt) {
            $("#modal-processing").modal("hide");
            loadBridgeData();
        });
    }
});

$(document).on("click", "#transfer", async function() {
    if(approved > 0) {
        let fromNetwork = $("#from-network").html();

        isConnectedToMetamask = await connectToMetamask();
        if(!isConnectedToMetamask) {
            return 0;
        }
        let _chainID = await mainWeb3.eth.getChainId();

        if(fromNetwork === "BNB Chain") {
            if(_chainID !== chainIDBsc) {
                $("#modal-wrong-network").modal("show");
                return 0;
            }

            mainBridgeContract = new mainWeb3.eth.Contract(mainBridgeContractAbi, mainBridgeContractAddress);
            mainBridgeContract.methods.bridge(approved)
                .send({
                    from: mainWeb3.utils.toChecksumAddress(address)
                }).on('transactionHash', function(transactionHash){
                $("#modal-processing").modal("show");
            }).on('error', function(error){
                $("#modal-processing").modal("hide");

                $("#modal-error .message").text(error.code + ": " + error.message);
                $("#modal-error").modal("show");
            }).then(function(receipt) {
                $("#modal-processing").modal("hide");
                loadBridgeData();
            });
        } else if(fromNetwork === "Ethereum") {
            if(_chainID !== chainIDEth) {
                $("#modal-wrong-network").modal("show");
                return 0;
            }

            wrappedOwnlyContract = new mainWeb3.eth.Contract(wrappedOwnlyContractAbi, wrappedOwnlyContractAddress);
            wrappedOwnlyContract.methods.bridge(approved)
                .send({
                    from: mainWeb3.utils.toChecksumAddress(address)
                }).on('transactionHash', function(transactionHash){
                $("#modal-processing").modal("show");
            }).on('error', function(error){
                $("#modal-processing").modal("hide");

                $("#modal-error .message").text(error.code + ": " + error.message);
                $("#modal-error").modal("show");
            }).then(function(receipt) {
                $("#modal-processing").modal("hide");
                loadBridgeData();
            });
        }
    }
});

$(document).on("click", "#claim", async function() {
    if(signature) {
        let fromNetwork = $("#from-network").html();

        isConnectedToMetamask = await connectToMetamask();
        if(!isConnectedToMetamask) {
            return 0;
        }
        let _chainID = await mainWeb3.eth.getChainId();

        if(fromNetwork === "BNB Chain") {
            if(_chainID !== chainIDEth) {
                $("#modal-wrong-network").modal("show");
                return 0;
            }

            wrappedOwnlyContract = new mainWeb3.eth.Contract(wrappedOwnlyContractAbi, wrappedOwnlyContractAddress);
            wrappedOwnlyContract.methods.claim(mainBridgeContractAddress, signature[0], signature[1], signature[2], signature[3])
                .send({
                    from: mainWeb3.utils.toChecksumAddress(address)
                }).on('transactionHash', function(transactionHash){
                $("#modal-processing").modal("show");
            }).on('error', function(error){
                $("#modal-processing").modal("hide");

                $("#modal-error .message").text(error.code + ": " + error.message);
                $("#modal-error").modal("show");
            }).then(function(receipt) {
                $("#modal-processing").modal("hide");

                $(".completed-circle[data-value='2']").removeClass("text-color-11");
                $(".completed-circle[data-value='2']").addClass("text-color-10");

                $("#progress-bar").css("width", "100%");
            });
        } else if(fromNetwork === "Ethereum") {
            if(_chainID !== chainIDBsc) {
                $("#modal-wrong-network").modal("show");
                return 0;
            }

            mainBridgeContract = new mainWeb3.eth.Contract(mainBridgeContractAbi, mainBridgeContractAddress);
            mainBridgeContract.methods.claim("4", wrappedOwnlyContractAddress, signature[0], signature[1], signature[2], signature[3])
                .send({
                    from: mainWeb3.utils.toChecksumAddress(address)
                }).on('transactionHash', function(transactionHash){
                $("#modal-processing").modal("show");
            }).on('error', function(error){
                $("#modal-processing").modal("hide");

                $("#modal-error .message").text(error.code + ": " + error.message);
                $("#modal-error").modal("show");
            }).then(function(receipt) {
                $("#modal-processing").modal("hide");

                $(".completed-circle[data-value='3']").removeClass("text-color-11");
                $(".completed-circle[data-value='3']").addClass("text-color-10");

                $("#progress-bar").css("width", "100%");
            });
        }
    }
});