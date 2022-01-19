import { createContext } from "react";

interface StoreContext {
  storeId: number | null;
  setStoreId: (id: number) => void;
  channelName: string;
  setChannelName: (name: string) => void;
}

export default createContext<Partial<StoreContext>>({});
