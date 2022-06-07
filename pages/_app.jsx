import {useEffect} from 'react'
import "../styles/globals.css";
import Head from 'next/head'
import { ThemeProvider } from 'next-themes';
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
  chain
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const alchemyId = '6Wrtujs7IW1ekipJjG-uNWY5Fdn01s3d'
if (alchemyId === undefined) {
  console.log('this is alchemy error', alchemyId)
} else {
  console.log('alchemy is clear', alchemyId)
}

const smartChainChain = {
  id: 56,
  name: 'Binance',
  network: 'Binance',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance',
    symbol: 'BSC',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
}


const smartTestChain = {
  id: 97,
  name: 'Binance_Testnet',
  network: 'Binance_Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance_Testnet',
    symbol: 'BSC_Testnet',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscTestnetScan', url: 'https://testnet.bscscan.com' },
  },
  testnet: false,
}


const defaultL2Chains = [smartChainChain, smartTestChain]

const { chains, provider } = configureChains(defaultL2Chains, [
  jsonRpcProvider({
    rpc: (chain) => {
      // if (chain.id !== smartChainChain.id || chain.id !== smartTestChain) return null
      return { http: chain.rpcUrls.default }
}
  }),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'chase_finance',
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
})

export default function MyApp({ Component, pageProps }) {

  return (
    <WagmiConfig client={client}>
       <Head>
        <title>My new cool app</title>
      </Head>
      <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
        <Component {...pageProps} />
        </ThemeProvider>
        </WagmiConfig>
  );
}
