import { memo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Header } from "@components/index";
import "./App.scss";

function App() {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      <div className="App">
        <Header />
      </div>
    </Web3ReactProvider>
  );
}

export default memo(App);
