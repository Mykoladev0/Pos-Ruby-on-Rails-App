import React, { useState, useContext } from "react";
import {
  Button,
  H4,
  Box,
  Select,
  Panel,
  Checkbox,
  Radio,
  Text,
  Small,
} from "@bigcommerce/big-design";
import Axios from "axios";
import { StyledFooter } from "./styled";
import StoreContext from "../../contexts/store";
import alertManager from "../../lib/alerts";
import { useSettings } from "../../contexts/settings";

const options = [
  { value: "mainStreet", content: "Main Street" },
  { value: "2ndStreet", content: "2nd Street" },
];

export default function Inventory(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const { storeId } = useContext(StoreContext);
  const { state, dispatch } = useSettings();

  /**
   * Takes the current settings and persist them in database
   */
  const updateSettings = (): void => {
    setLoading(true);

    Axios.put(`/api/store/${storeId}`, {
      settings: state,
    })
      .then(() =>
        alertManager.add({
          messages: [{ text: "Settings updated succesfully" }],
          type: "success",
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Panel header="Inventory sync">
        <Text>
          Sync your POS items into BigCommerce as products. Changing these
          settings will trigger a new import.
        </Text>
        <H4>POS location</H4>
        <Small>
          Set which location in POS will be receiving inventory and stock
          updates. Please note that if a variant does not exist at the specified
          location or the SKU is already at 0, then there will be no update to
          the stock count.
        </Small>
        <Box marginTop="medium" style={{ width: 250 }}>
          <Select
            options={options}
            onOptionChange={(value) =>
              dispatch({ type: "toggle", payload: { name: "location", value } })
            }
            required
            value={state.location}
            style={{ width: 250 }}
          />
        </Box>
        <Box marginTop="medium">
          <H4>Inventory settings</H4>
          <Small>
            Set the configuration for pulling in products and/or product
            inventory levels from your selected POS location into BigCommerce.
          </Small>
          <Checkbox
            label="Keep inventory up to date"
            description={{
              text:
                "Product inventory levels will be copied from POS every 5mins.",
            }}
            checked={state.keepLevels}
            onChange={() =>
              dispatch({
                type: "toggle",
                payload: { name: "keepLevels", value: !state.keepLevels },
              })
            }
          />
        </Box>
        <Box marginTop="medium">
          <H4>Product handling</H4>
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
        </Box>
      </Panel>
      <StyledFooter>
        <Button isLoading={loading} onClick={updateSettings} mobileWidth="auto">
          {loading ? "Saving" : "Save changes"}
        </Button>
      </StyledFooter>
    </>
  );
}
