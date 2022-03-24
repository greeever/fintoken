import "../styles/globals.css";
import { Provider, chain, defaultL2Chains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

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
  return (

    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  );
}
