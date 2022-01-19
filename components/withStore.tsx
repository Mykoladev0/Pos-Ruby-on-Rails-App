import React, { useEffect, useContext } from "react";
import StoreContext from "../contexts/store";
import { useSettings } from "../contexts/settings";
import { State } from "../reducers/settings";

interface PageProps {
  storeId?: string;
  settings?: State;
}

/**
 * HOC that is extracting storeId from the query
 */
export default function withStore(ComposedComponent) {
  const WithStore = ({ storeId, settings }: PageProps): JSX.Element => {
    const { setStoreId } = useContext(StoreContext);
    const { dispatch } = useSettings();

    useEffect(() => {
      // Check if there is storeId and set it to store context
      if (storeId) setStoreId(parseInt(storeId));
      // Check if settings are present set it to store context
      if (settings) dispatch({ type: "set", payload: settings });
    }, []);

    return <ComposedComponent />;
  };

  return WithStore;
}
