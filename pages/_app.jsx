import "../styles/globals.css";
import { Provider, chain, defaultL2Chains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";


const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const chains = defaultL2Chains;


const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "NextJS-wagmi",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

export default function MyApp({ Component, pageProps }) {
  return (

    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  );
}
