import { useContext, createContext, Dispatch } from "react";
import { State, Action } from "../reducers/settings";

interface SettingsContext {
  state: State;
  dispatch: Dispatch<Action>;
}

const settingsContext = createContext<Partial<SettingsContext>>({});
export const useSettings = () => useContext(settingsContext);
export default settingsContext;
