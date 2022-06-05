import {useEffect} from 'react'
import "../styles/globals.css";
import Head from 'next/head'
import { Provider, chain, defaultL2Chains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ThemeProvider } from 'next-themes';
const chains = defaultL2Chains;

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId: "6Wrtujs7IW1ekipJjG-uNWY5Fdn01s3d",
        qrcode: true,
      },
    }),
  ];
};

export default function MyApp({ Component, pageProps }) {

  return (
    
    <Provider autoConnect connectors={connectors}>
       <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
       <Head>
        <title>My new cool app</title>
      </Head>
        <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
  );
}
