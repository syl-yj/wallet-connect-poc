import dotenv from "dotenv";
import { JsonRpcSigner } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

dotenv.config();

export const enum ChainId {
  ETHER_CHAIN_ID = 1,
}

export const INJECTED_CONNECTOR = new InjectedConnector({
  supportedChainIds: [ChainId.ETHER_CHAIN_ID],
});

export const WALLET_CONNECT = new WalletConnectConnector({
  rpc: {
    1: `https://rpc.ankr.com/eth`,
  },
  qrcode: true,
});

/**
 * get user signature with metamask by web3-react
 * @param signer provider signer to sign with (= ethers.js)
 * @param message message to sign
 * @returns signature with given message
 */
export const getSignByWeb3Library = async (signer: JsonRpcSigner | undefined, message: string) => {
  try {
    if (!signer) return undefined;
    return await signer.signMessage(message);
  } catch (error) {
    return undefined;
  }
};
