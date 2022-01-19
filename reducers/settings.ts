type Setting = {
  name: "importData" | "includeDesc" | "includeImg" | "keepLevels" | "location";
  value: boolean | string;
};

export const initialState = {
  importData: false,
  includeDesc: false,
  includeImg: false,
  keepLevels: false,
  location: "",
};

export type State = {
  importData: boolean;
  includeDesc: boolean;
  includeImg: boolean;
  keepLevels: boolean;
  location: string;
};

export type Action =
  | { type: "set"; payload: State }
  | { type: "toggle"; payload: Setting };

const settingsReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "toggle":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default settingsReducer;
