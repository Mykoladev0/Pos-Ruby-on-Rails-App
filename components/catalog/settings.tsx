import React from "react";
import { Box, Checkbox, Text } from "@bigcommerce/big-design";
import { useSettings } from "../../contexts/settings";

export default function Settings(): JSX.Element {
  const { state, dispatch } = useSettings();

  function handleImportCoreChange(): void {
    dispatch({
      type: "toggle",
      payload: {
        name: "includeDesc",
        value: state.includeDesc && state.includeImg,
      },
    });
    dispatch({
      type: "toggle",
      payload: {
        name: "includeImg",
        value: state.includeDesc && state.includeImg,
      },
    });
  }

  return (
    <>
      <Text>
        Set the configuration for pulling in products and/or product inventory
        levels from your selected POS location into BigCommerce.
      </Text>
      <Box margin="small">
        <Checkbox
          label="Include core product details (name, variants and pricing)"
          description={{
            text:
              "Products in POS will be created in BigCommerce, or updated if already in BigCommerce.",
          }}
          checked={state.includeDesc || state.includeImg}
          onChange={handleImportCoreChange}
        />
        <Box marginLeft="xxLarge" marginTop="small">
          <Checkbox
            onChange={() =>
              dispatch({
                type: "toggle",
                payload: { name: "includeDesc", value: !state.includeDesc },
              })
            }
            checked={state.includeDesc}
            label="Include product description"
          />
          <Checkbox
            onChange={() =>
              dispatch({
                type: "toggle",
                payload: { name: "includeImg", value: !state.includeImg },
              })
            }
            checked={state.includeImg}
            label="Include product image"
          />
        </Box>
      </Box>

      <Box margin="small">
        <Checkbox
          label="Include inventory levels"
          description={{
            text:
              "Product inventory levels will be copied from POS for products previously used.",
          }}
          checked={state.keepLevels}
          onChange={() =>
            dispatch({
              type: "toggle",
              payload: { name: "keepLevels", value: !state.keepLevels },
            })
          }
        />
        <Box marginLeft="xxLarge" marginTop="small">
          <Checkbox
            label="Keep inventory levels up to date"
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
      </Box>
    </>
  );
}
