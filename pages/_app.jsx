import {useEffect} from 'react'
import "../styles/globals.css";
import { Provider, chain, defaultL2Chains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// // import { WalletLinkConnector } from "wagmi/connectors/walletLink";
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import Web3Modal from "web3modal";
// import { ethers } from 'ethers';
// import { useState } from 'react';
// import { AccountContext } from '../context.js'

// const connectWallet = async () => {
//   try {
//     const provider = await web3Modal.connect();
//     const library = new ethers.providers.Web3Provider(provider);
//     const accounts = await library.listAccounts();
//     const network = await library.getNetwork();
//     setProvider(provider);
//     setLibrary(library);
//     if (accounts) setAccount(accounts[0]);
//     setNetwork(network);
//   } catch (error) {
//     console.error(error);
//   }
// };
const chains = defaultL2Chains;


const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId: "8abeafde689b4b7bbeca31ed130ed3c1",
        qrcode: true,
      },
    }),
  ];
};

export default function MyApp({ Component, pageProps }) {
//   const [provider, setProvider] = useState();
// const [library, setLibrary] = useState();
// const [account, setAccount] = useState();
// const [network, setNetwork] = useState();
// const [cache, setCache] = useState();

// async function getWeb3Modal() {
// const web3Modal = new Web3Modal({
//   network: 'mainnet',
//   cacheProvider: true,
//   providerOptions: {
//     walletconnect: {
//       package: WalletConnectProvider,
//       options: {
//         infuraId: "8abeafde689b4b7bbeca31ed130ed3c1",
//         qrcode: true,
//               },
//     },
//   },
// })
// return web3Modal
// }

// const connect = async () => {
//   try {
//     const web3Modal = await getWeb3Modal()
//     const provider = await web3Modal.connect();
//     const library = new ethers.providers.Web3Provider(provider);
//     const accounts = await library.listAccounts();
//     const network = await library.getNetwork();
//     const cache = await web3Modal.cachedProvider
//     setCache(cache)
//     setProvider(provider);
//     setLibrary(library);
//     if (accounts) setAccount(accounts[0]);
//     setNetwork(network);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   if (provider?.on) {
//     const handleAccountsChanged = (accounts) => {
//       setAccounts(accounts);
//     };

//     const handleChainChanged = (chainId) => {
//       setChainId(chainId);
//     };

//     const handleDisconnect = () => {
//       disconnect();
//     };

//     provider.on("accountsChanged", handleAccountsChanged);
//     provider.on("chainChanged", handleChainChanged);
//     provider.on("disconnect", handleDisconnect);

//     return () => {
//       if (provider.removeListener) {
//         provider.removeListener("accountsChanged", handleAccountsChanged);
//         provider.removeListener("chainChanged", handleChainChanged);
//         provider.removeListener("disconnect", handleDisconnect);
//       }
//     };
//   }
// }, [provider]);


//   useEffect(() => {
//     if (cache) {
//       connect()
//     }
//   },[])

//   const truncateAddress = (address) => {
//     return address.slice(0, 6) 
//     // + "..." + address.slice(-4);
//   };
  return (
    <Provider autoConnect connectors={connectors}>
        <Component {...pageProps} />
      </Provider>
  );
}
