import {useEffect} from 'react'
import "../styles/globals.css";
import Head from 'next/head'
import { ThemeProvider } from 'next-themes';
import {
  WagmiConfig,
  configureChains,
  createClient,
  chain
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Navbar from '../components/Navbar';
const alchemyId = '6Wrtujs7IW1ekipJjG-uNWY5Fdn01s3d'
if (alchemyId === undefined) {
  console.log('this is alchemy error', alchemyId)
} else {
  console.log('alchemy is clear', alchemyId)
}


const defaultL2Chains = [chain.polygon, chain.polygonMumbai]

const { chains, provider, webSocketProvider } = configureChains(defaultL2Chains, [
  alchemyProvider({ alchemyId }),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Zero Finance',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export default function MyApp({ Component, pageProps }) {

  return (
    <WagmiConfig client={client}>
       <Head>
        <title>Protea Finance</title>
      </Head>
      <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
        <Navbar />
        <Component {...pageProps} />
        </ThemeProvider>
        </WagmiConfig>
  );
}