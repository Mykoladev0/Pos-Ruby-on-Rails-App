import React, { useContext } from "react";
import {
  H3,
  Panel,
  Flex,
  Badge,
  FlexItem,
  Text,
  Button,
} from "@bigcommerce/big-design";
import { useRouter } from "next/router";
import Axios from "axios";
import StoreContext from "../../contexts/store";

export default function Connect(): JSX.Element {
  const { push } = useRouter();
  const { storeId } = useContext(StoreContext);

  /**
   * Disconnect the channel and redirect user back to onboarding
   */
  const removeChannel = (): void => {
    storeId &&
      Axios.delete(`/api/channel/${storeId}`).then(() =>
        push("/?authorized=true")
      );
  };

  return (
    <Panel>
      <Flex>
        <FlexItem flexGrow={0} margin="small">
          <img src="/images/settings-icon.svg" width={40} />
        </FlexItem>
        <FlexItem flexGrow={1} marginLeft="medium">
          <Flex flexWrap="wrap">
            <FlexItem flexBasis="100%">
              <H3>
                POS
                <Badge marginLeft="small" variant="success" label="connected" />
              </H3>
            </FlexItem>
            <FlexItem flexBasis="100%">
              <Text>
                POS is currently enabled. Your inventory will be kept in sync
                automatically
              </Text>
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem flexGrow={0}>
          <Button
            actionType="destructive"
            variant="secondary"
            onClick={removeChannel}
            mobileWidth="auto"
          >
            Disconnect and remove POS
          </Button>
        </FlexItem>
      </Flex>
    </Panel>
  );
}
