import { memo, useCallback, useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import ERC20_ABI from "@constants/erc20.abi.json";
import { INJECTED_CONNECTOR, WALLET_CONNECT } from "web3.utils";
import "./header.scss";

function Header() {
  const { activate, account, deactivate, library } = useWeb3React<Web3Provider>();

  const [sign, setSign] = useState<string>();

  const connectInjectedWallet = useCallback(async () => {
    await activate(INJECTED_CONNECTOR);
  }, [activate]);
  const connectWalletConnect = useCallback(async () => {
    await activate(WALLET_CONNECT);
  }, [activate]);

  const getSignByCurrentLibrary = useCallback(async () => {
    if (library) {
      try {
        const signature = await library.getSigner().signMessage("SIGN THIS MESSAGE!");
        setSign(signature);
      } catch (error) {
        const castedError = error as { code: number; message: string };
        setSign(`\nERROR\n${castedError?.code} : ${castedError.message}`);
      }
    }
  }, [library]);

  const sendTransaction = async () => {
    if (!library) {
      return;
    }
    try {
      const erc20Contract = new ethers.Contract(ERC20_ABI.address, ERC20_ABI.abi, library.getSigner());
      const transaction = await erc20Contract.approve("0x402b970d3f5Cc39f62088075c7Fa200D1f2DfA22", "0x1");
      // eslint-disable-next-line
      return transaction.hash;
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  if (account) {
    return (
      <header className="App-header">
        <div>CURRENT WALLET: {account}</div>
        <div className="App-link">
          Signature
          <br />
          {sign}
        </div>

        {sign ? (
          <button onClick={() => setSign(undefined)} type="button">
            REMOVE SIGN
          </button>
        ) : (
          <button onClick={getSignByCurrentLibrary} type="button">
            GET SIGN
          </button>
        )}

        <button onClick={sendTransaction} type="button">
          SEND TX
        </button>
        <button onClick={deactivate} type="button">
          DISCONNECT WALLET
        </button>
      </header>
    );
  }

  return (
    <header className="App-header">
      <button onClick={connectInjectedWallet} type="button">
        CONNECT METAMASK
      </button>
      <button onClick={connectWalletConnect} type="button">
        CONNECT WALLETCONNECT
      </button>
    </header>
  );
}

export default memo(Header);
