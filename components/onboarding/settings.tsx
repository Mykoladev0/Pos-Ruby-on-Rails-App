import React, { useContext } from "react";
import {
  Box,
  Panel,
  Input,
  Select,
  Radio,
  H4,
  Small,
} from "@bigcommerce/big-design";
import StoreContext from "../../contexts/store";
import { useSettings } from "../../contexts/settings";

const options = [
  { value: "mainStreet", content: "Main Street" },
  { value: "2ndStreet", content: "2nd Street" },
];

export default function Settings(): JSX.Element {
  const { channelName, setChannelName } = useContext(StoreContext);
  const { state, dispatch } = useSettings();

  return (
    <Panel
      margin={{ mobile: "medium", tablet: "xLarge", desktop: "xxxLarge" }}
      header="Channel settings"
    >
      <Input
        value={channelName}
        onChange={(e) => {
          setChannelName(e.target.value);
        }}
        label="Channel name"
        placeholder="For example, POS"
        required
      />
      <Box marginTop="small">
        <H4>POS location</H4>
        <Small>
          Set which location in POS will be receiving inventory and stock
          updates. Please note that if a variant does not exist at the specified
          location or the SKU is already at 0, then there will be no update to
          the stock count.
        </Small>
      </Box>
      <Box marginTop="xSmall" style={{ width: 250 }}>
        <Select
          options={options}
          onOptionChange={(value) =>
            dispatch({ type: "toggle", payload: { name: "location", value } })
          }
          required
          value={state.location}
        />
      </Box>
      <Box marginTop="xSmall">
        <Radio
          label="Import products and inventory from POS to BigCommerce"
          checked={state.importData}
          onChange={() =>
            dispatch({
              type: "toggle",
              payload: { name: "importData", value: true },
            })
          }
        />
      </Box>
      <Box marginTop="xSmall">
        <Radio
          label="Export products and inventory from BigCommerce to POS"
          checked={!state.importData}
          onChange={() =>
            dispatch({
              type: "toggle",
              payload: { name: "importData", value: false },
            })
          }
        />
      </Box>
    </Panel>
  );
}
