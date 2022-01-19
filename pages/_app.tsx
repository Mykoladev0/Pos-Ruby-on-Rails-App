import React, { useReducer, useState } from "react";
import { AppProps } from "next/app";
import { GlobalStyles, AlertsManager } from "@bigcommerce/big-design";
import CustomGlobalStyles from "../globalStyles";
import StoreContext from "../contexts/store";
import SettingsContext from "../contexts/settings";
import alertManager from "../lib/alerts";
import settingsReducer, { initialState } from "../reducers/settings";

function MyApp({ Component, pageProps }: AppProps) {
  const [storeId, setStoreId] = useState<number | null>(null);
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const [channelName, setChannelName] = useState("Sample POS");

  return (
    <>
      <GlobalStyles />
      <CustomGlobalStyles />
      <AlertsManager manager={alertManager} />
      <StoreContext.Provider
        value={{ storeId, setStoreId, channelName, setChannelName }}
      >
        <SettingsContext.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </SettingsContext.Provider>
      </StoreContext.Provider>
    </>
  );
}

export default MyApp;
